const Session = require('../core/Session')
    , Util = require('../core/Util')
    , Response = require("../core/Response")
    , Config = require('../config/Constant')
    , Sms = require('../service/Sms');

module.exports = {
    createAuthCode: (req, phone) => {
        return new Promise(async(resolve, reject) => {
            phone = Util.replaceAll(phone, '-', '').trim();
            const code = Util.createRandomCode(5);
            const message = '[' + Config.APP.NAME + '] 본인확인 인증번호 [' + code + '] 입니다.';

            try {
                const rs = await Sms.send(phone, message);
                if (rs.affectedRows > 0) {
                    Session.set(req, 'phone', phone);
                    Session.set(req, 'phoneAuth', false);
                    Session.set(req, 'phoneAuthCode', code);
                    Session.set(req, 'phoneAuthTryCount', 0);
                    Session.set(req, 'phoneAuthDate', Date.now());
                    resolve(rs);
                } else {
                    reject(Response.get(Response.type.DATABASE_ERROR, {}));
                }
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    checkAuthCode: (req, code) => {
        return new Promise((resolve, reject) => {
            if (Session.get(req, 'phoneAuthTryCount') > 5) {
                reject(Response.get(Response.type.EXCEED_TRY_COUNT, {}));
            } else if ((Date.now() - Session.get(req, 'phoneAuthDate')) > 180000) {
                reject(Response.get(Response.type.TIME_EXCEED, {}));
            } else {
                if (Session.get(req, 'phoneAuthCode') == code) {
                    Session.set(req, 'phoneAuth', true);
                    resolve({});
                } else {
                    Session.set(req, 'phoneAuthTryCount', Session.get(req, 'phoneAuthTryCount') + 1);
                    reject(Response.get(Response.type.FAILED), {});
                }
            }
        });
    }
}
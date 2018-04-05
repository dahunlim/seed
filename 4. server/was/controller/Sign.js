const Session = require('../core/Session')
    , Auth = require('../core/Authentication')
    , Response = require('../core/Response')
    , User = require('../service/User')
    , Config = require('../config/Constant')
    ;

module.exports = {

    login: function (req, id, pass) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.getUserById(id);

                if (user) {
                    if (!Auth.isExceedFailCount(user)) {

                        if (Auth.isValidPassword(pass, user) || Auth.isLostPassword(pass, user)) {

                            await User.resetTryHistory(id);
                            await Session.create(req, user);
                            resolve({
                                data: {
                                    userId: user._id,
                                    userName: user.name,
                                    userState: user.state,
                                    userLevel: user.level
                                }, expire: req.session.cookie.expires
                            })

                        } else {
                            await User.addTryHistory(id);
                            reject(Response.type.FAILED);

                        }
                    } else {
                        reject(Response.type.EXCEED_TRY_COUNT);
                    }
                } else {
                    reject(Response.type.USER_NOT_FOUND);
                }
            } catch (err) {
                reject(Response.get(Response.type.FAILED, err.message));
            }
        });
    },

    logout: function (req) {
        return new Promise(async (resolve, reject) => {
            try {
                const rs = Session.remove(req);
                resolve(rs);
            } catch (err) {
                reject(err);
            }
        })
    },

    join: function (id, pass, name, phone) {
        return new Promise(async (resolve, reject) => {
            const isExistUser = await User.isExist(id);
            if (isExistUser) {
                reject(Response.type.NOT_AVAILABLE);
            } else {
                const rs = await User.create(id, pass, name, phone, Config.USER.LEVEL.NORMAL, Config.USER.STATE.NORMAL);
                resolve(rs)
            }
        });
    }
}
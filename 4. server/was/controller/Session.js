const Response = require("../core/Response");

module.exports = {
    refresh: (req) => {
        return new Promise((resolve, reject) => {
            const sessionData = req.session;
            req.session.regenerate(function (err) {
                if (err) {
                    reject(Response.type.FAILED);
                } else {
                    Object.keys(sessionData).forEach(function (key) {
                        if (key != 'cookie') {
                            req.session[key] = sessionData[key];
                        }
                    });
                    req.session.save(err => {
                        if (err) {
                            reject(Response.type.FAILED);
                        } else {
                            const rs = Response.get(Response.type.SUCCESS, {
                                data: sessionData,
                                expire: req.session.cookie.expires
                            });
                            resolve(rs);
                        }
                    });
                }
            })
        });
    }
}
const Response = require("../core/Response");

module.exports = {
    refresh: (req) => {
        return new Promise(async (resolve, reject) => {
            req.session.touch();
            resolve({data: req.session, expire: req.session.cookie.expires});
        });
    }
}
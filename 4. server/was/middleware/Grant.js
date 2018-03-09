const Session = require('../core/Session')
    , RESPONSE = require('../core/Response');

module.exports = {
    has: function (level) {
        return (res, req, next) => {
            if (Number(Session.get(req, 'userLevel')) >= level) {
                next();
            } else {
                next(RESPONSE.NOT_GRANTED);
            }
        }
    }
}
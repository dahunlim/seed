const Session = require('../core/Session')
    , RESPONSE = require('../core/Response');

module.exports = {
    isLogined: function () {
        return (req, res, next) => {
            if (Session.get(req, 'userId') != null) {
                next();
            } else {
                next(RESPONSE.NOT_AUTHENTICATION)
            }
        }
    }
}


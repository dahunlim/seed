const Session = require('../core/Session')
    , Response = require('../core/Response');

module.exports = {
    has: () =>
        (req, res, next) => {
            if (Session.get(req, 'userId') != null) {
                next();
            } else {
                next(Response.type.INVALID_PARAMETER)
            }
        }
}


const Session = require('../core/Session')
    , Response = require('../core/Response');

module.exports = {
    has: (level) =>
        (req, res, next) => {
            if (Session.get(req, 'userLevel') >= level) {
                next();
            } else {
                console.log('not granted');
                next(Response.type.NOT_GRANTED);
            }
        }
}
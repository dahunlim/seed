const Router = require('express').Router({})
    , Session = require('../core/Session')
    , Auth = require('../middleware/Auth')
    , Request = require('../middleware/Request')
    , Handler = require('../middleware/Handler')
    , Ctrl = require('../controller/Alarm');

Router.get(
    '/me',
    [
        Auth.has(),
        Request.hasParams(['offset', 'count'])
    ],
    Handler.request(
        Ctrl.list,
        (req, res, next) => [Session.get(req, 'userId'), req.query['offset'], req.query['count']]
    )
);

module.exports = Router;
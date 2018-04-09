const Router = require('express').Router({})
    , Handler = require('../middleware/Handler')
    , Request = require('../middleware/Request')
    , Ctrl = require('../controller/Auth');


Router.post(
    '/mobile',
    [
        Request.hasParams(['phone'])
    ],
    Handler.request(
        Ctrl.createAuthCode,
        (req, res, next) => [req, req.body['phone']]
    )
);

Router.get(
    '/mobile/:code',
    [],
    Handler.request(
        Ctrl.checkAuthCode,
        (req, res, next) => [req, req.params['code']]
    )
);



module.exports = Router;
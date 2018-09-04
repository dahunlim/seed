const Router = require('express').Router({})
    , Config = require('../config/Constant')
    , Request = require('../middleware/Request')
    , Handler = require('../middleware/Handler')
    , Auth = require('../middleware/Auth')
    , Grant = require('../middleware/Grant')
    , Controller = require('../controller/Alarm');

Router.get(
    '',
    [
        Auth.has()
    ],
    Handler.request(
        Controller.getList,
        (req, res, next) => [
            Session.get(req, 'userId'),
            req.query['type']
        ]
    ));

module.exports = Router;
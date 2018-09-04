const Router = require('express').Router()
    , Session = require('../core/Session')
    , Config = require('../config/Constant')
    , Ctrl = require('../controller/Inquiry')
    , Auth = require('../middleware/Auth')
    , Grant = require('../middleware/Grant')
    , Request = require('../middleware/Request')
    , Handler = require('../middleware/Handler');

Router.get(
    '',
    [
        Auth.has(),
        Grant.has(Config.USER.LEVEL.MANAGER),
        Request.hasParams([
            'offset',
            'count'
        ])
    ],
    Handler.request(
        Ctrl.list,
        (req, res, next) => [
            req.query['offset'],
            req.query['count'],
            req.query['field'],
            req.query['keyword']
        ]
    ));

Router.post(
    '',
    [
        Auth.has(),
        Request.hasParams([
            'title',
            'contents'
        ])
    ],
    Handler.request(
        Ctrl.create,
        (req, res, next) => [
            Session.get(req, 'userId'),
            Session.get(req, 'userName'),
            req.body['title'],
            req.body['contents'],
            req.body['files']
        ]
    ));

Router.get(
    '/me',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.listOfMe,
        (req, res, next) => [
            Session.get(req, 'userId')
        ]
    ));

Router.get(
    '/:id',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.get,
        (req, res, next) => [
            req.params.id,
            Session.get(req, 'userId'),
            Session.get(req, 'userLevel')
        ]
    ));

Router.put(
    '/:id',
    [
        Auth.has(),
        Request.hasParams([
            'title',
            'contents'
        ])
    ],
    Handler.request(
        Ctrl.modify,
        (req, res, next) => [
            req.params['id'],
            Session.get(req, 'userId'),
            req.body['title'],
            req.body['contents'],
            req.body['files']
        ]
    ));


Router.post(
    '/:id/answer',
    [
        Auth.has(),
        Grant.has(Config.USER.LEVEL.MANAGER),
        Request.hasParams(['contents'])
    ],
    Handler.request(
        Ctrl.answer,
        (req, res, next) => [
            req.params['id'],
            Session.get(req, 'userId'),
            Session.get(req, 'userName'),
            req.body['contents']
        ]
    ));

Router.delete(
    '/:id',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.delete,
        (req, res, next) => [
            req.params.id,
            Session.get(req, 'userId')
        ]
    ));

module.exports = Router;
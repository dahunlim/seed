const Router = require('express').Router()
    , Session = require('../core/Session')
    , Config = require('../config/Constant')
    , Auth = require('../middleware/Auth')
    , Request = require('../middleware/Request')
    , Grant = require('../middleware/Grant')
    , Handler = require('../middleware/Handler')
    , Ctrl = require('../controller/Article');

/**
 * @desc add new post
 * @grant admin
 */
Router.post(
    '',
    [
        Auth.has(),
        Grant.has(Config.USER.LEVEL.ADMIN),
        Request.hasParams([
            'type',
            'title',
            'contents',
            'images',
            'files'
        ])
    ],
    Handler.request(
        Ctrl.add,
        (req, res, next) => [
            req.body.type,
            Session.get(req, 'userId'),
            Session.get(req, 'userName'),
            req.body['title'],
            req.body['contents'],
            req.body['images'],
            req.body['files']
        ]
    ));

/**
 * @desc get list of notices
 * @grant normal | manager | admin
 */
Router.get(
    '',
    [
        Auth.has(),
        Request.hasParams([
            'type',
            'offset',
            'count'
        ])
    ],
    Handler.request(
        Ctrl.list,
        (req, res, next) => [
            req.query['type'],
            Number(req.query['offset']),
            Number(req.query['count']),
            req.query['field'],
            req.query['keyword']
        ]
    ));



Router.get(
    '/:article_id',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.get,
        (req, res, next) => [
            req.params['article_id']
        ]
    ));

Router.put(
    '/:article_id',
    [
        Auth.has(),
        Request.hasParams([
            'title',
            'contents',
            'images',
            'files'
        ])
    ],
    Handler.request(
        Ctrl.modify,
        (req, res, next) => [
            Session.get(req, 'userId'),
            Session.get(req, 'userLevel'),
            req.params['article_id'],
            req.body['title'],
            req.body['contents'],
            req.body['images'],
            req.body['files']
        ]
    ));

Router.delete(
    '/:article_id',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.remove,
        (req, res, next) => [
            req.params['article_id']
        ]
    ));

module.exports = Router;
const Router = require('express').Router()
    , Constant = require('../config/Constant')
    , Auth = require('../middleware/Auth')
    , Request = require('../middleware/Request')
    , Grant = require('../middleware/Grant')
    , Handler = require('../middleware/Handler')
    , Ctrl = require('../controller/Notice');

/**
 * @desc add new post
 * @grant admin
 */
Router.post(
    '',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.ADMIN),
        Request.hasParams(['title', 'contents'])
    ],
    Handler.request(
        Ctrl.add,
        (req, res, next) => [req.body.title, req.body.contents]
    ));

/**
 * @desc get list of notices
 * @grant normal | manager | admin
 */
Router.get(
    '',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.list,
        (req, res, next) => [Number(req.query.offset), Number(req.query.count), req.query.field, req.query.keyword]
    ));


Router.get(
    '/:notice_id',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.get,
        (req, res, next) => [req.params['notice_id']]
    )
);

Router.put(
    '/:notice_id',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.ADMIN)
    ],
    Handler.request(
        Ctrl.modify,
        (req, res, next) => [req.params['notice_id'], req.body.title, req.body.contents]
    )
);

Router.delete(
    '/:notice_id',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.ADMIN)
    ],
    Handler.request(
        Ctrl.remove,
        (req, res, next) => [req.params['notice_id']]
    )
);

module.exports = Router;
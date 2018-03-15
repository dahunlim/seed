const Router = require('express').Router()
    , Constant = require('../config/Constant')
    , Auth = require('../middleware/Auth')
    , Request = require('../middleware/Request')
    , Grant = require('../middleware/Grant')
    , Handler = require('../middleware/Handler')
    , NoticeCtrl = require('../controller/Notice');

/**
 * @desc add new post
 * @grant admin
 */
Router.post(
    '',
    [
        Auth.isLogined(),
        Grant.has(Constant.USER.LEVEL.ADMIN),
        Request.hasParams(['title', 'contents'])
    ],
    Handler(
        NoticeCtrl.add,
        (req, res, next) => [req.body.title, req.body.contents]
    ));

/**
 * @desc get list of notices
 * @grant normal | manager | admin
 */
Router.get(
    '',
    [
        Auth.isLogined()
    ],
    Handler(
        NoticeCtrl.list,
        (req, res, next) => [Number(req.query.offset), Number(req.query.count), req.query.field, req.query.keyword]
    ));


Router.get(
    '/:notice_id',
    [
        Auth.isLogined()
    ],
    Handler(
        NoticeCtrl.get,
        (req, res, next) => [req.params['notice_id']]
    )
);

Router.put(
    '/:notice_id',
    [
        Auth.isLogined(),
        Grant.has(Constant.USER.LEVEL.ADMIN)
    ],
    Handler(
        NoticeCtrl.modify,
        (req, res, next) => [req.params['notice_id'], req.body.title, req.body.contents]
    )
);

Router.delete(
    '/:notice_id',
    [
        Auth.isLogined(),
        Grant.has(Constant.USER.LEVEL.ADMIN)
    ],
    Handler(
        NoticeCtrl.remove,
        (req, res, next) => [req.params['notice_id']]
    )
);

module.exports = Router;
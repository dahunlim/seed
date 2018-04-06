const Router = require('express').Router()
    , Session = require('../core/Session')
    , Constant = require('../config/Constant')
    , Ctrl = require('../controller/User')
    , Auth = require('../middleware/Auth')
    , Grant = require('../middleware/Grant')
    , Request = require('../middleware/Request')
    , Handler = require('../middleware/Handler');

/**
 * @desc add new user
 * @grant only admin
 */
Router.post(
    '',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.ADMIN),
        Request.hasParams(['id', 'pass', 'name', 'phone', 'level'])
    ],
    Handler.request(
        Ctrl.create,
        (req, res, next) => [req.body.id, req.body.pass, req.body.name, req.body.phone, req.body.level]
    )
);

/**
 * @desc get user list
 * @grant manager | admin
 */
Router.get(
    '',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.MANAGER),
        Request.hasParams(['offset', 'count'])
    ],
    Handler.request(
        Ctrl.list,
        (req, res, next) => [req.query.offset, req.query.count, req.query.field, req,query.keyword]
    )
);

/**
 * @desc Get my information
 */
Router.get(
    '/me',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.getUserById,
        (req, res, next) => [Session.get(req, 'userId')]
    )
);

/**
 * @desc Update my information
 */
Router.put(
    '/me',
    [
        Auth.has(),
        Request.hasParams(['name', 'phone', 'level', 'pass'])
    ],
    Handler.request(
        Ctrl.updateByUser,
        (req, res, next) => [Session.get(req, 'userId'), req.body.name, req.body.phone, req.body.level, req.body.pass, req.body.newPass]
    )
);


/**
 * @desc get user detail information
 * @grant normal | manager | admin
 */
Router.get(
    '/:user_id',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.MANAGER)
    ],
    Handler.request(
        Ctrl.getUserById,
        (req, res, next) => [req.params.user_id]
    )
);

Router.put(
    '/:user_id',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.ADMIN),
        Request.hasParams(['name', 'phone', 'level'])
    ],
    Handler.request(
        Ctrl.updateByAdmin,
        (req, res, next) => [req.params.user_id, req.body.name, req.body.phone, req.body.level]
    )
);

/**
 * @desc Delete user information
 * @grant Super Admin
 */
Router.delete(
    '/:user_id',
    [
        Auth.has(),
        Grant.has(Constant.USER.LEVEL.ADMIN)
    ],
    Handler.request(
        Ctrl.remove,
        (req, res, next) => [req.params.user_id]
    )
);

module.exports = Router;
const Router = require('express').Router()
    , Constant = require("../config/Constant")
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
 * @desc get user detail information
 * @grant normal | manager | admin
 */
Router.get('/:user_id');
Router.put('/:user_id');
Router.put('/me');
Router.put('/me/push');
Router.put('/me/token');
Router.delete('/:user_id');

module.exports = Router;
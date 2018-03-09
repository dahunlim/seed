const Router = require('express').Router()
    , Constant = require("../config/Constant")
    , UserCtrl = require('../controller/User')
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
        Auth.isLogined(),
        Grant.has(Constant.USER.LEVEL.ADMIN),
        Request.hasParams(['id', 'pass', 'name'])
    ],
    Handler(
        UserCtrl.add,
        (req, res, next) => [req.body.id, req.body.name, req.body.pass]
    )
);

/**
 * @desc get user list
 * @grant manager | admin
 */
Router.get(
    '',
    [
        Auth.isLogined(),
        Grant.has(Constant.USER.LEVEL.MANAGER),
        Request.hasParams(['offset', 'count'])
    ],
    Handler(
        UserCtrl.list,
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
const Router = require('express').Router()
    , Ctrl = require('../controller/Sign')
    , Handler = require('../middleware/Handler')
    , Auth = require('../middleware/Auth')
    , Request = require('../middleware/Request');

/**
 * @desc Logout
 */
Router.delete(
    '',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.logout,
        (req, res, next) => [
            req
        ]
    ));

/**
 * @desc Membership Login
 */
Router.post(
    '/in',
    [
        Request.hasParams(['id', 'pass'])
    ],
    Handler.request(
        Ctrl.login,
        (req, res, next) => [
            req,
            req.body['id'],
            req.body['pass']
        ]
    ));

/**
 * @desc Membership Join
 */
Router.post(
    '/up',
    [
        Request.hasParams([
            'id',
            'pass',
            'name',
            'phone'
        ])
    ],
    Handler.request(
        Ctrl.join,
        (req, res, next) => [
            req.body['id'],
            req.body['pass'],
            req.body['name'],
            req.body['phone']
        ]
    ));

module.exports = Router;
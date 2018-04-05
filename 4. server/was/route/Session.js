const Router = require('express').Router()
    , Auth = require('../middleware/Auth')
    , Handler = require('../middleware/Handler')
    , Ctrl = require('../controller/Session');

/**
 * Regenerate session
 */
Router.put(
    '',
    [
        Auth.has()
    ],
    Handler.request(
        Ctrl.refresh,
        (req, res, next) => [req]
    )
);

module.exports = Router;
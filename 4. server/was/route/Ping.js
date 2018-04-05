const Router = require('express').Router();

/**
 * Ping for checking health condition
 *
 */
Router.get(
    '',
    [],
    (req, res, next) => res.send('')
);

module.exports = Router;
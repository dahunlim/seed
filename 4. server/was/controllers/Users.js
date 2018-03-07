const Router = require('express').Router()
    , Auth = require('../middlewares/Authentication')
    , Request = require('../middlewares/Request')
    , UserService = require('../services/User');

Router.get('/:user_id', [Auth.isLogined], (req, res) => {
    const userId = req.params['user_id'];
    UserService.getUserById(userId)
        .then(user => {
            if (user) {
                Response.toJson()
            } else {

            }
        })
        .catch()
});

module.exports = Router;
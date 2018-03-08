const Router = require('express').Router()
    , Auth = require('../middleware/Authentication')
    , Response = require('../middleware/Response')
    , UserCtrl = require('../controller/User');

Router.post('');
Router.get('');
Router.get('/:user_id');
Router.put('/:user_id');
Router.put('/me');
Router.put('/me/push');
Router.put('/me/token');
Router.delete('/:user_id');

module.exports = Router;
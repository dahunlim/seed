const Router = require('express').Router()
    , Constant = require('../config/Constant')
    , Auth = require('../middleware/Auth')
    , Request = require('../middleware/Request')
    , Grant = require('../middleware/Grant')
    , Response = require('../middleware/Response')
    , NoticeCtrl = require('../controller/Notice');

Router.post('', [Auth.isLogined(), Grant(Constant.USER.LEVEL.ADMIN), Request.isValidParameter(['title', 'contents'])], Response(NoticeCtrl.));
Router.get('', [Auth.isL]);
Router.get('/:notice_id');
Router.put('/:notice_id');
Router.delete('/:notice_id');

module.exports = Router;
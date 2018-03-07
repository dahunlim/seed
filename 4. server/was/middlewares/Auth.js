const Session = require('../core/Session')
    , RES_CODE = require('../core/Response').code;


module.exports = (req, res, next) => {
    if(Session.get(req, 'userId') != null){
        next();
    }else{
        next({code: RES_CODE.NOT_AUTHENTICATION, })
        Response.toJson(res, , '로그인 후 이용해 주세요.', {});
    }
}

var userModel    = require('../model/User.js')
    , Config      = require('../common/Config.js')
    , Session     = require('./Session.js')
    , Crypto      = require('crypto')
    , Response    = require('../core/Response')
    , Code        = Response.code;

module.exports = {

    isLogined: function(req, res, next){
        if(Session.get(req, 'userId') != null){
            next();
        }else{
            Response.toJson(res, Code.NOT_AUTHENTICATION, '로그인 후 이용해 주세요.', {});
        }
    },

    isGranted: function(level){
        return function(req, res, next){
            if(Number(Session.get(req, 'userLevel')) >= level){
                next();
            }else{
                Response.toJson(res, Code.NOT_GRANTED, '권한이 없습니다.', {});
            }
        }
    },

    isAuthenticated: function(req, res, next){
        if(Session.get(req, 'phoneAuth') && (Date.now() - Session.get(req, 'phoneAuthDate')) <= 180000){
            next();
        }else{
            Response.toJson(res, Code.NOT_PHONE_AUTHENTICATION, '인증 후 사용해 주세요.', {});
        }
    },

    success: function (req, user) {
        this.resetSessionCount(req);
        userModel.update({_id: user._id}, {$set: { tdate: 0, tcnt: 0 }}).then(function(rs){
        }, function(err){
            console.log(err);
        })
        Session.create(req, user);
    },


    fail: function (req, user) {
        this.incrementSessionCount(req);
        userModel.update(
            {_id: user._id},
            {$set: {tdate: Date.now()}, $inc: {tcnt: 1}},
            function (doc) {
            },
            function (err) {
            });
    },

    isExceedSessionCount: function (req) {
        return ((Session.get(req, 'login_try_count') != null) && (Session.get(req, 'login_try_count') > Config.AUTHENTICATION.LOGIN_FAILED_MAX_COUNT) && ((Date.now() - Session.get(req, 'login_try_time')) <= Config.AUTHENTICATION.LOGIN_TRY_INTERVAL)) ? true : false;
    },

    isExceedFailCount: function (user) {
        return (user.tcnt > 5 && ((Date.now() - user.tdate) <= Config.AUTHENTICATION.LOGIN_TRY_INTERVAL)) ? true : false;
    },

    isValidPass: function (pass, user) {
        return (user.pass == this.createPassword(pass, user.salt)) ? true : false;
    },

    incrementSessionCount: function (req) {
        Session.set(req, 'login_try_count', (Session.get(req, 'login_try_count') != null) ? Session.get(req, 'login_try_count') + 1 : 1);
        Session.set(req, 'login_try_time', Date.now());
    },

    resetSessionCount: function (req) {
        Session.set(req, 'login_try_count', 0);
        Session.set(req, 'login_try_time', 0);
    },

    createSalt: function(){
        return Math.round((Date.now() * Math.random())) + "";
    },

    createPassword: function(password, salt){
        return Crypto.createHash("sha512").update(password + salt).digest("hex");
    }


};
const Config      = require('../config/Constant.js')
    , Crypto      = require('crypto');

module.exports = {

    isExceedFailCount: function (user) {
        return (user.tcnt > 5 && ((Date.now() - user.tdate) <= Config.AUTHENTICATION.LOGIN_TRY_INTERVAL)) ? true : false;
    },

    isValidPassword: function (pass, user) {
        return (user.pass === this.createPassword(pass, user.salt)) ? true : false;
    },

    isLostPassword: function(pass, user){
        return ((user.state == Config.USER.LOST_PASSWORD) && (pass == user.vcode) && ((Date.now() - user.vdate) <= Config.USER.TEMP_PASSWORD_VALID_TIME));
    },

    createSalt: function(){
        return Math.round((Date.now() * Math.random())) + "";
    },

    createPassword: function(password, salt){
        return Crypto.createHash("sha512").update(password + salt).digest("hex");
    }
};
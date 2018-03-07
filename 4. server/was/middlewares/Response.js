module.exports = {
    code : {
        FAILED                  : 0,
        SUCCESS                 : 1,
        INVALID_PARAMETER       : 2,
        NOT_AUTHENTICATION      : 3,
        NOT_GRANTED             : 4,
        DATABASE_ERROR          : 5,
        NO_RESULT               : 6,
        EXCEED_TRY_COUNT        : 7,
        USER_NOT_FOUND          : 8,
        AVAILABLE               : 9,
        SESSION_EXPIRED         : 10,
        USER_ID_EXIST           : 11,
        PASSWORD_MISMATCH       : 12,
        PASSWORD_LOST           : 13,
        TIME_EXCEED             : 14,
        FAILED_GET_DB           : 15,
        NOT_PHONE_AUTHENTICATION: 16,
        INTERNAL_ERROR          : 99,
        NOT_SUPPORT             : 100
    },
    toJson : function(res, code, msg, data){
        res.json({"code" : code, "msg" : msg, "data" : data});
    },

    handleError: function(res){
        return function(err){
            var message = '';
            switch(err.code){
                case 11000:
                    message = '중복된 입력입니다.';
                    break;
                default:
                    message = err.msg;
            }
            res.json({"code": err.code, "msg": message, "data": err.data});
        }
    }
}
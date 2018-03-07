module.exports = (err, req, res, next) => {

    // handleError: function(res){
    //     return function(err){
    //         var message = '';
    //         switch(err.code){
    //             case 11000:
    //                 message = '중복된 입력입니다.';
    //                 break;
    //             default:
    //                 message = err.msg;
    //         }
    //         res.json({"code": err.code, "msg": message, "data": err.data});
    //     }
    // }

    res.send(err.message);
}
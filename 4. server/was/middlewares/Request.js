var Response    = require('../core/Response')
    , Code      = Response.code
    , MultiPart     =  require('multiparty');


module.exports = {

    isValidParameter: function(params){
        return function(req, res, next){
            var body = {};
            var isValid = true;
            if(req.is('multipart/form-data')){
                var form = new MultiPart.Form();
                form.on('error', function(err) {
                    Response.toJson(res, Code.FAILED, '파일 전송에 실패하였습니다.', {err: err.stack});
                });
                form.on('field', function(name, value){
                    try{
                        body[name] = JSON.parse(value);
                    }catch(e){
                        body[name] = value;
                    }
                });
                form.on('part', function(part) {
                    if (!part.filename) { part.resume(); }
                    var fileObject = {};
                    var tempArr = [];
                    fileObject.filename = part.filename;
                    fileObject.filedata = [];
                    part.on('data', function(chunk){
                        tempArr.push(chunk);
                    });

                    part.on('end', function(){
                        //해당 part를 다 읽었을때 발생
                        var length = 0;
                        for(var i in tempArr){
                            length += tempArr[i].length;
                        }
                        fileObject.filedata = Buffer.concat(tempArr, length);

                        if(typeof body[part.name] !== 'undefined'){
                            if(Array.isArray(body[part.name])){
                                body[part.name].push(fileObject);
                            }else{
                                var tempFile = body[part.name];
                                body[part.name] = [tempFile, fileObject];
                            }
                        }else{
                            body[part.name] = fileObject;
                        }
                    });
                    part.on('error', function(err) {
                        Response.toJson(res, Code.FAILED, 'File Upload Failed', {});
                    });
                });

                form.on('close', function() {
                    for(var i = 0; i < params.length; i++){
                        if(!Object.prototype.hasOwnProperty.call(body, params[i])){
                            isValid = false;
                            break;
                        }
                    }
                    if(isValid){
                        req.body = body;
                        next();
                    }else{
                        Response.toJson(res, Code.INVALID_PARAMETER, '', {});
                    }
                });

                form.parse(req);
            }else{
                if(req.method == 'GET' || req.method == 'DELETE'){
                    body = req.query;
                }else if(req.method == 'POST' || req.method == 'PUT'){
                    body = req.body
                }
                for(var i = 0; i < params.length; i++){
                    if(!Object.prototype.hasOwnProperty.call(body, params[i])){
                        isValid = false;
                        break;
                    }
                }
                if(isValid){
                    next();
                }else{
                    Response.toJson(res, Code.INVALID_PARAMETER, '잘못된 요청입니다. 파라미터를 확인해 주세요.', {});
                }
            }


        }
    }
}
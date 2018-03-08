var Request     = require('request')
    , Config    = require('../common/Config')
    , GM        = require('gm')
    , Q         = require('q');

module.exports = {

    /**
     * Create image thumbnail
     * @param image
     */
    thumbnail: function(image){
        var deferred = Q.defer();
        GM(image).format(function(err, format){
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                this.resize(Config.MEDIA.MOBILE.SIZE).toBuffer(format, function(err, buffer){
                    if(err){
                        deferred.reject({code: 1, msg: 'Create image thumbnail failed!'});
                    }else{
                        deferred.resolve(buffer)
                    }
                });
            }
        });
        return deferred.promise;
    },

    getImageBase64: function(url){
        var deferred = Q.defer();
        Request({uri : encodeURI(url), encoding: 'binary' }, function(err, res, body){
            if(!err && res.statusCode == 200){
                var buf = new Buffer(body, 'binary');
                var base64Str = 'data:' + res.headers['content-type'] + ';base64,'+buf.toString('base64');
                deferred.resolve(base64Str);
            }else{
                deferred.reject(err);
            }
        });
        return deferred.promise;
    },



    /**
     * Get image buffers from url array
     * @param urlArr [{url: '', key: ''}]
     * @returns {*}
     */
    getImageBuffersByUrl : function(images){
        var deferred = Q.defer();
        var deferredArr = [];
        for(var i in images){
            (function(image){
                var deferredPart = Q.defer();
                var tempArr = [];
                Request(image.url).on('data', function(data){
                    tempArr.push(data)
                }).on('error', function(err){
                    deferredPart.reject(err);
                }).on('end', function(){
                    var length = 0;
                    for(var i in tempArr){
                        length += tempArr[i].length;
                    }
                    var buf = Buffer.concat(tempArr, length);
                    deferredPart.resolve({key: image.key, data: buf});
                });
                deferredArr.push(deferredPart.promise);
            })(images[i]);
        }

        Q.all(deferredArr).then(function(results){
            deferred.resolve(results);
        }, function(errors){
            deferred.reject(errors);
        });

        return deferred.promise;
    },

    createMediaKey: function(id){
        return id + "-" + Date.now() + "-" + Math.floor(Math.random()*900 + 100);
    },

    getWokerProcessNumber: function(){
        return Math.floor(Math.random() * Config.MEDIA_RESIZER_COUNT) + 1;
    }
}

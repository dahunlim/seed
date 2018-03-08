var AWS_SDK      = require('aws-sdk')
    , Q          = require('q')
    , Config     = require('../common/Config')

module.exports = {

    upload: function(folder, key, data){
        var deferred = Q.defer();
        AWS_SDK.config.loadFromPath('./common/AWS.json');
        var s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
        var params = {
            Bucket: 'freeze-media',
            Key: folder + "/" + key,
            ACL: 'public-read',
            Body: data
        }
        s3.putObject(params, function(err, data){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    },

    getSignedUploadUrl: function(key){
        var deferred = Q.defer();
        AWS_SDK.config.loadFromPath('./common/AWS.json');
        var s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
        var params = {
            Bucket: 'freeze-media',
            Key: key,
            Expires: 600,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', params, function(err, url){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(url);
            }
        })
        return deferred.promise;
    },

    getSignedDownloadUrl: function(key, name){
        var deferred = Q.defer();
        AWS_SDK.config.loadFromPath('./common/AWS.json');
        var s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
        var params = {
            Bucket: 'freeze-media',
            Key: key,
            Expires: 600,
            ResponseContentDisposition: 'attachment; filename=' + encodeURI(name)
        };
        s3.getSignedUrl('getObject', params, function(err, url){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(url);
            }
        })
        return deferred.promise;
    },

    isExist: function(state, key){
        var deferred = Q.defer();
        AWS_SDK.config.loadFromPath('./common/AWS.json');
        var s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
        var params = {
            Bucket: 'freeze-media',
            Key: key
        }
        s3.headObject(params, function(err, metadata){
            if(err && err.code === 'NotFound'){
                deferred.reject(err);
            } else{
                deferred.resolve();
            }
        });
        return deferred.promise;
    },

    copy: function(from, to, key){
        var deferred = Q.defer();
        AWS_SDK.config.loadFromPath('./common/AWS.json');
        var s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
        var params = {
            Bucket: 'freeze-media',
            CopySource: 'freeze-media/' + from + '/' + key,
            Key: to + "/" + key
        }
        s3.copyObject(params, function(err, data){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    },

    get: function(type, key){
        var deferred = Q.defer();
        AWS_SDK.config.loadFromPath('./common/AWS.json');
        var s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
        var params = {
            Bucket: 'freeze-media',
            Key: type + "/" + key
        }
        s3.getObject(params, function(err, data){
            console.log(data);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data.Body);
            }
        });
        return deferred.promise;
    },


    createMediaKey: function(id){
        return id + "-" + Date.now() + "-" + Math.floor(Math.random() * 900 + 100);
    },
}
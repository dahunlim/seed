const AWS_SDK = require('aws-sdk')
    , Response = require('../core/Response')
    , CONFIG_PATH = './config/AWS.json';

module.exports = {

    upload: (bucket, key, data) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const params = {
                Bucket: bucket,
                Key: key,
                ACL: 'public-read',
                Body: data
            }
            s3.putObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err));
                } else {
                    resolve(data);
                }
            });
        });
    },

    getSignedUploadUrl: (bucket, key) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const params = {
                Bucket: bucket,
                Key: key,
                Expires: 600,
                ACL: 'public-read'
            };
            s3.getSignedUrl('putObject', params, function (err, url) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err));
                } else {
                    resolve(url);
                }
            })
        });
    },

    getSignedDownloadUrl: (bucket, key, name) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const params = {
                Bucket: bucket,
                Key: key,
                Expires: 600,
                ResponseContentDisposition: 'attachment; filename=' + encodeURI(name)
            };
            s3.getSignedUrl('getObject', params, function (err, url) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err));
                } else {
                    resolve(url);
                }
            })
        });
    },

    isExist: (bucket, key) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const params = {
                Bucket: bucket,
                Key: key
            }
            s3.headObject(params, function (err, metadata) {
                if (err && err.code === 'NotFound') {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err));
                } else {
                    resolve();
                }
            });
        });
    },

    copy: function (from, to, key) {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            var params = {
                Bucket: to,
                CopySource: '/' + from + '/' + key,
                Key: key
            }
            s3.copyObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err));
                } else {
                    resolve(data);
                }
            });
        });
    },

    get: (bucket, key) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            var params = {
                Bucket: bucket,
                Key: key
            }
            s3.getObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err));
                } else {
                    resolve(data.Body);
                }
            });
        });
    },

    createKey: function (id) {
        return id + "-" + Date.now() + "-" + Math.floor(Math.random() * 900 + 100);
    },
}
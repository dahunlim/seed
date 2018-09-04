const AWS_SDK = require('aws-sdk')
    , Response = require('../core/Response')
    , CONFIG_PATH = './config/AWS.json';

module.exports = {

    upload: (bucket, folder, key, data, encoding, type) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' + key : key;
            const params = {
                Bucket: bucket,
                Key: path,
                ACL: 'public-read',
                Body: data
            };

            if (typeof encoding !== 'undefined') {
                params['ContentEncoding'] = encoding;
            }

            if (typeof type !== 'undefined') {
                params['ContentType'] = type;
            }

            s3.putObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(data);
                }
            });
        });
    },

    getSignedUploadUrl: (bucket, folder, key) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' + key : key;
            const params = {
                Bucket: bucket,
                Key: path,
                Expires: 18000,
                ACL: 'public-read'
            };
            s3.getSignedUrl('putObject', params, function (err, url) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(url);
                }
            })
        });
    },

    getSignedDownloadUrl: (bucket, folder, key, name) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' + key : key;
            const params = {
                Bucket: bucket,
                Key: path,
                Expires: 600,
                ResponseContentDisposition: 'attachment; filename=' + encodeURI(name)
            };
            s3.getSignedUrl('getObject', params, function (err, url) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(url);
                }
            })
        });
    },

    isExist: (bucket, folder, key) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' + key : key;
            const params = {
                Bucket: bucket,
                Key: path
            };
            s3.headObject(params, function (err, metadata) {
                if (err && err.code === 'NotFound') {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve();
                }
            });
        });
    },

    copy: function (fromBucket, fromFolder, toBucket, toFolder, key) {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const srcPath = (fromFolder)? `/${fromBucket}/${fromFolder}/${key}` : `/${fromBucket}/${key}`;
            const desPath = (toFolder)? `${toFolder}/${key}` : key;
            const params = {
                Bucket: toBucket,
                CopySource: srcPath,
                Key: desPath
            };
            s3.copyObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(data);
                }
            });
        });
    },

    deleteMany: function(bucket, folder, keys) {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' : '';
            const keyObjs = [];
            keys.forEach(key => keyObjs.push({Key: path + key}));
            const params = {
                Bucket: bucket,
                Delete: {
                    Objects: keyObjs
                }
            };
            s3.deleteObjects(params, (err, data) => {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(data);
                }
            });
        });
    },

    get: (bucket, folder, key) => {
        return new Promise((resolve, reject) => {
            AWS_SDK.config.loadFromPath(CONFIG_PATH);
            const s3 = new AWS_SDK.S3({signatureVersion: 'v4'});
            const path = (folder)? folder + '/' + key : key;
            const params = {
                Bucket: bucket,
                Key: path
            };
            s3.getObject(params, function (err, data) {
                if (err) {
                    reject(Response.get(Response.type.AWS_S3_FAILED, err.stack));
                } else {
                    resolve(data.Body);
                }
            });
        });
    }
}
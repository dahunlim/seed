const Config = require('../config/Constant')
    , Aws = require('../core/AWS')
    , Media = require('../core/Media');

module.exports = {

    getUploadUrl: (type) => {
        return new Promise(async (resolve, reject) => {
            try {
                const key = Media.createMediaKey(type);
                const url = await Aws.getSignedUploadUrl(Config.S3_BUCKET.TEMP, undefined, key);
                resolve({key: key, url: url});
            } catch (err) {
                reject(err);
            }
        });
    },

    getDownloadUrl: (type, name, key) => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = await Aws.getSignedDownloadUrl(Config.S3_BUCKET.FILE, 'file',  key, name);
                resolve(url);
            } catch (err) {
                reject(err);
            }
        });
    }
}
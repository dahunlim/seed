var Request = require('request')
    , Response = require('../core/Response')
    , Config = require('../config/Constant')
    , GM = require('gm');

module.exports = {

    /**
     * Create image thumbnail
     * @param image
     */
    thumbnail: function (image) {
        return new Promise((resolve, reject) => {
            GM(image).format(function (err, format) {
                if (err) {
                    reject(Response.get(Response.type.IMAGE_PROCESSING_FAILED, err.message));
                } else {
                    this.resize(Config.MEDIA.SIZE.DESKTOP).toBuffer(format, function (err, buffer) {
                        if (err) {
                            reject(Response.get(Response.type.IMAGE_PROCESSING_FAILED, {}));
                        } else {
                            resolve(buffer)
                        }
                    });
                }
            });
        });
    },

    getImageBase64: function (url) {
        return new Promise((resolve, reject) => {
            Request({uri: encodeURI(url), encoding: 'binary'}, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    var buf = new Buffer(body, 'binary');
                    var base64Str = 'data:' + res.headers['content-type'] + ';base64,' + buf.toString('base64');
                    resolve(base64Str);
                } else {
                    reject(Response.get(Response.type.IMAGE_PROCESSING_FAILED, err.message));
                }
            });
        });
    },


    /**
     * Get image buffers from url array
     * @param urlArr [{url: '', key: ''}]
     * @returns {*}
     */
    getImageBuffersByUrl: function (images) {
        const promiseArr = [];
        for (let i = 0; i < images.length; i++) {
            (function (image){
                promiseArr.push(new Promise((resolve, reject) => {
                    var tempArr = [];
                    Request(image.url).on('data', function (data) {
                        tempArr.push(data)
                    }).on('error', function (err) {
                        reject(Response.get(Response.type.IMAGE_PROCESSING_FAILED, err.message));
                    }).on('end', function () {
                        var length = 0;
                        for (var i in tempArr) {
                            length += tempArr[i].length;
                        }
                        var buf = Buffer.concat(tempArr, length);
                        resolve({key: image.key, data: buf});
                    });
                }));
            }(images[i]));
        }
        return Promise.all(promiseArr);
    },

    createMediaKey: function (id) {
        return id + "-" + Date.now() + "-" + Math.floor(Math.random() * 900 + 100);
    },

    /**
     * If use dependent resize
     * @returns {number}
     */
    getWokerProcessNumber: function () {
        return Math.floor(Math.random() * Config.MEDIA.RESIZER.COUNT) + 1;
    }
}

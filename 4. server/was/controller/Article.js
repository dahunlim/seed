const Config = require('../config/Constant')
    , Article = require('../service/Article')
    , Aws = require('../core/AWS')
    , Media = require('../core/Media')
    , Response = require('../core/Response');


module.exports = {
    add: (type, user_id, user_name, title, contents, images, files) => {
        return new Promise(async (resolve, reject) => {

            try {

                if (typeof images !== 'undefined' && Array.isArray(images)) {
                    for (let i = 0; i < images.length; i++) {
                        const imageData = await Aws.get(Config.S3_BUCKET.TEMP, images[i].key);
                        const thumbnailData = await Media.thumbnail(imageData);
                        await Aws.upload(Config.S3_BUCKET.FILE, images[i].key + '_thumbnail', thumbnailData);
                        await Aws.copy(Config.S3_BUCKET.TEMP, Config.S3_BUCKET.FILE, images[i].key);
                    }
                }

                if (typeof files !== 'undefined' && Array.isArray(files)) {
                    for (let i = 0; i < files.length; i++) {
                        await Aws.copy(Config.S3_BUCKET.TEMP, Config.S3_BUCKET.FILE, files[i].key);
                    }
                }

                resolve(await Article.add(type, user_id, user_name, title, contents, images, files))

            } catch (err) {
                reject(err);
            }
        });
    },

    get: function(article_id) {
        return Article.get(article_id);
    },

    list: function(type, offset, count, field, keyword) {
        return Article.list(type, offset, count, field, keyword);
    },

    modify: function(user_id, user_level, article_id, title, contents, images, files) {
        return new Promise(async (resolve, reject) => {
            try {

                // Get article
                const article = await Article.get(article_id);

                // delete condition ( my own or super admin )
                if (user_level === Config.USER.LEVEL.ADMIN || article.user._id === user_id) {

                    // Extract added images and deleted images
                    images = (typeof images !== 'undefined') ? images : [];
                    const newImagesArr = JSON.parse(JSON.stringify(images));
                    const oldImagesArr = JSON.parse(JSON.stringify(article.images));
                    for (let i = 0; i < newImagesArr.length; i++) {
                        for (let j = 0; j < oldImagesArr.length; j++) {
                            if (newImagesArr[i].key == oldImagesArr[j].key) {
                                oldImagesArr[i].exist = true;
                                newImagesArr[i].exist = true;
                            }
                        }
                    }
                    const addedImagesArr = newImagesArr.filter( image => (typeof image.exist === 'undefined'));
                    const deletedImagesArr = oldImagesArr.filter( image => (typeof image.exist === 'undefined'));

                    // add and remove images
                    for (let i = 0; i < addedImagesArr.length; i++) {
                        const imageData = await Aws.get(Config.S3_BUCKET.TEMP, addedImagesArr[i].key);
                        const thumbnailData = await Media.thumbnail(imageData);
                        await Aws.upload(Config.S3_BUCKET.FILE, addedImagesArr[i].key + '_thumbnail', thumbnailData);
                        await Aws.copy(Config.S3_BUCKET.TEMP, Config.S3_BUCKET.FILE, addedImagesArr[i].key);
                    }
                    const deletedImagesKeys = [];
                    deletedImagesArr.forEach(image => deletedImagesKeys.push({Key: image.key}));
                    await Aws.deleteMany(Config.S3_BUCKET.FILE, deletedImagesKeys);


                    // Extract added files and deleted files
                    files = (typeof files !== 'undefined') ? files : [];
                    const newFilesArr = JSON.parse(JSON.stringify(files));
                    const oldFilesArr = JSON.parse(JSON.stringify(article.files));
                    for (let i = 0; i < newFilesArr.length; i++) {
                        for (let j = 0; j < oldFilesArr.length; j++) {
                            if (newFilesArr[i].key == oldFilesArr[j].key) {
                                newFilesArr[i].exist = true;
                                oldFilesArr[j].exist = true;
                            }
                        }
                    }
                    const addedFilesArr = newFilesArr.filter( file => (typeof file.exist === 'undefined'));
                    const deletedFilesArr = oldFilesArr.filter( file => (typeof file.exist === 'undefined'));

                    // add and remove files
                    for (let i = 0; i < addedFilesArr.length; i++) {
                        await Aws.copy(Config.S3_BUCKET.TEMP, Config.S3_BUCKET.FILE, addedFilesArr[i].key);
                    }
                    const deletedFilesKeys = [];
                    deletedFilesArr.forEach(file => deletedFilesKeys.push({Key: file.key}));
                    await Aws.deleteMany(Config.S3_BUCKET.FILE, deletedFilesKeys);

                    resolve(await Article.modify(article_id, title, contents, images, files));
                } else {
                    reject(Response.get(Response.type.NOT_GRANTED, {}));
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    remove: function(article_id) {
        return Article.remove(article_id);
    }
}
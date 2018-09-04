const Inquiry = require('../service/Inquiry')
    , Aws = require('../core/AWS')
    , Config = require('../config/Constant');

module.exports = {

    answer: (inquiryId, writerId, writerName, contents) => {
        return Inquiry.answer(inquiryId, writerId, writerName, contents);
    },

    create: (id, name, title, contents, files) =>
        new Promise(async (resolve, reject) => {
            try {
                if (typeof files !== 'undefined') {
                    for (let i = 0; i < files.length; i++) {
                        await Aws.copy(Config.S3_BUCKET.TEMP, Config.S3_BUCKET.FILE, files[i].key);
                    }
                }
                const rs = await Inquiry.create(id, name, title, contents, files);
                resolve(rs);
            } catch (err) {
                reject(err);
            }
        }),

    delete: (inquiryId, userId) => {
        return Inquiry.delete(inquiryId, userId);
    },

    get: (inquiryId, userId, userLevel) => {
        return Inquiry.getById(inquiryId, userId, userLevel);
    },

    list: (offset, count, field, keyword) => {
        return Inquiry.list(offset, count, field, keyword);
    },

    listOfMe: (id) => {
        return Inquiry.list(0, 0, 'user._id', id);
    },

    modify: (inquiryId, userId, title, contents, files) => {
        return new Promise(async (resolve, reject) => {
            try {

                if (typeof files !== 'undefined') {
                    for (let i = 0; i < files.length; i++) {
                        await Aws.copy(Config.S3_BUCKET.TEMP, Config.S3_BUCKET.FILE, files[i].key);
                    }
                }

                const rs = await Inquiry.update(inquiryId, userId, title, contents, files);
                resolve(rs);

            } catch (err) {
                reject(err);
            }
        });
    }
}
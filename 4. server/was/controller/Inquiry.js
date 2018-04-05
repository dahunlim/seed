const Inquiry = require('../service/Inquiry')
    , Aws = require('../core/AWS')
    , Config = require('../config/Constant');

module.exports = {
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
        })
}
const Inquiry = require('../model/Inquiry')
    , Config = require('../config/Constant')
    , ObjectID = require('mongodb').ObjectID;

module.exports = {

    answer: (inquiryId, writerId, writerName, contents) => {
        const filter = {_id: new ObjectID(inquiryId)};
        const update = {
            $set: {
                answer: {
                    user: {_id: writerId, name: writerName},
                    contents: contents,
                    date: new Date()
                }
            }
        };
        const options = {};
        return Inquiry.update(filter, update, options);
    },

    create: (id, name, title, contents, files) => {
        return Inquiry.schema(id, name, title, contents, files);
    },

    delete: (inquiryId, userId) => {
        const filter = {_id: new ObjectID(inquiryId), 'user._id': userId};
        return Inquiry.delete(filter);
    },

    list: (offset, count, field, keyword) => {
        const filter = {};
        if (!!!field && !!!keyword) {
            filter[field] = { $regex: keyword };
        }
        const project = {};
        const sort = {};
        return Inquiry.findMany(filter, project, offset, count, sort);
    },

    getById: (inquiryId, userId, userLevel) => {
        const filter = {_id: new ObjectID(id)};
        const project = {};

        if (userLevel === Config.USER.LEVEL.NORMAL) {
            filter['user._id'] = userId
        }

        return Inquiry.findOne(filter, project);
    },

    update: (inquiryId, userId, title, contents, files) => {
        const filter = {_id: new ObjectID(inquiryId), 'user._id': userId};
        const update = {
            $set: {
                title: title,
                contents: contents,
                files: files
            }
        }
        const options = {};

        return Inquiry.update(filter, update, options);
    }

}
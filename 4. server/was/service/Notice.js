const ObjectID = require('mongodb').ObjectID
    , NoticeModel = require('../model/Notice');

module.exports = {
    add: function (title, contents) {
        const notice = NoticeModel.schema(title, contents);
        return NoticeModel.create(notice);
    },

    get: function (notice_id) {
        const filter = {_id: new ObjectID(notice_id)};
        const project = {};
        return NoticeModel.get(filter, project);
    },

    list: function (offset, count, field, keyword) {
        const filter = {};
        if (!!!field && !!!keyword) {
            filter[field] = {$regex: keyword};
        }
        const project = {_id: 1, title: 1, date: 1};
        const sort = {date: -1};
        return NoticeModel.list(filter, project, sort);
    },

    modify: function (notice_id, title, contents) {
        const filter = {_id: new ObjectID(notice_id)};
        const update = {
            $set: {
                title: title,
                contents: contents
            }
        };
        const options = {};
        return NoticeModel.update(filter, update, options);
    },

    remove: function (notice_id) {
        const filter = {_id: new ObjectID(notice_id)};
        return NoticeModel.delete(filter);
    }
}
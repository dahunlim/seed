const ObjectID = require('mongodb').ObjectID
    , Article = require('../model/Article');

module.exports = {
    add: function (type, userId, userName, title, contents, images, files) {
        const article = Article.schema(type, userId, userName, title, contents, images, files);
        return Article.create(article);
    },

    get: function (article_id) {
        const filter = {_id: new ObjectID(article_id)};
        const update = {$inc: {count: 1}};
        const project = {_id: 1, user: 1, title: 1, contents: 1, images: 1, files: 1, count: 1, date: 1};
        return Article.findOneAndUpdate(filter, update, project);
    },

    list: function (type, offset, count, field, keyword) {
        const filter = {type: type};
        if (!!!field && !!!keyword) {
            filter[field] = {$regex: keyword};
        }
        const project = {_id: 1, user: 1, title: 1, count: 1, date: 1};
        const sort = {date: -1};
        return Article.findMany(filter, project, offset, count, sort);
    },

    modify: function (article_id, title, contents, images, files) {
        const filter = {_id: new ObjectID(article_id)};
        const update = {
            $set: {
                title: title,
                contents: contents
            }
        };
        const options = {};

        update['$set']['images'] = (typeof images !== 'undefined') ? images : [];
        update['$set']['files'] = (typeof images !== 'undefined') ? files : [];

        return Article.update(filter, update, options);
    },

    remove: function (article_id) {
        const filter = {_id: new ObjectID(article_id)};
        return Article.delete(filter);
    }
}
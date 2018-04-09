const BaseModelForMongo = require('./BaseModelForMongo')
    , Util = require('util');

function ArticleModel() {
    BaseModelForMongo.call(this, 'Articles');
    return this;
}

Util.inherits(ArticleModel, BaseModelForMongo);

ArticleModel.prototype.schema = function (type, userId, userName, title, contents, images, files) {
    const article = {
        type: type,
        user: {
            _id: userId,
            name: userName
        },
        title: title,
        contents: contents,
        count: 0,
        date: new Date()
    };

    article.images = (typeof images !== 'undefined') ? images : [];
    article.files = (typeof files !== 'undefined') ? files : [];

    return article;
}
module.exports = new ArticleModel();

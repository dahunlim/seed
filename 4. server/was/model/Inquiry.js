const BaseModelForMongo = require('./BaseModelForMongo')
    , Util = require('util');

function InquiryModel() {
    BaseModelForMongo.call(this, 'Inquiries');
    return this;
}

Util.inherits(InquiryModel, BaseModelForMongo);

InquiryModel.prototype.schema = function (id, name, title, contents, files) {

    const inquiry = {
        user: {
            _id: id,
            name: name
        },
        title: title,
        contents: contents,
        date: new Date()
    };

    if (typeof files !== 'undefined') {
        inquiry.files = files;
    }

    return inquiry;
}

module.exports = new InquiryModel();







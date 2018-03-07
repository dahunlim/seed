var DB = require('../core/Database')
    , Config = require('../common/Config')
    , BaseModel = require('./BaseModel')
    , Util = require('util');

function InquiryModel(){
    console.log('InquiryModel Constructor!');
    BaseModel.call(this, 'Inquiry');
    return this;
}
Util.inherits(InquiryModel, BaseModel);
InquiryModel.prototype.schema = function(userId, userName, title, question){
    return {
        user: {
            _id: userId,
            name: userName
        },
        title: title,
        question: question,
        date: new Date()
    }
}

module.exports = new InquiryModel();







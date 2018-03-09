var DB = require('../core/Database')
    , BaseModel = require('./BaseModel')
    , Util = require('util');

function InquiryModel(){
    BaseModel.call(this, 'Inquiry');
    return this;
}
Util.inherits(InquiryModel, BaseModel);
InquiryModel.prototype.schema = function(user_id, user_name, title, contents){
    return {
        user: {
            _id: user_id,
            name: user_name
        },
        title: title,
        contents: contents,
        date: new Date()
    }
}

module.exports = new InquiryModel();







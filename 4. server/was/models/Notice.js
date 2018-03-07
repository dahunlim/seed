var DB = require('../core/Database')
    , BaseModel = require('./BaseModel')
    , Util = require('util');

function NoticeModel(){
    console.log('NoticeModel Constructor!');
    BaseModel.call(this, 'Notice');
    return this;
}
Util.inherits(NoticeModel, BaseModel);
NoticeModel.prototype.schema = function(title, contents){
    return {
        title: title,
        contents: contents,
        date: new Date()
    }
}
module.exports = new NoticeModel();

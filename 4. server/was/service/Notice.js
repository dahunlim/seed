const NoticeModel = require('../model/Notice');

module.exports = {
    add: function(title, contents, files) {
        const notice = NoticeModel.schema(title, contents);
        return NoticeModel.create(notice);
    }
}
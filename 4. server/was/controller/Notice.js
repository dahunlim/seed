const NoticeService = require('../service/Notice');


module.exports = {
    add: function(title, contents) {
        return NoticeService.add(title, contents);
    },

    get: function(notice_id) {
        return NoticeService.get(notice_id);
    },

    list: function(offset, count, field, keyword) {
        return NoticeService.list(offset, count, field, keyword);
    },

    modify: function(notice_id, title, contents) {
        return NoticeService.modify(notice_id, title, contents);
    },

    remove: function(notice_id) {
        return NoticeService.remove(notice_id);
    }
}
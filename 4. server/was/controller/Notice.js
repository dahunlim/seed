const NoticeService = require('../service/Notice');


module.exports = {
    add: async function(title, contents, files) {
        const result = await NoticeService.add();

    }
}
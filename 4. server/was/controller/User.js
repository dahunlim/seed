const Constant = require('../config/Constant')
    , User = require('../service/User')
    , Auth = require('../core/Authentication');

module.exports = {

    create: function (id, pass, name, phone, level) {
        return User.create(id, name, pass, phone, level, Constant.USER.STATE.NORMAL);
    },

    list: function (offset, count, field, keyword) {
        return User.list(Number(offset), Number(count), field, keyword);
    },

    getUserById: function (userId) {
        return User.getUserById(userId);
    }
}
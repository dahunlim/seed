const Constant = require('../config/Constant')
    , UserService = require('../service/User')
    , Auth = require('../core/Authentication');

module.exports = {

    add: function (id, name, pass, level) {
        const salt = Auth.createSalt();
        pass = Auth.createPassword(pass, salt);
        return UserService.create(id, name, pass, salt, Number(level), Constant.USER.STATE.NORMAL);
    },

    list: function (offset, count, field, keyword) {
        return UserService.list(Number(offset), Number(count), field, keyword);
    },

    getUserById: function (userId) {
        return UserService.getUserById(userId);
    }
}
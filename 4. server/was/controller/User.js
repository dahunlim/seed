const Constant = require('../config/Constant')
    , User = require('../service/User')
    , Auth = require('../core/Authentication')
    , Response = require("../core/Response");

module.exports = {

    create: function (id, pass, name, phone, level) {
        return User.create(id, name, pass, phone, level, Constant.USER.STATE.NORMAL);
    },

    list: function (offset, count, field, keyword) {
        return User.list(Number(offset), Number(count), field, keyword);
    },

    getUserById: function (userId) {
        return User.getUserById(userId);
    },

    updateByAdmin: (userId, name, phone, level) => {
        return User.update(userId, name, phone, level);
    },

    updateByUser: (userId, name, phone, level, oldPass, newPass) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.getUserById(userId);
                if (user) {
                    if (Auth.isValidPassword(oldPass, user)) {
                        const rs = await User.update(userId, name, phone, level, newPass);
                        resolve(rs);
                    } else {
                        throw Response.get(Response.type.PASSWORD_MISMATCH, {});
                    }
                } else {
                    throw Response.get(Response.type.USER_NOT_FOUND, {});
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    remove: (userId) => {
        return User.remove(userId);
    }
}
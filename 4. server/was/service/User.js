const UserModel = require('../model/User');

module.exports = {

    create: function (id, name, pass, salt, level, state) {
        const user = UserModel.schema(id, name, pass, salt, level, state);
        return UserModel.create(user);
    },

    list: function (offset, count, field, keyword) {
        const filter = {};
        if (!!!field && !!!keyword) {
            filter[field] = { $regex: keyword };
        }
        const project = {};
        const sort = {};
        return UserModel.list(filter, project, offset, count, sort);
    },

    modify: function () {

    },

    remove: function (user_id) {
        const filter = { _id: user_id };
        return UserModel.delete(filter);
    },


    getUserById: function (userId) {
        const filter = {_id: userId};
        const project = {};
        return UserModel.get(filter, project);
    },

    resetTryHistory: function (userId) {

    }
}
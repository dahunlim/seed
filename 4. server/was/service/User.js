const User = require('../model/User')
    , Auth = require('../core/Authentication');

module.exports = {

    create: function (id, pass, name, phone, level, state) {
        const salt = Auth.createSalt();
        const authPass = Auth.createPassword(pass, salt);
        const user = User.schema(id, authPass, name, phone, salt, level, state);
        return User.create(user);
    },



    list: function (offset, count, field, keyword) {
        const filter = {};
        if (!!!field && !!!keyword) {
            filter[field] = { $regex: keyword };
        }
        const project = {};
        const sort = {};
        return User.findMany(filter, project, offset, count, sort);
    },

    isExist: async function(id) {
        const filter = {_id: id};
        return new Promise((resolve, reject) => {
            try {
                const count = User.count(filter)
                resolve((count > 0) ? true : false);
            } catch (err) {
                reject();
            }
        });
    },

    addTryHistory: function(userId) {
        const filter = {_id: userId};
        const update = {$set: {tdate: Date.now()}, $inc: {tcnt: 1}};
        const options = {};
        return User.update(filter, update, options);
    },

    resetTryHistory: function(userId) {
        const filter = {_id: userId};
        const update = {$set: {tdate: 0, tcnt: 0}};
        const options = {};
        return User.update(filter, update, options);
    },

    remove: function (id) {
        const filter = { _id: id };
        return User.delete(filter);
    },

    getUserById: function (id) {
        const filter = {_id: id};
        const project = {};
        return User.findOne(filter, project);
    }
}
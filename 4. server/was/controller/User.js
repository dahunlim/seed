const UserService = require('../services/User');

module.exports = {
    getUserById: function (userId) {
        return UserService.getUserById(userId);
    }
}
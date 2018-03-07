const userModel = require('../models/User');

module.exports = {
    getUserById: function(userId){
        return function()
        const filter = { _id: userId };
        const project = {};
        return userModel.get(filter, project);
    }
}
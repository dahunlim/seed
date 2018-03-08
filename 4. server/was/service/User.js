const userModel = require('../models/User');

module.exports = {
    getUserById: function(userId){
        const filter = { _id: userId };
        const project = {};
        return userModel.get(filter, project);
    },

    resetTryHistory: function(userId){

    }
}
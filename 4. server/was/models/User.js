var DB = require('../core/Database')
    , BaseModel = require('./BaseModel')
    , Util = require('util')
    , Config = require('../common/Config');

function UserModel(){
    console.log('UserModel Constructor!');
    BaseModel.call(this, 'User');
    return this;
}
Util.inherits(UserModel, BaseModel);
UserModel.prototype.schema = function(id, name, pass, salt, level, state){
    var user = {
        _id: id,
        name: name,
        pass: pass,
        salt: salt,
        level: Number(level),
        state: Number(state),
        stamp: {},
        exchanges: [],
        date: new Date(),
        vcode: 0,
        vdate: null,
        tcnt: 0,
        tdate: null
    };
    return user;
}

module.exports = new UserModel();







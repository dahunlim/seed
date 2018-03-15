var DB = require('../core/Database')
    , BaseModel = require('./BaseModel')
    , Util = require('util');

function UserModel(){
    BaseModel.call(this, 'User');
    return this;
}
Util.inherits(UserModel, BaseModel);
UserModel.prototype.schema = function(id, name, pass, salt, level, state){
    const user = {
        _id: id,
        name: name,
        pass: pass,
        salt: salt,
        level: level,
        state: state,
        vcode: 0,
        vdate: null,
        tcnt: 0,
        tdate: null,
        date: new Date()
    };
    return user;
};

module.exports = new UserModel();







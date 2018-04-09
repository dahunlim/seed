const BaseModelForMongo = require('./BaseModelForMongo')
    , Util = require('util');

function UserModel(){
    BaseModelForMongo.call(this, 'Users');
    return this;
}
Util.inherits(UserModel, BaseModelForMongo);
UserModel.prototype.schema = function(id, pass, name, phone, salt, level, state){
    const user = {
        _id: id,
        pass: pass,
        salt: salt,
        name: name,
        phone: phone,
        level: Number(level),
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

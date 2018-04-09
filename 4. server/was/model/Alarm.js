const BaseModelForMongo = require('./BaseModelForMongo')
    , Util = require('util');

function AlarmModel() {
    BaseModelForMongo.call(this, 'Alarms');
    return this;
}

Util.inherits(AlarmModel, BaseModelForMongo);

AlarmModel.prototype.schema = function (user_id, message, target_id, type) {
    const alarm = {
        _u: user_id,
        _t: target_id,
        type: type,
        msg: message,
        read: false,
        date: new Date()
    };
    return alarm;
}
module.exports = new AlarmModel();

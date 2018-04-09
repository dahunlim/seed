const Alarm = require('../model/Alarm')
    , ObjectID = require('mongodb').ObjectID;

module.exports = {
    add: (user_id, message, target_id, type) => {
        target_id = new ObjectID(target_id);
        const alarm = Alarm.schema(user_id, message, target_id, type);
        return Alarm.create(alarm);
    },

    list: (user_id, offset, count) => {
        const filter = {_u: user_id};
        const project = {_t: 1, type: 1, msg: 1, read: 1, date: 1};
        const sort = {date: -1};
        return Alarm.findMany(filter, project, offset, count, sort);
    },

    read: (user_id, alarm_id) => {
        const filter = {_id: new ObjectID(alarm_id), _u: user_id};
        const update = {$set: {read: true}};
        const options = {};
        return Alarm.update(filter, update, options);
    }
}
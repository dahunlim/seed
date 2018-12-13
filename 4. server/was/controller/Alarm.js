const Alarm = require('../service/Alarm');

module.exports = {

    add: (user_id, message, target_id, type) => {
        return Alarm.add(user_id, message, target_id, type);
    },

    list: (user_id, offset, count) => {
        return Alarm.list(user_id, offset, count);
    },

    read: (user_id, alarm_id) => {
        return Alarm.read(user_id, alarm_id);
    }
}
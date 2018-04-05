module.exports = {

    initialize: function(db){

    },

    create: function (req, user) {
        return new Promise((resolve, reject) => {
            req.session.userId = user._id;
            req.session.userName = user.name;
            req.session.userState = user.state;
            req.session.userLevel = user.level;
            req.session.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    },

    /**
     * get session value
     * @param req
     * @param key
     * @returns {null}
     */
    get: function (req, key) {
        return (typeof req.session[key] === 'undefined') ? null : req.session[key];
    },

    /**
     * remove session
     * @param req
     */
    remove: function (req) {
        return new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    set: function (req, key, value) {
        req.session[key] = value;
        req.session.save();
    }
};
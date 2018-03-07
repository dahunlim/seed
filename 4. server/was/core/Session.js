module.exports = {

    /**
     * craete session
     * @param req req object
     * @param user user object
     */
    create: function(req, user){
        req.session.userId                  = user._id;
        req.session.userName                = user.name;
        req.session.userState               = user.state;
        req.session.userLevel               = user.level;
        req.session.login_try_count         = 0;
        req.session.login_failed_count      = 0;
        req.session.save();
    },

    /**
     * set session value
     * @param req req object
     * @param key key
     * @param value value
     */
    set: function(req, key, value){
        req.session[key] = value;
        req.session.save();
    },

    /**
     * get session value
     * @param req
     * @param key
     * @returns {null}
     */
    get: function(req, key){
        return (typeof req.session[key] === 'undefined')? null: req.session[key];
    },

    /**
     * remove session
     * @param req
     */
    remove: function(req){ req.session.destroy(); }

};
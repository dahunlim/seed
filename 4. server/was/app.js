const app = require('express')()
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session)
    , fs = require('fs')
    , Constant = require('./config/Constant.js')
    , Handler = require('./middleware/Handler')
    , Response = require('./core/Response');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Session Set
 */
app.use(
    session({
        secret: Constant.SESSION.SECRET,
        cookie: {
            maxAge: Constant.SESSION.MAX_AGE,
            httpOnly: true,
            secure: false
        },
        store: new MongoStore({
            url: "mongodb://" + Constant.DATABASE.USER_ID + ":" + Constant.DATABASE.USER_PASS.replace('@', '%40') + "@" + Constant.DATABASE.HOST + ":" + Constant.DATABASE.PORT + "/" + Constant.DATABASE.NAME,
            ttl: Constant.SESSION.TTL,
            collection: Constant.SESSION.COLLECTION
        }),
        resave: false,
        saveUninitialized: false
    })
);

/**
 * Route Init
 */
const files = fs.readdirSync('route');
files.forEach(file => {
    const fileNameArr = file.split('.');
    app.use('/' + fileNameArr[0].toLowerCase(), require('./route/' + file));
});

/**
 * Cross-Domain Request Settings
 */
app.use(Handler.response());

/**
 * Not support protocol.
 */
app.use(function(req, res, next) {
    next(Response.type.NOT_SUPPORT);
});

/**
 * Error handler
 */
app.use(Handler.error());
module.exports = app;
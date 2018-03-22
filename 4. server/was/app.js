const app = require('express')()
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session)
    , fs = require('fs')
    , Constant = require('./config/Constant.js')
    , ErrorHandler = require('./core/Error');

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
 * Cors Settings
 */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

var files = fs.readdirSync('route');
for(var i = 0; i < files.length; i++){
    var fileNameArr = files[i].split('.');
    app.use('/' + fileNameArr[0].toLowerCase(), require('./route/' + files[i]));
}


if(fs.existsSync('./tasks')){
    var tasks = fs.readdirSync('task');
    for(var i = 0; i < tasks.length; i++){
        require('./task/' + tasks[i])();
    }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    next(err);
});

app.use(ErrorHandler);

module.exports = app;
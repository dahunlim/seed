var MongoClient = require('mongodb').MongoClient
    , MySQL = require('mysql')
    , Config = require('../config/Constant.js');

module.exports = {
    conn: {},
    initialize: async function() {
        const connectFunc = [];
        connectFunc.push(
            new Promise((resolve, reject) => {
                MongoClient.connect(
                    "mongodb://" + Config.DATABASE.HOST + ":" + Config.DATABASE.PORT + "/" + Config.DATABASE.NAME,
                    {
                        auth: {
                            user: Config.DATABASE.USER_ID,
                            password: Config.DATABASE.USER_PASS
                        },
                        poolSize: Config.DATABASE.POOL_SIZE
                    },
                    function (err, client) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log('Create MongoDB Connection');
                            resolve(client.db(Config.DATABASE.NAME));
                        }
                    });
            })
        );
        connectFunc.push(
            new Promise((resolve, reject) =>
                MySQL.createConnection({
                    host: Config.SMS_DATABASE.HOST,
                    user: Config.SMS_DATABASE.USER_ID,
                    password: Config.SMS_DATABASE.USER_PASS,
                    database: Config.SMS_DATABASE.NAME
                })
            )
        );

        try {
            const databases = await Promise.all(connectFunc);
            this.conn = {
                application: databases[0],
                sms: databases[1]
            }
        } catch (err) {
            console.error('Failed to initialize database!', err);
        }
    }
};


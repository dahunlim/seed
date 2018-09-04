const MongoClient = require('mongodb').MongoClient
    , MySQL = require('mysql')
    , Config = require('../config/Constant');

module.exports = {
    conn: {},
    initialize: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const mongoClient = await MongoClient.connect(
                    `mongodb://${Config.DATABASE.HOST}:${Config.DATABASE.PORT}/${Config.DATABASE.NAME}`,
                    {
                        auth: {
                            user: Config.DATABASE.USER_ID,
                            password: Config.DATABASE.USER_PASS
                        },
                        poolSize: Config.DATABASE.POOL_SIZE,
                        useNewUrlParser: true
                    });

                const mysqlClient = MySQL.createPool({
                    connectionLimit: Config.SMS_DATABASE.POOL_SIZE,
                    host: Config.SMS_DATABASE.HOST,
                    user: Config.SMS_DATABASE.USER_ID,
                    password: Config.SMS_DATABASE.USER_PASS,
                    database: Config.SMS_DATABASE.NAME
                });

                resolve({
                    application: mongoClient.db(Config.DATABASE.NAME),
                    sms: mysqlClient
                });
            } catch (err) {
                reject(err);
            }
        })
    }
};


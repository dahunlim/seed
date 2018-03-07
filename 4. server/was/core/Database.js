var MongoClient  = require('mongodb').MongoClient
    , Q = require('q')
    , MySQL = require('mysql')
    , Code = require('../core/Response').code
    , Config = require('../common/Config.js')
    , APPLICATION_DB = null
    , SMS_DB = null;

module.exports = {

    transaction: function(callback){
        var deferred = Q.defer();
        if (!APPLICATION_DB) {
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
                        deferred.reject({code: Code.FAILED_GET_DB, data: err});
                    } else {
                        APPLICATION_DB = client.db(Config.DATABASE.NAME);
                        callback(APPLICATION_DB, deferred);
                    }
                });
        }else{
            callback(APPLICATION_DB, deferred);
        }
        return deferred.promise;
    },

    mysqlTransaction: function(callback){
        var deferred = Q.defer();
        if (!SMS_DB) {
            var connection = MySQL.createConnection({
                host: Config.SMS_DATABASE.HOST,
                user: Config.SMS_DATABASE.USER_ID,
                password: Config.SMS_DATABASE.USER_PASS,
                database: Config.SMS_DATABASE.NAME
            });
            connection.connect(function(err){
                if(err){
                    deferred.reject({code: Code.FAILED_GET_DB, data: err});
                }else{
                    SMS_DB = connection;
                    callback(SMS_DB, deferred);
                }
            });
        }else{
            callback(SMS_DB, deferred);
        }
        return deferred.promise;
    }
};


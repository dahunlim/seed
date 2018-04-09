const DB = require('../core/Database')
    , Response = require('../core/Response');

const BaseModelForMySql = function (table){
    this.table = table;
}
BaseModelForMySql.prototype = {

    create: function(object){
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                conn = await DB.conn.sms.getConnection();
                const query = 'INSERT INTO ' + this.table + ' SET ?';
                conn.query(query, object, (err, results, fields) => {
                    if (err) {
                        reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                    } else {
                        resolve(results);
                    }
                });
            } catch (err) {
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    },

    count: function(field, value) {
        return new Promise(async (resolve, reject) => {
            let conn = null;
            try {
                conn = await DB.conn.sms.getConnection();
                const query = 'SELECT COUNT(*) AS count FROM ' + this.table + ' WHERE ' + field + ' = ?';
                conn.query(query, [value], (err, results, fields) => {
                    if (err) {
                        reject(Response.get(Response.type.DATABASE_ERROR, err.message));
                    } else {
                        resolve(results[0].count)
                    }
                });
            } catch (err) {
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            } finally {
                if (conn != null) {
                    conn.release();
                }
            }
        });
    }
};

module.exports = BaseModelForMySql;
const DB = require('../core/Database')
    , Response = require('../core/Response');

const BaseModelForMongo = function (collection){
    this.collectionName = collection;
}
BaseModelForMongo.prototype = {

    count: function(filter){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).count(filter);
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    create: function(object){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).insertOne(object);
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    findOne: function(filter, project){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).find(filter).limit(1).project(project).next();
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    findOneAndUpdate: function(filter, update, project) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    projection: project
                };
                const rs = await DB.conn.application.collection(this.collectionName).findOneAndUpdate(filter, update, options);
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    findMany: function(filter, project, offset, count, sort){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).find(filter).sort(sort).project(project).skip(Number(offset)).limit(Number(count)).toArray();
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    update: function(filter, update, options){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).updateOne(filter, update, options);
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    delete: function(filter){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).deleteOne(filter);
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    },

    deleteMany: function(filter){
        return new Promise(async (resolve, reject) => {
            try {
                const rs = await DB.conn.application.collection(this.collectionName).deleteMany(filter);
                resolve(rs);
            } catch (err) {
                reject(Response.get(Response.type.DATABASE_ERROR, err.message));
            }
        });
    }
};

module.exports = BaseModelForMongo;
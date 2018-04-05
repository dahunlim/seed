const DB = require('../core/Database');

const BaseModel = function (collection){
    this.collectionName = collection;
}
BaseModel.prototype = {

    count: function(filter){
        return DB.conn.application.collection(this.collectionName).count(filter);
    },

    create: function(object){
        return DB.conn.application.collection(this.collectionName).insertOne(object);
    },

    findOne: function(filter, project){
        return DB.conn.application.collection(this.collectionName).find(filter).limit(1).project(project).next();
    },

    findMany: function(filter, project, offset, count, sort){
        return DB.conn.application.collection(this.collectionName).find(filter).sort(sort).project(project).skip(Number(offset)).limit(Number(count)).toArray();
    },

    update: function(filter, update, options){
        return DB.conn.application.collection(this.collectionName).updateOne(filter, update, options);
    },

    delete: function(filter){
        return DB.conn.application.collection(this.collectionName).deleteOne(filter);
    },

    deleteMany: function(filter){
        return DB.conn.application.collection(this.collectionName).deleteMany(filter);
    }
}

module.exports = BaseModel;
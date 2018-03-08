var DB = require('../core/Database');

var BaseModel = function (collection){
    console.log('BaseModel Constructor! with' + collection);
    this.collectionName = collection;
}
BaseModel.prototype = {
    count: function(filter){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).count(filter, function(err, count){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(count);
                }
            });
        });
    },
    create: function(object){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).insertOne(object, function(err, rs){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(rs);
                }
            });
        });
    },
    get: function(filter, project){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).find(filter).project(project).next(function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        });
    },

    aggregate: function(pipe){
        var _this = this;
        return DB.transaction(function(conn, deferred) {
            conn.collection(_this.collectionName).aggregate(pipe).toArray(function (err, docs) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                }
            });
        });
    },

    list: function(filter, project, offset, count, sort){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).find(filter).sort(sort).project(project).skip(Number(offset)).limit(Number(count)).toArray(function(err, docs){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(docs);
                }
            });
        });
    },
    update: function(filter, update, options){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).updateOne(filter, update, options, function(err, rs){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(rs);
                }
            });
        });
    },
    delete: function(filter){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).deleteOne(filter, function(err, rs){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(rs);
                }
            });
        });
    },
    deleteMany: function(filter){
        var _this = this;
        return DB.transaction(function(conn, deferred){
            conn.collection(_this.collectionName).deleteMany(filter, function(err, rs){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(rs);
                }
            });
        });
    }
}

module.exports = BaseModel;
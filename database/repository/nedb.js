module.exports = function (nedbOptions) {
    var Datastore = require('nedb');
    db = {};
    db.uploads = new Datastore(nedbOptions.dbPath);
    db.uploads.loadDatabase();
    
    module.AddObject = function(obj, callback)
    {
        db.uploads.find(obj,function(err, docs){
            if(docs.length < 1){
                var insert = db.uploads.insert(obj, function(err,newDoc){
                    callback(err,newDoc);
                });
            }
        });
    };

    module.ListObjects = function(filter, callback){    
        return db.uploads.find(filter).sort( { timestamp: -1 } ).limit(10).exec(function (err, docs) {
            callback(err,docs);
        });
    };
    return module;
};
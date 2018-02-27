module.exports.Core = function(http){
    var database = require('./gundb.js')(http);
    var suscribeToCollection = function(key, callback){
        database.Suscribe(key, callback);
    }
    var add = function(key, object, callback){
        database.Add(key, object, callback);
    }
};
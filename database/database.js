module.exports = function (http, io) {
    //database configs
    var gunOptions = {
        file: './database/data.db',
        //peers: ['http://192.168.1.130:8080/gun','http://192.168.1.131:80/gun'],
        web: http
    }
    var nedbOptions = {
        dbPath: './database/uploads.db'
    }

    var gundb = require('./repository/gundb.js')(http, gunOptions);
    var nedb = require('./repository/nedb.js')(nedbOptions);

    gundb.Suscribe(AddEvent);

    module.AddObj = function(obj){
        gundb.AddObject(obj, function(ack){
            console.log('Added');
        });
    }

    module.ListObj = function(filter, callback){
        nedb.ListObjects(filter, function(err, docs){
            if(err == null)
                callback(docs);
            else
                console.log('Error: ' + err);
        });
    }

    function AddEvent(data)
    {
        nedb.AddObject(data, function(err,newDoc){
            if(err == null)
                io.sockets.emit('new', newDoc);
            else
                console.error('Error: ' + err);
        });
    }

    return module;
};
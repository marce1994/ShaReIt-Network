module.exports = function (http, io) {
    //database configs
    var gunOptions = {
        file: './database/data.db',
        peers: ['https://shareit-network.herokuapp.com:443/gun','http://shareit-network.ddns.net:8080/gun','http://shareit.network/gun'],
        web: http
    }

    var nedbOptions = {
        dbPath: './database/uploads.db'
    }

    var gundb = require('./repository/gundb.js')(http, gunOptions);
    var nedb = require('./repository/nedb.js')(nedbOptions);
    var fs = require('fs');
    /*var client = require('webtorrent-hybrid')({
        maxConns: 450,        // Max number of connections per torrent (default=55)
        //nodeId: String|Buffer,   // DHT protocol node ID (default=randomly generated)
        //peerId: String|Buffer,   // Wire protocol peer ID (default=randomly generated)
        tracker: true, // Enable trackers (default=true), or options object for Tracker
        //dht: true,     // Enable DHT (default=true), or options object for DHT
        webSeeds: true        // Enable BEP19 web seeds (default=true)
      });*/

    gundb.Suscribe(AddEvent);
    
    module.AddObj = function(obj){
        gundb.AddObject(obj.magnet,obj, function(ack){
            console.log('Added');
        });
        //handleTorrentAsync(obj.magnet);
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

        // Begin to donwload the torrent and share it....
        // This will be then configured from app.config or something like that
    }
   /* function handleTorrentAsync(magnet){
        var torrent = client.add(magnet)
    }*/
    // torrent client config
    /*client.on('error', function (err) {
        console.log(err);
    })
    client.on('torrent', function (torrent) {
        console.log('Torrent added');
    })*/

    return module;
};

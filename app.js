//CORE
//---------------------------------------------------
/*const cluster = require('cluster');
const numCPUs = require('os').cpus().length;*/
//steemit
var steem = require('steem');
//---------------------------------------------------
var express = require("express");
var app = express();

var webrouter = require('./web/router.js');
app.use(webrouter);

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var database = require('./database/database.js')(http, io);

InitialiseSocketIO();


/*if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {*/
//Application run

/*
Lista de categorías
Búsqueda y filtrado
*/
var port = process.env.PORT || 80;
http.listen(port);
console.log(`Worker ${process.pid} started and listening on port ${port}`);
//}



function InitialiseSocketIO(){
  io.on('connection', function (client) {
    client.emit('message', 'hello :)');
  
    console.log('Cliente conectado');
  
    database.ListObj({}, function (docs) {
      console.log(docs.length);
      for (var i = docs.length - 1; i >= 0; i--) {
        client.emit('new', docs[i]);
      }
    });
  
    client.on('message', function (data) {
      console.log(data);
    });
  
    client.on('add', function (data) {
      try {
        console.log(data);
        database.AddObj(data);
      } catch (error) {
        client.emit("message", error);
      }
    });
  });
}

/*
function getSteemitPost(author, permlink, callback){
  var obj = {};
  steem.api.getContent(author, permlink, function(err, result) {
    if(err){
      obj.err = err;
      console.log(err);
    }
    else{
      obj.title = result.title;
    }
    console.log(err, result);
  });
}

function getSteemitPostComments(author, permlink, callback){
  steem.api.getContentReplies(author, permlink, function(err, result) {
    console.log(err, result);
  });
}*/

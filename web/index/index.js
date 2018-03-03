function indexViewModel() {
    var self = {};
    self.latestUploads = ko.observableArray([]);
    self.newObj = ko.observable();
    // torrent variables
    self.fileNames = ko.observableArray();

    self.title = ko.observable();
    self.description = ko.observable();
    self.img = ko.observable();
    self.tags = ko.observableArray();
    self.magnetLink = ko.observable();

    self.seeding = ko.observable(false);
    self.torrent = ko.observable();

    self.uploadSpeed = ko.observable();
    self.downloadSpeed = ko.observable();
    self.peerCount = ko.observable();

    return self;
};

var viewModel;
var fileInput;
$(document).ready(function () {
    shareit.social.configure('pablobianco','Put your password here');    
    viewModel = indexViewModel();
    /*viewModel.newObj({
        title: 'OVERLORD II',
        description: 'Yggdrasil es un popular juego online que, de la noche a la mañana, cierra sus puertas. Sin embargo, Momonga, nuestro protagonista, decide no desconectarse, por lo que es transformado en la imagen de un esqueleto conocido como el mago más poderoso. Mientras el mundo de Yggdrasil comienza a cambiar, con los PNJs adquiriendo sentimientos, Momonga decide convertirse en el amo y señor de esa realidad.',
        image: 'http://cdn.jkanime.net/assets/images/animes/image/overlord-ii.jpg',
        magnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel',
        steemitposturi: 'https://steemit.com/anime/@pablobianco/shareit-network',
    });*/
    fileInput = $('input:file[name=upload]');
    fileInput.on('change',function(){
        if(fileInput[0].files.length > 0){
            viewModel.fileNames([]);
            for (var index = 0; index < fileInput[0].files.length; index++) {
                var element = fileInput[0].files[index];
                viewModel.fileNames.push(element.name);
            }
        }else{
            console.log("debe seleccionar archivos");
        }
    });
    ko.applyBindings(viewModel);
    //test();
    //createContent(null,null,null,null,null);
});

var socket = io.connect();

socket.on('messages', function (data) {
    console.log(data);
});

socket.on('new', function (data) {
    var exists = false;
    viewModel.latestUploads().forEach(element => {
        if (element.timestamp == data.timestamp) exists = true;
    });
    if (!exists) {
        /*if (data.fillfromsteem == true) {
            fillPostFromSteem(data, function (res) {
                viewModel.latestUploads.unshift(res);
            });
        }
        else {*/
            viewModel.latestUploads.unshift(data);
        //}
    }
    console.log(data);
});

function AddObject() {
    socket.emit('add', viewModel.newObj());
}

function sendPost(obj) {
    socket.emit('add', obj);
    //verifi post exists.
    /*steem.api.getContent(obj.author, obj.permlink, function (err, result) {
        if (err == null) {
            console.log("Account and post exists");
            obj.title = result.title;
            obj.description = result.body;
            obj.author = result.author;
            obj.permlink = result.permlink;
            obj.fillfromsteem = true;

            socket.emit('add', obj);
        }
        else
            console.log(err);
    });*/
}

//fill the data from steem
/*function fillPostFromSteem(obj, callback) {
    steem.api.getContent(obj.author, obj.permlink, function (err, result) {
        //exists
        if (err == null && result.id != 0) {
            var post = obj;
            post.title = result.title;
            post.description = result.body;
            post.author_reputation = steem.formatter.reputation(result.reputation);
            post.votes = result.active_votes.length;
            callback(obj);
        }
        else {
            console.log(err);
        }
    });
}*/

function createContent(title, body, files, image, tags){
    var objBackend = {};
    if(!shareit.torrent.webTorrentSupported()){
        alert('Sorry :( \n webtorrent is not supported. Please Chrome, Firefox or another browser.');
    }else{
        // Verify if user is logged
        if(!shareit.social.authenticated()){
            alert('Please log in first :)!');            
            return;
        }
        console.log(files);
        // Try to create torrent
        shareit.torrent.seedFiles(files, function(updateInfo){
            console.log(updateInfo);
        }, function(torrent){
            console.log(torrent);
            // Create the post
            shareit.social.post(title,body,tags, function(err, result){
                console.log(err, result);
                //Set post data
                objBackend.author = result.author;
                objBackend.title = result.title;
                objBackend.description = result.body;
                objBackend.permlink = result.permlink;
                objBackend.json_metadata = JSON.stringify(result.json_metadata);
                objBackend.image = image;
                //Set torrent data
                objBackend.magnet = torrent.magnet;
                console.log(objBackend);
                sendPost(objBackend);
            });
            // Send data to server    
        });
    }
}

//{privkey:keytovote, user:user that vote, author:owner of post, permlink:post link}
function vote(author, permlink) {
    steem.broadcast.vote(user.votekey, user.username, author, permlink, 1000, function (err, result) {
        console.log(err, result);
        if (err == null && result.id != 0)
            alert("Voted successfully on" + permlink);
        else
            alert("Voted failed on" + permlink + err);
    });
}

function test() {
    //fillPostFromSteem({permlink:"shareit-network", author:"pablobianco"});
    //var random = Math.floor((Math.random() * 100000) + 1);
    /*steem.api.getContent('pablobianco', 'overlord-ii', function (err, result) {
        console.log(err, result);
    });*/

    //sendPost({permlink:"overlord-ii"/*+random*/,author:"pablobianco",magnet:"magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel", image:"http://cdn.jkanime.net/assets/images/animes/image/overlord-ii.jpg"});
    //vote();
    /*console.log(steem.auth.isWif("key"));
    console.log(steem.auth.wifToPublic("key"));
    var password = steem.formatter.createSuggestedPassword();
    console.log(password);*/
}

$(function () {
    $('[data-toggle="offcanvas"]').on('click', function() {
        $('.offcanvas-collapse').toggleClass('open');
    });
});
  
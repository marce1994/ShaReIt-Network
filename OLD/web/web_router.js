var express = require("express");
var path = require('path');
var api = require('./web_api/api.js');

var router = express.Router();

//declaro para usar la api :)
router.use("/webapi", api);
//la carpeta publica general
router.use("/public", express.static(path.join(__dirname, 'public')));

//web index
var home = "./views/index";
router.use("/public/home", express.static(path.join(__dirname, home)));
router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, home + "/index.html"));
});

//upload a file
var upload = "./views/upload";
router.use("/public/upload", express.static(path.join(__dirname, upload)));
router.get("/upload", function(req, res){
    res.sendFile(path.join(__dirname, upload + "/index.html"));
});

//web player
var play = "./views/play";
router.use("/public/player", express.static(path.join(__dirname, play)));
router.get("/play", function(req, res){
    res.sendFile(path.join(__dirname, play + "/index.html"));
});

module.exports = router;
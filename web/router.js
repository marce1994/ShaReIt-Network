var express = require("express");
var path = require('path');

var router = express.Router();
//la carpeta publica general
router.use("/public", express.static(path.join(__dirname, 'public')));
router.use("/public", express.static(path.join(__dirname, 'index')));

//web index
router.use("/index", express.static(path.join(__dirname, "index")));
router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index/index.html"));
});

//upload a file
/*var upload = "./views/upload";
router.use("/public/upload", express.static(path.join(__dirname, upload)));
router.get("/upload", function(req, res){
    res.sendFile(path.join(__dirname, upload + "/index.html"));
});*/

//web player
/*var play = "./views/play";
router.use("/public/player", express.static(path.join(__dirname, play)));
router.get("/play", function(req, res){
    res.sendFile(path.join(__dirname, play + "/index.html"));
});*/

module.exports = router;
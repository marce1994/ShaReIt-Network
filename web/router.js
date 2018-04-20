var express = require("express");
var path = require('path');

var router = express.Router();
//la carpeta publica general
router.use("/favicon.ico", express.static(path.join(__dirname, 'public\img\favicon.ico')));
router.use("/public", express.static(path.join(__dirname, 'public')));
router.use("/public", express.static(path.join(__dirname, 'index')));
router.use("/public/css", express.static(path.join(__dirname, 'css')));

//web index
router.use("/index", express.static(path.join(__dirname, "index")));
router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/landing-page/index.html"));
});

router.get("/anime", function(req, res){
    res.sendFile(path.join(__dirname, "index/index.html"));
});

module.exports = router;
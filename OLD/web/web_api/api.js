var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');

var uploadRepository = require("./uploads_repository")();

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
router.use(bodyParser.json({ extended: false, limit: '50mb' }));

router.get("/lastestuploads", function(req, res){
    uploadRepository.listUploads({}, req.query.page, req.query.numxpage, function(obj){
        if(obj.err == null){
            obj.pages = Math.ceil(obj.count/req.query.numxpage);
            obj.currentPage = req.query.page;
        }else{
            var obj = {};
            obj.error = err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(obj));        
    });
});

router.post('/upload', function(req, res) {
    var Obj = {
        title : req.body.title,
        description : req.body.description,
        img : req.body.img,
        tags : req.body.tags,
        magnet : req.body.magnet,
    };
    uploadRepository.addUpload(Obj);
    res.send("todo ok wacha");
});

module.exports = router;
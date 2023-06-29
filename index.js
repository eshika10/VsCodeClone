var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir(`./uploads`,{withFileTypes:"true"},function(err,files){
    res.render('index',{files:files});
  });
 
});

router.get("/file/:fileName",function(req,res,next){
  fs.readdir(`./uploads`,{withFileTypes:"true"},function(err,files){
    fs.readFile(`./uploads/${req.params.fileName}`,"utf-8",function(err,data){
      res.render('opened',{files:files,filename:req.params.fileName,filedata:data});
    });
    
  });
 
});

router.post("/filechange/:fileName",function(req,res,next){
     fs.writeFile(`./uploads/${req.params.fileName}`,req.body.filedata,function(err){
          res.redirect("back");
     });
});

router.get('/fileCreate', function(req, res, next) {
     fs.writeFile(`./uploads/${req.query.fileName}`,"",function(err){
          if(err) res.send(err);
          else res.redirect("back");
     });
});

router.get('/folderCreate', function(req, res, next) {
    fs.mkdir(`./uploads/${req.query.folderName}`,function(err){
          if(err) res.send(err);
          else res.redirect("back");
    });
});

module.exports = router;

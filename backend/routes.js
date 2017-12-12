
var backend = require('./controller.js');
var router = require('express').Router();
var path = require('path');
var multer  = require('multer');
var passport = require('passport');

// creating the simple storage based on multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
          console.log("",path.parse(file.originalname).ext);
        cb(null, file.fieldname+Date.now()+path.parse(file.originalname).ext)
    }
  })
 

  var upload = multer({ storage: storage });



router.get('/hel', backend.hel);
router.get("/user/all", backend.allUser);


// priority 2 ==> Login logout @params Maintaied by req.session
router.post("/user/login",  backend.login);
router.post("/user/logout",  backend.logout);


router.post("/user/register",  backend.registerUser);
// priority 1 ==> User Can create Post  
// priority 3 ==> Upload images
router.post("/user/createPost",upload.any(), backend.userCreatePost);


// priority 4 ==> simple search for posts
router.post("/user/posts/comment", backend.commentPost);
// priority 5 ==> simple search for 
router.get("/user/posts/search", backend.search);




router.get("/user/posts/all", backend.allposts);



/*  */
module.exports = router;

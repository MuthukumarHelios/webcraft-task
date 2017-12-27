
log = console.log;


var { red, blue, green } = require('chalk');
var { user } = require('../models/users.js');
var { post } = require('../models/posts.js');

function responseSuccess(data, res) {
    var obj = {};
     obj.error = false;
     obj.data = data;
    res.json(obj);
}

function responseFail(data, res) {
    var obj = {};
     obj.error = true;
     obj.data = data;
     res.json(obj);
}


var bcrypt = require('bcrypt');

exports.hel = (req, res) => {
    log(blue("hello"));
    res.json("Hello world");
};


exports.allUser = (req, res) => {

    log(req.session);
    user.findOne({}).then(value => {
        responseSuccess(value,res);
    }).catch(er =>
    {
        responseFail(er.message, res);
    })
}


exports.allposts = (req,res) => {
    post.find({}).then(value => {
        res.json(value);
    }).catch(er => {
        res.json(er.message);
    })
}
exports.add = (i , j) => {
  return i+j;
};


exports.registerUser = (req, res) => {


// return false;
    var dbdata = {
        name: req.body.name,
        email: req.body.email
    };


    var p = new Promise((resolve, reject) => {

        bcrypt.hash(req.body.password, 10).then(hash => {
            return hash;
        }).then(hashvalue => {
            dbdata.password = hashvalue;
            user.create(dbdata).then(val => {
                return resolve(val);
            }).catch(err => {
                return reject(err.message);
            })
        }).catch(er => {
            return reject(er.message);
        })
    });


    // @resolving promiess
    p.then(value => {
        log("success",req.body);
       responseSuccess(value, res);

    }).catch(er => {
        log("success",req.body);
      responseFail(value, res);
    });

};

exports.login = (req, res) => {
    log("login api");
    log(req.body);


  var p =   new Promise((resolve,reject) => {
        user.findOne({email: req.body.email}).then(result => {
               if(!result) {
                   return reject("Kindly enter a valid User name")
                }else{

                    req.session["_id"] = result._id;
                    log("result",result);
                   return result;

                }
        }).then(password => {
            log(password);
            bcrypt.compare(req.body.password, password.password).then(result => {
                if (result) {
                    resolve("logged in successfully");
                } else {
                    reject("kindly provide a valid user name and password");
                }
                console.log(result);
            })
        }).catch(er => {

           log("error handler from bk", er.stack);
            return reject(er.message);
        })

        // resolving promises

    });


    p.then(value => {
        responseSuccess(value, res);
    }).catch(er => {
        log("error",er);
        responseFail(er, res);
    })
};

exports.logout = (req, res) => {
    req.session = null;
       responseSuccess("SuccessFully Looged Out", res);
 }


exports.userCreatePost = (req, res) => {

    log(req.files);
    var files_chunk = [];

    if(req.files){
        req.files.map(v => {
            files_chunk.push(v.path);
        })
    }
    else{
         log("upload a file")
    }

var dbdata = {};
dbdata.title = req.body.title;
dbdata.body = req.body.body;
dbdata.images = files_chunk;
dbdata.user_id = req.session._id;
post.create(dbdata).then(value => {
    responseSuccess(value, res);
    //    res.json(value);
}).catch(er => {
    responseFail(er.message, res);
        // res.json(er)
    log(er.message)
})
       log("chunk storeage",files_chunk);
    // res.json("testee")
    log('creating a post ');
}



exports.commentPost = (req, res) => {

    post.update({_id: req.body.id},
         {$push: {comments: req.body.comment}},
         {upsert : true}).then(val => {

            responseSuccess(val, res);
            // res.json(val)
    }).catch(er => {
        responseFail(er.message, res);
        // res.json(er.message);
    })
};


exports.search = (req, res) => {


  post.find({'title': {'$regex': req.query.search}})
      .then(result => {
         responseSuccess(result, res);
    }).catch(er => {
        responseFail(er.message, res);
    });


}
var await = require('await');
var async = require('async');
// try throw catch issue fixed
exports.tryThrow = async (req, res) => {
var z;
     try{
       if(!true){
         z = await user.findOne({});
         res.json(z)
       }else{
            throw "failed";
        }
      log(z)
     }catch(ex){
       res.json(ex)
       log(ex)
     }

}

const express = require('express');
const app     = require('express')();
const config  = require('dotenv').config();
const api     = require('./backend/routes.js');
const morgan   = require('morgan');
const mongoose  = require('mongoose');
const {red, blue, green} = require('chalk');
const bodyparser   = require('body-parser');
const cookieparser = require('cookie-parser');
const passport     = require('passport');
const session      = require('express-session');
var cookieSession  = require('cookie-session')
log = console.log;
// mongoose  connection

mongoose.connect('mongodb://localhost/webcraft',{useMongoClient: true});
mongoose.Promise = global.Promise;

// error handler event listerner

mongoose.connection.on('error', (er) => {
    log(red(er.message))
});


// @params {succes ful connection}
mongoose.connection.once('open', function() {
    log(blue('mondb connected'));
});



app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cookieparser());

app.set('trust proxy', 1)


app.use(cookieSession({
    name: 'session',
    keys: ["secret"],
 }))
//   app.use(session({ secret: 'keyboard cat', 
// resave: true,
// saveUninitialized: true,
// cookie: { 
//     path    : '/',
//     httpOnly: false,
//     maxAge: 60000 }
// }))


app.use(morgan('dev'));
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
    log("sesssion options",req.sessionOptions)
    log("from middle",req.session);
    next();
})

// authenticating the end ponts using session

// app.use((req, res, next) => {
//     console.log("from middle ware",req.url);
//     if(req.url == '/user/login'){
//         return next();
//     }else{       
//         // check whether the sesssion is present or not`
//         if(!req.session.hasOwnProperty("_id")){
//             console.log('url')            
//              return res.json("You should login first")  
//         }else{
//            return next();
//         }
//     }
    
// });

app.use(api);
console.log('you app runinng on ', process.env.PORT);
app.listen(process.env.PORT);

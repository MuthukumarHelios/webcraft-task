const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    name               :  {type: String,required: true,required: true},
    password           :  {type: String,required: true,required: true},
    created_at         :  {type: Date, default: Date.now },
    email              :  {type: String,required: true, unique: true}

});



module.exports= {
    user : mongoose.model('user', userSchema)
}
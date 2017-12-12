log = console.log;


const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

var postschema = new Schema({
    user_id  : [{ type: String, ref: 'user',required: true }],
    title: {type: String,required: true},
    comments:  [{type: String}],
    images: [{type:String}],
    created_at: { type: Date, default: Date.now}
  
});



  
module.exports = {
    post : mongoose.model('post', postschema),
}

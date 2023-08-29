const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    // id:{type:String},
    name:{type:String},
    date:{type:String},
    email:{type:String},
    phone:{type:String},
    health:{type:String},
    status:{type:String}
});

module.exports = mongoose.model('newPatient',schema);
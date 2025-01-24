const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const schema = new Schema({
    index:{type:Number},
    name:{type:String},
    problem:{type:String},
    solution:{type:String},
    date:{type:String},
    gender:{type:String},
    status:{type:String}

});

module.exports = mongoose.model('newDum',schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const schema = new Schema({
    // id:{type:String},
    name:{type:String},
    problem:{type:String},
    solution:{type:String},
    date:{type:String},
    gender:{type:String},
    status:{type:String}

});
// schema.statics.hashPassword = function hashPassword(password){
//     return bcrypt.hashSync(password,10);
// }

// schema.methods.isValid = function(hashedpassword){
//     return  bcrypt.compareSync(hashedpassword, this.password);
// }

module.exports = mongoose.model('newUser',schema);

// const Userdb=mongoose.model('userdb',schema);

// module.exports=User;

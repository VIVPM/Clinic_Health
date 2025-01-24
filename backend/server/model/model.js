// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// const schema = new Schema({
//     name: {type:String, require:true},
//     email : {type:String, require:true},
//     username: {type:String, require:true},
//     password:{type:String, require:true},
//     phone:{type:Number, require:true}
//     // creation_dt:{type:Date, require:true}
// });
// schema.statics.hashPassword = function hashPassword(password){
//     return bcrypt.hashSync(password,10);
// }

// schema.methods.isValid = function(hashedpassword){
//     return  bcrypt.compareSync(hashedpassword, this.password);
// }

// module.exports = mongoose.model('User',schema);

// const Userdb=mongoose.model('userdb',schema);

// module.exports=User;

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true
    }

})

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

// userSchema.methods.isValid = function(plainTextpassword){
//     return  bcrypt.compareSync(plainTextpassword, this.password);
// }

module.exports = mongoose.model('User', userSchema)

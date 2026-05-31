const mongoose = require("mongoose");

//Schema
const userSchema =  new mongoose.Schema({
    firstName:{
        required : true,
        type: String,
    },
    lastName: {
        type: String,
    },
    gender:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type:String,
    }
}, {timestamps : true});

const User = mongoose.model('user', userSchema);
//here model is named as "user", so collection name will be same as it but in plural, so collections name --> "users"

module.exports = User;
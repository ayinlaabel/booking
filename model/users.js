const mongoose= require('mongoose');

let userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    nurse:{
        type: String,
        required: true
    },
    Doctor:{
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);
const mongoose= require('mongoose');

let userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    nurse:{
        type: String,
        // required: true
    },
    Doctor:{
        type: String,
        // required: true
    }
});

let Patient = module.exports = mongoose.model('Patient', userSchema);
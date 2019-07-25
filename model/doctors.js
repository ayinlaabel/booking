const mongoose= require('mongoose');

let doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    address1:{
        type: String,
        required: true
    },
    address2:{
        type: String,
        // required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
        // required: true
    },
    password:{
        type: String,
        required: true
    }
});

let Doctor = module.exports = mongoose.model('Doctor', doctorSchema);
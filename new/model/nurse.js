const mongoose= require('mongoose');

let userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);
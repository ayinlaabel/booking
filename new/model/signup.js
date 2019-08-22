const mongoose= require('mongoose');

let signSchema = mongoose.Schema({
    username:{
        type: String,
        // required: true
    },
    password:{
        type: String,
        // required: true
    },
});

let User = module.exports = mongoose.model('User', signSchema);
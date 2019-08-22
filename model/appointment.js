const mongoose= require('mongoose');

let appointmentSchema = mongoose.Schema({
    // name:{
    //     type: String,
    //     required: true
    // },
    // lastName:{
    //     type: String,
    //     required: true
    // },
    // email:{
    //     type: String,
    //     required: true
    // },
    date:{
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        // required: true
    },
    city:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});

let Appointment = module.exports = mongoose.model('Appointment', appointmentSchema);
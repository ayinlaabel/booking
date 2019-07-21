const express = require('express');


const routes = express.Router();

routes.get('/doctor', (req, res) =>{
    res.render('doctor');
})

module.exports = routes
const express = require('express');

const routes = express.Router();

routes.get('/dashboard', (req, res) => {
    res.render('admin');
})

module.exports = routes;
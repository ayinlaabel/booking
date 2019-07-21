const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Database Init
mongoose.connect('mongodb://localhost/appoint');

const db = mongoose.connection;

db.on('open', function () {
    console.log('Connected to Mongodb on Port 27017  Successfully ...');
});

//Error
db.once('err', function (err) {
    console.log(err);
});

//Init App
const app = express();

//Middleware
app.use(express.static(path.join(__dirname, '/public')));
//Set view
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/patient', (req, res) => {
    res.render('patient');
});

app.get('/appointment', (req, res) => {
    res.render('appoint');
});
app.get('/department', (req, res) => {
    res.render('department');
});

app.get('/doctors', (req, res) => {
    res.render('doctors');
});

//Other Routes
const routes = require('./routes/register');
app.use('/hospital', routes);

//Start Server
let port = 4000;

app.listen(port,  () => {
    console.log(`Server Started on Port ${port} ...`);
})
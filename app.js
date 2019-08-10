const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator= require('express-validator'); 
const passport = require('passport');
const config = require('./config/database');

//Database Init
mongoose.connect(config.database);

const db = mongoose.connection;

db.on('open',  () => {
    console.log('Connected to Mongodb on Port 27017  Successfully ...');
});

//Error
db.once('err',  (err) => {
    console.log(err);
});

//Init App
const app = express();

//===================================================================
//-------------------------Middlewares-------------------------------
//===================================================================

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static(path.join(__dirname, '/public')));


//Cookie Middleware
// app.use(cookieParser());

//Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Connect-Flash Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: (param, msg, value) =>{
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Passport Config
require('./config/passport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

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
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact.html', (req, res) => {
    res.render('contact');
});

//Other Routes
const patient = require('./routes/patient');
const admin = require('./routes/admin');
const doc = require('./routes/doctors');
app.use('/hospital/patient', patient);
app.use('/admin', admin);
app.use('/doctors', doc);

//Start Server
let port = 4000;

app.listen(port,  () => {
    console.log(`Server Started on Port ${port} ...`);
})
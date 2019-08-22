const express = require('express');
const path = require('path');

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



//Start Server
let port = 4000;

app.listen(port,  () => {
    console.log(`Server Started on Port ${port} ...`);
})
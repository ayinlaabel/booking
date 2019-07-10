const express = require('express');
const path = require('path');


//Init App
const app = express();

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
//Set view
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => {
    res.render('index');
});

//Start Server
let port = 4000;

app.listen(port,  () => {
    console.log(`Server Started on Port ${port} ...`);
})
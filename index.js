const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
  
//const cors = require('cors');
const mongoose = require("mongoose");


const app = express();
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

const routes = require('./routes/routes');
app.use('/employee', routes);
console.log(process.env.DB_URL);

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err){
        console.log("mongo connection issue");
    }
    else{
        console.log("connected to mongo");
    }
})
const port = 3000; 
app.listen(port, () => {
    console.log("server listening to port " + port);
})
module.exports = app;
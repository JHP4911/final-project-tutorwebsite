//File Name: server.js - This is the app's entry point

//Imports
let express = require('express'),
    app = express(),
    session = require('express-session'),
    flash = require('req-flash'),
    port = process.env.PORT || 3000,
    routes = require("./routes"),
    bodyParser = require('body-parser');

console.log("mongoose stuff initialized");
//Allow body parser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.set('view engine', 'pug')
app.set('views', __dirname + '/views');

//-----------------------------------------
//Mongoose Settings
//-----------------------------------------
const mongoose = require("mongoose");
//Database configuration
app.use((req, res, next) => {
  console.log("use for mongoose callback");
  if (mongoose.connection.readyState) {
    console.log("if (mongoose.connection.readyState)");
    next();
  } else {
    console.log("else (mongoose.connection.readyState)");
    require("./mongo")().then(() => next());
    console.log("else (mongoose.connection.readyState)");
  }
});

//Using appointmentRoutes which defines all the API endpoints
app.use('/', routes)

app.listen(port);
console.log('Server is running on port: ' + port);

//Export module
module.exports = app;

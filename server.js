//File Name: server.js - This is the app's entry point

//Imports
let express = require('express'),
    app = express(),
    session = require('express-session'),
    flash = require('req-flash'),
    routes = require("./routes"),
    bodyParser = require('body-parser');

var http = require ('http');
var mongoose = require('mongoose');
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/tutorwebsite';
var theport = process.env.PORT || 5000;

var Student = require('./models/student-model'),
    Register = require('./models/register-model'),
    Tutor = require('./models/tutor-model'),
    Appointment = require('./models/appointment-model');
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

//Database configuration
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

//Using appointmentRoutes which defines all the API endpoints
app.use('/', routes)

app.listen(theport);
console.log('Server is running on port: ' + port);

//Export module
module.exports = app;

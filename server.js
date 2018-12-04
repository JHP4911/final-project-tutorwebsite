//File Name: server.js - This is the app's entry point

//Imports
let express = require('express'),
    app = express(),
    session = require('express-session'),
    flash = require('req-flash'),
    port = process.env.PORT || 3000,
    routes = require("./routes"),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/tutorwebsite';

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

app.listen(port);
console.log('Server is running on port: ' + port);

//Export module
module.exports = app;

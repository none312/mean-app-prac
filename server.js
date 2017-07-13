//import modules
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080; 		//initiate default port
var morgan = require('morgan'); 			//request logger
var mongoose = require('mongoose'); 		//handler for MongoDBvar
var bodyParser = require('body-parser');

//create express Router
var router = express.Router();
var appRouters = require('./app/routes/api.js')(router);


//Using middleware functions
app.use(morgan('dev'));
app.use(bodyParser.json()); 						
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));  //built-in express middleware to serve/get access to static files (html, js, css)
app.use('/api', appRouters);

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', function(err) {
    if (err) {
        console.log("Not connected to the database " + err);
    } else {
        console.log("Succesfully connected to the MongoDB");
    }
});

//Direct all route to index.html page
app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


//Start server
app.listen(port, function() {
    console.log("Server is running on port " + port);
});

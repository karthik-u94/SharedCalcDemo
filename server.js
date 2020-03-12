var express  = require('express');
var app      = express(); 								
var port  	 = process.env.PORT || 8080; 				
var bodyParser = require('body-parser'); 	
var methodOverride = require('method-override'); 
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public')); 				
app.use(bodyParser.urlencoded({'extended':'true'})); 			
app.use(bodyParser.json()); 									
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

require('./app/routes.js')(app);

// app.listen(port);
console.log("App listening on port " + port);

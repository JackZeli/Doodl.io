'use strict';

//Express initializing application as a function handler that you
//can supply to an HTTP server
var application = require('express')(); 
var http = require('http').createServer(application);

//Defining route handler / that gets called when we visit the 
//home page
application.get('/', function(req,res){
	res.send('<h1>Hello world</h1>')
});

//Make http server listen on port 3000
http.listen(3000, function(){
	console.log('listening on *:3000')
});
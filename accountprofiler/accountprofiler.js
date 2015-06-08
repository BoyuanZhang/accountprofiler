var express = require('express'),
	app = express(),
	routes = require('./routes'),
	bodyParser = require('body-parser');

function start() {
	//todo: put port number in config file
	app.listen( 3000, function() {
		console.log('Account Profiler running on port 3000...');
		
		app.use(bodyParser.json());
		routes.init(app);
	});
}

exports.start = start;
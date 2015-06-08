var express = require('express'),
	app = express(),
	routes = require('./routes');

function start() {
	app.listen( 3000, function() {
		console.log('Account Profiler running on port 3000...');
		
		routes.init(app);
	});
}

exports.start = start;
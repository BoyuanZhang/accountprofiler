//todo: put elasticsearch server in config file
var ESHostUrl = 'den00eif.us.oracle.com',
	http = require('http');

function executePost( response, endpoint, body) {
	
	var serializedBody = JSON.stringify(body);
	var options = createOptions('POST', endpoint, serializedBody);
	
	var result = '';
	
	var httpReq = http.request(options, function(httpRes) {
		var responseString = '';
		httpRes.setEncoding('utf8');

		httpRes.on('data', function(data) {
			responseString += data;
		});

		httpRes.on('end', function() {
			result = JSON.parse(responseString);	
			response.send(JSON.stringify(result));
		});
	});	
	
	httpReq.on('error', function(e) {
		result = createErrorObject(e);
		response.send(result);
	});
	
	httpReq.write(serializedBody);
	httpReq.end();
}

function createOptions(reqType, endpoint, serializedBody) {	
	var headers = {
	  'Content-Type': 'application/json',
	  'Content-Length': serializedBody.length
	};
	var options = {
		host: ESHostUrl,
		path: endpoint,
		port: 9200,
		method: reqType,
		headers: headers
	};
	return options;
}

function createErrorObject( message ) {
	var error = {
		msg : message
	}
}

exports.executePost = executePost;
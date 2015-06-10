var esService = require('./services/esservice'),
	esClient = require('./services/es_client'),
	path = require('path'),
	root = path.dirname(require.main.filename);

function init(app) {
	app.get('/', function(req, res) {
		res.sendFile(root + '/static/html/index.html');
	});
	app.get('/home', function(req, res) {
		res.sendFile(root + '/static/html/index.html');
	});
	app.get('/feed', function(req, res) {
		res.sendFile(root + '/static/html/feed.html');
	});
	app.post('/_search', function (req, res) {
		console.log('routed to _search...');
		esService.executePost(res, '_search', req.body);
	});
	app.post('/:index/_search', function(req,res) {
		console.log('reqBody' + req.body);
		esClient.search(req, res);
	});
	app.post('/:index/:type/_search', function(req, res) {
		console.log('routed to :index/:type/_search...');
		console.log('reqBody' + req.body);
		esClient.search(req, res);
	});
}

exports.init = init;
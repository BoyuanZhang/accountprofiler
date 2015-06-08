var esService = require('./services/esservice');

function init(app) {
	app.post('/_search', function (req, res) {
		console.log('routed to _search...');
		esService.executePost(res, '_search', req.body);
	});
	app.post('/:index/_search', function(req,res) {
		console.log('routed to :index/_search...');
		esService.executePost(res, req.params.index + '/_search', req.body);
	});
	app.post('/:index/:type/_search', function(req, res) {
		console.log('routed to :index/:type/_search...');
		esService.executePost(res, req.params.index + '/' + req.params.type + '/_search', req.body);
	});
}

exports.init = init;
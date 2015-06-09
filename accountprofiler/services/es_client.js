var elasticsearch = require('elasticsearch'),
Index = '2085772195',
http = require('http'),
client = new elasticsearch.Client({
  host: 'den00eif.us.oracle.com:9200',
  log: 'trace'
});

function _buildQuery(req) {
	if(req.params.type === 'contact') {
		return 'c_company:' + req.body.aq;
	}
}

//for details: use req.body.ai for contact endpoint....

function search(req, res) {
	client.search({
  		index: Index,
  		q: _buildQuery(req)
	}, function (error, response) {
  		if(error) {
  			console.log(error);	
  		}
  		if(response) {
  			console.log(response);
  			res.write(JSON.stringify(response));
  			res.end();	
  		}  		
	});
}

function fetch(req, res) {
	console.log(req.body);

	client.search({
  		index: Index,
  		q: '_id:' + req.body.ai 
	}, function (error, response) {
  		if(error) {
  			console.log(error);	
  		}
  		if(response) {
  			console.log(response);
  			res.write(JSON.stringify(response));
  			res.end();
  		}  		
	});
}

exports.search = search;
exports.fetch = fetch;

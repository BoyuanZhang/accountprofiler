var elasticsearch = require('elasticsearch'),
Index = '2085772195',
http = require('http'),
client = new elasticsearch.Client({
  host: 'den00eif.us.oracle.com:9200',
  log: 'trace'
});

function search(req, res) {
	var _query = { match_all: {} };
	
	if(req.body.aq) {
		_query = {term: {'c_company': req.body.aq}};
	}

	client.search({
  		index: Index,
  		 body: {
    		query: _query
    	}
	}, function (error, response) {
  		if(error) {
  			console.log(error);	
  		}
  		if(response) {
  			console.log('aq: ' + req.body.aq);
  			//console.log(response);
  			if(response.hits)
  			console.log('total matches: ' + response.hits.total);
  			res.write(JSON.stringify(response));
  			res.end();
  		}  		
	});
}

 //size: 11, query: { bool: { must: [ {term: { searchTerm }}] }}
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
  			console.log('total matches: ' + response.hits.total);
  			res.write(JSON.stringify(response));
  			res.end();
  		}  		
	});
}

exports.search = search;
exports.fetch = fetch;

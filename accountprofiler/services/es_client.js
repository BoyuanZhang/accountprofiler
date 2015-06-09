var elasticsearch = require('elasticsearch'),
Index = '2085772195',
http = require('http'),
client = new elasticsearch.Client({
  host: 'den00eif.us.oracle.com:9200',
  log: 'trace'
});

function createFetchQuery(req) {
   var criteria = {
    match: {
      c_company: {
        query: req.body.aq,
        operator: 'and'
      }
    }
   };
   return criteria;
}

function createSimpleQuery(req){
  var blah = req.body.aq;
  return {
      simple_query_string : {
        fields: ['c_company'],
        query: req.body.aq,
        analyzer: 'snowball',
        flags: 'AND|PHRASE|PRECEDENCE'
      }
  };
}

function search(req, res) {
	var _query = { match_all: {} };
	
	if(req.body.aq) {
    if(typeof(req.body.em) !== "undefined") {
      _query = createFetchQuery(req);
    } 
    else {
      _query = createSimpleQuery(req);
    }    
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
  			if(response.hits) {
          console.log('total matches: ' + response.hits.total);
        }
  			res.write(JSON.stringify(response));
  			res.end();
  		}  		
	});
}

exports.search = search;

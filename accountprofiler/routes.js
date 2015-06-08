function init(app) {
	app.get('/', function (req, res) {
	  res.send('Hello World!');
	});
}

exports.init = init;
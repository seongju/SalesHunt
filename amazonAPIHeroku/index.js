var express = require('express'),
	amazon = require('./lib'),
 	bodyParser = require('body-parser'),
 	app = express();
	Parse = require('parse/node').Parse;

Parse.initialize(process.env.APPID, process.env.JSKey);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

var client = amazon.createClient({
	awsTag: process.env.awsTag,
	awsId: process.env.awsId,
	awsSecret: process.env.awsSecret
});

app.listen(app.get('port'), function() {
  	console.log("Node app is running at localhost:" + app.get('port'))
});

app.post('/itemSearch', function(req, res, next) {
	var keywords = req.body.Keywords;
	console.log(keywords);

	query = {
		Keywords: keywords,
		responseGroup: 'ItemAttributes,Images'
	};

	console.log(query);

	client.itemSearch(query, function(err, results){
		if (err){
			console.log(err);
			res.status(404);
		} else {
			console.log("Done");
  			res.status(200).send(results);
		}
	});
});

app.post('/testParse', function(req, res){
	var query = new Parse.Query(Parse.User);
	query.equalTo("username", "Bob");
	query.find({
		success: function(users){
			res.status(200).send(users);
		}
	});
});

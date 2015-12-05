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
		responseGroup: 'ItemAttributes,Images,OfferSummary'
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

app.post('/removeItem', function(req, res){
	//TODO require ASIN and username
	var ASIN = req.body.ASIN;
	var username = req.body.username;

	var user_query = new Parse.Query(Parse.User);
	
	//Get the user pointer for this username
	user_query.equalTo("username", username);
	user_query.first({
		success: function(user){
			
			if(typeof user === "undefined"){
				//There is no such user
				res.status(400).send();
			}

			var userItem = Parse.Object.extend("User_Items");
			var items_query = new Parse.Query(userItem);
			
			//Retrieve the unique item that has the ASIN and user pointer
			items_query.equalTo("user", user);
			items_query.equalTo("ASIN", ASIN);

			items_query.first({
				success: function(item){
					if(typeof item === "undefined"){
						//There is no such item 
						res.status(400).send();
					}
					else{
						//Remove item from database
						item.destroy({
							success: function(){
								res.status(200).send();
							},
							error: function(){
								console.log("Parse did not destroy the item");
								res.status(500).send();
							}
						});
					}
				},
				error: function(object, error){
					console.log("Parse did not accept the query");
					res.status(400).send();
				}
			});			
		},
		error: function(){
			console.log("Parse did not accept the query");
			res.status(500).send();
		}
	});
});

app.post('/addItem', function(req, res){
	//TODO make sure that there is a username and item['ASIN'] because they make the unique key
	var username = req.body.username;
	var item = req.body.item;

	//Get the user pointer for this username
	var user_query = new Parse.Query(Parse.User);

	user_query.equalTo("username", username);
	user_query.first({
		success: function(user){
			
			if(typeof user === "undefined"){
				//There is no such user
				console.log("There is no such user");
				res.status(400).send();
			}

			//Create new item and set the fields for it
			var userItem = Parse.Object.extend("User_Items");
			var newItem = new userItem();
			
			newItem.set("user", user);
			newItem.set("ASIN", item['ASIN']);
			newItem.set("brand", item['brand']);
			newItem.set("lastPriceAmount", parseFloat(item['lastPriceAmount']));
			newItem.set("lastPriceFormatted", item['lastPriceFormatted']);
			newItem.set("pictureLink", item['pictureLink']);
			newItem.set("setPriceAmount", parseFloat(item['setPriceAmount']));
			newItem.set("setPriceFormatted", item['setPriceFormatted']);
			newItem.set("title", item['title']);

			console.log(newItem);
			//Try to save the new item in Parse
			newItem.save(null, {
				success: function(){
					res.status(201).send();
				},
				error: function(){
					console.log("Trouble saving the item");
					res.status(400).send();
				}
			});
		},
		error: function(){
			console.log("Parse did not accept the query");
			res.status(500).send();
		}
	});
});
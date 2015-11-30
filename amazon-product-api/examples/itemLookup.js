var amazon = require('../lib');

var client = amazon.createClient({
  awsTag: "799721652307",
  awsId: "AKIAIVPA5GTUYJPWZSHQ",
  awsSecret: "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"
});

client.itemSearch({
  Keywords: 'Olympus OM-D E-M5 Mark 2',
  responseGroup: 'OfferSummary'
}, function(err, results) {
  if (err) {
    console.log(err);
  } else {
	for (var i = 0; i < results.length; i++){
		console.log("-----------------------------------------------------");
		console.log("Item: " + i);
		console.log(results[i]);
		console.log("ASIN:");
		console.log(results[i]['ASIN']);
		console.log("LowestNewPrice:");
		console.log(results[i]['OfferSummary'][0]['LowestNewPrice']);
		console.log("-----------------------------------------------------");
	}
  }
});

var amazon = require('../lib');

var client = amazon.createClient({
  awsTag: "799721652307",
  awsId: "AKIAIVPA5GTUYJPWZSHQ",
  awsSecret: "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"
});

client.itemSearch({
  Keywords: 'Surface Pro',
  responseGroup: 'ItemAttributes,Images'
}, function(err, results) {
  if (err) {
    console.log(err);
  } else {
	for (var i = 0; i < results.length; i++){
		console.log("-----------------------------------------------------");
		console.log("Item: " + i);
		console.log("ASIN:");
		console.log(results[i]['ASIN']);
		console.log("ListPrice:");
		console.log(results[i]['ItemAttributes'][0]['ListPrice']);
		console.log("DetailPageURL:");
		console.log(results[i]['DetailPageURL']);
		console.log("SmallImage:");
		console.log(results[i]['SmallImage']);
		console.log("MediumImage:");
		console.log(results[i]['MediumImage']);
		console.log("LargeImage:");
		console.log(results[i]['LargeImage']);
		console.log("ItemAttributes:");
		console.log(results[i]['ItemAttributes']);
		console.log("-----------------------------------------------------");
	}
  }
});

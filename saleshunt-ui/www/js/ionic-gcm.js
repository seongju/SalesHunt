var express = require('express');
var gcm = require('node-gcm');
var app = express();

var device_token;

var server = app.listen(3000, function(){

 console.log('server is running');

});

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/register', function(req, res){
	// alert('register');
    device_token = req.body.device_token;
    console.log('device token received');
    console.log(device_token);
    /*YOUR TODO: save the device_token into your database*/
    res.send('ok');
});

app.get('/push', function(req, res){

    var device_tokens = []; //create array for storing device tokens
    var retry_times = 4; //the number of times to retry sending the message if it fails

    var sender = new gcm.Sender('AIzaSyAi37LkflJ-QKBm0WW6UKLvZ_CA68e7yZk'); //create a new sender
    var message = new gcm.Message(); //create a new message

    message.addData('title', 'New Message');
    message.addData('message', 'Hello this is a push notification');
    message.addData('sound', 'notification');

    message.collapseKey = 'testing'; //grouping messages
    message.delayWhileIdle = true; //delay sending while receiving device is offline
    message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline

    /*
    YOUR TODO: add code for fetching device_token from the database
    */

    device_tokens.push(device_token);

    sender.send(message, device_tokens, retry_times, function(result){
        console.log(result);
        console.log('push sent to: ' + device_token);
    });

    res.send('ok');
});
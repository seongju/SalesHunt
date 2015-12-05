// <script type="text/javascript" src="//static.twilio.com/libs/twiliojs/1.2/twilio.min.js"></script>


// Twilio Credentials 
var accountSid = 'AC45be43816fadadd0aaf273ae51f7c480'; 
var authToken = '9a5419eb5004ec1dc69bff3bea21ad3b'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
    to: "+17347093816", 
    from: "+17348871363", 
    body: "This is a test message", 
    mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
}, function(err, message) { 
    console.log(message.sid); 
});

// <script type="text/javascript" src="//static.twilio.com/libs/twiliojs/1.2/twilio.min.js"></script>


// Twilio Credentials 
var accountSid = 'AC45be43816fadadd0aaf273ae51f7c480'; 
var authToken = '9a5419eb5004ec1dc69bff3bea21ad3b'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
    to: "+17347093816", 
    from: "+17348871363", 
    body: "Price drop on: Motorola Moto 360 (2nd Gen.) - Mens 42mm, Black with Black Leather Band\nFrom: $299.99\nTo: $100.00\nLink: http://www.amazon.com/Motorola-Moto-360-2nd-Gen/dp/B016CKGPC8/ref=sr_1_11?ie=UTF8&qid=1449688792&sr=8-11&keywords=motorola+360+42mm+2nd+Generation", 
    mediaUrl: "http://ecx.images-amazon.com/images/I/41W3Ti5rYxL.jpg",  
}, function(err, message) { 
    console.log(message.sid); 
});

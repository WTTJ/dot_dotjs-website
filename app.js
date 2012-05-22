var express = require('express'),
		app = express.createServer();

// Configuration
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

//Heroku
var port = process.env.PORT || 3333;
app.listen(port, function() {
	console.log("Listening on " + port);
});
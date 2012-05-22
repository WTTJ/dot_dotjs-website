var express = require('express'),
		app = express.createServer();

// Configuration
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	console.log('deeeev');
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Heroku
var port = process.env.PORT || 3333;
app.listen(port, function() {
	console.log("Listening on " + port);
});
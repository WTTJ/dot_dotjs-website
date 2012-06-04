
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , partials = require('express-partials')
  , http = require('http');

var app = express();

app.use(partials());

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/schedule', routes.schedule);
app.get('/speakers', routes.speakers);
app.get('/partners', routes.partners);
app.get('/venue', routes.venue);

var port = process.env.PORT || app.get('port');
http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + app.get('port'));
});

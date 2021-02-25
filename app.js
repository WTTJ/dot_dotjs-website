
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    partials = require('express-partials'),
    http = require('http');

var app = express();

app.use(partials());



var domainRedirect = function(from_host, to_host) {

  return function(req, res, next) {
    var requested_host = req.header("host");

    if ( requested_host == from_host ) {
      res.redirect(301, "http://"+to_host+req.path);
    } else {
      next();
    }
  };
};


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  app.use(domainRedirect("2012.dotjs.io", "2012.dotjs.eu"));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/schedule', routes.schedule);
app.get('/workshops', routes.workshops);
app.get('/partners', routes.partners);
app.get('/partner/:name', routes.partner);
app.get('/venue', routes.venue);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

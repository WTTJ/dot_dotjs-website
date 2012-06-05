
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'The largest JavaScript conference in France' });
};

exports.about = function(req, res){
  res.render('about', { title: 'About' });
};

exports.schedule = function(req, res){
  res.render('schedule', { title: 'Schedule' });
};

exports.speakers = function(req, res){
  res.render('speakers', { title: 'Speakers' });
};

exports.partners = function(req, res){
  res.render('partners', { title: 'Partners' });
};

exports.venue = function(req, res){
  res.render('venue', { title: 'Venue' });
};

exports.handleForm = function(req, res){
  var https = require('https');
  var querystring = require('querystring');
  // TODO: check req.body.email validity
  var postData = querystring.stringify({
    'Field1': req.body.email
  });

  var options = {
    host: 'thomasb.wufoo.com',
    headers : {
      'Authorization': 'Basic RTJBMy1MVDVaLTdDMVktQkZLQjpmb29zdGF0aWM=',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    },
    path: '/api/v3/forms/keep-in-touch/entries.json',
    method: 'POST'
  };

  var postReq = https.request(options, function(postRes) {
    var data = '';

    postRes.on('data', function(d) {
      data += d;
    });

    postRes.on('end', function(a) {
      var dataParsed;

      try {
        dataParsed = JSON.parse(data);
      } catch(e) {
        console.error('Error parsing data', data);
      }

      var success = dataParsed.Success;
      var error = false;

      if (!success) {
        error = dataParsed.FieldErrors[0].ErrorText;
      }

      res.render('index', {
        title: 'The largest JavaScript conference in France',
        success: success,
        error: error
      });
    });
  });

  postReq.write(postData);
  postReq.end();

  postReq.on('error', function(e) {
    console.error('error', e);
  });
};

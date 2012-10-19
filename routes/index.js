var fs = require("fs"),
    path = require("path");

var PARTNERDATA = JSON.parse(fs.readFileSync(path.join(__dirname, '../partnerdata.json')).toString().replace(/\n/g, ''));

exports.index = function(req, res){
  var partnersSorted = {
        platinum: [],
        gold: [],
        silver: [],
        bronze: []
      };

  for (var partner in PARTNERDATA) {
    if (PARTNERDATA.hasOwnProperty(partner)) {
      partnersSorted[PARTNERDATA[partner].level].push(PARTNERDATA[partner]);
    }
  }

  function sortByOrder(p1, p2) {
    return p1.order - p2.order;
  }

  partnersSorted['platinum'].sort(sortByOrder);
  partnersSorted['gold'].sort(sortByOrder);
  partnersSorted['silver'].sort(sortByOrder);
  partnersSorted['bronze'].sort(sortByOrder);

  res.render('index', { title: 'The largest JavaScript conference in France', name:"index", partners: partnersSorted });
};

exports.about = function(req, res){
  res.render('about', { title: 'About', name:"about" });
};

exports.schedule = function(req, res){
  res.render('schedule', { title: 'Schedule', name:"schedule" });
};

exports.workshops = function(req, res){
  res.render('workshops', { title: 'Workshops', name:"workshops" });
};

exports.partners = function(req, res){
  res.render('partners', { title: 'Partners', name:"partners", partners: PARTNERDATA });
};

exports.partner = function(req, res){
  if (!PARTNERDATA[req.params.name]) {
    return res.send(404);
  }

  if (!PARTNERDATA[req.params.name].text) {
    return res.redirect(PARTNERDATA[req.params.name].url);
  }

  res.render('partner_detail', { title: 'Partner', name:"partner", partner: PARTNERDATA[req.params.name] });
};

exports.venue = function(req, res){
  res.render('venue', { title: 'Venue', name:"venue" });
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

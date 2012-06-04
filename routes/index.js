
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

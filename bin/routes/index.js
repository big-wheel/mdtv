// var pcover = require('../../lib/tools').pcover;

exports.index = function(req, res){
  res.render('index', { name: 'John' });
  // res.sendFile(process.cwd() + pcover('/public/template/aa.html'));
};
var express = require('express');
var chalk = require('chalk');
var path = require('path');
var log = console.log;
var app = express();
var route = require('./routes');

app.set('views', path.resolve('public/template'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// middleware
var logReqInfo = function(req, res, next) {
  log(`Request for ${req.url} at ${Date.now()}`);
  next();
};

module.exports = function (fileName, port) {
  app.use(express.static('public'));
  app.use(logReqInfo);
  app.get('/', route.index);
  app.get(/^\/fileView/, route.fileView);
  app.listen(port, function(){
    log(chalk.yellow(`mdtv listening on port ${port}`));
  });
};

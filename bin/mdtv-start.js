var express = require('express');
var chalk = require('chalk');
var pcover = require('../lib/tools').pcover;
var log = console.log;
var app = express();

app.set('views', process.cwd() + pcover('/public/template'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// middleware
var logReqInfo = function(req, res, next) {
  log(`Request for ${req.url} at ${Date.now()}`);
  next();
};

module.exports = function (fileName, port) {
  // log(chalk.red(__dirname));
  // log(chalk.red(__filename));
  // log(chalk.red(process.cwd()));
  app.use(express.static('public'));
  app.use(logReqInfo);
  app.get('/', require('./routes').index);
  app.listen(port, function(){
    log(chalk.yellow(`mdtv listening on port ${port}`));
  });
};

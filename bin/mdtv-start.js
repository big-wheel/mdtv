var express = require('express');
var chalk = require('chalk');
var log = console.log;
var app = express();

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
  app.get('/', function(req, res){
    res.send('Hello mdtv!!');
  });
  app.listen(port, function(){
    log(chalk.yellow(`mdtv listening on port ${port}`));
  });
};




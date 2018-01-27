var express = require('express');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var log = console.log;
var app = express();
var route = require('./routes');
var remark = require('remark');
// var styleGuide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');

app.set('views', path.resolve('public/template'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// middleware
function logReqInfo(req, res, next) {
  log(`Request for ${req.url} at ${Date.now()}`);
  next();
}
function readFile(req, res, next) {
  var abp = path.resolve(req.path.slice(1));
  log(chalk.blue('file path: ', abp));
  log(fs.existsSync(abp));
  if(fs.existsSync(abp) && fs.lstatSync(abp).isFile()) {
    fs.readFile(abp, (err, data) => {
      if(req.path.slice(req.path.length - 3) === '.md'){
        remark()
          .use(html)
          .process(data, function (err, file) {
            log(chalk.green(file));
            res.send(file.contents);
          });
      } else {
        var d = '<pre>' + data + '</pre>';
        res.send(d);
      }
    });
  } else {
    next();
  }
}

module.exports = function (fileName, port) {
  app.use(express.static('public'));
  app.use(logReqInfo);
  app.all('/*', readFile);
  app.get('/', route.index);
  app.get(/^\/fileView/, route.fileView);
  app.listen(port, function(){
    log(chalk.yellow(`mdtv listening on port ${port}`));
  });
};

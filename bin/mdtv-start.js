var express = require('express');
var chalk = require('chalk');
var path = require('path');
var log = console.log;
var app = express();
var route = require('./routes');

app.set('views', path.join(__dirname, '../', 'public/template'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

log('view path', path.join(__dirname, 'public/template'));
// middleware
function logReqInfo(req, res, next) {
  log(`Request for ${decodeURI(req.url)} at ${new Date().toLocaleTimeString()}`);
  req.url = decodeURI(req.url);
  next();
}

module.exports = function (fileName, port) {
  app.use(express.static(path.join(__dirname, '../', 'public')));
  app.use(logReqInfo);
  // router
  app.get('/', route.index);
  app.get(/^\/fileView/, route.fileView);
  app.get(/\/__download$/, route.download);
  app.all('/*', route.readFile);

  app.listen(port, function(){
    log(chalk.yellow(`mdtv listening on port ${port}`));
  });
};

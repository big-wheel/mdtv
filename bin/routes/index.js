// var pcover = require('../../lib/tools').pcover;
var fs = require('fs');
var path = require('path');
var fileViewByPath = require('../../lib/tools').fileViewByPath;
var log = console.log;
var chalk = require('chalk');

exports.index = function(req, res){
  // res.render('index', { name: 'John' });
  res.redirect('/fileView');
};
exports.fileView = function(req, res) {
  // 判断是文件夹还是文件
  let url = req.url.slice(9);
  let abPath = path.resolve(url.slice(1));
  log(chalk.blue('request path: ', req.url));
  log(chalk.blue('path: ', url));
  log(chalk.blue('the absolute path of request: ', abPath));

  if(fs.lstatSync(abPath).isDirectory()) {
    fileViewByPath(abPath).then((arr) => {
      res.status(200).type('html').render('fileView', { files: arr, cp: req.url });
    }).catch((err) => {
      log(chalk.red(err));
    });
    
  } else {
    console.log(path.resolve(url.slice(1)));
    // res.sendFile(path.resolve(url.slice(1)));
    // res.download(path.resolve(url.slice(1)));
    res.redirect(url);
  }
};
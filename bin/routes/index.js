// var pcover = require('../../lib/tools').pcover;
var fs = require('fs');
var path = require('path');
var remark = require('remark');
// var styleGuide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var highlight = require('remark-highlight.js');
var fileViewByPath = require('../../lib/tools').fileViewByPath;
var log = console.log;
var chalk = require('chalk');

// var pre = '<html>' + 
// + '<head>'
// + '<link rel="stylesheet" href="/css/index.css" />'
// + '</head>'
// + '<body>';
// var nextHtml = '</body>'
// + '</html>';


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

exports.readFile = function (req, res, next) {
  var abp = path.resolve(req.path.slice(1));
  log(chalk.blue('file path: ', abp));
  log(fs.existsSync(abp));
  if(fs.existsSync(abp) && fs.lstatSync(abp).isFile()) {
    fs.readFile(abp, (err, data) => {
      if(abp.match(/\.md$/)) {
        remark()
          .use(html)
          .use(highlight)
          .process(data, function (err, file) {
            log(chalk.yellow('md render'));
            res.status(200).send('<link rel="stylesheet" href="/css/mdRender.css" />' + file.contents);
          });
      } else {
        var d = '<pre>' + data + '</pre>';
        res.status(200).send(d);
      }
    });
  } else {
    next();
  }
};
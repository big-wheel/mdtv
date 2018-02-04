var toc = require('../../lib/remark-add-toc');
var fs = require('fs');
var path = require('path');
var remark = require('remark');
// var toc = require('remark-toc');
// var styleGuide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var highlight = require('remark-highlight.js');
var fileViewByPath = require('../../lib/tools').fileViewByPath;
var log = console.log;
var chalk = require('chalk');

exports.index = function(req, res){
  // res.render('index', { name: 'John' });
  fs.readdir(path.resolve(''), function (err, files) {
    if(err){
      log(chalk.red(err));
    } else if (files.indexOf('index.html') >= 0) {
      res.sendFile(path.resolve('index.html'));
    } else if (files.indexOf('index.md') >= 0 ){
      res.redirect('/index.md');
    } else {
      res.redirect('/fileView');
    }
  });
};
exports.fileView = function(req, res) {
  // 判断是文件夹还是文件
  let url = req.url.slice(9);
  // url = decodeURI(url);
  let abPath = path.resolve(url.slice(1));
  log(chalk.blue('path: ', url));

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
          .use(toc)
          .use(html)
          .use(highlight)
          .process(data, function (err, file) {
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

exports.download = function (req, res) {
  var abp = path.resolve(req.path.slice(1, req.path.length - 11));
  log(chalk.blue('down file: ', abp));
  if(fs.existsSync(abp) && fs.lstatSync(abp).isFile()) {
    res.download(abp, function(err) {
      if (err) {
        log(chalk.red(err));
        res.send('<p style="color: red">' + err + '</p>');
      }
    });
  } else {
    res.send('<p>can not find file ' + req.path.slice(1, req.path.length -11) + '</p>');
  }
};

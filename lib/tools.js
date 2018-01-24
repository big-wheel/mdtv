/*
 * @Author: mayingying 
 * @Date: 2018-01-24 14:12:17 
 * @Last Modified by: mayingying
 * @Last Modified time: 2018-01-24 17:32:23
 */

var path = require('path');
var fs = require('fs');
// var chalk = require('chalk');
// var log = console.log;

// from imcuttle
Number.prototype.toSize = function () {
  if (this < 1024) {
    return this + 'B';
  } else if (this < 1024 << 10) {
    return (this / 1024).toFixed(2) + 'KB';
  } else if (this < 1024 << 20) {
    return (this / (1024 << 10)).toFixed(2) + 'MB';
  } 
  return (this / (1024 << 20)).toFixed(2) + 'GB';
  
};
// sort by type and name
Array.prototype.toSort = function () {
  let file = [], dir = [];
  this.map(item => {
    if(item.dir){
      dir.push(item);
    } else {
      file.push(item);
    }
  });
  let sf = function(item1, item2) {
    return item1.name - item2.name;
  };
  return dir.sort(sf).concat(file.sort(sf));
};

/**
 * @param {any} url 
 * @returns the files and dirs under the relative path(url)
 */
exports.fileViewByPath = function (abPath) {
  let filesArr = [];
  return new Promise((resolve, reject) => {
    fs.readdir(abPath, function(err, files){
      if(err) reject(err);
      const proArr = files.map(
        (item) => new Promise((res,rej) => {
          fs.lstat(path.resolve(abPath, item), (err, stat) => {
            if(err) rej(err);
            filesArr.push({
              name: item,
              size: stat.isFile() ? parseInt(stat.size).toSize() : '-',
              dir: !stat.isFile()
            });
            res();
          });
        })
      );
      Promise.all(proArr)
        .then(() => {
          // log(chalk.green(filesArr));
          // log(chalk.green(filesArr[0].name));
          // console.log(filesArr.toSort());
          resolve(filesArr.toSort());
        }).catch(err => {
          // log(chalk.red(err));
          reject(err);
        });
    });
  });
};




// 读取stat 用 async 会快一点， 相互之间不阻塞

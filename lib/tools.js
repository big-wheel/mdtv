var os = require('os');

// 记得测下win10 路径格式

exports.pcover = function pathConversion(str) {
  console.log(__dirname);
  console.log('platform: ', os.platform());
  console.log('release: ', os.release());
  var arr = str.split('/');
  if(os.platform() === 'win32') {
    return arr.join('\\');
  }
  return str;
};
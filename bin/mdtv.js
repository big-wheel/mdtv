#!/usr/bin/env node 

// var cp = require('child_process');
var chalk = require('chalk');
// var path = require('path');
var commander = require('commander');
var pck = require('../package.json');
var log = console.log;



commander
  .version(pck.version)
  .option('-v, --version')
  .option('-m, --mdName <mdName>')
  .option('-p, --port <port>', 'set the port')
  .parse(process.argv);

log(chalk.yellow(`mdtv ${pck.version} running`));

let port = commander.port || 8089;
let mdName = commander.mdName;

require('./mdtv-start')(mdName, port);

// commander.command('start [mdName]')
//   .description('start a mdtv application')
//   .option('-p, --port [port]', 'set the port')
//   .action(function(options) {
//     let port = options.port || 8089;
//     let mdName = options.mdName;
//     log(chalk.yellow('mdtv start!'));
//     require('./mdtv-start')(mdName, port);
//   });


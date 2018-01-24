#!/usr/bin/env node 

// var cp = require('child_process');
var chalk = require('chalk');
// var path = require('path');
var commander = require('commander');
var pck = require('../package.json');
var log = console.log;

log(chalk.yellow(`mdtv ${pck.version} running`));

commander
  .version(pck.version)
  .option('-v, --version')
  .option('-p, --port <port>', 'set the port');


let port = commander.port || 8089;
let mdName = commander.mdName;
log(chalk.yellow('mdtv start!'));
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

commander.parse(process.argv);


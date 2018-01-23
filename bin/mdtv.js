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
  .option('-v, --version');

commander.command('start <mdName>')
  .description('start a mdtv application')
  .option('-p, --port [port]', 'set the port')
  .action(function(mdName, options) {
    log(chalk.yellow('mdtv start!'));
    require('./mdtv-start')(mdName, options.port);
  });

commander.parse(process.argv);


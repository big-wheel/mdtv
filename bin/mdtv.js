#!/usr/bin/env node 

// var chalk = require('chalk');
// var path = require('path');
var commander = require('commander');
var packageInfo = require('../package.json');

commander
  .version(packageInfo.version);

commander.command('');



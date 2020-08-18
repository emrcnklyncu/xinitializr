#!/usr/bin/env node

/** 
 Copyright 2020 the original author or authors from the Xinitializr project.
 
 This file is part of the Xinitializr project, see https://github.com/emrcnklyncu/xinitializr
 for more information.
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
      http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const utils = require('../utils/utils.js');
const cons = require('../utils/cons.js');
const validator = require('../utils/validator.js');
const generator = require('../utils/generator.js');

const packageJson = require('../package.json');

function call_proc(args) {

  var proc = null;

  if ('install' === args[0]) {
      proc = spawn('npm', ['install']);
  } else {
      proc = spawn('npm', ['run', 'env', '--'].concat(args));
  }

  proc.stdout.setEncoding('utf8');
  proc.stdout.on('data', function(data) {
      console.log(data.toString().replace(/(?:\r\n|\r|\n)/g, ''));
  });
  proc.stderr.on('data', function(data) {
      console.log('ERROR: ' + data.toString().replace(/(?:\r\n|\r|\n)/g, ''));
  });
  proc.on('close', function(code) {
      console.log('process exited with code ' + code);
  });

};

function display_help() {

  console.log('');
  console.log(cons.info('usage: xinitializr [command] <parameter>'));
  console.log('');
  console.log('apply <yaml/json file> : apply file');
  /*
  console.log('install                : install dependencies');
  console.log('start                  : start web application');
  console.log('stop                   : stop web application');
  console.log('stopall                : stop all running web applications');
  console.log('restart                : restart web application');
  console.log('restartall             : restart all running web applications');
  console.log('list                   : list all running web applications');
  console.log('test                   : test web application');
  console.log('build                  : build web application');
  console.log('watch                  : watch web application');
  console.log('update                 : update new features');
  */
  console.log('version                : xinitializr version');
  console.log('help                   : output the help');
  console.log('');

};

function main() {

  console.log('');
  console.log('|================================================================================================================|');
  console.log('| ' + utils.padRight('', 110) + ' |');
  console.log('| ' + utils.padRight((cons.info('Xinitializr') + ' ' + cons.success('v' + packageJson.version)), 148) + ' |');
  console.log('| ' + utils.padRight('', 110) + ' |');
  console.log('| ' + utils.padRight(cons.warning(packageJson.description), 132) + ' |');
  console.log('| ' + utils.padRight('', 110) + ' |');
  console.log('|================================================================================================================|');
  console.log('');
  //TODO:EK update gelince uyari verilebilir

  var uid = process.env.UID;
  var dir = process.cwd();
  var args = process.argv.splice(process.execArgv.length + 2);
  var cmd = args[0];
  var param = args[1];

  if ('v' === cmd || 'version' === cmd) {
    process.exit(1);
  }
  if ('h' === cmd || 'help' === cmd) {
    display_help();
    process.exit(1);
  }
  if ('a' === cmd || 'apply' === cmd) {
      if (!param) {
        console.error(cons.error('ERROR: file is required.\n'));
        process.exit(1);
      }
      if (!fs.existsSync(param)) {
        console.error(cons.error('ERROR: file not found.\n'));
        process.exit(1);
      }
      /**
       * read file
       */
      var json = {};
      if ('.yaml' == path.extname(fs.realpathSync(param))) {
        /**
         * convert yaml to json
         */
        json = yaml.parse(fs.readFileSync(fs.realpathSync(param), 'utf8'));  
      } else if ('.json' == path.extname(fs.realpathSync(param))) {
        json = JSON.parse(fs.readFileSync(fs.realpathSync(param), 'utf8'));
      } else {
        console.error(cons.error('ERROR: file format is not valid.\n'));
        process.exit(1);
      }
      /**
       * validate
       */
      validator.validate(json);
      /**
       * generate
       */
      generator.generate(json);

      return;
  }
  /*
  if ('i' === cmd || 'install' === cmd) {
      call_proc(['install']);
      return;
  }
  if ('start' === cmd) {
      call_proc(['forever', 'start', '--append', '--uid', uid, 'server.js']);
      return;
  }
  if ('stop' === cmd) {
      call_proc(['forever', 'stop', uid]);
      return;
  }
  if ('stopall' === cmd) {
      call_proc(['forever', 'stopall']);
      return;
  }
  if ('restart' === cmd) {
      call_proc(['forever', 'restart', uid]);
      return;
  }
  if ('restartall' === cmd) {
      call_proc(['forever', 'restartall']);
      return;
  }
  if ('list' === cmd) {
      call_proc(['forever', 'list']);
      return;
  }
  if ('test' === cmd) {
      call_proc(['mocha', '--recursive']);
      return;
  }
  if ('build' === cmd) {
      call_proc(['gulp', 'build', '--production']);
      return;
  }
  if ('watch' === cmd) {
      call_proc(['gulp']);
      return;
  }
  if ('update' === cmd) {
      return;
  }
  */
  console.error(cons.error('ERROR: wrong use. please look for help.\n'));

};

main();
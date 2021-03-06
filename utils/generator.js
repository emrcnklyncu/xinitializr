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
const fs = require('fs');
const path = require('path');

const generators = [];
const cons = require('./cons');

const readDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    let name = path.join(dir, file);
    let isDir = fs.statSync(name).isDirectory();
    if (isDir) {
      readDir(name);
    } else {
      if ('index.js' == file) {
        if (typeof require(fs.realpathSync(name)).do == 'function') {
          generators.push(require(fs.realpathSync(name)).do);
        } else {
          console.error(cons.error(`ERROR: "${name}" has not "do" method.`));
        }
      }
    }
  });
};

exports.generate = (json) => {
  readDir('./generators');
  generators.forEach((generator) => {generator(json)});
};

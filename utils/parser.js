/**
 * Copyright 2020 the original author or authors from the Xinitializr project.
 *
 * This file is part of the Xinitializr project, see https://github.com/emrcnklyncu/xinitializr
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const info = chalk.blue;
const success = chalk.bold.green;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

exports.parse = (path) => {
  fs.readFileSync(path, 'utf8').split(/\r?\n/).forEach(function(line){
    
  });
};
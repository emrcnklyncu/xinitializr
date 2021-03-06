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
const ejs = require('ejs');

exports.padRight = (str, max, c) => {
  return str + new Array(Math.max(0, max - str.length + 1)).join(c || ' ');
};
exports.render = (source, context, options, cb) => {
  ejs.renderFile(source, context, options, (err, res) => {
    if (!err) {
        cb(res);
    } else {
        console.error(cons.error(`Copying template ${source} failed. [${err}]`));
    }
  });
};
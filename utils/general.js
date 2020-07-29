/**
 * Copyright 2013-2020 the original author or authors from the Xinitializr project.
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
String.prototype.padRight = function(max, c) {
  var self = this;
  return self + new Array(Math.max(0, max - self.length + 1)).join(c || ' ');
};
String.prototype.wrap = function(maxLineLength) {
  var self = this;
  const words = self.replace(/[\r\n]+/g, ' ').split(' ');
  let lineLength = 0;
  
  // use functional reduce, instead of for loop 
  return words.reduce((result, word) => {
    if (lineLength + word.length >= maxLineLength) {
      lineLength = word.length;
      return result + `\n${word}`; // don't add spaces upfront
    } else {
      lineLength += word.length + (result ? 1 : 0);
      return result ? result + ` ${word}` : `${word}`; // add space only when needed
    }
  }, '');
}

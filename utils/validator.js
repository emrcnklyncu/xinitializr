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
const cons = require('./cons');

exports.validate = (json) => {
  validateApiVersion(json);
  validateKind(json);
  validateName(json);
  return;
};
const validateApiVersion = (json) => {
  console.info(json);
  console.info(json.apiVersion);
  if (json.apiVersion) {
    if (cons.v1 == json.apiVersion) {
      return cons.v1;
    } else {
      console.error(cons.error('ERROR: "apiVersion" is not a defined value.'));
      process.exit(1);
    }
  } else {
    console.error(cons.error('ERROR: "apiVersion" must be declared.'));
    process.exit(1);
  }
};
const validateKind = (json) => {
  if (json.kind) {
    if (cons.Application == json.kind) {
      return cons.Application;
    } else if (cons.Entity == json.kind) {
      return cons.Entity;
    } else if (cons.Enum == json.kind) {
      return cons.Enum;
    } else {
      console.error(cons.error('ERROR: "kind" is not a defined value.'));
      process.exit(1);
    }
  } else {
    console.error(cons.error('ERROR: "kind" must be declared.'));
    process.exit(1);
  }
};
const validateName = (json) => {
  if (json.name) {
    process.exit(1);
  } else {
    console.error(cons.error('ERROR: "name" must be declared.'));
    process.exit(1);
  }
};
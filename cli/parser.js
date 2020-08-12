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
const yaml = require('yaml')

const info = chalk.blue;
const success = chalk.bold.green;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const v1 = 'v1';
const Application = 'Application';
const Entity = 'Entity';
const Enum = 'Enum';

exports.parse = (path) => {
  const file = fs.readFileSync(path, 'utf8');
  const json = yaml.parse(file);
  console.info(json);
  validate(json);
};
const validate = (json) => {
  if (v1 == validateApiVersion(json)) {
    if (validateName(json)) {
      if (Application == validateKind(json)) {

      } else if (Entity == validateKind(json)) {
  
      } else if (Enum == validateKind(json)) {
  
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  }
};
const validateApiVersion = (json) => {
  if (json.apiVersion) {
    if (v1 == json.apiVersion) {
      return v1;
    } else {
      console.error(error('ERROR: "apiVersion" is not a defined value.'));
      return false;
    }
  } else {
    console.error(error('ERROR: "apiVersion" must be declared.'));
    return false;
  }
};
const validateKind = (json) => {
  if (json.kind) {
    if (Application == json.kind) {
      return Application;
    } else if (Entity == json.kind) {
      return Entity;
    } else if (Enum == json.kind) {
      return Enum;
    } else {
      console.error(error('ERROR: "kind" is not a defined value.'));
      return false;
    }
  } else {
    console.error(error('ERROR: "kind" must be declared.'));
    return false;
  }
};
const validateName = (json) => {
  if (json.name) {
    
  } else {
    console.error(error('ERROR: "name" must be declared.'));
    return false;
  }
};

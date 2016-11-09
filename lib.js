/*
 * grunt-swapi2json
 * https://github.com/franckLdx/grunt-swapi2json
 *
 * Copyright (c) 2016 Franck Ledoux
 * Licensed under the MIT license.
 */

// This files contains code not specific to grunt plugin. This code could be
// moved in other library wihtout any modification

'use strict';

const swapi = require('swapi-node');
const co = require('co');

module.exports.getAll = function getAll(target) {
  return co(function* getAllCo() {
    const url = `http://swapi.co/api/${target}/`;
    const data = [];
    let page = yield swapi.get(url);
    while (page) {
      data.push(...page.results);
      page = yield page.nextPage();
    }
    return data;
  });
};

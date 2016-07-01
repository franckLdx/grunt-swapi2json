/*
 * grunt-swapi2json
 * https://github.com/franckLdx/grunt-swapi2json
 *
 * Copyright (c) 2016 Franck Ledoux
 * Licensed under the MIT license.
 */

'use strict';

const swapi = require('swapi-node');
const co = require('co');

module.exports.getAll = function (target) {
	return co(function *() {
		const url = `http://swapi.co/api/${target}/`;
		let data = [];
		let page = yield swapi.get(url);
		while (page) {
			Array.prototype.push.apply(data, page.results);
			page = yield page.nextPage();
		}
		return data;
	});
};
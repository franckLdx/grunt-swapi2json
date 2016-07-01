/*
 * grunt-swapi2json
 * https://github.com/franckLdx/grunt-swapi2json
 *
 * Copyright (c) 2016 Franck Ledoux
 * Licensed under the MIT license.
 */

'use strict';

const lib = require('../lib');
const co = require('co');

function getOne(grunt, target) {
	return lib.getAll(target).then(
		(data) => {
			grunt.log.ok(`${target}: ${data.length} entyties`);
		}, (err) => {
			grunt.log.warn(err);
		}
	);
}

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('swapi2json', 'This download swapi data available at http://swapi.co/ and store them in json files. Useful when one wanted to create a generated site or want to store those data locally', function () {
		const done = this.async();
		const promises = [];
		if (this.target === 'all') {
			for (let resource of ['films','people', 'planets', 'species', 'starships', 'vehicles']) {
				promises.push(getOne(grunt, resource));
			}
		} else {
			promises.push(getOne(grunt, this.target));
		}
		Promise.all(promises).then(
			done,
			() => { done(false); }
		);
	});
};

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
const path = require('path');

const RESOURCES = ['films','people', 'planets', 'species', 'starships', 'vehicles'];

function getParam(paramName, data, options) {
	let value = data[paramName];
	if (!value) {
		value = options[paramName];
	}
	return value;
}

function getOne(grunt, task) {
	co(function*() {
		const done = task.async();
		try {
			const options = task.options({
      			dir: '.',
    		});
			const data = yield lib.getAll(task.target);
			const dir = getParam('dir', task.data, options);
			const file = path.join(dir, `${task.target}.json`);
			grunt.file.write(file, JSON.stringify(data));
			grunt.log.ok(`${data.length} entities`);
			done();
		} catch(err) {
			grunt.log.warn(err);
			done(false);
		}
	});
}

function getAll(grunt, task) {
	const tasks = [];
	const config = {
		options: task.options()
	};
	for (let resource of RESOURCES) {
		tasks.push(task.name+':'+resource);
		config[resource] = task.data;
	}
	grunt.config.set(task.name, config);
	grunt.task.run(tasks);
}

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('swapi2json', 'This download swapi data available at http://swapi.co/ and store them in json files. Useful when one wanted to create a generated site or want to store those data locally', function () {
		if (this.target === 'all') {
			getAll(grunt, this);
		} else {
			getOne(grunt, this);
		}
	});
};

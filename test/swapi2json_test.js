'use strict';

const grunt = require('grunt');
const path = require('path');

const RESOURCES = new Map([['films', 7], ['people', 87], ['planets', 61], ['species', 37], ['starships', 37], ['vehicles', 39]]);

function checkFileContent(test, resource, expectedCount) {
  const file = path.join(`./tmp/${resource}.json`);
  const expected = grunt.file.exists(file);
  test.ok(expected, `${file} has not been created`);
  const data = grunt.file.readJSON(file);
  test.deepEqual(data.length, expectedCount, `${file} has not the expected number of entries`);
}

exports.swapi2json = {
  all(test) {
    test.expect(RESOURCES.size * 2);
    RESOURCES.forEach((expectedCount, resource) => {
      checkFileContent(test, resource, expectedCount);
    });
    test.done();
  },
};

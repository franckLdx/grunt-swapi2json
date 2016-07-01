/*
 * grunt-swapi2json
 * https://github.com/franckLdx/grunt-swapi2json
 *
 * Copyright (c) 2016 Franck Ledoux
 * Licensed under the MIT license.
 */

'use strict';

const target2resources = new Map();

target2resources.set('movies', 'films');
target2resources.set('characters', 'people');
target2resources.set('species', 'species');
target2resources.set('starships', 'starships');
target2resources.set('planets', 'planets');
target2resources.set('vehicles', 'vehicles');


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('swapi2json', 'This download swapi data available at http://swapi.co/ and store them in json files. Useful when one wanted to create a generated site or want to store those data locally', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};

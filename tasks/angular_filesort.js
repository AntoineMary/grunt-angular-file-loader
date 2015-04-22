/*
 * grunt-angular-filesort
 * https://bitbucket.org/AntoineMary/grunt-angular-filesort
 *
 * Copyright (c) 2015 Antoine Mary
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var ngDeps = require('ng-dependencies');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('angular_filesort', 'Automatically sort AngularJS app files depending on module definitions and usage', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {

      file.src.filter(function(filepath){
        if(!grunt.file.exists(filepath)){
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }else{
          console.log(ngDeps(grunt.file.read(filepath)));
          return true;
        }
      });

      //var deps = ngDeps(grunt.file.read(file));

      //grunt.file.write(file.dest, deps);

      /*// Concat specified files.
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
      grunt.log.writeln('File "' + f.dest + '" created.');*/
    });
  });

  function createTemplate(){

  }

};

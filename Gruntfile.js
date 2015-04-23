/*
 * grunt-angular-filesort
 * https://bitbucket.org/AntoineMary/grunt-angular-filesort
 *
 * Copyright (c) 2015 Antoine Mary
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    angular_filesort: {
      default_options: {
        options: {
        },
        files: {
          'test/fixtures/default_options.html': [
            'test/fixtures/another.js',
            'test/fixtures/another-factory.js',
            'test/fixtures/circular.js',
            'test/fixtures/circular2.js',
            'test/fixtures/circular3.js',
            'test/fixtures/dep-on-non-declared.js',
            'test/fixtures/empty.js',
            'test/fixtures/module.js',
            'test/fixtures/module-controller.js',
            'test/fixtures/no-deps.js',
            'test/fixtures/yet-another.js'
          ]
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options.html': [
            'test/fixtures/another.js',
            'test/fixtures/another-factory.js',
            'test/fixtures/circular.js',
            'test/fixtures/circular2.js',
            'test/fixtures/circular3.js',
            'test/fixtures/dep-on-non-declared.js',
            'test/fixtures/empty.js',
            'test/fixtures/module.js',
            'test/fixtures/module-controller.js',
            'test/fixtures/no-deps.js',
            'test/fixtures/yet-another.js'
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'angular_filesort', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

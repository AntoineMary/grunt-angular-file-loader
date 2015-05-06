/*
 * grunt-angular-file-loader
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
    angularFileLoader: {
      options: {
        scripts : ['test/fixtures/app/scripts/*.js']
      },
      custom_tag_html: {
        options: {
          startTag: 'test',
          endTag: 'endTest'
        },
        src: ['test/fixtures/web/html/custom_tag.html']
      },
      default_options_html: {
        options: {},
        src: ['test/fixtures/web/html/default_options.html']
      },
      relative_false_html: {
        options: {
          relative: false
        },
        src: ['test/fixtures/web/html/relative_false.html']
      },
      relative_string_html: {
        options: {
          relative: 'test/fixtures/app'
        },
        src: ['test/fixtures/web/html/relative_string.html']
      },
      custom_tag_jade: {
        options: {
          startTag: 'test',
          endTag: 'endTest'
        },
        src: ['test/fixtures/web/jade/custom_tag.jade']
      },
      default_options_jade: {
        options: {},
        src: ['test/fixtures/web/jade/default_options.jade']
      },
      relative_false_jade: {
        options: {
          relative: false
        },
        src: ['test/fixtures/web/jade/relative_false.jade']
      },
      relative_string_jade: {
        options: {
          relative: 'test/fixtures/app'
        },
        src: ['test/fixtures/web/jade/relative_string.jade']
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
  grunt.registerTask('test', ['clean', 'angularFileLoader', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

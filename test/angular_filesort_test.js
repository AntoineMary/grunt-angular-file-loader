'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.angularFileLoader = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  custom_tag_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/html/custom_tag.html');
    var expected = grunt.file.read('test/expected/html/custom_tag.html');
    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  default_options_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/html/default_options.html');
    var expected = grunt.file.read('test/expected/html/default_options.html');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  relative_false_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/html/relative_false.html');
    var expected = grunt.file.read('test/expected/html/relative_false.html');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  relative_string_html: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/html/relative_string.html');
    var expected = grunt.file.read('test/expected/html/relative_string.html');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },
  custom_tag_jade: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/jade/custom_tag.jade');
    var expected = grunt.file.read('test/expected/jade/custom_tag.jade');
    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  default_options_jade: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/jade/default_options.jade');
    var expected = grunt.file.read('test/expected/jade/default_options.jade');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  relative_false_jade: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/jade/relative_false.jade');
    var expected = grunt.file.read('test/expected/jade/relative_false.jade');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  relative_string_jade: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/web/jade/relative_string.jade');
    var expected = grunt.file.read('test/expected/jade/relative_string.jade');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  custom_tag_txt: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/fixtures/web/txt/custom_tag.txt');
      var expected = grunt.file.read('test/expected/txt/custom_tag.txt');
      test.equal(actual, expected, 'Injection must be done');

      test.done();
  },

  default_options_txt: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/fixtures/web/txt/default_options.txt');
      var expected = grunt.file.read('test/expected/txt/default_options.txt');

      test.equal(actual, expected, 'Injection must be done');

      test.done();
  },

  relative_false_txt: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/fixtures/web/txt/relative_false.txt');
      var expected = grunt.file.read('test/expected/txt/relative_false.txt');

      test.equal(actual, expected, 'Injection must be done');

      test.done();
  },

  relative_string_txt: function(test) {
      test.expect(1);

      var actual = grunt.file.read('test/fixtures/web/txt/relative_string.txt');
      var expected = grunt.file.read('test/expected/txt/relative_string.txt');

      test.equal(actual, expected, 'Injection must be done');

      test.done();
  }
};

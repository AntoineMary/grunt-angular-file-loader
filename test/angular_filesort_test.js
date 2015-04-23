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

exports.angular_file_loader = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/default_options.html');
    var expected = grunt.file.read('test/expected/default_options.html');

    test.equal(actual, expected, 'Injection must be done');

    test.done();
  },

  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/custom_options.html');
    var expected = grunt.file.read('test/expected/custom_options.html');
    test.equal(actual, expected, 'Injection must be done');

    test.done();
  }
};

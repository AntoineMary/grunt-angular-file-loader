/*
 * grunt-angular-filesort
 * https://bitbucket.org/AntoineMary/grunt-angular-filesort
 *
 * Copyright (c) 2015 Antoine Mary
 * Licensed under the MIT license.
 */

'use strict';

var ngDeps = require('ng-dependencies');
var toposort = require('toposort');
var path = require('path');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('angular_file_loader', 'Automatically sort and inject AngularJS app files depending on module definitions and usage', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            startTag: 'angular',
            endTag: 'endangular',
            scripts: null,
            relative: true
        });

        var ANGULAR_MODULE = 'ng';
        var pattern = null, sortedScripts = null;
        var supportedExt = {
            html: {
                recipe: '<script src="%" type="text/javascript"></script>',
                regex: new RegExp('<!--\\s*' + options.startTag + '\\s*-->(\\s*)(\\n|\\r|.)*?<!--\\s*' + options.endTag + '\\s*-->', 'gi'),
                comment: {
                    start : '<!-- ',
                    end : ' -->'
                }
            },
            jade: {
                recipe: 'script(src=\'%\' type=\'text/javascript\')',
                regex: new RegExp('//\\s*' + options.startTag + '(\\s*)(\\n|\\r|.)*?//\\s*' + options.endTag, 'gi'),
                comment: {
                    start : '// ',
                    end : ''
                }
            }
        };

        function whichPattern(filepath) {
            var extension = filepath.split('.');
            var file = grunt.file.read(filepath);

            for (var index in supportedExt) {
                if (supportedExt.hasOwnProperty(index) && file.search(supportedExt[index]["regex"]) > -1 && extension[extension.length-1] === index) {
                    return pattern = index;
                }
            }
            return pattern = null;
        }

        function isDependecyUsedInAnyDeclaration(dependency, ngDeps) {
            if (!ngDeps.modules) {
                return false;
            }
            if (dependency in ngDeps.modules) {
                return true;
            }
            return Object.keys(ngDeps.modules).some(function (module) {
                return ngDeps.modules[module].indexOf(dependency) > -1;
            });

        }

        function sortScripts() {
            var toSort = [];
            var angmods = [];
            var files = [];

            (grunt.file.expand(options.scripts)).forEach(function (file) {

                if (!grunt.file.exists(file)) {
                    grunt.log.error('Script file "' + file + '" not found.');

                } else if (grunt.file.read(file).length === 0) {
                    grunt.log.warn('Script file "' + file + '" is empty.');

                } else {
                    var deps = null;

                    try {
                        grunt.log.debug("Defining dependencies of " + file);
                        deps = ngDeps(grunt.file.read(file));

                        if (deps.modules) {
                            grunt.log.debug(deps.modules);

                            Object.keys(deps.modules).forEach(function (name) {
                                angmods[name] = file;
                            });
                        }

                        if (deps.dependencies) {
                            grunt.log.debug(deps.dependencies);
                            // Add each file with dependencies to the array to sort:
                            deps.dependencies.forEach(function (dep) {
                                if (isDependecyUsedInAnyDeclaration(dep, deps) || dep === ANGULAR_MODULE) {
                                    return;
                                }
                                toSort.push([file, dep]);
                            });
                        }

                        files.push(file);

                    } catch (error) {
                        grunt.warn.error('Error in parsing "' + file + '", ' + error.message);
                    }
                }
            });

            // Convert all module names to actual files with declarations:
            for (var i = 0; i < toSort.length; i++) {
                var moduleName = toSort[i][1];
                var declarationFile = angmods[moduleName];
                if (declarationFile) {
                    toSort[i][1] = declarationFile;
                } else {
                    // Depending on module outside stream (possibly a 3rd party one),
                    // don't care when sorting:
                    toSort.splice(i--, 1);
                }
            }

            return toposort.array(files, toSort).reverse();
        }

        function resolvePath(from, to){
            if(options.relative === true){
                return path.relative(path.dirname(from), to);
            }
            return to;
        }

        function inject(file) {
            if (sortedScripts === null) {
                sortedScripts = sortScripts();
            }

            var splitedFile = (grunt.file.read(file)).split(supportedExt[pattern]["regex"]);

            splitedFile[1] = supportedExt[pattern]["comment"]["start"] + options.startTag + supportedExt[pattern]["comment"]["end"]+'\n';
            sortedScripts.forEach(function (script){
                splitedFile[1] += ((supportedExt[pattern]["recipe"]).replace('%', resolvePath(file, script)))+'\n';
            });
            splitedFile[2] = supportedExt[pattern]["comment"]["start"] + options.endTag + supportedExt[pattern]["comment"]["end"];

            try {
                grunt.file.write(file, splitedFile.join(''));
                grunt.log.ok(sortedScripts.length + " insert into" + file);
            } catch (error){
                throw grunt.log.error("Can't write in" + file + " error : "+ error);
            }
        }

        if (options.scripts == null) {
            grunt.log.error('No scripts to inject');
        } else {
            this.files.forEach(function (filegroup) {
                grunt.log.debug("Iteration though file group");

                filegroup.src.filter(function (file) {
                    grunt.log.debug("Working on " + file);

                    // Test if file exist
                    if (!grunt.file.exists(file)) {
                        grunt.log.error('Source file "' + file + '" not found.');
                        return false;
                    }
                    // Test if file is not empty
                    else if (grunt.file.read(file).length === 0) {
                        grunt.log.error('Source file "' + file + '" is empty.');
                        return false;
                    }
                    // Test if it contain the pattern
                    else if (whichPattern(file) == null) {
                        grunt.log.error('Source file "' + file + '" do not contain correct injection block.');
                    } else {
                        inject(file);
                    }
                });
            });
        }
    });
};
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

var ANGULAR_MODULE = 'ng';
var supportedExt = {
    html : { recipe : '<script src="%" type="text/javascript"></script>' },
    jade : { recipe : 'script(src=\'%\' type=\'text/javascript\')' }
};

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('angular_file_loader', 'Automatically sort and inject AngularJS app files depending on module definitions and usage', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            startTag : 'angular',
            endTag: 'endangular'
        });

        var files = [];
        var angmods = {};
        var toSort = [];

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            grunt.log.debug("Iteration though file group");

            // Iterate over each file of each group.
            file.src.filter(function (filepath) {
                grunt.log.debug("Iteration though file of group");

                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;

                } else {
                    // Test if file is empty
                    if (grunt.file.read(filepath).length === 0) {
                        grunt.log.error('Source file "' + filepath + '" is empty.');
                        return false;
                    }

                    var deps;
                    try {
                        grunt.log.debug("Defining deps");
                        deps = ngDeps(grunt.file.read(filepath));
                    } catch (error) {
                        grunt.warn.error('Error in parsing "' + filepath + '", ' + error.message);
                        return false;
                    }

                    if (deps.modules) {
                        grunt.log.debug("deps.modules");
                        Object.keys(deps.modules).forEach(function (name) {
                            angmods[name] = filepath;
                        });
                    }

                    if (deps.dependencies) {
                        grunt.log.debug("deps.dependencies");
                        // Add each file with dependencies to the array to sort:
                        deps.dependencies.forEach(function (dep) {
                            if (isDependecyUsedInAnyDeclaration(dep, deps)) {
                                return;
                            }
                            if (dep === ANGULAR_MODULE) {
                                return;
                            }
                            toSort.push([filepath, dep]);
                        });
                    }

                    files.push(filepath);
                }
            });

            // Convert all module names to actual files with declarations:
            grunt.log.debug("Conversion");
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

            //Sort `files` with `toSort` as dependency tree:
            grunt.log.debug("Sorting");
            var sortedFiles = toposort.array(files, toSort).reverse();

            if (!grunt.file.exists(file.dest)) {
                throw grunt.util.error('Destination file "' + file.dest + '" not found.');
            } else {

                var ext = (file.dest).split('.');
                var injection;

                // test if extension is supported
                if(grunt.util.kindOf(supportedExt[ext[ext.length-1]]) === "object"){
                    grunt.log.debug("extension find");
                    var page = grunt.file.read(file.dest).toString();
                    // chose right extension
                    switch(ext[ext.length-1]){
                        case "html":
                            var htmlRegExp = new RegExp('<!--\\s*' + options.startTag + '\\s*-->(\\s*)(\\n|\\r|.)*?<!--\\s*' + options.endTag + '\\s*-->', 'gi');
                            if(page.search(htmlRegExp) > -1){
                                injection = prepareInject(page, options.startTag, options.endTag, sortedFiles, htmlRegExp, "html");
                            } else {
                                grunt.warn('Can\'t find inject block');
                            }
                            break;

                        case "jade":
                            var jadeRegExp = new RegExp('//-\\s*' + options.startTag + '(\\s*)(\\n|\\r|.)*?//-\\s*' + options.endTag, 'gi');
                            if(page.search(jadeRegExp) > -1){
                                injection = prepareInject(page, options.startTag, options.endTag, sortedFiles, jadeRegExp, "jade");
                            } else {
                                grunt.warn('Can\'t find inject block');
                            }
                            break;
                    }

                    // Injection in file
                    grunt.file.write(file.dest, injection);
                    grunt.log.ok(files.length +' files append to ' + file.dest);

                } else {
                    grunt.util.error('File extension : '+ ext[ext.length-1] +' not supported.');
                }

            }

        });
    });

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

    function prepareInject(page, startTag, endTag, fileToInject, regExp, type){
        var parts = page.split(regExp);
        grunt.log.debug("Injection between : "+startTag +" and "+endTag);

        switch(type){
            case "html" :
                // Opentag
                parts[1] = '<!-- '+ startTag +' -->\n';
                fileToInject.forEach(function(file){
                    parts[1] += (supportedExt.html.recipe).replace("%", file)+"\n";
                });

                // CloseTag
                parts[2] = '<!-- '+ endTag +' -->';
                break;

            case "jade" :
                // Opentag
                parts[1] = '\\- '+ startTag +'\n';
                fileToInject.forEach(function(file){
                    parts[1] += (supportedExt.html.recipe).replace("%", file)+"\n";
                });

                // CloseTag
                parts[2] = '\\'+ endTag;
                break;

        }
        return parts.join("");
    }
};

# grunt-angular-file-loader

> Automatically sort and inject AngularJS app files depending on module definitions and usage

[![License][license-image]][license-url]
[![Version][version-image]][version-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][dependencies-image]][dependencies-url]
[![npm](https://img.shields.io/npm/dm/grunt-angular-file-loader.svg?style=flat)](https://www.npmjs.com/package/grunt-angular-file-loader)

## Getting Started
This plugin requires Grunt `~0.4.5`

It is based on [`gulp-angular-filesort`](https://github.com/klei/gulp-angular-filesort) and [`wiredep`](https://github.com/taptapship/wiredep)

It will sort and inject javascript angular files into files that you need (HTML and Jade are currently supported) 
if some javascript files are not for angular they will be added at the end of the files list.

/!\ Jade is recognised by the plugin but the injection don't handle right indent. HTML is preferred for inject

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-file-loader --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-file-loader');
```

## The "angularFileLoader" task

### Overview
In your project's Gruntfile, add a section named `angularFileLoader` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  angularFileLoader: {
    options: {
      scripts: ['*.js']
    },
    your_target: {
      src: ['index.html']
    },
  },
});
```

Before running task

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <!-- endangular -->
  </body>
</html>
```

```jade
doctype 
html(lang='en')
  head
    meta(charset='UTF-8')
    title Document
  body
    // angular
    // endangular
```

After task run

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <script src="app.js" type="text/javascript"></script>
    <script src="module.js" type="text/javascript"></script>
    <script src="module-controller.js" type="text/javascript"></script>
    <script src="..." type="text/javascript"></script>
    <!-- endangular -->
  </body>
</html>
```

```jade
doctype 
html(lang='en')
  head
    meta(charset='UTF-8')
    title Document
  body
    // angular
    script(src='app.js', type='text/javascript')
    script(src='module.js', type='text/javascript')
    script(src='module-controller.js', type='text/javascript')
    script(src='...', type='text/javascript')
    // endangular
```
### Options

#### options.startTag
Type: `String`
Default value: `'angular'`

Tag used to identify the block's beginning where files had to be injected.

#### options.endTag
Type: `String`
Default value: `'endangular'`

Tag used to identify the block's ending where files had to be injected.

#### options.scripts
Type: `String | Array | Object`
Default value: `'null'`

Script Files to inject into html/jade file.

#### options.relative
Type: `Boolean | String`
Default value: `'true'`

When set to `true` path to script files will be rewritten to be relative to html/jade file.
When set to `false` path to script files will be rewritten to be relative to Grunfile.js
When set to a String path to script files will be rewritten to be relative to the specified file/directory

### Usage Examples

For all examples below consider the following structure :
```
.
├───.tmp
│   └─── index.html
│
├─── app
│    └─── scripts
│         ├─── app
│         │    ├─── part1
│         │    │    ├─── part1.js
│         │    │    └─── part1.controller.js
│         │    ├─── part2
│         │    │    ├─── part2.js
│         │    │    └─── part2.controller.js
│         │    └─── part3
│         │         ├─── part3.js
│         │         └─── part3.controller.js
│         │
│         ├─── components
│         │    ├─── directive
│         │    │    ├─── directive1.js
│         │    │    └─── directive1.controller.js
│         │    ├─── service
│         │    │    └─── service.js
│         │    ├─── filter
│         │    │    └─── filter.js
│         │    └─── factory
│         │         └─── factory.js
│         │
│         └─── app.js
│     
└─── Gruntfile.js
```

#### Default Options
In this example, the default options are used, after `./app/scripts/**/*.js` had been sorted they are injected into `index.html` between `<!-- angular -->` and `<!-- endangular -->`

```js
grunt.initConfig({
  angularFileLoader: {
    options: {
      scripts: ['app/scripts/**/*.js']
    },
    default_options: {
      src : '.tmp/index.html'
    },
  },
});
```

Before

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <!-- endangular -->
  </body>
</html>
```

After

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <script src="../app/scripts/app/app.js" type="text/javascript"></script>
    <script src="../app/scripts/components/factory/factory.js" type="text/javascript"></script>
    <script src="../app/scripts/components/filter/filter.js" type="text/javascript"></script>
    <script src="../app/scripts/components/directive/directive.js" type="text/javascript"></script>
    <script src="../app/scripts/components/directive/directive.controller.js" type="text/javascript"></script>
    <script src="../app/scripts/components/service/service.js" type="text/javascript"></script>
    <script src="../app/scripts/app/part1/part1.js" type="text/javascript"></script>
    <script src="../app/scripts/app/part1/part1.controller.js" type="text/javascript"></script>
    <script src="../app/scripts/app/part2/part2.js" type="text/javascript"></script>
    <script src="../app/scripts/app/part2/part2.controller.js" type="text/javascript"></script>
    <script src="../app/scripts/app/part3/part3.js" type="text/javascript"></script>
    <script src="../app/scripts/app/part3/part3.controller.js" type="text/javascript"></script>
    <!-- endangular -->
  </body>
</html>
```

#### relative : false
In this example, the relative options is set to `false`, after `./app/scripts/**/*.js` had been sorted they are injected into `index.html` between `<!-- angular -->` and `<!-- endangular -->`

```js
grunt.initConfig({
  angularFileLoader: {
    options: {
      scripts: ['app/scripts/**/*.js']
      relative: false
    },
    default_options: {
      src : '.tmp/index.html'
    },
  },
});
```

Before

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <!-- endangular -->
  </body>
</html>
```

After

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <script src="app/scripts/app/app.js" type="text/javascript"></script>
    <script src="app/scripts/components/factory/factory.js" type="text/javascript"></script>
    <script src="app/scripts/components/filter/filter.js" type="text/javascript"></script>
    <script src="app/scripts/components/directive/directive.js" type="text/javascript"></script>
    <script src="app/scripts/components/directive/directive.controller.js" type="text/javascript"></script>
    <script src="app/scripts/components/service/service.js" type="text/javascript"></script>
    <script src="app/scripts/app/part1/part1.js" type="text/javascript"></script>
    <script src="app/scripts/app/part1/part1.controller.js" type="text/javascript"></script>
    <script src="app/scripts/app/part2/part2.js" type="text/javascript"></script>
    <script src="app/scripts/app/part2/part2.controller.js" type="text/javascript"></script>
    <script src="app/scripts/app/part3/part3.js" type="text/javascript"></script>
    <script src="app/scripts/app/part3/part3.controller.js" type="text/javascript"></script>
    <!-- endangular -->
  </body>
</html>
```

#### relative : false
In this example, the relative options is set to `app` directory, after `./app/scripts/**/*.js` had been sorted they are injected into `index.html` between `<!-- angular -->` and `<!-- endangular -->`

```js
grunt.initConfig({
  angularFileLoader: {
    options: {
      scripts: ['app/scripts/**/*.js']
      relative: 'app'
    },
    default_options: {
      src : '.tmp/index.html'
    },
  },
});
```

Before

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <!-- endangular -->
  </body>
</html>
```

After

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- angular -->
    <script src="scripts/app/app.js" type="text/javascript"></script>
    <script src="scripts/components/factory/factory.js" type="text/javascript"></script>
    <script src="scripts/components/filter/filter.js" type="text/javascript"></script>
    <script src="scripts/components/directive/directive.js" type="text/javascript"></script>
    <script src="scripts/components/directive/directive.controller.js" type="text/javascript"></script>
    <script src="scripts/components/service/service.js" type="text/javascript"></script>
    <script src="scripts/app/part1/part1.js" type="text/javascript"></script>
    <script src="scripts/app/part1/part1.controller.js" type="text/javascript"></script>
    <script src="scripts/app/part2/part2.js" type="text/javascript"></script>
    <script src="scripts/app/part2/part2.controller.js" type="text/javascript"></script>
    <script src="scripts/app/part3/part3.js" type="text/javascript"></script>
    <script src="scripts/app/part3/part3.controller.js" type="text/javascript"></script>
    <!-- endangular -->
  </body>
</html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Upcoming improvement
*   Handle indentation when injecting

## Release History
*   1.0     First Release
*   1.1     Reformat Code + Add relative and scripts options
*   1.1.1   Correct relative path when injecting in multiple files
*   1.1.2   Convert task name to camelCase, relative options can now be a folder
*   1.1.3   Path error in windows solve, rewrite unit test

[build-image]:            http://img.shields.io/travis/AntoineMary/grunt-angular-file-loader.svg?style=flat
[build-url]:              http://travis-ci.org/AntoineMary/grunt-angular-file-loader

[dependencies-image]:     http://img.shields.io/gemnasium/AntoineMary/grunt-angular-file-loader.svg?style=flat
[dependencies-url]:       https://gemnasium.com/AntoineMary/grunt-angular-file-loader

[license-image]:          http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]:            LICENSE

[version-image]:          http://img.shields.io/npm/v/grunt-angular-file-loader.svg?style=flat
[version-url]:            https://npmjs.org/package/grunt-angular-file-loader
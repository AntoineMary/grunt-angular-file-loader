# grunt-angular-file-loader

> Automatically sort and inject AngularJS app files depending on module definitions and usage

## Getting Started
This plugin requires Grunt `~0.4.5`

It is based on [`gulp-angular-filesort`](https://github.com/klei/gulp-angular-filesort) and [`wiredep`](https://github.com/taptapship/wiredep)

It will sort and inject javascript angular files into file that you need (HTML and Jade are currently supported) 
if some javascript file are not for angular they will be added at the end of the files list


If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-file-loader --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-file-loader');
```

## The "angular_file_loader" task

### Overview
In your project's Gruntfile, add a section named `angular_file_loader` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  angular_file_loader: {
    options: {
      scripts: ['*.js']
    },
    your_target: {
      src: ['index.html]
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
    <script src="module.js" type="text/javascript"></script>
    <script src="module-controller.js" type="text/javascript"></script>
    <script src="..." type="text/javascript"></script>
    <!-- endangular -->
  </body>
</html>
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
Type: `Boolean`
Default value: `'true'`

When set to `true` path to script files will be rewritten to be relative to html/jade file.

### Usage Examples

#### Default Options
In this example, the default options are used, after sorting `angular-file1.js, angular-file2.js, other-file.js` will injected into `file.html` between `<!-- angular -->` and `<!-- endangular -->`

```js
grunt.initConfig({
  angular_filesort: {
    options: {},
    files: {
      'dest/file.html': ['scripts/angular-file1.js', 'scripts/angular-file2.js', 'scripts/other-file.js'],
    },
  },
});
```

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

#### Custom Options
In this example, the default options are used, after sorting `angular-file1.js, angular-file2.js, other-file.js` will injected into `file.html` between `<!-- othertag -->` and `<!-- otherendtag -->`

```js
grunt.initConfig({
  angular_filesort: {
    options: {
      startTag: 'othertag',
      endTag: 'otherendtag'
    },
    files: {
      'dest/file.html': ['scripts/angular-file1.js', 'scripts/angular-file2.js', 'scripts/other-file.js'],
    },
  },
});
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <!-- othertag -->
    <!-- otherendtag -->
  </body>
</html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
*   1.0     First Release
*   1.1     Reformat Code + Add relative and scripts options

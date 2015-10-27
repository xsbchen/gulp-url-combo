/*
 * Copyright (c) 2015 xsbchen
 * Licensed under the MIT license.
 */

'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var Combo = require('url-combo');

var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-url-combo';

module.exports = function (options) {
  options = options || {};

  var combo = new Combo(options);

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return;
    }

    var chunk = String(file.contents);
    chunk = combo.process(chunk);
    file.contents = new Buffer(chunk);

    cb(null, file);
  });
};

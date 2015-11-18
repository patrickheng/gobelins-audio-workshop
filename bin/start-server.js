'use strict';

// browser-sync start --server 'static' --files 'static/' --port 9000 --no-ui
var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync');
var url = require('url');

var folder = path.resolve( __dirname, "../static/" );

var routes = [

]

browserSync({
  files: 'static/',
  port: 3000,
  browser: 'google chrome',
  notify: true,
  reloadDelay: 1000,
  minify: true,
  open: false,
  server: {
    baseDir: './static',
    index: 'index.html',
    host: 'localhost',
    middleware: function(req, res, next) {

      if ( routes.indexOf( req.url ) !== -1 ) {
        req.url = "/index.html";
      }

      return next();
    }

  }
});

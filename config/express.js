/* jslint node:true */
'use strict';

var
  express   = require('express'),
  path      = require('path'),
  config    = require('./config'),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override")
;

module.exports = function(db) {
  var app = express();

  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static("./public"));
  app.use(bodyParser.urlencoded({
    extended:true
  }));

  // Setup Routes
  require('../api/routes/user.js')(app);

  return app;
};
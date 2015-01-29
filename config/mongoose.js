/* jshint node:true */
'use strict';

var
  config    = require('./config'),
  mongoose  = require('mongoose'),
  logger    = require('../logger.js')('mongoose')
;

module.exports = function() {
  mongoose.connect(config.db);
  var db =  mongoose.connection;
  db.on('error', function(err) {
    logger.error('Error on database connection: ', err.message);
  });

  // Add Models Below:
  require('../api/models/user');

  return db;
};
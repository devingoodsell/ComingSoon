/* jslint node:true */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var
  express = require('./config/express'),
  mongoose  = require('./config/mongoose'),
  app = express(mongoose())
;

app.listen(3000, function() {
    console.log('HTTP Server running on port 3000');
});

module.exports = app;
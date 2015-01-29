/* jslint node:true */

var
  winston = require('winston'),
  config = require('./config/config')
;

module.exports = function(labelName) {
  return new winston.Logger({
    transports : [
      new winston.transports.Console({
        colorize: true,
        level: config.logLevel,
        label: labelName
      })
    ]
  });
};
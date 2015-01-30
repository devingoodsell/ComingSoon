process.env.NODE_ENV = process.env.NODE_ENV || 'test';

global.config     = require('../config/config');
global.request    = require('request');
global.chai       = require('chai');
global.expect     = chai.expect;
global.should     = chai.should();
global.utilities  = require('./utilities');
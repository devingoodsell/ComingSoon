/* jslint node:true */
'use strict';

var
  User        = require('../models/user'),
  logger      = require('../../logger.js')('userController'),
  mailchimp   = require('../utilities/mailchimp'),
  async       = require('async')
;

function formatError(fields, message) {

}

exports.create = function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  if (!user)
    return res.status(400).json({ error: 'A user with firstname, lastname, and email is required.' });
  else if (!user.firstName)
    return res.status(400).json({ error: 'A user with firstname is required.' });
  else if (!user.lastName)
    return res.status(400).json({ error: 'A user with lastname is required.' });
  else if (!user.email)
    return res.status(400).json({ error: 'A user with email is required.' });

  // Save the user to the database and subscribe to mailchimp
  async.series([
    function saveUser(callback) {
      user.save(callback);
    },
    function subscribeEmail(callback) {
      mailchimp.addSubscriber(user, callback);
    }
  ],
  function(err) {
    if (err) {
      logger.error('Error encountered on user save: ', err);
      if (err.code && err.code === 11000)
        return res.status(400).json({ error: 'The email already exists in our system.'});
      else
        return res.status(500).json(err);
    }

    res.status(201).send();
  });
};

/*
 * Provided to DI inject a new model for testing if desired. This should
 * never be used by a production environment.
 */
exports.dependencyInjectModel = function(model) {
  User = model;
};
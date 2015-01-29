/* jslint node:true */
'use strict';

var
  config    = require('../../config/config'),
  mailchimp = require('mailchimp-api'),
  mc        = new mailchimp.Mailchimp(config.mailChimp.key),
  logger    = require('../../logger.js')('mailchimp')
;

exports.addSubscriber = function addSubscriber(user, callback) {
  mc.lists.subscribe(
    {
      id: config.mailChimp.userList,
      email: { email : user.email },
      merge_vars : {
        firstName : user.firstName || '',
        lastName : user.lastNsame || ''
      },
      double_optin: false,
    }, function(data) {
      logger.info("mail chimp - User successfully subscribed on MailChimp. Email: ",data.email);
      return callback(null,data);
    }, function(err) {
      if(err.error) {
        if (err.error.name === "List_AlreadySubscribed")
          return callback(null,null);
        else
          logger.warn("mail chimp - Error subscribing email to MailChimp. Reason: ", err.error);
      } else {
        logger.warn("mail chimp - Error subscribing email to MailChimp - email = ", user.email);
      }

      return callback(err,null);
    }
  );
};
var userController = require('../controllers/user');

module.exports = function(app) {
  // API ROUTES
  app.route('/api/users')
    .post(userController.create);

};
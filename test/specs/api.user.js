var USER_URL = config.apiUrl + 'users/';

describe('api.user.spec.js', function() {
  describe('when user POST, aka create,', function() {
    describe('when request has invalid email', function() {
      before(function(done) {
        requestBody = {firstName: 'Bob', lastName: 'Johnson', email: 'bob'};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
          response = res;
          done(err);
        });
      });
      it('should return a 500', function() {
        expect(response.statusCode).to.equal(500);
      });
    });
    describe('when request has missing first name', function() {
      before(function(done) {
      requestBody = {lastName: 'Johnson', email: 'bobjohnson@gmail.com'};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
          response = res;
          done(err);
        });
      });
      it('should return a 500', function() {
        expect(response.statusCode).to.equal(500);
      });
    });
    describe('when request is valid', function() {
      before(function(done) {
      var requestBody = {firstName: 'Bob', lastName: 'Johnson', email: utilities.generateRandomEmail()};
        request.post({ url: USER_URL, body: requestBody, json: true}, function(err, res, body) {
          response = res;
          result = body;
          done(err);
        });
      });
      it('should return a 201 created', function() {
        expect(response.statusCode).to.equal(201);
      });
      it('should return the new user in the body with id.', function() {
        expect(result).to.have.property('id');
      });
    });
  });
});
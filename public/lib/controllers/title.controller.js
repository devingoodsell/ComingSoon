angular.module('comingSoon').controller('titleController', [
  '$scope', '$http', '$window', '$route', '$routeParams',
  function($scope, $http, $window, $route, $routeParams) {
    $scope.isSubscribed = false;
    $scope.subscribeUser = function() {
      var user = $scope.user;
      $http.post('/api/users', user)
      .success(function() {
        isSubscribed = true;
      }).error(function(data) {
        $scope.errorMessage = data.error || data;
      });
    };
  }
]);
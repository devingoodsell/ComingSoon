var comingSoonApp = angular.module('comingSoon', ['ngRoute'])
.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/lib/views/title.view.html',
      controller: 'titleController'
    });
});
var profilesApp = angular.module('profiles', ['ngRoute'])
.config(function($routeProvider, $locationProvider, $controllerProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/js/collector/views/collector.view.html',
      controller: 'mainCollectorController'
    });
});
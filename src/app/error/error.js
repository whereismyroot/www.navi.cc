angular.module('error', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/error', {
    templateUrl:'templates/error/error.tpl.html',
    controller:'ErrorCtrl'
  });

}])

.controller('ErrorCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
  console.log('ErrorCtrl', $location, $route);
  //$route.current.$route.template = "<div>Loaded</div>";
}]);

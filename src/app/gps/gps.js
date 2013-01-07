angular.module('gps', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/gps', {
    templateUrl:'gps/gps.tpl.html',
    controller:'GPSViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('GPSViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

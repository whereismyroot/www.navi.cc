angular.module('help', ['ngRoute', 'resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl:'templates/help/help.tpl.html',
    controller:'HelpViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('HelpViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

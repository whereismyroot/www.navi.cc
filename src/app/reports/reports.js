angular.module('reports', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl:'reports/reports.tpl.html',
    controller:'ReportsViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('ReportsViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

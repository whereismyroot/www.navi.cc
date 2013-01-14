angular.module('config.system.data', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config/:skey/data', {
    templateUrl:'config/data/data.tpl.html',
    controller:'ConfigDataCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('ConfigDataCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);
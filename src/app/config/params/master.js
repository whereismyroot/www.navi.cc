angular.module('config.system.params.master', ['resources.account', 'resources.params', 'app.filters'])

.config(['$routeProvider', function ($routeProvider) {
  var skey = ['$route', function($route){
    console.log(['=== route', route]);
    return $route.current.params.skey;
  }];
  // console.log(['=== skey', skey]);
  $routeProvider.when('/config/:skey/params/master', {
    templateUrl:'templates/config/params/master.tpl.html',
    controller:'ConfigParamsMasterCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      params:['Params', '$route', function (Params, $route) {
        return Params.get({skey:$route.current.params.skey});
      }]
    }
  });
}])

.controller('ConfigParamsMasterCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', '$location', function ($scope, $route, $routeParams, account, params, $location) {
  console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account, params);
  $scope.account = account;
  $scope.skey = $routeParams['skey'];
  $scope.params = params;

  $scope.steps = ['one', 'two', 'three', 'four'];
  $scope.step = 0;

  $scope.isCurrentStep = function(step) {
    return $scope.step === step;
  };

  $scope.setCurrentStep = function(step) {
    $scope.step = step;
  };

  $scope.setNextStep = function(step) {
    $scope.step += 1;
  };

  $scope.getCurrentStep = function() {
    return $scope.steps[$scope.step];
  };

  $scope.confirm = function() {
    $location.path("/config/" + $scope.skey + "/params");
  };

  // Defaults
  $scope.config = {
    in1: "off"
  };

  $("[rel=tooltip]").tooltip();
}]);


angular.module('config.system.params', ['resources.account', 'app.filters'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config/:skey/params', {
    templateUrl:'config/params/params.tpl.html',
    controller:'ConfigParamsCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'account', function ($scope, $route, $routeParams, account) {
  console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account);
  $scope.account = account;
  //$scope.route = route;
  $scope.skey = $routeParams['skey'];
  $scope.filtered = true;
  //$scope.system = account.account.systems[$scope.skey];
  $scope.params = [];
  for(var i=0; i<100; i++) {
    $scope.params.push({
      'index': i,
      'name': 'name.' + i,
      'desc': 'Описание ' + i,
      'type': 'INT16',
      'value': i % 10,
      'default': i % 10,
      'queue': null,
      'filter': (i%10) === 1
    });
  }
  $scope.isFiltered = function(item) {
    if(!$scope.filtered) {
      return true;
    }
    return item.filter;
  };
  $("[rel=tooltip]").tooltip();
}])

.filter('isFiltered', function(){
  return function(value, status){
    console.log('isFiltered:', value, status);
    if(!status) {
      return value;
    }
    var out = [];
    for(var i=0; i<value.length; i++){
      if(value[i].filter) {
        out.push(value[i]);
      }
    }
    return out;
  };
});

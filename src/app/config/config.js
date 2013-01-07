angular.module('config', ['resources.account', 'ui', 'config.system.params'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config', {
    templateUrl:'config/config.tpl.html',
    controller:'ConfigViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('ConfigViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;

  $scope.deleteenable = false;
  $scope.addform = false;
  $scope.onAdd = function(imei){
    console.log('onAdd', imei, account);

    account.systemadd(imei);
    $scope.addform = false;
  };
  $scope.onSort = function(){
    console.log('onSort');
    account.systemsort();
  };
  $scope.onoff = function(el){
    $scope.account.account.systems[el].off = !$scope.account.account.systems[el].off;
    console.log('onoff', el);
  };
  $scope.del = function(el){
    //delete el;
    console.log('del', el);
    account.systemdel(el);
    //$scope.account.systems[]
  };
  var sortableEle = $('ul.config_sys_list').sortable({
    handle: ".msp",
    revert: true,
    scrollSpeed: 5,
    cursor: 'crosshair',
    placeholder: 'ui-sortable-placeholder2',
    stop: $scope.onSort
  });
  console.log("===", $('ul.config_sys_list'));


  $scope.manageSystem = function (skey) {
    $location.path('/config/' + skey);
  };

  $scope.manageSystemData = function (skey) {
    $location.path('/config/' + skey + '/data');
  };

  $scope.manageSystemParams = function (skey) {
    $location.path('/config/' + skey + '/params');
  };
  $("[rel=tooltip]").tooltip();
}]);

angular.module('config', ['resources.account', 'resources.system', 'ui', 'config.system.params', 'directives.lists'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config', {
    templateUrl:'config/config.tpl.html',
    controller:'ConfigViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      system: ['System', function (System) {
        return System;
      }]
    }
  });
}])

.controller('ConfigViewCtrl', ['$scope', '$location', 'account', 'system', function ($scope, $location, account, system) {
  console.log(["ConfigViewCtrl:", system]);

  $scope.account = account;

  $scope.deleteenable = false;
  //$scope.addform = false;
  $scope.onAdd = function(imei){
    console.log('onAdd', imei, account, document.getElementById('config_add_file'));

    account.systemadd([imei]);
    $scope.addform = false;
  };

  $scope.onFromFiles = function(){
    console.log('multiple add', $scope.files);
    account.systemadd($scope.files);
    $scope.addform = false;
  };

  $scope.onSort = function(){
    console.log('onSort');
    account.systemsort();
  };

  $scope.onChange = function(el){
    console.log('onChange', el, $scope.account.account.systems[el].desc);
    system.change_desc(el, $scope.account.account.systems[el].desc);
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

  /*$scope.$watch('account', function(){
    console.log('$watch:account');
  }, true);*/

  $scope.manageSystem = function (skey) {
    $location.path('/config/' + skey);
  };

  $scope.manageSystemData = function (skey) {
    $location.path('/config/' + skey + '/data');
  };

  $scope.manageSystemParams = function (skey) {
    $location.path('/config/' + skey + '/params');
  };
  //$("[rel=tooltip]").tooltip();
}]);

angular.module('config', ['ngRoute','resources.account', 'resources.system', 'ui.sortable', 'config.system.params', 'directives.lists', 'services.sysManage'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config', {
    templateUrl:'templates/config/config.tpl.html',
    controller:'ConfigViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        return Account.get();
      }],
      systems: ['System', function (System) {
        return System.getall();
      }]
    }
  });
}])

.controller('ConfigViewCtrl', ['$scope', '$location', 'account', 'systems', 'System', 'sysManage', function ($scope, $location, account, systems, System, sysManage) {
  // console.log(["ConfigViewCtrl:", system]);

  $scope.account = account;
  $scope.systems = systems;
  $scope.sysManage = sysManage;

  $scope.deleteenable = false;

  $scope.onFromFiles = function(){
    console.log('multiple add', $scope.files);
    account.systemadd($scope.files);
    $scope.addform = false;
  };

  $scope.onoff = function(el){
    // console.log('onoff', el);
    var off = $scope.account.account.off;
    if(off.hasOwnProperty(el)) {
      var s = systems[el];
      s.hide = false;
      delete off[el];
    } else {
      var s = systems[el];
      s.hide = true;
      off[el] = true;
    }
    // $scope.systems[el].off = !$scope.systems[el].off;
    account.$patch('off');
  };

  $scope.sortableOptions = {
    stop: function(e, ui) {
      account.$patch('skeys');
    },
    handle: ".msp",
    revert: true,
    scrollSpeed: 5,
    cursor: 'crosshair',
    placeholder: 'ui-sortable-placeholder2',
    axis: 'y'
  };

  $scope.del = function(el){
    //delete el;
    console.log('del', el);
    account.systemdel(el);
    //$scope.account.systems[]
  };
  // var sortableEle = $('ul.config_sys_list').sortable({
  //   handle: ".msp",
  //   revert: true,
  //   scrollSpeed: 5,
  //   cursor: 'crosshair',
  //   placeholder: 'ui-sortable-placeholder2',
  //   end: $scope.onSort
  // }).on('update', function(ev){
  //   console.log('on update', ev);
  // });

  /*$scope.$watch('account', function(){
    console.log('$watch:account');
  }, true);*/

  /*$scope.manageSystem = function (skey) {
    $location.path('/config/' + skey);
  };

  $scope.manageSystemData = function (skey) {
    $location.path('/config/' + skey + '/data');
  };

  $scope.manageSystemParams = function (skey) {
    $location.path('/config/' + skey + '/params');
  };*/
  //$("[rel=tooltip]").tooltip();
}]);

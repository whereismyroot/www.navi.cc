angular.module('logs', ['resources.account', 'resources.logs'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/logs', {
    templateUrl:'templates/logs/logs.tpl.html',
    controller:'LogsViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      logs:['Logs', function(Logs){
        return Logs;
      }]
    }
  })
  .when('/logs/:skey', {
    templateUrl:'templates/logs/logs.tpl.html',
    controller:'LogsViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      logs:['Logs', function(Logs){
        return Logs;
      }]
    }
  });
}])

.controller('LogsViewCtrl', ['$scope', '$location', '$routeParams', 'account', 'logs', function ($scope, $location, $routeParams, account, logs) {
  $scope.account = account;
  // $scope.skey = "";
  var startskey = $routeParams['skey'];
  // if(account.skey != startskey){
  //   account.setSkey(startskey);
  // }
  $scope.skey = account.skey;

  $scope.logs = logs;
  $scope.comment = "Данные еще не получены";
  //$scope.skey = account.account.skeys[0];
  $scope.onSelect = function(){
    console.log('selected');
  };

  var reload = function(){
    console.log('reload', $scope.account.skey);
    if((!$scope.account.skey) || ($scope.account.skey === "")) {
      return;
    }
    $scope.logs.logs = [];
    $scope.comment = "Данные загружаются...";
    console.log(['change skey', $scope.account.skey, $scope.account]);
    $scope.logs.get($scope.account.skey, $scope.account.akey, function(res){
      if(res === 0) {
        $scope.comment = "Нет событий.";
      } else {
        $scope.comment = "Неизвестно";
      }
    });
  };

  $scope.onReload = function(){
    reload();
  };

  $scope.onSysSelect = function(){
    console.log('skey=', $scope.skey, $location);
    if($scope.skey){
      $location.path('/logs/' + $scope.skey);
    } else {
      $location.path('/logs');
    }
    // account.setSkey($scope.skey);
    // $location.path('/logs/' + $scope.account.skey);
    // reload();
  }
  reload();

  // $scope.$watch('skey', function(skey){
  //   console.log('skey=', skey);
  //   // reload();

  //   if($scope.skey !== startskey) {
  //     if(angular.isUndefined(skey) || (skey == null)){
  //       $location.path('/logs');
  //     } else {
  //       $location.path('/logs/' + $scope.skey);
  //       // $scope.$apply();
  //     }
  //   }
  //   reload();
  // });

  $("[rel=tooltip]").tooltip();
}]);

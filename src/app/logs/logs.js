angular.module('logs', ['resources.account', 'resources.logs'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/logs', {
    templateUrl:'logs/logs.tpl.html',
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

.controller('LogsViewCtrl', ['$scope', '$location', 'account', 'logs', function ($scope, $location, account, logs) {
  $scope.account = account;
  $scope.skey = "";
  $scope.logs = logs;
  $scope.comment = "Данные еще не получены";
  //$scope.skey = account.account.skeys[0];
  $scope.onSelect = function(){
    console.log('selected');
  };

  var reload = function(){
    if((!$scope.skey) || ($scope.skey === "")) {
      return;
    }
    $scope.logs.logs = [];
    $scope.comment = "Данные загружаются...";
    console.log(['change skey', $scope.skey, $scope.account]);
    $scope.logs.get($scope.skey, $scope.account.akey, function(res){
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

  $scope.$watch('skey', function(skey){
    reload();

    /*
    var logs = [];
    for(var i=0; i<100; i++) {
      logs.push({
        "dt": 0,
        "text": "Hello"
      });
    }
    $scope.logs.logs = logs;
    */
  });
  $("[rel=tooltip]").tooltip();
}]);

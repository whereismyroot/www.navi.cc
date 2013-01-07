angular.module('login', ['resources.account', 'app.filters', 'directives.modal'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl:'login/login.tpl.html',
    controller:'LoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('LoginViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
  $scope.test = "Hello, it's test.";
  $scope.showLoginForm = true;
  $scope.user = {};

  $scope.clearForm = function() {
    $scope.user = {};
  };

  $scope.showLogin = function(msg) {
    $scope.authError = msg;
    $scope.showLoginForm = true;
  };

  $scope.cancelLogin = function() {
    //AuthenticationService.cancelLogin();
    $scope.showLoginForm = false;
  };

  $scope.hideLogin = function() {
    $scope.showLoginForm = false;
  };

  $scope.onLogout = function(){
      account.logout();
      $scope.user = {};
  };
  $scope.onLogin = function(user, pass){
    $scope.loginform = false;
    console.log('Login;', $scope, user, pass);

    if((user === "")||(!user)) {
      return;
    }
    account.login(user, pass);
    /*
    $http.get(apiserver + "/api/account/new?domain=" + encodeURIComponent(location.hostname) +
      "&user=" + encodeURIComponent($scope.account.newusername) +
      "&password=" + encodeURIComponent($scope.account.newpass)
    ).success(function(data){
      console.log('login data=', data);
      localStorage.setItem('akey', data.account.akey);
      if(data.result === "created") {
        $scope.label = "Создана новая учетная запись. Вход через 3 секунды.";
        setTimeout(function(){location.reload();}, 3000);
      } else {
        $scope.label = "Вход в учетную запись...";
        setTimeout(function(){location.reload();}, 1000);
      }


      //$rootScope.account = data;
    });
    */
    return false;
  };

  //console.log('LoginViewCtrl controller', $scope, $location, account);
}]);

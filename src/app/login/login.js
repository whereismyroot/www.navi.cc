angular.module('login', ['resources.account', 'app.filters', 'directives.modal', 'directives.language'])

.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl:'login.tpl.html',
    controller:'LoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });

  $routeProvider.when('/test-login', {
    //templateUrl:'templates/en/login.tpl.html',
    template: '<div>Loading...</div>',
    controller:'TestLoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        return Account;
      }]
    }
  });

}])

.controller('TestLoginViewCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
  console.log('TestLoginViewCtrl', $location, $route);
  $route.current.$route.template = "<div>Loaded</div>";
}])

.controller('LoginViewCtrl', ['$scope', '$location', 'account', '$templateCache', function ($scope, $location, account, $templateCache) {
  $scope.account = account;
  $scope.test = "Hello, it's test.";
  $scope.showLoginForm = true;
  $scope.user = {};

  console.log('$templateCache=', $templateCache.get('templates/ru/login.tpl.html'));

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
    console.log('Login:', $scope, user, pass);

    if((user === "")||(!user)) {
      return;
    }
    account.login(user, pass);

    return false;
  };

  $scope.onChange = function(model) {
    console.log('onChange', model);
  };

  /*
  $scope.$watch(function(){
      if($scope.account.account) {
        return $scope.account.account.name;
      } else {
        return null;
      }
    }, function(el, old){
      if(!$scope.account.account) {
        return;
      }
      console.log('bind fire', el, $scope.account.account.name, old);
    }
  );
  */
  $scope.$watch('account.account.name', function(newValue, oldValue){
    console.log(['bind fire', newValue, oldValue]);
    if(newValue && oldValue) {
      $scope.account.update({"$set": {name: newValue}});
    }
  });

  //console.log('LoginViewCtrl controller', $scope, $location, account, i18n);
}]);

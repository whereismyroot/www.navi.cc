angular.module('login', ['ngRoute', 'resources.account', 'resources.system', 'app.filters', 'directives.modal', 'i18n', 'directives.language'])

.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/login', {
    // templateUrl:'login.tpl.html',
    templateUrl:'templates/login/login.tpl.html',
    controller:'LoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account.get();
      }],
      system:['System', function (System) {
        //TODO: sure for fetch only one for the current user
        return System.getall();
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

  $routeProvider.otherwise({ redirectTo: '/error' });

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

  console.log('LoginViewCtrl', account);

  // console.log('$templateCache=', $templateCache.get('templates/ru/login.tpl.html'));

  // $scope.showLogin = function(msg) {
  //   $scope.authError = msg;
  //   $scope.showLoginForm = true;
  // };

  // $scope.cancelLogin = function() {
  //   //AuthenticationService.cancelLogin();
  //   $scope.showLoginForm = false;
  // };

  // $scope.hideLogin = function() {
  //   $scope.showLoginForm = false;
  // };

  $scope.onLogout = function(){
      account.logout().then(function(){
        console.log('$location=', $location);
        // $location.path();
        location.reload();
      });
      $scope.user = {};
  };

  // $scope.onLogin = function(user, pass){
  //   $scope.loginform = false;
  //   console.log('Login:', $scope, user, pass);

  //   if((user === "")||(!user)) {
  //     return;
  //   }
  //   account.login(user, pass);

  //   return false;
  // };

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
  $scope.$watch('account.account.title', function(newValue, oldValue){
    console.log(['bind fire', newValue, oldValue]);
    if(newValue && oldValue && (newValue !== oldValue)) {
      $scope.account.update({title: newValue});
    }
  });

  //console.log('LoginViewCtrl controller', $scope, $location, account, i18n);
}]);



angular.module('app', [
  'resources.account',
  'login',
  'map',
  'logs',
  'gps',
  'reports',
  'config',
  'help',
  'services.i18nNotifications',
  'services.httpRequestTracker',
  'templates']);



angular.module('app').constant('API_SERVER', {
  baseUrl: ((location.hostname === 'localhost') || (location.hostname === 'bigbrother')) ? 'http://localhost:8183/' : 'http://api.newgps.navi.cc/'
});

//TODO: move those messages to a separate module
angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError':'Route change error',
  'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
  'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
  'crud.user.save.error':"Something went wrong when saving a user...",
  'login.error.notAuthorized':"Необходима авторизация чтобы пользоваться сервисом.",
  'login.error.notAuthenticated':"Необходима авторизация чтобы пользоваться сервисом.",
  'login.newUser':'Создана новая учетная запись {{name}}.'
});

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo:'/login'});
}]);

angular.module('app').controller('AppCtrl', ['$scope', '$location', 'i18nNotifications', 'localizedMessages', function($scope, location, i18nNotifications) {
//angular.module('app').controller('AppCtrl', ['$scope', function($scope) {

  $scope.notifications = i18nNotifications;
  $scope.location = location;

  $scope.removeNotification = function (notification) {
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]);

//angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'notifications', 'httpRequestTracker', function ($scope, $location, $route, notifications, httpRequestTracker) {
angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'Account', 'httpRequestTracker', function ($scope, $location, $route, Account, httpRequestTracker) {
  $scope.location = $location;
  $scope.account = Account;

  $scope.home = function () {
    /*if ($scope.currentUser.isAuthenticated()) {
      $location.path('/map');
    } else {*/
      $location.path('/login');
    //}
  };

  $scope.isNavbarActive = function (navBarPath) {
    //console.log('isNavbarActive(', navBarPath, $location, '123');
    //return navBarPath === $location.path();
    return $location.path().match(navBarPath);
  };

  $scope.hasPendingRequests = function () {
    return httpRequestTracker.hasPendingRequests();
  };
}]);

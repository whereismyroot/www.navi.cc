angular.module('map', ['resources.account', 'directives.gmap'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl:'map/map.tpl.html',
    controller:'MapCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: need to know the current user here
        return Account;
      }]
    }
  });
}])

.controller('MapCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;

  /*setTimeout(function(){
    console.log('+++++++++', $('#datepicker'));*/
    $('#datepicker').datepicker({
        format: 'mm-dd-yyyy'
    });
  /*}, 1000);*/

}]);
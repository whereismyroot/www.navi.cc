angular.module('config.system.params', ['resources.account', 'resources.params', 'app.filters', 'config.system.params.master'])

.config(['$routeProvider', function ($routeProvider) {
  var skey = ['$route', function($route){
    console.log(['=== route', route]);
    return $route.current.params.skey;
  }];
  // console.log(['=== skey', skey]);
  $routeProvider.when('/config/:skey/params', {
    templateUrl:'templates/config/params/params.tpl.html',
    controller:'ConfigParamsCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      // params:['Params', '$route', function (Params, $route) {
      //   //return Params.get({skey:$route.current.params.skey});
      // }],
      params:['Params', function (Params) {
        //return Params.get({skey:$route.current.params.skey});
        return Params;
      }],
      system: ['System', function (System) {
        return  System;
      }]
    }
  });
}])

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', 'system', function ($scope, $route, $routeParams, account, params, system) {
  console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account, params);
  $scope.account = account;
  $scope.skey = $routeParams['skey'];
  $scope.params = params;
  $scope.filtered = true;

  $scope.params.get($route.current.params.skey).then(function(data){
    console.log('params success', data);
  });

  $scope.isFiltered = function(item) {
    if(!$scope.filtered) {
      return true;
    }
    return item.filter;
  };


  /*$scope.onChange = function(el){
    // console.log('onChange', el);
    // console.log('onChange', el, $scope.account.account.systems[el].desc);
    system.change_desc(el, $scope.account.account.systems[el].desc);
  };*/
  $scope.onChangeValue = function(k){
    params.set(k);  // Отправим значение в очередь на сервер
  };

  $scope.setqueue = function(k){
    // console.log('setqueue', k);
    params.set(k);  // Отправим значение в очередь на сервер
  }

  $scope.cancelqueue = function(k){
    params.cancel(k);  // Отправим на сервер команду отменить изменение параметра
  }

  $scope.stopqueue = function(){
    params.cancelall();  // Отправим на сервер команду отменить все изменения
    /*for (var k in params.value) {
      $scope.cancelqueue(k);
    };*/
  }

  $scope.filtered = function(items) {
    var result = {};
    angular.forEach(items, function(value, key) {
        if($scope.showall || value.hasOwnProperty('primary')) {
          result[key] = value;
        }
    });
    return result;
}

  $("[rel=tooltip]").tooltip();
}])

.filter('isFiltered', function(){
  return function(value, status){
    console.log('isFiltered:', value, status);
    if(!status) {
      return value;
    }
    var out = [];
    for(var i=0; i<value.length; i++){
      if(value[i].filter) {
        out.push(value[i]);
      }
    }
    return out;
  };
});


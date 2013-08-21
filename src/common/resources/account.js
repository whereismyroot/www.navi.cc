// angular.module('resources.account', ['services.i18nNotifications']);
angular.module('resources.account', []);

// angular.module('resources.account').factory('Account', ['SERVER', '$http', 'i18nNotifications', '$q', '$timeout', function (SERVER, $http, i18nNotifications, $q, $timeout) {
angular.module('resources.account').factory('Account', ['SERVER', '$http', '$q', '$timeout', 'Connect', '$rootScope', 'System', function (SERVER, $http, $q, $timeout, Connect, $rootScope, System) {

  var Account = {
    'name': 'noname-noface-nonumber',
    'access_token': null,
    'withCredentials': SERVER.api_withCredentials,
    'account': null,
    'hint': null,
    'isAuthenticated': false,
    skey: null    // Выбранный skey. Используется как глобальное значение сквозь все страницы
  };

  if(!SERVER.api_withCredentials) {
    Account.access_token = localStorage.getItem('access_token');
    if(Account.access_token){
      $http.defaults.headers.common["Authorization"] = Account.access_token;
    } else {
      delete $http.defaults.headers.common["Authorization"];
    }
  }

  if(Account.access_token || SERVER.api_withCredentials){
    //$http.defaults.headers.common["Authorization"] = Account.access_token;
    $http({
      method: 'GET',
      url: SERVER.api + "/account"
    }).success(function(data){
      console.log('login data=', data);

      if(data.account) {
        Account.account = data.account;
        Account.systemsUpdate();
        Account.access_token = data.access_token;
        Account.isAuthenticated = true;
      }
    });
  } else {
    //i18nNotifications.pushSticky('login.error.notAuthenticated', 'error', {}, {rejection: 'aaa'});
  }

  //console.log('-- resources.account.Account access_token=', Account.access_token, i18nNotifications, $q);

  Account.systemsUpdate = function(){
    // TODO! Требуется унификация обработки массива систем
    angular.forEach(Account.account.systems, function(s, key){
      if(s.params && s.params.fuel){
        // console.log('fuel=', s.params.fuel, System.fuelrecalc(s.params.fuel));
        s.params.fuelarray = System.fuelrecalc(s.params.fuel);
      }
    });
  }

  Account.logout = function(){
    console.log('Account.logout');
    Account.access_token = null;
    Account.account = null;
    Account.isAuthenticated = false;

    if(SERVER.api_withCredentials) {
      $http({
        method: "POST",
        url: SERVER.api + "/logout"
      }).success(function(data){});
    } else {
      localStorage.removeItem('access_token');
      if($http.defaults.headers.common["Authorization"]){
        delete $http.defaults.headers.common["Authorization"];
      }
    }

  };

  Account.login = function(username, password){
    console.log('Account.login', username, password);
    $http({
      method: "POST",
      url: SERVER.api + "/login",
      params: {username: username, password: password}
    }).success(function(data){
      console.log('login data=', data, $http.defaults.headers);

      if(!SERVER.api_withCredentials) {
        localStorage.setItem('access_token', data.access_token);
        $http.defaults.headers.common["Authorization"] = access_token;
      }

      Account.access_token = data.access_token;
      Account.account = data.account;
      Account.systemsUpdate();

      Account.isAuthenticated = true;
      if(data.result === "created") {
        // i18nNotifications.pushSticky('login.newUser', 'warning', {name: data.account.username});
        console.warn("TODO: Add notification here");
        //$scope.label = "Создана новая учетная запись. Вход через 3 секунды.";
        //setTimeout(function(){location.reload();}, 3000);
      } else {
        //$scope.label = "Вход в учетную запись...";
        //setTimeout(function(){location.reload();}, 1000);
      }

      //$rootScope.account = data;
    });
  };

  Account.systemadd = function(imeis){
    $http({
      method: 'POST',
      //withCredentials: SERVER.api_withCredentials,
      url: SERVER.api + "/account/systems",
      data: {cmd: 'add', imeis: imeis}
    }).success(function(data){
      console.log('return data=', data);
      var systems = data.systems;
      if(systems.length === 1) {
        if(data.systems[0].result === "already"){
          alert('Вы уже наблюдаете за этой системой.');
          return;
        }
        if(data.systems[0].result === "notfound"){
          alert('Система на найдена. Возможные причины: \n1. Система еще не выходила на связь.\n2. Проверте правильность ввода IMEI.');
          return;
        }
      }
      for(var i=0; i<systems.length; i++) {
        var item = systems[i];
        if(item.result === "added") {
          Account.account.skeys.push(item.system.key);
          Account.account.systems[item.system.key] = angular.copy(item.system);
          Account.systemsUpdate();
        }
      }
      //$scope.addform = false;
      //alert('Система ни разу не выходила на связь. Но она все равно была добавлена в список наблюдения.');
    });
  };

  Account.systemsort = function(){
    $http({
      method: 'POST',
      //withCredentials: SERVER.api_withCredentials,
      url: SERVER.api + "/account/systems",
      data: {cmd: 'sort', skeys: Account.account.skeys}
    }).success(function(data){
      console.log('return data=', data);
    });
  };

  Account.systemdel = function(skey){
    $http({
      method: 'DELETE',
      //withCredentials: SERVER.api_withCredentials,
      url: SERVER.api + "/account/systems/" + encodeURIComponent(skey)
    }).success(function(data){
      console.log('return data=', data);
      var i = Account.account.skeys.indexOf(skey);
      Account.account.skeys.splice(i, 1);
      delete Account.account.systems[skey];
    });
  };


  Account.update = function(param){
    //console.log('Account.update', param);
    $http({
      method: 'PATCH',
      url: SERVER.api + "/account",
      data: JSON.stringify(param)
    }).success(function(data){
      console.log('return data=', data);
    });
  };

  //$scope.access_token = access_token;
  var updater = Connect.updater.on('update_dynamic', function(msg) {
      console.log('==Update dynamic', msg);
      if(msg.skey in Account.account.systems){
        if(!Account.account.systems[msg.skey].dynamic){
          Account.account.systems[msg.skey].dynamic = {};
        }
        angular.extend(Account.account.systems[msg.skey].dynamic, msg.dynamic);
      }
      $rootScope.$apply();
      //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
      //lastpos.setPosition(newpos);
  });

  Account.setSkey = function(skey){
    Account.skey = skey;
  };

  // Account.skey = function(){
  //   return Account.skey;
  // };

  return Account;
}]);

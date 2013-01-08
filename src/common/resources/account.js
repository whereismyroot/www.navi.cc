angular.module('resources.account', ['services.i18nNotifications']);

angular.module('resources.account').factory('Account', ['SERVER', '$http', 'i18nNotifications', function (SERVER, $http, i18nNotifications) {

  var akey = localStorage.getItem('akey');
  console.log('-- resources.account.Account akey=', akey, i18nNotifications);
  var Account = {
    'name': 'noname-noface-nonumber',
    'akey': akey,
    'account': null,
    'hint': null,
    'isAuthenticated': false
  };

  /*Account.isAuthenticated = function(){
    return (Account.akey != null);
  };*/

  Account.logout = function(){
    console.log('Account.logout');
    Account.akey = null;
    Account.account = null;
    Account.isAuthenticated = false;
    localStorage.removeItem('akey');
    //location.reload();
  };

  Account.login = function(user, pass){
    console.log('Account.login', user, pass);
    $http.get(SERVER.api + "api/account/new?domain=" + encodeURIComponent(location.hostname) +
      "&user=" + encodeURIComponent(user) +
      "&password=" + encodeURIComponent(pass)
    ).success(function(data){
      console.log('login data=', data);
      localStorage.setItem('akey', data.account.akey);
      Account.akey = data.account.akey;
      Account.account = data.account;
      Account.isAuthenticated = true;
      if(data.result === "created") {
        i18nNotifications.pushSticky('login.newUser', 'warning', {name: data.account.name});
        //$scope.label = "Создана новая учетная запись. Вход через 3 секунды.";
        //setTimeout(function(){location.reload();}, 3000);
      } else {
        //$scope.label = "Вход в учетную запись...";
        //setTimeout(function(){location.reload();}, 1000);
      }

      //$rootScope.account = data;
    });
  };

  Account.systemadd = function(imei){
    $http.get(SERVER.api + "api/account/systems/add" +
      "?akey=" + encodeURIComponent(Account.account.akey) +
      "&imei=" + encodeURIComponent(imei)
    ).success(function(data){
      console.log('return data=', data);
      if(data.result === "already"){
        alert('Вы уже наблюдаете за этой системой.');
        return;
      }
      if(data.result === "notfound"){
        alert('Система на найдена. Возможные причины: \n1. Система еще не выходила на связь.\n2. Проверте правильность ввода IMEI.');
        return;
      }
      Account.account.skeys.push(data.system.key);
      Account.account.systems[data.system.key] = angular.copy(data.system);
      //$scope.addform = false;
      //alert('Система ни разу не выходила на связь. Но она все равно была добавлена в список наблюдения.');
    });
  };

  Account.systemsort = function(){
      $http.post(SERVER.api + "api/account/systems/sort" +
      "?akey=" + encodeURIComponent(Account.account.akey), {skeys: Account.account.skeys}
    ).success(function(data){
      console.log('return data=', data);
    });
  };

  Account.systemdel = function(skey){
    $http.get(SERVER.api + "api/account/systems/del" +
      "?akey=" + encodeURIComponent(Account.account.akey) +
      "&skey=" + encodeURIComponent(skey)
    ).success(function(data){
      console.log('return data=', data);
      var i = Account.account.skeys.indexOf(skey);
      Account.account.skeys.splice(i, 1);
      delete Account.account.systems[skey];
    });
  };

  if(akey){
    $http.get(SERVER.api + "api/account/get?akey=" + akey).success(function(data){
      console.log('login data=', data);
      //notify.pushSticky('Hello');

      if(data.account) {
        Account.account = data.account;
        Account.akey = data.account.akey;
        Account.isAuthenticated = true;
      }
    });
  } else {
    //i18nNotifications.pushSticky('login.error.notAuthenticated', 'error', {}, {rejection: 'aaa'});
  }

  //$scope.akey = akey;

  return Account;
}]);

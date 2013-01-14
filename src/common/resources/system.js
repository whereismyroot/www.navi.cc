angular.module('resources.system', ['services.i18nNotifications'])

.factory('System', ['SERVER', '$http', 'i18nNotifications', '$q', '$timeout', function (SERVER, $http, i18nNotifications, $q, $timeout) {
    var System = {};

    System.change_desc = function(skey, desc){
        console.log(['System.change_desc', skey, desc]);
        $http.get(SERVER.api + "api/system/changedesc/" + encodeURIComponent(skey) +
          "?desc=" + encodeURIComponent(desc)
        ).success(function(data){
          console.log('login data=', data);
        });
    };

    return System;
}]);

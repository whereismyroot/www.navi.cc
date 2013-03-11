angular.module('resources.system', [])

.factory('System', ['SERVER', '$http', function (SERVER, $http) {
    var System = {};

    System.change_desc = function(skey, desc){
        console.log(['System.change_desc', skey, desc]);
        $http({
            method: 'PATCH',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/system/" + encodeURIComponent(skey),
            data: JSON.stringify({desc: desc})
        }).success(function(data){
          console.log('login data=', data);
        });

        /*
        $http({
            method: 'GET',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/system/changedesc/" + encodeURIComponent(skey) +
          "?desc=" + encodeURIComponent(desc)
        }).success(function(data){
          console.log('login data=', data);
        });
        */

    };

    return System;
}]);

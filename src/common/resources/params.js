angular.module('resources.params', ['services.connect', 'ngResource'])

.factory('Params', ['SERVER', '$resource', 'Connect', function (SERVER, $resource, Connect) {

    console.log('-- resources.params.Params', SERVER, Connect, SERVER.api.replace(/:\d/, '\\$&'));

    var Params = $resource(SERVER.api.replace(/:\d/, '\\$&') + "/params/:skey/:controller",
    {
        skey: "@skey",
        controller: "@controller",
        apikey: "4f679234645"
    },
    {
        set: {
            method: "POST",
            params: {
                controller: "set"
            }
        }
    });

    //return $resource(SERVER.api.replace(/:\d.*\//, ':port/') + "api/params/:skey/:controller",
    //return $resource('http://localhost\\:8183/' + "api/params/:skey/:controller",
    return Params;
}]);

if(0){
    var Params = {
        'params': []
    };

    /*
    // Подпишемся на события изменения параметров
    var updater = Connect.updater.on('add_log', function(msg) {
        //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
        Logs.logs.push(msg.log);
        console.log(['Logs add_log message:', msg, Logs]);
        $rootScope.$apply();
        //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
        //lastpos.setPosition(newpos);
    });*/


    Params.get = function(skey, akey, callback){
        console.log('Params.get');
        $http.get(SERVER.api + "api/params/get/" + encodeURIComponent(skey) +
            "&akey=" + encodeURIComponent(akey)
        ).success(function(data){
            console.log('data=', data);
            /*Logs.logs = data.logs;

            if(data.logs.length === 0){
                callback(0);
            } else {
                callback(-1);
            }*/
            /*
            if(data.result === "created") {
            //i18nNotifications.pushSticky('login.newUser', 'warning', {name: data.account.name});
            //$scope.label = "Создана новая учетная запись. Вход через 3 секунды.";
            //setTimeout(function(){location.reload();}, 3000);
            } else {
            //$scope.label = "Вход в учетную запись...";
            //setTimeout(function(){location.reload();}, 1000);
            }
            */

            //$rootScope.account = data;
        });
    };

    return Params;
}

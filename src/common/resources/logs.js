angular.module('resources.logs', ['services.connect'])

.factory('Logs', ['SERVER', '$http', 'Connect', '$rootScope', function (SERVER, $http, Connect, $rootScope) {

    console.log('-- resources.logs.Logs', SERVER, Connect);
    var Logs = {
        'logs': []
    };

    var updater = Connect.updater.on('add_log', function(msg) {
        //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
        Logs.logs.push(msg.log);
        console.log(['Logs add_log message:', msg, Logs]);
        $rootScope.$apply();
        //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
        //lastpos.setPosition(newpos);
    });


    Logs.get = function(skey, akey, callback){
        console.log('Logs.get');
        $http.get(SERVER.api + "api/logs/get/" + encodeURIComponent(skey) +
            "?akey=" + encodeURIComponent(akey)
        ).success(function(data){
            console.log('data=', data);
            Logs.logs = data.logs;

            if(data.logs.length === 0){
                callback(0);
            } else {
                callback(-1);
            }
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

    return Logs;

}]);


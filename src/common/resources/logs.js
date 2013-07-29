angular.module('resources.logs', ['services.connect'])

.factory('Logs', ['SERVER', '$http', 'Connect', '$rootScope', function (SERVER, $http, Connect, $rootScope) {

    console.log('-- resources.logs.Logs', SERVER, Connect);
    var Logs = {
        'logs': []
    };

    var updater = Connect.updater.on('add_log', function(msg) {
        //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
        Logs.logs.unshift(msg.log);
        console.log(['Logs add_log message:', msg, Logs]);
        $rootScope.$apply();
        //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
        //lastpos.setPosition(newpos);
    });


    Logs.get = function(skey, akey, callback){
        console.log('Logs.get');
        $http({
            method: 'GET',
            //withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/logs/" + encodeURIComponent(skey)
        }).success(function(data){
            console.log('data=', data);
            Logs.logs = data.logs;

            if(data.logs.length === 0){
                callback(0);
            } else {
                callback(-1);
            }
        });
    };

    return Logs;

}]);


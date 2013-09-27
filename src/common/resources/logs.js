angular.module('resources.logs', ['services.connect'])

.factory('Logs', ['SERVER', '$http', 'Connect', '$rootScope', '$q', function (SERVER, $http, Connect, $rootScope, $q) {

    console.log('-- resources.logs.Logs', SERVER, Connect);
    var Logs = {
        data: []
    };

    // var updater = Connect.updater.on('add_log', function(msg) {
    //     //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
    //     Logs.logs.unshift(msg.log);
    //     console.log(['Logs add_log message:', msg, Logs]);
    //     $rootScope.$apply();
    //     //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
    //     //lastpos.setPosition(newpos);
    // });


    Logs.get = function(skey){
        var defer = $q.defer();
        console.log('Logs.get');
        $http({
            method: 'GET',
            //withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/systems/" + encodeURIComponent(skey) + "/logs"
        }).success(function(data){
            console.log('data=', data);
            Logs.data = data;
            defer.resolve(Logs);
        });
        return defer.promise;
    };

    return Logs;

}]);


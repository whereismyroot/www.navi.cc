angular.module('services.connect', [])

.factory('Connect', ["$rootScope", 'SERVER', function($rootScope, SERVER) {
    var shared = {
        scope: $rootScope.$new(true)
    };

    if(0){
    shared.updater = {};
    shared.updater.queue = {};

    shared.updater.on = function(msg, foo){
        shared.updater.queue[msg] = shared.updater.queue[msg] || [];
        shared.updater.queue[msg].push(foo);
        // console.log(["shared.updater.on(", msg, foo, shared.updater.queue]);
        return foo;
    };

    shared.updater.process = function(msg){
        var i;
        if(shared.updater.queue[msg.message]){
            for(i in shared.updater.queue[msg.message]){
                shared.updater.queue[msg.message][i](msg);
            }
        }
        if(shared.updater.queue['*']){
            for(i in shared.updater.queue['*']){
                shared.updater.queue['*'][i](msg);
            }
        }
        // console.log(["shared.updater.process(", msg, shared.updater.queue]);
    };

    shared.updater.remove = function(msg, updater){
        var index = shared.updater.queue[msg].indexOf(updater);
        shared.updater.queue[msg].splice(index, 1);
        console.log(["===> TODO!!!! Not implemented.", updater, shared.updater.queue, index]);
    };
    }

    // console.log("===> Connect:init");


    //var ws_server = "ws://gpsapi04.navi.cc:8888/socket";
    //var ws_server = "http://gpsapi04.navi.cc:8888/socket";
    //baseUrl: ((location.hostname === 'localhost') || (location.hostname === 'bigbrother')) ? 'http://localhost:8183/' : 'http://api.newgps.navi.cc/'

    //var ws_server = "http://localhost:8888/socket";
    var ws_server = SERVER.channel;

    var connect = function(timeout){
        if(timeout>60) { timeout = 60; }
        console.log('connecting to ' + ws_server + '...');

        //new SockJS(ws_server)
        var ws = $rootScope.ws = new WebSocket(ws_server);
        // var ws = $rootScope.ws = new SockJS(ws_server);
        ws.onopen = function () {
            console.log('WebSocket connected');
            //$('#main').append('<div>Opened</div>');
            //ws.send("First msg");
            var message = {
                "message": "ping"
            };
            ws.send(JSON.stringify(message));
        };
        ws.onmessage = function(event) {
            var msg = JSON.parse(event.data);
            console.log('onmessage:', msg);

            var resource = msg.resource;
            var id = msg.id;

            shared.scope.$emit('update', msg);

            // shared.updater.process(msg);
        };
        ws.onclose = function(event) {
            console.log('WebSocket disconnected');
            setTimeout(function(){
                connect(timeout*2);
            }, timeout*1000);
        };
    };
    connect(1);

    //shared.message = '';

    /*shared.send = function(msg) {
        this.message = msg;
        //this.broadcastItem();
        $rootScope.$broadcast('channel_data', 'aaa');
    };
    */

    /*sharedService.broadcastItem = function() {
        $rootScope.$broadcast('channel_data');
    };*/

    shared.on = function(resource, callback){
        shared.scope.$on('update', function(event, message){
            if(message.messages){
                var m = message.messages;
                m.map(function(msg){
                    // console.log("Connect:message", msg);
                    if(msg.resource === resource){
                        callback(msg);
                    }
                });
            }
        });
    }

    return shared;
}]);


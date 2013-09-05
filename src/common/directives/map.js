// Enable the visual refresh
google.maps.visualRefresh = true;

angular.module('directives.gmap', ['services.connect', 'services.eventmarker', 'services.lastmarker'/*, 'ui'*/])

.directive('gmap', ["Connect", "EventMarker", function(Connect, EventMarker) {

    // TODO! Необходима унификация для поддержки как минимум Google Maps и Leaflet

    var link = function(scope, element, attrs) {
        var path = null;
        var gmarker = null;
        // console.log('map directive: link', scope, element, Connect);
        //element.innerHTML="<div>map</div>";

        // Временное решение для доступа к главной карте
        //window["config"] = {};
        // var config = window["config"] = {};

        var prev_config = localStorage.getItem('map.config');
        if(prev_config){
            prev_config = JSON.parse(prev_config);
        } else {
            prev_config = {
                zoom: 6,
                center: [48.370848, 32.717285],
                typeId: google.maps.MapTypeId.ROADMAP
            };
        }

        var latlng = new google.maps.LatLng(48.397, 34.644);
        var myOptions = {
            center: new google.maps.LatLng(prev_config.center[0], prev_config.center[1]),
            mapTypeId: prev_config.typeId,
            zoom: prev_config.zoom
        };
        var map = new google.maps.Map(element[0], myOptions);

        // config.map = map;

        var saveMapState = function() {
            localStorage.setItem('map.config', JSON.stringify({
                center: [map.getCenter().lat(), map.getCenter().lng()],
                zoom: map.getZoom(),
                typeId: map.getMapTypeId()
            }));
        };

        google.maps.event.addListener(map, 'idle', saveMapState);
        google.maps.event.addListener(map, 'maptypeid_changed', saveMapState);

        google.maps.event.addListener(map, 'zoom_changed', function(){
            // console.log('zoom_changed');
            //PathRebuild();
        });

        var lastpos = new google.maps.Marker({
          map: map,
          position: latlng,
          title: 'Rabbit',
          //icon: goldStar,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: "yellow",
            fillOpacity: 0.8,
            strokeColor: "green",
            strokeWeight: 4,
            scale: 5
          },
          animation: null // google.maps.Animation.BOUNCE
        });

        var center = new google.maps.MarkerImage(
            '/img/marker/marker-center.png?v=1',
            new google.maps.Size(32, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 15)
        );

        gmarker = new google.maps.Marker({
            //position: new google.maps.LatLng(data.stops[i].p[0], data.stops[i].p[1]),
            map: map,
            title: 'Положение',
            icon: center,
            draggable: false
        });

        var eventmarker = new EventMarker(map);

        //config.updater.add('last_update', function(msg) {
        var updater = Connect.updater.on('last_update', function(msg) {
            //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
            console.log('MAP last_update = ', msg);
            var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
            lastpos.setPosition(newpos);
        });

        /*console.log('config = ', config);
        scope.$on('channel_data', function(event, more){
            //var message = Connect.message;
            console.log(['Map on change_last', more]);
        });*/
        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time ofter the DOM element was removed.
        element.bind('$destroy', function() {
            console.log('MAP:destroy element');
            Connect.updater.remove('last_update', updater);
            //$timeout.cancel(timeoutId);
        });

        // var marker_begin = new google.maps.MarkerImage(
        //     '/img/marker/marker-begin.png',
        //     new google.maps.Size(30, 20),
        //     new google.maps.Point(0, 0),
        //     new google.maps.Point(15, 19)
        // );
        // var marker_end = new google.maps.MarkerImage(
        //     '/img/marker/marker-end.png',
        //     new google.maps.Size(30, 20),
        //     new google.maps.Point(0, 0),
        //     new google.maps.Point(15, 19)
        // );
        // var begin_marker = null,
        //     end_marker = null;
        var eventmarkers = {};

//        if(scope.config.autobounds){
        function animateCircle() {
            var count = 0;
            offsetId = window.setInterval(function() {
                if(path === null) return;                // FIXME: Не самое элегантное решение
                if(!scope.config.animation) return;     // FIXME: Не самое элегантное решение

                count = (count + 1) % 50;

                var icons = path.get('icons');
                icons[0].offset = (count*2) + 'px';
                path.set('icons', icons);
          }, 250);
        }
        animateCircle();

        var showTrack = function(data){

            path = new google.maps.Polyline({
                path: data.track,
                strokeColor: 'blue',
                strokeOpacity: 0.5,
                strokeWeight: 5,
                // editable: true,
                icons: [{
                        icon: {
                          // path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          strokeColor: 'blue',
                          strokeWeight: 3,
                          scale: 3
                        },
                        offset: '50px',
                        repeat: '100px'
                    }],
                map: map
            });
            // console.log("scope.autobounds=", scope.autobounds);
            if(scope.config.autobounds){
                map.fitBounds(data.bounds);
            }

            var eventdata = [];
            var index = 1;
            for(i=0; i<data.events.length; i++){
                var e = data.events[i];
                var title = "?";
                if(e.type === "START"){
                    title = "S";
                } else if(e.type === "FINISH"){
                    title =  "F";
                } else {
                    title = "" + index;
                    index += 1;
                }
                eventdata.push({
                    title: title,
                    type: e.type,
                    pos: e.position,
                    point: e.point
                });
            }

            eventmarker.setData(eventdata);

        };

        // TODO. Не нравится мне чтото это. Заменить бып на событие.
        scope.$watch("track", function(data){
            // console.log(['MAP:track change', data]);
            // $scope.hideTrack();
            if(path) {
                path.setMap(null);
                path = null;
                eventmarker.setData([]);
            }
            if((data === null) || (data.points.length === 0) ) return;
            showTrack(data);
        });

        var lastmarker = new LastMarker(map);
        scope.$watch("account.account.systems", function(systems){
            if(!systems) return;
            var lastpos = [];
            //for(var i in systems){}
            angular.forEach(systems, function(sys, key){
                if(sys.dynamic && sys.dynamic.latitude){
                    // console.log('forEach ', sys, key);
                    lastpos.push({
                        key: key,
                        title: sys.desc,
                        dynamic: sys.dynamic
                    })
                }
            });
            lastmarker.setData(lastpos);
            // console.log('$watch account.account.systems', systems, lastpos);
        }, true);

        scope.$watch("center", function(center){
            if(center) {
                var pos = new google.maps.LatLng(center.lat, center.lon);
                map.panTo(pos);
                gmarker.setPosition(pos);
            }
        });

    };

    return {
        restrict: 'A',
        transclude: false,
        //scope: {last_pos: '='},
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        //template: '<div>MAP</div>',
        scope: {
            track: "=",
            config: "=",
            center: "=",
            account: "="
        },
        link: link/*,
        controller: ["$scope", "Connect", function($scope, Connect){
            console.log("map directive:controller", $scope, Connect);
        }]*/
    };
}]);

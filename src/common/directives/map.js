// Enable the visual refresh
google.maps.visualRefresh = true;

angular.module('directives.gmap', ['services.connect', 'services.eventmarker', 'services.lastmarker'/*, 'ui'*/])

.directive('gmap', ["Connect", "EventMarker", "LastMarker", function(Connect, EventMarker, LastMarker) {

    // TODO! Необходима унификация для поддержки как минимум Google Maps и Leaflet

    var link = function(scope, element, attrs) {
        var path = null,
            select = null;
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

          if(scope.config.centermarker){
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
        }
        scope.$watch("center", function(center){
            if(center) {
                var pos = new google.maps.LatLng(center.lat, center.lon);
                map.panTo(pos);
                if(scope.config.centermarker){
                    gmarker.setPosition(pos);
                }
            }
        });

        var eventmarker = new EventMarker(map);

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
            // console.log("showTrack", data);

            path = new google.maps.Polyline({
                path: data.track,
                strokeColor: 'blue',
                strokeOpacity: data.select ? 0.7 : 0.5,
                strokeWeight: data.select ? 2 : 5,
                // editable: true,
                icons: [{
                        icon: {
                          // path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          strokeColor: 'red',
                          strokeWeight: 2,
                          scale: 3
                        },
                        offset: '50px',
                        repeat: '100px'
                    }],
                map: map
            });

            if(data.select){
                var start = data.select.start_index;
                var stop = data.select.stop_index;
                var fragment = data.track.slice(start, stop);
                var bounds = new google.maps.LatLngBounds(fragment[0], fragment[0]);

                fragment.forEach(function(point){bounds.extend(point)});
                // console.log("bounds=", bounds);
                map.fitBounds(bounds);

                if(select) {
                    select.setPath(fragment);
                } else {
                    select = new google.maps.Polyline({
                        path: fragment,
                        strokeColor: 'green',
                        strokeOpacity: 0.6,
                        strokeWeight: 7,
                        map: map
                    });
                }
            } else {
                if(select) {
                    select.setPath([]);
                }
                // console.log("scope.autobounds=", scope.autobounds);
                if(scope.config.autobounds){
                    map.fitBounds(data.bounds);
                }
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
        }, true);
        // scope.$watch("track.select", function(data){
        //     console.log(['MAP:track select', data]);
        // });

        var lastmarker = new LastMarker(map);
        /*//TODO убрать это тестовые данные!!!
        ///////////////////////////////
        var lastpos = [{
            dynamic: {
                course: 64,
                csq: "22",
                dt: 1380475196,
                flags: "0",
                fsource: 3,
                fuel: 0,
                lastping: 1380475230,
                latitude: 48.509835,
                longitude: 34.58397166666666,
                sats: 8,
                speed: 0,
                vin: 4.2,
                vout: 2.39
            },
            icon: "caricon-truck",
            key: "MDEzMjI2MDAyNDM2NDIb",
            title: "HYUNDAI"
        },
                      {
            dynamic: {
                course: 64,
                csq: "22",
                dt: 1380475196,
                flags: "0",
                fsource: 3,
                fuel: 0,
                lastping: 1380475230,
                latitude: 48.809835,
                longitude: 34.58397166666666,
                sats: 8,
                speed: 80,
                vin: 4.2,
                vout: 10.39
            },
            icon: "caricon-truck",
            key: "MDEzMjI2MDAyNDM2NDIy",
            title: "test2"
        }];
        lastmarker.setData(lastpos);
        ///////////////////////////////*/

        scope.$watch("systems", function(systems){
            if(!systems) return;
            var lastpos = [];
            //for(var i in systems){}
            angular.forEach(systems, function(sys){
                if(sys.dynamic && sys.dynamic.latitude){
                    // console.log('forEach ', sys, key);
                    var off = scope.account.account.off;
                    if(!off.hasOwnProperty(sys.id)) {
                          lastpos.push({
                            key: sys.id,
                            title: sys.title,
                            icon: sys.icon,
                            dynamic: sys.dynamic
                        })
                    }
                }
            });
            lastmarker.setData(lastpos);
            // console.log('$watch account.account.systems', systems, lastpos);
        }, true);


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
            account: "=",
            systems: "="
        },
        link: link/*,
        controller: ["$scope", "Connect", function($scope, Connect){
            console.log("map directive:controller", $scope, Connect);
        }]*/
    };
}]);

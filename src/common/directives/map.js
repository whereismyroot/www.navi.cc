// Enable the visual refresh
google.maps.visualRefresh = true;


/*
    Маркер событий трека.
    Доступны маркеры:
    1. Стоянок.
    2. Остановок.
    3. Заправки.
    4. Сливы топлива.
    5. Тревожные события.
*/

function EventMarker(map)
{
    this.map = map;
    this.div = null;
    this.data = [];
    this.setMap(map);
}

EventMarker.prototype = new google.maps.OverlayView();

var SVG = {};
SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";

EventMarker.prototype.onAdd = function() {
    var div = this.div = document.createElement('div');

    div.setAttribute("class", "eventmarker");

    div.marker = this;
    var panes = this.getPanes();
    this.panes = panes;

    // var marker = d3.select(svg);

    if(0){
    var svg = document.createElementNS(SVG.ns, "svg:svg");
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", SVG.xlinkns);
    svg.setAttribute("width", '32px');
    svg.setAttribute("height", '32px');
    var marker = d3.select(svg);

    var title = this.title;

    var g = marker.append("g");

    g.append("path")
        .attr("d", "M 17,31 C 16,22 3,22 3,12 3,2 12,1 17,1 22,1 30,2 30,12 30,22 18,22 17,31 z")
        .attr("opacity", "0.5")
        .attr("fill", "#4C4")
        .attr("style", "stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1");
    g.append("text")
        .attr("x", "17")
        .attr("y", "18")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .text(title);

    // console.log("marker = ", title);

    div.appendChild(svg);
    }

    console.log('market div', div);
    panes.overlayImage.appendChild(div);
}

// EventMarker.prototype.setPosition = function(position) {
//     this.position = position;
//     // this.point = point;
//     this.draw();
// }
EventMarker.prototype.setData = function(data) {
    this.data = data;
    this.draw();
}

EventMarker.prototype.onRemove = function() {
    // this.div.removeChild(this.arrdiv);
    this.div.parentNode.removeChild(this.div);
    this.arrdiv = null;
    this.div = null;
}

EventMarker.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    if(!overlayProjection) return;

    // var divpx = overlayProjection.fromLatLngToDivPixel(this.position);
    var div = this.div;

    // var x = divpx.x;
    // var y = divpx.y;

    var track = d3.select(this.div);
    var points = track.selectAll(".track")
        .data(this.data);

    var div = points.enter().append("div")
        .attr("class", "track")
        // .attr("style", function(d){
        //     var px = overlayProjection.fromLatLngToDivPixel(d.pos);
        //     // console.log("d=", d, "px=", px);
        //     return "left: " + (px.x) + "px; top: " + (px.y) + "px";
        // })
        .on('click', function(d) {
            console.log(d3.select(this), d);
        });

    div.append("span").text(function(d){
        return d.title;
    });

    points
        .attr("class", function(d){
            return "track " + d.type;
        })
        .attr("style", function(d){
            var px = overlayProjection.fromLatLngToDivPixel(d.pos);
            // console.log("d=", d, "px=", px);
            return "left: " + (px.x) + "px; top: " + (px.y) + "px";
        });

    points.exit().remove();

    // console.log('draw', this.data, points.select("div.stop"));

    // div.style.left = divpx.x - 16 + 'px';
    // div.style.top = divpx.y - 32 + 'px';
}


angular.module('directives.gmap', ['services.connect', 'ui'])

.directive('gmap', ["Connect", function(Connect) {
    console.log('gmap:directive');

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
        var map = new google.maps.Map(element[0],
            myOptions);

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

        var marker_begin = new google.maps.MarkerImage(
            '/img/marker/marker-begin.png',
            new google.maps.Size(30, 20),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 19)
        );
        var marker_end = new google.maps.MarkerImage(
            '/img/marker/marker-end.png',
            new google.maps.Size(30, 20),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 19)
        );
        var begin_marker = null,
            end_marker = null;
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

        scope.$watch("track", function(data){
            // console.log(['MAP:track change', data]);
            // $scope.hideTrack();
            if(path) {
                path.setMap(null);
                path = null;
                eventmarker.setData([]);
            }
            if(data === null) return;
            showTrack(data);
        });

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
            center: "="
        },
        link: link/*,
        controller: ["$scope", "Connect", function($scope, Connect){
            console.log("map directive:controller", $scope, Connect);
        }]*/
    };
}]);

/*
    Маркеры последних известных положений ТС.
*/


angular.module('services.lastmarker', ['newgps.services'])

.factory('LastMarker', [
    "$freshmark",
    function($freshmark) {
        console.log(":: LastMarker:run", $freshmark);

        function LastMarker(map) {
            this.map = map;
            this.div = null;
            this.data = [];
            this.setMap(map);
        }

        LastMarker.prototype = new google.maps.OverlayView();

        var SVG = {};
        SVG.ns = "http://www.w3.org/2000/svg";
        SVG.xlinkns = "http://www.w3.org/1999/xlink";

        LastMarker.prototype.onAdd = function() {
            var div = this.div = document.createElement('div');

            div.setAttribute("class", "lastmarker");

            div.marker = this;
            var panes = this.getPanes();
            this.panes = panes;

            // var marker = d3.select(svg);

            // console.log('market div', div);
            panes.overlayImage.appendChild(div);
        }

        // LastMarker.prototype.setPosition = function(position) {
        //     this.position = position;
        //     // this.point = point;
        //     this.draw();
        // }
        LastMarker.prototype.setData = function(data) {
            // console.log('LastMarker.prototype.setData', data);
            this.data = data;
            this.draw();
        }

        LastMarker.prototype.onRemove = function() {
            // this.div.removeChild(this.arrdiv);
            this.div.parentNode.removeChild(this.div);
            this.arrdiv = null;
            this.div = null;
        }

        LastMarker.prototype.draw = function() {
            var overlayProjection = this.getProjection();
            if (!overlayProjection) return;

            // var divpx = overlayProjection.fromLatLngToDivPixel(this.position);
            var div = this.div;

            // var x = divpx.x;
            // var y = divpx.y;

            var track = d3.select(this.div);
            var points = track.selectAll(".marker")
                .data(this.data);

            var div = points.enter().append("div")
                .attr("class", "marker")
            // .attr("style", function(d){
            //     var px = overlayProjection.fromLatLngToDivPixel(d.pos);
            //     // console.log("d=", d, "px=", px);
            //     return "left: " + (px.x) + "px; top: " + (px.y) + "px";
            // })
            .on('click', function(d) {
                console.log(d3.select(this), d);
            });

            // div.append("i").attr("class", "icon-shopping-cart icon-large");
            div.append("i"); //.attr("class", function(d){ return d.icon + " icon-large"});
            div.append("span").attr("class", "title").text(function(d) {
                return d.title;
            });
            div.append("svg")
                .attr("style", 'position:absolute; left: -5px; top: -5px')
                .attr("width", 32)
                .attr("height", 32)
                .append("g")
                    .attr("transform", "translate(16, 16)")
                    .append('path')
                        .attr("d", "M -9,-10 0,-15 9,-10 0,-13 -9,-10")
                        .attr("style", "fill:none; stroke:black; stroke-width: 2px; stroke-linecap:round; stroke-linejoin:round; stroke-opacity:1");
                        // .attr("transform", "rotate(" + 90 + ")");


            points
                .attr("style", function(d) {
                    var px = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(d.dynamic.latitude, d.dynamic.longitude));
                    // console.log("d=", d, "px=", px);
                    return "left: " + (px.x) + "px; top: " + (px.y) + "px";
                })
                .select('svg g path')
                    .attr("transform", function(d){return "rotate(" + d.dynamic.course + ")"});

            points.select('i')
                .attr('class', function(d){
                    return d.icon + " icon-large " + $freshmark.get(d.dynamic).class;
                });

            points.exit().remove();

            // console.log('draw', this.data, points.select("div.stop"));

            // div.style.left = divpx.x - 16 + 'px';
            // div.style.top = divpx.y - 32 + 'px';
        }





        return LastMarker;
    }
]);
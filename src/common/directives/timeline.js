var width = 2500;
var timescale = 24 * 3600 / 2500.0;

angular.module('directives.timeline', [])

.directive('timeline', [function() {

    var zoom_factor = 0.67;
    var svg;

    var tz = (new Date()).getTimezoneOffset() / 60;

    var draw_data = function(data){

        var offset;
        // Начальное смещение. Предполагам что данные будут за одни сутки.
        if(data && (data.length > 0)){
            offset = (Math.floor((data[0].start.dt / 3600 - tz) / 24) * 24 + tz) * 3600;
        }
        // console.log("timeline data=", data, offset);

        var grid = d3.select(svg);

        var days = grid.selectAll(".move")
            .data(data);

        var g = days.enter().append("g")
            .on('click', function(d) {
                console.log(d3.select(this), d);
            });

        g.append("rect")
            // .attr("x", function(d) { return (d.start.dt - offset) * zoom_factor / timescale; })
            .attr("y", "16")
            // .attr("width", function(d) { return (d.stop - d.start) * zoom_factor; })
            // .attr("width", function(d) { return 10; })
            .attr("height", "16");

        // g.append("text")
        //     .attr("x", function(d) { return zoom_factor * (d.stop + d.start) / 2; })
        //     .attr("y", "28")
        //     // .attr("dx", "0")
        //     .attr("text-anchor", "middle")
        //     .text(function(d) { return (d.move?"Движение":"Стоянка") + d.counter; });

        days.select("rect") //.transition().duration(500)
            .attr("x", function(d) { return (d.start.dt - offset) * zoom_factor / timescale; })
            .attr("width", function(d) { return (d.stop.dt - d.start.dt) * zoom_factor / timescale; });

        // days.select("text").transition().duration(500)
        //     .attr("x", function(d) { return zoom_factor * (d.stop + d.start)/2; });
        //     // .attr("width", function(d) { return d.stop - d.start; });

        days
            .attr("class", function(d) {
                return "move " + d.type;
            });

        days.exit().remove();

    };

    var draw_axes = function(){
        // svg.width = "" + ~~(2500*zoom_factor) + "px";
        d3.select(svg).attr("width", width * zoom_factor);

        var data = d3.range(25).map(function(i){
            return {
                i: i,
                title: i<24?("" + ((i<10)?"0":"") + i + ":00"):"23:59"
            };
        });

        var grid = d3.select(svg);  //"#timeline svg"
        var grid_days = grid.selectAll(".day")
            .data(data);

        var g = grid_days.enter()
            .append("g")
            .attr("class", "day")
            .attr("transform", function(d) { return "translate(" + (d.i * 100 * zoom_factor) + ",0)";});

        g.append("text")
            .attr("x", 50 * zoom_factor)
            .attr("y", 12)
            .attr("dx", 0)
            .attr("text-anchor", "middle")
            .text(function(d) { return d.title; });

        g.append("line")
            .style("stroke", '#000')
            .style("stroke-width", '1')
            .attr("x1", 50 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 50 * zoom_factor)
            .attr("y2", 48);

        g.append("line")
            .style("stroke", '#CCC')
            .attr("x1", 75 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 75 * zoom_factor)
            .attr("y2", 48);

        g.append("line")
            .style("stroke", '#888')
            .attr("x1", 100 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 100 * zoom_factor)
            .attr("y2", 48);

        g.append("line")
            .style("stroke", '#CCC')
            .attr("x1", 125 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 125 * zoom_factor)
            .attr("y2", 48);

        // grid_days.select('line')
        //     .attr("x1", function(d) { return zoom_factor; })
    };

    var link = function(scope, element, attrs) {

        svg = element[0].querySelector('svg');
        draw_axes();

        scope.$watch("data", function(data){
            // console.log(['timeline on data', data]);
            if(data)
                draw_data(data);
        }, true);

        if(0){
            element.bind('mousewheel', function(e){
                var e = window.event || e; // old IE support
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                console.log("zoom?", delta);
                if(delta > 0){
                    zoom_factor = zoom_factor * 2;
                }else{
                    zoom_factor = zoom_factor * 0.5;
                }
                draw_axes();
                //draw_data(data);
            });
        }
    };

    return {
        restrict: 'A',
        // transclude: false,
        //scope: {last_pos: '='},
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        scope: {
            data: "="
        },
        template: '<svg width="2500px" height="33px" class="timeline"></svg>',
        link: link
    };
}]);

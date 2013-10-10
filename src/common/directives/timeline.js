angular.module('directives.timeline', [])

.directive('timeline', [function() {

    var margin = {top: 0, right: 30, bottom: 0, left: 30},
        width = 2500 - margin.left - margin.right,
        height = 33 - margin.top - margin.bottom;
        // width = 2500 - ,
        // height = 33;
    var timescale = 24 * 3600 / 2500.0;

    var zoom_factor = 0.67;
    var svg;

    var tz = (new Date()).getTimezoneOffset() / 60;

    // var x = d3.scale.linear()
    //     .range([0, width]);
    // var parse = d3.time.format("%b %Y").parse;

    var x = d3.time.scale.utc().range([0, width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSubdivide(3)
        .tickSize(15, 8, 0)
        .orient("bottom").tickFormat(d3.time.format("%H:%M:%S"));

    // Init timeline
    var draw = function(){
        // if(!data) {
        //     svg.select('g.axis').remove();
        //     svg.select('g.chart').remove();
        //     svg.append("text")
        //         .attr("class", "chart")
        //         .attr("x", 100)
        //         .attr("y", 18)
        //         .attr("dx", 0)
        //         .attr("text-anchor", "middle")
        //         .text("No data");
        //     return;
        // } else {
        //     svg.select("text.chart").remove();
        // }

        // var start = (Math.floor((data[0].start.dt / 3600 - tz) / 24) * 24 + tz) * 3600,
        //     stop =

        // Ось X: время
        x.domain([new Date(), new Date()]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,1)")
            .call(xAxis);

        // console.log("x=", x(0.0), x(0.5), x(1.0));

        svg.append("g")
            .attr("class", "chart");

    }

    var redraw = function(data, scope) {
        // console.log("redraw");
        if(!data) {
            // svg.select('g.axis').remove();
            // svg.select('g.chart').remove();
            svg.append("text")
                .attr("class", "chart")
                .attr("x", 100)
                .attr("y", 18)
                .attr("dx", 0)
                .attr("text-anchor", "middle")
                .text("No data");
            return;
        } else {
            svg.select("text.chart").remove();
        }

        var start = new Date(data[0].start.dt * 1000),
            stop = new Date(data[data.length-1].stop.dt * 1000);

        // Сместим ось времени
        x.domain([start, stop]);
        svg.select("g.x.axis").transition() //.duration(10000)
            .attr("transform", "translate(0,1)")
            .call(xAxis);

        // var ticks = x.ticks(d3.time.minute, 15);
        // console.log("data=", data, start, stop);

        // Данные
        var intervals = svg.select('.chart').selectAll(".interval")
            .data(data);

        var g = intervals.enter().append("g")
            // .attr("class", "interval")
            .attr("class", function(d) {
                return "interval " + d.type;
            })
            .attr("data-tooltip", "1")
            .attr("rel", "tooltip")
            .attr("bs-tooltip", "tooltip")
            .on('click', function(d) {
                // console.log("click=", scope);
                scope.click()(d);
            })
            .on('mouseenter', function(d){
                // var tooltip = $(this).tooltip();
                // console.log("mouseenter=", scope.hover, d);
                scope.hover()(d);
            });

        // $(g).tooltip();

        g.append("rect")
            .attr('x', function(d){
                return x(new Date(d.start.dt * 1000));
            })
            .attr('width', function(d){
                return x(new Date(d.stop.dt * 1000)) - x(new Date(d.start.dt * 1000));
            })
            .attr("y", "2")
            .attr("height", "16");

        intervals.transition() //.duration(3000)
            .select('rect')
                .attr('x', function(d){
                    return x(new Date(d.start.dt * 1000));
                })
                .attr('width', function(d){
                    return x(new Date(d.stop.dt * 1000)) - x(new Date(d.start.dt * 1000));
                });

        intervals
            .attr('title', "TBD");

        intervals.exit().remove();
    }


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

        // svg = element[0].querySelector('svg');
        // svg = d3.select(element[0].querySelector('svg'));
        // draw_axes();
        svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // draw(scope.data);
        draw();
        scope.$watch("data", function(data){
            console.log(['timeline on data', data]);
            // if(data)
                // draw_data(data);
            redraw(data, scope);
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
            data: "=",
            hover: "&onHover",
            click: "&onClick"
        },
        // template: '<svg width="2500px" height="33px" class="timeline"></svg>',
        template: '<div class="timeline"></div>',
        link: link
    };
}]);

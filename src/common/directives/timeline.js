angular.module('directives.timeline', [])

.directive('timeline', [function() {
    var link = function(scope, element, attrs) {

            // svg = element[0].querySelector('svg');
            // svg = d3.select(element[0].querySelector('svg'));
            // draw_axes();
            // parent = d3.select(element[0]).select(".timeline");
            // parent = element;
            // console.log("parent=", parent[0].clientWidth, parent.width());
        var data = null;
        var tz = (new Date()).getTimezoneOffset() / 60;
        console.log(tz);

        var margin = {top: 0, right: 30, bottom: 0, left: 30},
            width = element.width() - 60 - margin.left - margin.right,
            height = 33 - margin.top - margin.bottom;

        var x = d3.time.scale.utc()
            // .domain([new Date(tz * 1000 * 60 * 60), new Date(24 * 60 * 60 * 1000 + tz * 1000 * 60 * 60)])
            .domain([new Date(+new Date() - 24 * 60 * 60 * 1000), new Date()])
            .range([0, width]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSubdivide(3)
            .tickSize(15, 8, 0)
            .orient("bottom")
            // .tickSize(-height)
            .ticks((width / 90) | 0)
            // .ticks(15)
            .tickFormat(d3.time.format("%H:%M:%S"));

        var zoom = d3.behavior.zoom()
            .x(x)
            .scaleExtent([1, 1024])   // TODO: Необходимо также ограничить Pan
            .on("zoom", zoomed);

        // avar
        var svg = d3.select(element[0]).select(".timeline")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(zoom);

        svg.append("rect")          // Невидимый объект, чтобы получать события мыши и тача
            .attr("style", "opacity: 0.1")
            .attr("width", width)
            .attr("height", height);

            // svg.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,1)")
            .call(xAxis);

        svg.append("g")
            .attr("class", "chart");

        console.log("svg", svg);

        function zoomed() {
            console.log("zoomed", data);
            console.dir(zoom);
            console.log("scale=", zoom.scale());
            console.log("translate=", zoom.translate());

            var start = new Date(data[0].start.dt * 1000),
                stop = new Date(data[data.length-1].stop.dt * 1000);

            console.log("x.domain=", x.domain());
            // Сместим ось времени
            // x.domain([start, stop]);

            // Ось времени
            svg.select(".x.axis").call(xAxis);

            // Данные
            var intervals = svg.select('.chart').selectAll(".interval")
                .data(data);
            intervals //.transition() //.duration(3000)
                .select('rect')
                    .attr('x', function(d){
                        // console.log("x d=", d.start.dt, x(new Date(d.start.dt * 1000)));
                        return x(new Date(d.start.dt * 1000));
                    })
                    .attr('width', function(d){
                        return x(new Date(d.stop.dt * 1000)) - x(new Date(d.start.dt * 1000));
                    });

        }

        function draw() {
            console.log("draw", data);
            // console.dir(x);
            console.dir(zoom);
            console.log("scale=", zoom.scale());
            console.log("translate=", zoom.translate());
            if(data == null) return;

            var start = new Date(data[0].start.dt * 1000),
                stop = new Date(data[data.length-1].stop.dt * 1000);

            console.log("x.domain=", x.domain());
            // Сместим ось времени
            x.domain([start, stop]);
            // svg.select("g.x.axis").transition() //.duration(10000)
            //     .attr("transform", "translate(0,1)")
            //     .call(xAxis);

            // var ticks = x.ticks(d3.time.minute, 15);
            // console.log("data=", data, start, stop);

            // Данные
            var intervals = svg.select('.chart').selectAll(".interval")
                .data(data);

            var g = intervals.enter().append("g")
                .attr("class", function(d) {
                    return "interval " + d.type;
                })
                .on('click', function(d) {
                    scope.click()(d);
                })
                .on('mouseenter', function(d){
                    scope.hover()(d);
                });

            // $(g).tooltip();

            g.append("rect")
                .attr('x', function(d){
                    // console.log("x d=", d);
                    // console.log("x d=", d.start.dt, x(new Date(d.start.dt * 1000)));
                    return x(new Date(d.start.dt * 1000));
                })
                .attr('width', function(d){
                    return x(new Date(d.stop.dt * 1000)) - x(new Date(d.start.dt * 1000));
                })
                .attr("y", "2")
                .attr("height", "16");

            // intervals
            //     .attr('title', "TBD");

            intervals.exit().remove();

            zoomed();
        }

        // // draw(scope.data);
        // draw();
        scope.$watch("data", function(_data){
            console.log(['timeline on data', _data]);
            // if(data)
                // draw_data(data);
            data = _data;
            draw();
            // redraw(data, scope);
        }, true);


        element.find("#plusButton").on('click', function(){
            // console.log("plusButton", zoom.scale());
            zoom.scale(zoom.scale() * 1.1809926614295303);
            zoomed();
            // width *= 1.2;
            // d3.select(element[0]).select(".timeline svg")
            //     .attr("width", width + margin.left + margin.right);
            // x.range([0, width]);
            // redraw(data, scope);
        });

        element.find("#minusButton").on('click', function(){
            // console.log("minusButton");
            zoom.scale(zoom.scale() / 1.1809926614295303);
            zoomed();
            // width /= 1.2;
            // d3.select(element[0]).select(".timeline svg")
            //     .attr("width", width + margin.left + margin.right);
            // x.range([0, width]);
            // redraw(data, scope);
        });

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
        template:
            '<div>' +
                '<div id="minusButton" style="position:absolute;left:0;top:0"><img src="img/minus_button.png" width="32" height="32"/></div>'+
                '<div style="position:absolute;left:32px;top:0;right:32px;bottom:0px;overflow-x:hidden;overflow-y:hidden"><div class="timeline"></div></div>'+
                '<div id="plusButton" style="position:absolute;right:0;top:0"><img src="img/plus_button.png" width="32" height="32"/></div>'+
            '</div>',
        replace: true,
        link: link
    };
}]);

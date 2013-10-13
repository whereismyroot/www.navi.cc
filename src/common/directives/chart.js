angular.module('directives.chart', ['i18n'])

.directive('chart', ['$filter', function($filter){
    var path = null;

    var translateFilter = $filter('translate');

    var margin = {top: 20, right: 20, bottom: 30, left: 35},
        width = 650 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSubdivide(3)
        .tickSize(5, 3, 0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        // .tickValues([1, 2, 3, 5, 8, 13, 21])
        .tickSubdivide(1)
        .tickSize(4, 2, 0)
        .orient("left");

    var line = d3.svg.line()
        // .interpolate("basis")
        .x(function(d) { return x(d.liters); })
        .y(function(d) { return y(d.voltage); });

    var svg;


    var fuelCapacity = translateFilter('FuelVolume');
    var voltage = translateFilter('Voltage');
    var draw = function(element, data){

        x.domain(d3.extent(data, function(d) { return d.liters; }));
        y.domain([d3.min(data, function(d) { return 0.0; }), d3.max(data, function(d) { return 10.0; })]);

        svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Ось X: 0..емкость_бака
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
                .append("text")
                    .attr("x", width)
                    .attr("y", -6)
                    .style("text-anchor", "end")
                    .text(fuelCapacity);

        // var range = d3.range([0, 4]);
        // console.log('range', range);
        svg.selectAll('.yline').data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).enter().append("line")
            .attr("class", "tick minor yline")
            .attr("x1", 0)
            .attr("y1", function(d){return d * height / 10;})
            .attr("x2", width)
            .attr("y2", function(d){return d * height / 10;})
            .attr("stroke", "#eee");

        // Ось Y: 0..10V
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(voltage);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

    }

    var liter = translateFilter('LitersShort');
    var volt = translateFilter('VoltsShort');
    var redraw = function(element, data){

        x.domain(d3.extent(data, function(d) { return d.liters; }));
        svg.select("g.x.axis").transition()
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        var line = d3.svg.line()
            // .interpolate("monotone")
            .x(function(d) { return x(d.liters); })
            .y(function(d) { return y(d.voltage); });

        svg.select("path.line")
            .datum(data).transition()
            .attr("d", line);

        var dots = svg.selectAll(".dot")
            .data(data);

        dots.enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5)
                .append("title")
                    .text(function(d) { return d.liters; })
                    .attr("y1", 0)
                    .attr("y2", 0);

        dots
            .transition()
            .attr("cx", function(d) { return x(d.liters); })
            .attr("cy", function(d) { return y(d.voltage); })
            .select('title')
                .text(function(d) { return d.liters + " " + liter + " -> " + d.voltage + " " + volt; })

        dots.exit().remove();

        return;

        var chart = d3.select(element[0]).select('svg');
        var points = chart.selectAll(".point").data(data);

        var line = d3.svg.line()
            .x(function(d) { return d.liters * 5 + 10; })
            .y(function(d) { return 240 - d.voltage * 20; });

        if(!path){
            path = chart.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
        } else {
            path.transition()
                .attr("d", line);
        }

        var g = points.enter()
            .append("g")
            .attr("class", "point");

        // chart.selectAll(".point").transition()
        points.transition()
            .attr("transform", function(d) { return "translate(" + (d.liters * 5 + 10) + "," + (240 - d.voltage * 20)+ ")";});

        g.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dx", 0)
            .attr("text-anchor", "middle");

        points.select("text").text(function(d) { return d.liters; });

        g.append("circle")
            .attr("x", 0)
            .attr("y", 0)
            .style("fill", "none")
            .style("stroke", "#00f")
            .style("stroke-opacity", 1)
            .style("stroke-width", 3)
            .attr("r", 5)

        points.exit().remove();

    }

    var link = function(scope, element, attrs) {
        //svg = element[0].querySelector('svg');
        console.log('chart:link', element);
        draw(element, scope.data);
        scope.$watch('data', function(data){
            redraw(element, scope.data);
        }, true);

        scope.sortableOptions = {
            handle: ".msp",
            revert: true,
            scrollSpeed: 5,
            cursor: 'crosshair',
            placeholder: 'ui-sortable-placeholder2',
            axis: 'y'
        };
    }

    return {
        restrict: 'E',
        scope: {
            data: "="
        },
        // template: '<svg width="500px" height="250px" class="chart"></svg>',
        template: '<div class="chart"></div>',
        replace: true,
        link: link
        // controller: ['$scope', '$element', function($scope, $element){}]
    };

}]);

angular.module('map', ['resources.account', 'directives.gmap', 'directives.main', 'directives.timeline', 'resources.geogps', 'i18n', 'directives.language'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/map', {
        templateUrl:'templates/map/map.tpl.html',
        controller:'MapCtrl',
        resolve:{
            account:['Account', function (Account) {
                //TODO: need to know the current user here
                return Account;
            }]
        }
    }).
    when('/map/:skey', {
        templateUrl:'templates/map/map.tpl.html',
        controller:'MapCtrl',
        resolve:{
            account:['Account', function (Account) {
                //TODO: need to know the current user here
                return Account;
            }]
        }
    });
}])

.controller('MapCtrl', ['$scope', '$location', '$routeParams', 'account', 'GeoGPS', '$log', function ($scope, $location, $routeParams, account, GeoGPS, $log) {
    $scope.account = account;
    $scope.skey = $routeParams['skey'];
    $scope.track = null;

    var datepicker = $('#datepicker').datepicker({
        beforeShowDay: function(date) {
            var hour = date.valueOf()/1000/3600,
                day = hour/24;
            // console.log("beforeShowDay", day, (hour%2 === 0)?'enabled':'disabled');
            return GeoGPS.checkDay(day)?'enabled':'disabled';
        }
    }).on('changeDate', function(ev){
        var date = ev.date;
        // var tz = (new Date()).getTimezoneOffset()/60;
        // var hourfrom = date.valueOf() / 1000 / 3600 + tz;
        var hourfrom = date.valueOf() / 1000 / 3600;
        // console.log(["datepicker: on changeDate", ev, date]);
        // $log.warn("datepicker:changeDate. Bad path point inn the $scope.path array ");
        // $log.error("datepicker:changeDate. Bad path point inn the $scope.path array ");
        $log.info("datepicker:changeDate.", $scope);
        $scope.$apply(function(){   // Без этого не будет индикации процесса загрузки

            GeoGPS.getTrack(hourfrom, hourfrom+23)  // +23? не 24?
                .then(function(data){
                    console.log(["getTrack: ", data]);
                    $scope.track = data;
                    $scope.points = data.track.length;
                    // fake_timeline();
                    $scope.timeline = data.ranges;
                });
        });
    });

    var fake_timeline = function(){
        // Пока сгенерируем фальшивые данные
        var start = 0;
        var data = d3.range(~~(Math.random() * 10)+2).map(function(i){
            var stop = start + ~~(Math.random() * 500);
            var point = {
                counter: i+1,
                move: (i%2) === 1,
                start: start,
                stop: stop
            };
            start = stop;
            return point;
        });
        if(data[data.length-1].stop < 2500){
            data[data.length-1].stop = 2500;
        }
        // console.log("data=", data);
        $scope.timeline = data;
    }


    $scope.onSysSelect = function(skey){
        // loadTrack(skey);

        GeoGPS.select(skey);
        GeoGPS.getHours(0, 1000000)
            .then(function(){
                // Недокументированный метод. Метод update изменяет текущий месяц
                $('#datepicker').datepicker("fill");
            });
    };

    $scope.hideTrack = function(){
        // console.log("Hide track");
        // //GeoGPS.hideTrack();
        // if(path) {
        //     path.setMap(null);
        //     path = null;
        // }
        $scope.track = null;
        $scope.timeline = [];
    };

    $scope.zoomlist = 0;
    $scope.doZoomList = function(){
        // console.log("doZoomList");
        $scope.zoomlist += 1;
        if($scope.zoomlist >= 3) $scope.zoomlist = 0;
    };

    $scope.mapconfig = {
        autobounds: true,   // Автоматическая центровка трека при загрузке
        animation: false,   // Анимация направления трека
        numbers: true       // Нумерация стоянок/остановок
    };

    $scope.showconfig = false;
    // $scope.toggleShowConfig = function(){
    //     $scope.showconfig = !$scope.showconfig;
    //     console.log($scope.showconfig);
    // };
}])

.directive("configMapItem", function(){
    return{
        restrict: 'EA',
        scope: {
            item: "=",
            iconOn: "@",
            iconOff: "@"
         },
        replace: true,
        transclude: true,
        template: '<li ng-click="toggleValue()"><span></span><span ng-transclude></span></li>',
        link: function(scope, element, attrs) {
            var icon = element[0].querySelector('span');
            scope.toggleValue = function(){
                console.log("toggle", scope.item, scope);
                scope.item = !scope.item;
            };
            scope.$watch("item", function(item){
                icon.className = "icon-" + (item?scope.iconOn:scope.iconOff) + " icon-large";
                if(item){
                    element.addClass("on");
                    element.removeClass("off");
                } else {
                    element.addClass("off");
                    element.removeClass("on");
                }
                // element[0].class =
            });
        }
    };
});


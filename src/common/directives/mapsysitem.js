angular.module('directives.main', ['newgps.services', 'services.sysManage'])

.directive('mapsyslist', ["$location", "$routeParams", function($location, $routeParams) {
    return {
        restrict: 'E',
        // require: '?ngModel',
        scope: {
            // zoom: "@",
            account: '=',
            systems: '=',
            skey: '=',
            select: '='
            // select: "&"        // Используется чтобы навесить обработчик на выбор ng-click="select()"
        },
        templateUrl: 'templates/map/mapsyslist.tpl.html',
        replace: true,
        controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {
            $scope.filters = [
                {
                    desc: "личные"
                },
                {
                    desc: "служебные"
                },
                {
                    desc: "партнеры"
                }
            ];

            $scope.zoomlist = 1;
            $scope.doZoomList = function(){
                console.log("doZoomList");
                $scope.zoomlist += 1;
                if($scope.zoomlist >= 3) $scope.zoomlist = 0;
            };

            $scope.popup = function(skey){
                console.log('mapsyslist:popup', skey);
            };

            $scope.onSysSelect = function(skey){
                console.log('mapsyslist:onSysSelect', skey);
                $scope.select(skey);
            }

        }]
        // link: function(scope, element, attr, ngModel) {
        //     console.log("====> mapsyslist", [scope, element, attr, ngModel]);
        //     scope.skey = ngModel.$viewValue;
        // }
    }
}])

.directive('mapsysitem', ["$location", "$routeParams", "$freshmark", "sysManage", function($location, $routeParams, $freshmark, sysManage) {
    return {
        restrict: 'E',
        require: '^mapsyslist',
        scope: {
            zoomlist: "@",
            item: "=",
            skey: "=",
            select: "&"        // Используется чтобы навесить обработчик на выбор ng-click="select()"
         },
        replace: true,
        templateUrl: 'templates/map/mapsysitem.tpl.html',
        // link: function(scope, element, attrs) {
        //     scope.skey = $routeParams.skey;
        //     scope.manageSystemParams = function(skey){
        //         $location.path('/config/' + skey + '/params');
        //     };
        // },

        controller: ['$element', '$scope', '$attrs', 'sysManage', function($element, $scope, $attrs, sysManage) {

            $scope.popup = false;
            $scope.$routeParams = $routeParams;
            $scope.$freshmark = $freshmark;
            $scope.sysManage = sysManage;

            $scope.onClick = function(skey){
                console.log('mapsyslist:onClick', skey);
                // $location.path('/map/' + skey);
                // $location.search('key', skey);
                // $location.search({skey: skey});
                var params = angular.copy($routeParams);
                angular.extend(params, {skey: skey});
                $location.search(params);
                $scope.select(skey);
            };

            $scope.showPopup = function(){
                // console.log('$element=', $element);
                // $element.toggleClass('active');
                if($scope.popup !== ''){
                    $scope.popup = 'active';
                } else {
                    $scope.popup = '';
                }
            }
        }]

    };
}])

.directive('freshmark', [function() {
    return {
        restrict: 'E',
        scope: {
            item: "=",
            skey: "="
        },
        replace: true,
        // templateUrl: 'templates/map/mapsysitem.tpl.html',
        // template: '<span class="freshmark">{{ item.dynamic.lastping }}</span>',
        template: '<span class="freshmark {{ class }}" title="{{ state }}">{{ value }}</span>',
        // link: function(scope, element, attrs) {
        //     scope.skey = $routeParams.skey;
        //     scope.manageSystemParams = function(skey){
        //         $location.path('/config/' + skey + '/params');
        //     };
        // },

        controller: ['$element', '$scope', '$attrs', '$timeout', '$rootScope', function($element, $scope, $attrs, $timeout, $rootScope) {
            if(0){
            $scope.value = "";
            $scope.now = $rootScope.now;

            var update = function(){
                // $element.

                // 1) Зелёный - объект движется. (move)
                // 2) Красный - объект стоит. (stop)
                // 3) Синий - трекер не выходил на связь более 10 минут. (old)
                // 4) Серый - трекер выключен. (off)
                var now = Math.round((new Date()).valueOf() / 1000);
                var delta = now - $scope.item.dynamic.lastping;
                // console.log('freshmark element', delta);
                $scope.value = Math.floor(delta / 60);
                if(delta > 10 * 60){  // 10 минут
                    $scope.class = "old";
                    $scope.state = "Не выходит на связь";
                } else {
                    $scope.class = "move";
                    $scope.state = "Движется";
                }
                // if(dt_days > 0) {
                //     el.innerHTML = '' + dt_days + 'д';
                // } else if(dt_hours > 0) {
                //     el.innerHTML = '' + dt_hours + 'ч';
                // } else if(dt_mins > 0) {
                //     el.innerHTML = '' + dt_mins + 'м';
                // } else {
                //     el.innerHTML = 'Ok';
                // }
            }

            $scope.$watch('item.dynamic.lastping', function(){
                update();
            });

            $scope.$on('timetick', function(){
                // console.log('timetick');
                update();
            });
            }
        }]
    };
}]);

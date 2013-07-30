angular.module('directives.main', [])

.directive('mapsyslist', ["$location", "$routeParams", function($location, $routeParams) {
    return {
        restrict: 'E',
        // require: '?ngModel',
        scope: {
            // zoom: "@",
            account: '=',
            skey: '='
            // select: "&"        // Используется чтобы навесить обработчик на выбор ng-click="select()"
        },
        templateUrl: 'templates/map/mapsyslist.tpl.html',
        replace: true,
        controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {
            console.log("====> mapsyslist", [$element, $scope, $attrs]);

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
        }]
        // link: function(scope, element, attr, ngModel) {
        //     console.log("====> mapsyslist", [scope, element, attr, ngModel]);
        //     scope.skey = ngModel.$viewValue;
        // }
    }
}])

.directive('mapsysitem', ["$location", "$routeParams", function($location, $routeParams) {
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

        controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {

            $scope.popup = false;
            $scope.$routeParams = $routeParams;

            $scope.onClick = function(skey){
                // console.log('mapsyslist:onClick', skey);
                // $location.path('/map/' + skey);
                // $location.search('key', skey);
                // $location.search({skey: skey});
                var params = angular.copy($routeParams);
                angular.extend(params, {skey: skey});
                $location.search(params);

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
}]);

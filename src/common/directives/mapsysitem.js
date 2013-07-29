angular.module('directives.main', [])

.directive('mapsysitem', ["$location", "$routeParams", function($location, $routeParams) {
    return {
        restrict: 'E',
        scope: {
            zoom: "@",
            item: "=",
            select: "&"        // Используется чтобы навесить обработчик на выбор ng-click="select()"
         },
        replace: true,
        // transclude: true,
        templateUrl: 'templates/map/mapsysitem.tpl.html',
        link: function(scope, element, attrs) {
             // console.log('mapsysitem directive: link', scope, element, attrs, scope.item);

  // scope.onSysSelect = function(){
  //   console.log("onSysSelect(2)", s, scope);
  // };
            scope.skey = $routeParams.skey;
            scope.manageSystemParams = function(skey){
                // console.log("manageSystemParams()", s, scope);
                $location.path('/config/' + skey + '/params');
            };

        }
    };
}]);

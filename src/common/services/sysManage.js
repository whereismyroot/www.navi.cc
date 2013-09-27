angular.module('services.sysManage', [])


/**
 * @ngdoc object
 * @name services.sysManage
 * @requires $log
 *
 * @description
 * Этот сервис используется для перехода к настройкам системы
 *
 */
.factory('sysManage', ['$location', "$routeParams", function ($location, $routeParams) {
    //console.log('sysManage:run');
    var sysManage = {
        manageSystem: function (skey) {
            $location.path('/config/' + skey);
        },

        manageSystemData: function (skey) {
            $location.path('/config/' + skey + '/data');
        },

        manageSystemParams: function (skey) {
            $location.path('/config/' + skey + '/params');
        }
    };

    return sysManage;
}]);

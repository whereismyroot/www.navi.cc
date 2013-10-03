angular.module('config.system.params.fuel', ['ngRoute','resources.account', 'resources.params', 'app.filters', 'directives.chart'])

.config(['$routeProvider', function ($routeProvider) {
    var skey = ['$route', function($route){
        console.log(['=== route', route]);
        return $route.current.params.skey;
    }];
    // console.log(['=== skey', skey]);
    $routeProvider.when('/config/:skey/params/fuel', {
        templateUrl:'templates/config/params/fuel.tpl.html',
        controller:'ConfigParamsFuelCtrl',
        resolve:{
            account:['Account', function (Account) {
                //TODO: sure for fetch only one for the current user
                return Account.get();
            }],
            // params:['Params', '$route', function (Params, $route) {
            //   //return Params.get({skey:$route.current.params.skey});
            // }],
            params:['Params', function (Params) {
                //return Params.get({skey:$route.current.params.skey});
                return Params;
            }],
            system: ['System', function (System) {
                return  System;
            }],
            sys: ['System', '$route', function(System, $route) {
                return System.get($route.current.params.skey);
            }]
        }
    });
}])

.controller('ConfigParamsFuelCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', 'sys', 'system', '$timeout', function ($scope, $route, $routeParams, account, params, sys, system, $timeout) {
    // console.log('ConfigParamsFuelCtrl', $scope, $route, $routeParams, account, params);
    $scope.account = account;
    $scope.skey = $routeParams['skey'];
    $scope.params = params;
    $scope.filtered = true;
    $scope.sys = sys;

    // console.log('account.account.systems@ConfigParamsFuelCtrl=', account.account.systems);

    // $scope.fuel = [];
    $scope.fuel = [
        {liters: 0, voltage: 0.0},
        {liters: 80, voltage: 10.0}
    ];

    system.get($scope.skey).then(function(data){
        if((data.params) && (data.params.fuel)){
            $scope.fuel = data.params.fuel;
        }
        // if($scope.system)
    });

    $scope.valid = null;
    $scope.$watch('fuel', function(){

        if($scope.fuel.length === 0) {
            $scope.valid = {index: 0, title: "Нет даннных"};
            return;
        }

        for(var i = 1; i < $scope.fuel.length; i++){
            if($scope.fuel[i].liters <= $scope.fuel[i-1].liters) {
                $scope.valid = {index: i, title: "Значения объема топлива должны быть в возрастающей последовательности!"};
                return;
            }
            if($scope.fuel[i].voltage < $scope.fuel[i-1].voltage) {
                $scope.valid = {index: i, title: "Значение напряжения должны быть в неубывающей последовательности!"};
                return;
            }
        }
        $scope.valid = null;
    }, true);

    // $scope.valid = function(){
    //     console.log('valid');
    //     var ok = "";
    //     if($scope.fuel.length === 0) {
    //         return {index: 0, title: "Нет даннных"};
    //     }

    //     for(var i = 1; i < $scope.fuel.length; i++){
    //         if($scope.fuel[i].liters <= $scope.fuel[i-1].liters) {
    //             return {index: i, title: "Значения объема топлива должны быть в возрастающей последовательности!"};
    //         }
    //         if($scope.fuel[i].voltage <= $scope.fuel[i-1].voltage) {
    //             return {index: i, title: "Значение напряжения должны быть в возрастающей последовательности!"};
    //         }
    //     }
    //     return null;
    // }

    $scope.onAdd = function(){
        var liters = 0;
        var voltage = 0;
        angular.forEach($scope.fuel, function(l){
            if(l.liters > liters) liters = l.liters;
            if(l.voltage > voltage) voltage = l.voltage;
        });

        var dliters = 5,
            dvoltage = 0.5,
            len = $scope.fuel.length;

        if(len >= 2){
            dliters = $scope.fuel[len-1].liters - $scope.fuel[len-2].liters;
            dvoltage = $scope.fuel[len-1].voltage - $scope.fuel[len-2].voltage;
        }
        liters = Math.round(liters + dliters);    // Округлим до 1
        voltage = Math.round((voltage + dvoltage) * 100) / 100; // Округлим до 0.01

        if(voltage > 10.5)
            voltage = 10.5;

        $scope.fuel.push({
            liters: liters,
            voltage: voltage
        });

        $timeout(function () {
            //element[0].focus();
            var element = $('ul.config-fuel li:last-child input');
            element[0].focus();
            // console.log('$element=', element[0]);
        }, 250);
    }

    $scope.onRemove = function(index){
        console.log('remove', index);
        $scope.fuel.splice(index, 1);
    }

    $scope.sortableOptions = {
        handle: ".msp",
        // revert: true,    // Имеет баг с прокруткой. Если в будущем исправят, то стоит вернуть.
        scrollSpeed: 5,
        cursor: 'crosshair',
        placeholder: 'config-fuel-ui-sortable-placeholder',
        axis: 'y'
    };

}]);



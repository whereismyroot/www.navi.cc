angular.module('config.system.params', ['ngRoute', '$strap', 'resources.params', 'app.filters', 'config.system.params.master', 'config.system.params.fuel'])

.config(['$routeProvider',
  function($routeProvider) {
    var skey = ['$route',
      function($route) {
        // console.log(['=== route', route]);
        return $route.current.params.skey;
      }
    ];
    // console.log(['=== skey', skey]);
    $routeProvider.when('/config/:skey/params', {
      templateUrl: 'templates/config/params/params.tpl.html',
      controller: 'ConfigParamsCtrl',
      resolve: {
        // account: ['Account',
        //   function(Account) {
        //     //TODO: sure for fetch only one for the current user
        //     return Account.get();
        //   }
        // ],
        // params:['Params', '$route', function (Params, $route) {
        //   //return Params.get({skey:$route.current.params.skey});
        // }],
        params: ['Params', '$route',
          function(Params, $route) {
            //return Params.get({skey:$route.current.params.skey});
            // console.log("resolve Params", );
            return Params.get($route.current.params.skey);
          }
        ],
        system: ['System', '$route',
          function(System, $route) {
            return System.get($route.current.params.skey);
          }
        ]
      }
    });
  }
])

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'params', 'system', 'System',
  function($scope, $route, $routeParams, params, system, System) {
    // console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account, params);
    // $scope.account = account;
    $scope.system = system;
    var skey = $scope.skey = $routeParams['skey'];
    $scope.params = params;
    $scope.filtered = true;

    $scope.tooltip = {
      "title": "<hr>Показать все параметры<hr>Внимание! Изменение некоторых параметров может привести к выходу трекера из строя.",
      "checked": false
    }

    // $scope.params.get($route.current.params.skey).then(function(data) {
    //   console.log('params success', data);
    // });

    console.log('params success', $scope.params);

    $scope.isFiltered = function(item) {
      if (!$scope.filtered) {
        return true;
      }
      return item.filter;
    };

    $scope.onChangeTitle = function(){
      console.log('onChangeTitle', $scope.system.title);
      System.update(skey, {title: $scope.system.title});
    };

    // ???
    $scope.onChangeGosNumber = function(){
      console.log('onChangeTitle', $scope.system.title);
      System.update(skey, {title: $scope.system.title});
    };

    $scope.onChangeValue = function(k) {
      params.set(k); // Отправим значение в очередь на сервер
    };

    $scope.setqueue = function(k) {
      // console.log('setqueue', k);
      params.set(k); // Отправим значение в очередь на сервер
    }

    $scope.cancelqueue = function(k) {
      params.cancel(k); // Отправим на сервер команду отменить изменение параметра
    }

    $scope.stopqueue = function() {
      params.cancelall($scope.skey); // Отправим на сервер команду отменить все изменения
      /*for (var k in params.value) {
      $scope.cancelqueue(k);
    };*/
    }

    $scope.tofuel = function() {
      // console.log('tofuel/System', system);
      // account.account.systems[skey].dynamic.fuel

    }

    $scope.filtered = function(items) {
      var result = {};
      angular.forEach(items, function(value, key) {
        if ($scope.showall || value.hasOwnProperty('primary')) {
          result[key] = value;
        }
      });
      return result;
    }

    $scope.caricons = ("caricon-android-1 caricon-reddit caricon-plancast caricon-angellist caricon-home caricon-cloud caricon-umbrella caricon-star " +
      "caricon-star-empty caricon-attention caricon-flight caricon-flight-1 caricon-accessibility caricon-paper-plane-1 " +
      "caricon-money caricon-beaker caricon-truck-1 caricon-attach caricon-guidedog caricon-lightbulb caricon-blind " +
      "caricon-basket caricon-paper-plane caricon-traffic-cone caricon-cc caricon-emo-happy caricon-aboveground-rail caricon-airfield " +
      "caricon-airport caricon-emo-devil caricon-belowground-rail caricon-bicycle caricon-bus caricon-ferry caricon-garden " +
      "caricon-giraffe caricon-grocery-store caricon-heliport caricon-pitch caricon-police caricon-rail caricon-skiing " +
      "caricon-swimming caricon-crown caricon-twitter caricon-user-md caricon-ambulance caricon-fighter-jet caricon-h-sigh " +
      "caricon-github caricon-shield caricon-extinguisher caricon-rocket caricon-anchor caricon-apple caricon-android " +
      "caricon-linux caricon-female caricon-male caricon-bug caricon-twitter-1 caricon-evernote caricon-globe caricon-globe-alt " +
      "caricon-award caricon-rocket-1 caricon-truck").split(" ").map(function(i) {
      return {
        class: i
      }
    });
    // console.log('$scope.caricons = ', $scope.caricons);

    $scope.changeIcon = function() {
      // console.log("changeIcon");
      var options = {};
      $('#carIconsModal').modal(options);
    }

    $scope.setIcon = function(icon) {
      // console.log("setIcon", icon, system);
      $('#carIconsModal').modal('hide');
      system.update(skey, {icon: icon.class});
      system.icon = icon.class;
    }

    // $("[rel=tooltip]").tooltip();
  }
])

.filter('isFiltered', function() {
  return function(value, status) {
    console.log('isFiltered:', value, status);
    if (!status) {
      return value;
    }
    var out = [];
    for (var i = 0; i < value.length; i++) {
      if (value[i].filter) {
        out.push(value[i]);
      }
    }
    return out;
  };
});
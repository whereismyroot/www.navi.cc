var params_descs = {
    "accel.deb": {
        "desc": "",
        "min": 3,
        "max": 10
    },
    "accel.lvl": {
        //"desc": "Чувствительность акселерометра, mg (20-200)",
        "desc": "AccelerometerSensitivity",
        "comment": "INT 30 30"
    },
    "accel.time": {
        "comment": "INT 60 60"
    },
    "adc.fix.du": {
        "comment": "INT 8 8"
    },
    "adc.fix.dub": {
        "comment": " - INT 31 31"
    },
    "adc.fix.umax": {
        "comment": " - INT 1063 1063"
    },
    "adc.in.1": {
        "comment": " - INT 50 50"
    },
    "adc.in.2": {
        "comment": " - INT 50 50"
    },
    "adc.photo": {
        "comment": " - INT 1921 1921"
    },
    "adc.photo.delay": {
        "comment": " - INT 3600 3600"
    },
    "adc.u.0": {
        "comment": " - INT 295 295"
    },
    "adc.u.1": {
        "comment": " - INT 342 342"
    },
    "adc.u.off": {
        "comment": " - INT 177 177"
    },
    "adc.u.on": {
        "comment": " - INT 325 325"
    },
    "akkum.block.vbat": {
        "comment": " - INT 1092 1092"
    },
    "akkum.block.vdd": {
        "comment": " - INT 295 295"
    },
    "akkum.charge.0": {
        "comment": " - INT 1086 1086"
    },
    "akkum.charge.30": {
        "comment": " - INT 1164 1164"
    },
    "akkum.charge.60": {
        "comment": " - INT 1194 1194"
    },
    "akkum.charge.temp": {
        "comment": " - INT 301 301"
    },
    "akkum.i.0": {
        "comment": " - INT 6 6"
    },
    "akkum.i.1": {
        "comment": " - INT 49 49"
    },
    "akkum.i.2": {
        "comment": " - INT 31 31"
    },
    "akkum.i.3": {
        "comment": " - INT 31 31"
    },
    "akkum.i.4": {
        "comment": " - INT 6 6"
    },
    "akkum.i.charge": {
        "comment": " - INT 49 49"
    },
    "akkum.u.0": {
        "comment": " - INT 1210 1210"
    },
    "akkum.u.1": {
        "comment": " - INT 1306 1306"
    },
    "akkum.u.2": {
        "comment": " - INT 1306 1306"
    },
    "akkum.u.3": {
        "comment": " - INT 1309 1309"
    },
    "akkum.u.4": {
        "comment": " - INT 1309 1309"
    },
    "gps.A1.0": {
        "desc": "MinimumAngle",
        "primary": true
    },
    "gps.A1.1": {
        "comment": " - INT 10 10"
    },
    "gps.A1.2": {
        "comment": " - INT 5 5"
    },
    "gps.A1.3": {
        "comment": " - INT 15 15"
    },
    "gps.AOFF.0": {
        "desc": "GPSEconomyMain",
        "primary": true,
        "comment": "INT 1440 1440"
    },
    "gps.AOFF.1": {
        "desc": "GPSEconomyBackup",
        "primary": true,
        "comment": "INT 30 30"
    },
    "gps.B1.0": {
        "comment": " - INT 512 512"
    },
    "gps.B1.1": {
        "comment": " - INT 512 512"
    },
    "gps.B1.2": {
        "comment": " - INT 512 512"
    },
    "gps.B1.3": {
        "comment": " - INT 512 512"
    },
    "gps.FAIL": {
        "comment": " - INT 5 5"
    },
    "gps.S1.0": {
        "comment": " - INT 1000 1000"
    },
    "gps.S1.1": {
        "comment": " - INT 1000 1000"
    },
    "gps.S1.2": {
        "comment": " - INT 500 500"
    },
    "gps.S1.3": {
        "comment": " - INT 1000 1000"
    },
    "gps.TF.MOVE": {
        "desc": "ForcedRegMov",
        "primary": true,
        "min": 30,
        "comment": " INT 60 60"
    },
    "gps.TF.STOP.0": {
        "desc": "RegStopMain",
        "primary": true,
        "comment": " INT 60 60"
    },
    "gps.TF.STOP.1": {
        "desc": "RegStopBackup",
        "primary": true,
        "comment": " INT 60 60"
    },
    "gps.TF.STOP.ACC.0": {
        "desc": "RegParkMain",
        "primary": true,
        "comment": " INT 600 600"
    },
    "gps.TF.STOP.ACC.1": {
        "desc": "RegParkBackup",
        "primary": true,
        "comment": " INT 600 600"
    },
    "gps.TM0.0": {
        "comment": " - INT 10 10"
    },
    "gps.TM0.1": {
        "comment": " - INT 10 10"
    },
    "gps.TM0.2": {
        "comment": " - INT 10 10"
    },
    "gps.TM0.3": {
        "comment": " - INT 10 10"
    },
    "gps.TP0.0": {
        "comment": " - INT 720 720"
    },
    "gps.TP0.1": {
        "comment": " - INT 240 240"
    },
    "gps.TP0.2": {
        "comment": " - INT 720 720"
    },
    "gps.TP0.3": {
        "comment": " - INT 120 120"
    },
    "gps.V0.0": {
        "comment": " - INT 3 3"
    },
    "gps.V0.1": {
        "comment": " - INT 20 20"
    },
    "gps.V0.2": {
        "comment": " - INT 10 10"
    },
    "gps.V0.3": {
        "comment": " - INT 20 20"
    },
    "gps.VIGNACC": {
        "comment": " - INT 4000 4000"
    },
    "gps.VSTART": {
        "desc": "MovementRegSpeed",
        "primary": true,
        "comment": " INT 400 400"
    },
    "gps.VSTOP": {
        "desc": "StopRegSpeed",
        "primary": true,
        "comment": " INT 54 54"
    },
    "gps.flush.move": {
        "desc": "FlushMove",
        "primary": true,
        "min": 30,
        "comment": " INT 60 60 180"
    },
    "gps.flush.stop": {
        "desc": "FlushStop",
        "primary": true,
        "min": 30,
        "comment": " INT 60 60"
    },
    "gps.maxsendfails": {
        "comment": " - INT 3 3"
    },
    "gsm.admin": {
        "comment": " - STR16"
    },
    "gsm.admin.2": {
        "comment": " - STR16"
    },
    "gsm.admin.3": {
        "comment": " - STR16"
    },
    "gsm.alarm": {
        "comment": " - STR16"
    },
    "gsm.alarm.prop": {
        "comment": " - INT 7 7"
    },
    "gsm.apn": {
        "comment": " - STR32 www.kyivstar.net www.kyivstar.net"
    },
    "gsm.flags": {
        "comment": " - INT 0 0"
    },
    "gsm.lagtime": {
        "comment": " - INT 900 900"
    },
    "gsm.protbits": {
        "comment": " - INT 31 31"
    },
    "gsm.pwd": {
        "comment": " - STR32"
    },
    "gsm.reregtime": {
        "comment": " - INT 6 6"
    },
    "gsm.server": {
        "comment": " - STR32 point.newgps.navi.cc:80 map.navi.cc:80"
    },
    "gsm.test": {
        "comment": " - INT 1440 1440"
    },
    "gsm.user": {
        "comment": " - STR32"
    },
    "in.foo.1": {
        "desc": "InputConfiguration",
        "number": "1",
        "primary": true,
        "select": [
            {"value": 0, "title": "TurnedOff"},
            {"value": 1, "title": "AlarmBtn"},
            {"value": 2, "title": "Loop"},
            {"value": 3, "title": "Ignition"}
        ],
        "comment": " INT 0 0"
    },
    "in.foo.2": {
        "desc": "InputConfiguration",
        "number": "2",
        "primary": true,
        "select": [
            {"value": 0, "title": "TurnedOff"},
            {"value": 1, "title": "AlarmBtn"},
            {"value": 2, "title": "Loop"},
            {"value": 3, "title": "Ignition"}
        ],
        "comment": " INT 0 0"
    },
    "in.foo.3": {
        "desc": "InputConfiguration",
        "number": "3",
        "primary": true,
        "select": [
            {"value": 0, "title": "TurnedOff"},
            {"value": 1, "title": "AlarmBtn"},
            {"value": 2, "title": "Loop"},
            {"value": 3, "title": "Ignition"},
            {"value": 4, "title": "FuelSensor"}
        ],
        "comment": " INT 0 0"
    },
    "out.1": {
        "desc": "Output1State",
        "primary": true,
        "comment": " INT 1 1"
    },
    "out.2": {
        "desc": "Output2State",
        "primary": true,
        "comment": " INT 0 0"
    },
    "power.autooff": {
        "comment": " - INT 0 0"
    },
    "secure.code": {
        "comment": " - INT 0 0"
    },
    "service.lock": {
        "comment": " - INT 0 0"
    },

};

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
            console.log("resolve Params", $route.current.params.skey);
            // return Params.get({skey: $route.current.params.skey});
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

.value("extend", function(){
  return params_descs;
})

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'params', 'system', 'System',
  function($scope, $route, $routeParams, params, system, System) {
    console.log('ConfigParamsCtrl', params);
    // $scope.account = account;
    $scope.system = system;
    var skey = $scope.skey = $routeParams['skey'];
    $scope.params = params;
    $scope.filtered = true;

    $scope.tooltip = {
      "title": "<hr>Показать все параметры<hr>Внимание! Изменение некоторых параметров может привести к выходу трекера из строя.",
      "checked": false
    }

    $scope.extend = function(key){
      // var extend = params.$desc(key);
      // return extend.desc || "";
      return params_descs[key];
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

    $scope.onChangeValue = function(k) {
      params.set(k); // Отправим значение в очередь на сервер
    };

    $scope.setqueue = function(k, v) {
      console.log('setqueue', k, v, params);
      params.queue[k] = v;
      params.data[k].newqueue = params.data[k].queue;
      // params.$patch(skey, "queue", params.queue);  // Отправим очередь на сервер
      params.$patch("queue"); // Сохраним очередь

      // params.set(k); // Отправим значение в очередь на сервер
      // params.$set({skey: skey, key: "aa", value: "bb"});  // Отправим очередь на сервер

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
      system.icon = icon.class;
      system.$patch('icon');
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
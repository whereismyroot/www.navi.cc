/*! www-navi-cc - v0.0.1-SNAPSHOT - 2013-03-10
* https://github.com/baden/www.navi.cc
* Copyright (c) 2013 [object Object];
 Licensed MIT, GPL */

angular.module('services.notifications', []).factory('notifications', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

  var notifications = {
    'STICKY' : [],
    'ROUTE_CURRENT' : [],
    'ROUTE_NEXT' : []
  };
  var notificationsService = {};

  var addNotification = function (notificationsArray, notificationObj) {
    if (!angular.isObject(notificationObj)) {
      throw new Error("Only object can be added to the notification service");
    }
    notificationsArray.push(notificationObj);
    $timeout(function(){
      //console.log('notification time');
      //$rootScope.$apply(function(){
      notificationsService.remove(notificationObj);
      //});
    }, 10000);
    return notificationObj;
  };

  $rootScope.$on('$routeChangeSuccess', function () {
    notifications.ROUTE_CURRENT.length = 0;

    notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
    notifications.ROUTE_NEXT.length = 0;
  });

  notificationsService.getCurrent = function(){
    return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT);
  };

  notificationsService.pushSticky = function(notification) {
    return addNotification(notifications.STICKY, notification);
  };

  notificationsService.pushForCurrentRoute = function(notification) {
    return addNotification(notifications.ROUTE_CURRENT, notification);
  };

  notificationsService.pushForNextRoute = function(notification) {
    return addNotification(notifications.ROUTE_NEXT, notification);
  };

  notificationsService.remove = function(notification){
    angular.forEach(notifications, function (notificationsByType) {
      var idx = notificationsByType.indexOf(notification);
      if (idx>-1){
        notificationsByType.splice(idx,1);
      }
    });
  };

  notificationsService.removeAll = function(){
    angular.forEach(notifications, function (notificationsByType) {
      notificationsByType.length = 0;
    });
  };

  return notificationsService;
}]);
angular.module('services.localizedMessages', [])
.factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

  var handleNotFound = function (msg, msgKey) {
    return msg || '?' + msgKey + '?';
  };

  return {
    get : function (msgKey, interpolateParams) {
      var msg =  i18nmessages[msgKey];
      if (msg) {
        return $interpolate(msg)(interpolateParams);
      } else {
        return handleNotFound(msg, msgKey);
      }
    }
  };
}]);
angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

  var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
     return angular.extend({
       message: localizedMessages.get(msgKey, interpolateParams),
       type: type
     }, otherProperties);
  };

  var I18nNotifications = {
    pushSticky:function (msgKey, type, interpolateParams, otherProperties) {
      console.log('pushSticky', msgKey, type, interpolateParams, otherProperties);
      return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForCurrentRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForNextRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    getCurrent:function () {
      return notifications.getCurrent();
    },
    remove:function (notification) {
      return notifications.remove(notification);
    }
  };

  return I18nNotifications;
}]);
angular.module('services.connect', [])

.factory('Connect', ["$rootScope", 'SERVER', function($rootScope, SERVER) {
    var shared = {};
    shared.updater = {};
    shared.updater.queue = {};

    shared.updater.on = function(msg, foo){
        shared.updater.queue[msg] = shared.updater.queue[msg] || [];
        shared.updater.queue[msg].push(foo);
        console.log(["shared.updater.on(", msg, foo, shared.updater.queue]);
        return foo;
    };

    shared.updater.process = function(msg){
        var i;
        if(shared.updater.queue[msg.message]){
            for(i in shared.updater.queue[msg.message]){
                shared.updater.queue[msg.message][i](msg);
            }
        }
        if(shared.updater.queue['*']){
            for(i in shared.updater.queue['*']){
                shared.updater.queue['*'][i](msg);
            }
        }
        console.log(["shared.updater.process(", msg, shared.updater.queue]);
    };

    shared.updater.remove = function(msg, updater){
        var index = shared.updater.queue[msg].indexOf(updater);
        shared.updater.queue[msg].splice(index, 1);
        console.log(["===> TODO!!!! Not implemented.", updater, shared.updater.queue, index]);
    };

    console.log("===> Connect:init");


    //var ws_server = "ws://gpsapi04.navi.cc:8888/socket";
    //var ws_server = "http://gpsapi04.navi.cc:8888/socket";
    //baseUrl: ((location.hostname === 'localhost') || (location.hostname === 'bigbrother')) ? 'http://localhost:8183/' : 'http://api.newgps.navi.cc/'

    //var ws_server = "http://localhost:8888/socket";
    var ws_server = SERVER.channel;

    var connect = function(timeout){
        if(timeout>60) { timeout = 60; }
        console.log('connecting to ' + ws_server + '...');

        //new SockJS(ws_server)
        //var ws = $rootScope.ws = new WebSocket(ws_server);
        var ws = $rootScope.ws = new SockJS(ws_server);
        ws.onopen = function () {
            console.log('WebSocket connected');
            //$('#main').append('<div>Opened</div>');
            //ws.send("First msg");
        };
        ws.onmessage = function(event) {
            //console.log(['onmessage:', event.data]);
            var msg = JSON.parse(event.data);
            //msg.map(function f(m){ shared.updater.process(m); });
            shared.updater.process(msg);
            //shared.send(event.data);
            //$rootScope.$broadcast('channel_data', event.data);
            //$rootScope.$broadcast('change_last');
            //$('#main').append('<div>' + event.data + '</div>');
        };
        ws.onclose = function(event) {
            console.log('WebSocket disconnected');
            setTimeout(function(){
                connect(timeout*2);
            }, timeout*1000);
        };
    };
    connect(1);

    shared.message = '';

    shared.send = function(msg) {
        this.message = msg;
        //this.broadcastItem();
        $rootScope.$broadcast('channel_data', 'aaa');
    };

    /*sharedService.broadcastItem = function() {
        $rootScope.$broadcast('channel_data');
    };*/

    return shared;
}]);


angular.module('services.httpRequestTracker', []);
angular.module('services.httpRequestTracker').factory('httpRequestTracker', ['$http', function($http){

  var httpRequestTracker = {};
  httpRequestTracker.hasPendingRequests = function() {
    return $http.pendingRequests.length > 0;
  };

  return httpRequestTracker;
}]);
angular.module('directives.lists', [])

.directive('mylist', function() {
    return {
        restrict: 'E',
        //scope: {},
        transclude: false,
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        template: '<div>List:<ul><li ng-repeat="l in list"><mylistitem></mylistitem></li></ul></div>',
        link: function(scope, element, attrs) {
            console.log('mylist directive: link', scope, element);
        }
        //, controller: ["account", function(account){console.log("account=", account)}]
    };
})

.directive('mylistitem', function() {
    return {
        restrict: 'E',
        //scope: {l:"@"},
        transclude: true,
        template: '<div>{{l}}</div>',
        link: function(scope, element, attrs) {
            console.log('mylistitem directive: link', scope, element);
        }
    };
})

.directive('mylist2', function() {
    return {
        restrict: 'E',
        scope: {},
        transclude: false,
        //template: '<div>List2:<ul><li ng-repeat="l in list">{{ l }}</li></ul></div>',
        template: '<div>List2:<ul></ul></div>',
        link: function(scope, element, attrs) {
            var ul = element[0].querySelector('ul');
            //scope.ul = ul;
            scope.list = scope.$parent.list;
            //var ul = angular.element(element);
            console.log('mylist2 directive: link', scope, element, attrs, ul);
            scope.$watch('list', function(ov, nv){
                //console.log(' == watch(list)', scope, ov, nv);
                ul.innerHTML = '';
                for(var i=0; i<scope.list.length; i++){
                    var l=scope.list[i];
                    var li = document.createElement('LI');
                    li.innerHTML = l;
                    ul.appendChild(li);
                }
            }, true);
            //console.dir(element);
            //console.dir(ul);
        }/*,
        compile: function(element, attrs) {
            console.log('mylist2 directive: compile', element, attrs);
        }
        , controller: ["$scope", function($scope) {
            console.log('mylist2 directive: controller', $scope);
            $scope._addMyData = "Hoo";
        }]*/
    };
})

.directive('contenteditable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attr, ngModel) {
            var read;
            //console.log('===contenteditable', scope, element, attr, ngModel);
            if (!ngModel) {
                return;
            }
            ngModel.$render = function() {
                return element.text(ngModel.$viewValue);
            };
            element.bind('blur', function() {
                //console.log("blur", ngModel.$viewValue, element.html());
                if($.trim(element.text()) === '') {
                    element.text(ngModel.$viewValue);
                    //scope.$apply();
                }
                if (ngModel.$viewValue !== $.trim(element.text())) {
                    return scope.$apply(read);
                }
            });
            element.bind('keypress', function(ev) {
                //console.log("keypress", ev);
                if(ev.which === 13){
                    element.trigger('blur');
                    return false;
                }
            });
            read = function() {
                console.log("read()", scope, ngModel);
                ngModel.$setViewValue($.trim(element.text()));
                element.trigger('change');  // Вызовем стандартный метод onChange, можно повесить свой обработчик на ng-change="onChange()"
                /*
                if(scope._update){
                    scope._update();
                }
                */
                /*if(scope.onChange) {
                    scope.onChange();
                }*/
                //return ngModel.$setViewValue($.trim(element.html()));
            };
            //return read;
        }
    };
})

.directive('fileload', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: '<span class="btn btn-success fileinput-button">' +
                  '  <i class="icon-plus icon-white"></i>' +
                  '  <span>Из файла...</span>' +
//                  ' <input type="file" name="files[]" multiple="" ng-model="files" ng-change="onFileAdd()">' +
                  ' <input type="file">' +
                  '</span>',
        replace: true,
        link: function(scope, element, attr, ngModel) {
            scope.onFileAdd = function(){
                console.log('onFileAdd');
            };
            /*var input = document.createElement('input');
            input.setAttribute('type', 'file');
            //input.type = 'file';
            element.appendChild(input);*/
            element[0].querySelector('input').addEventListener('change', function (ev) {
                //var filename = ev.target.value;
                if((ev.target.value === null)||(ev.target.value === '')) {
                    return;
                }
                var file = ev.target.files[0];
                console.log('onChange', file);
                var reader = new FileReader();
                reader.onload = function(e) {
                    var list = e.target.result.replace(/[\r\t\n]/g, ' ').replace(/ {2}/g, ' ').split(' ').filter(function(el){return (el !== '') && (el !== ' ');});
                    console.log(['  onload', e, list]);
                    scope.$apply(function(){
                        ngModel.$setViewValue(list);
                        element.trigger('change');  // Вызовем стандартный метод onChange, можно повесить свой обработчик на ng-change="onChange()"
                        ev.target.value = null;
                    });
                };
                reader.readAsBinaryString(file);

            }, false);
            /*
            element.bind('change', function(ev){
                console.log('onChange', this, ev.target);
                scope.$apply(function(){
                    scope.files = ['1', '2', '3'];
                    ngModel.$setViewValue(['1', '2', '232']);
                    element.trigger('change');  // Вызовем стандартный метод onChange, можно повесить свой обработчик на ng-change="onChange()"
                });
            });
            */

            /*
            element.querySelector('input').addEventListener('change', function(){
                console.log('onChange');
            }, false);*/
            console.log(['fileload', scope, element, attr, ngModel]);
        }
    };
});


angular.module('directives.gmap', ['services.connect', 'ui'])

.directive('gmap', ["Connect", function(C_onnect) {
    console.log('gmap:directive');


    var link = function(s_cope, e_lement, a_ttrs) {
        console.log('map directive: link', s_cope, e_lement, C_onnect);
        //element.innerHTML="<div>map</div>";

        var prev_config = localStorage.getItem('map.config');
        if(prev_config){
            prev_config = JSON.parse(prev_config);
        } else {
            prev_config = {
                zoom: 6,
                center: [48.370848, 32.717285],
                typeId: google.maps.MapTypeId.ROADMAP
            };
        }

        var latlng = new google.maps.LatLng(48.397, 34.644);
        var myOptions = {
            center: new google.maps.LatLng(prev_config.center[0], prev_config.center[1]),
            mapTypeId: prev_config.typeId,
            zoom: prev_config.zoom
        };
        var map = new google.maps.Map(e_lement[0],
            myOptions);

        var saveMapState = function() {
            localStorage.setItem('map.config', JSON.stringify({
                center: [map.getCenter().lat(), map.getCenter().lng()],
                zoom: map.getZoom(),
                typeId: map.getMapTypeId()
            }));
        };

        google.maps.event.addListener(map, 'idle', saveMapState);
        google.maps.event.addListener(map, 'maptypeid_changed', saveMapState);

        google.maps.event.addListener(map, 'zoom_changed', function(){
            console.log('zoom_changed');
            //PathRebuild();
        });

        var lastpos = new google.maps.Marker({
          map: map,
          position: latlng,
          title: 'Rabbit',
          //icon: goldStar,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: "yellow",
            fillOpacity: 0.8,
            strokeColor: "green",
            strokeWeight: 4,
            scale: 5
          },
          animation: null // google.maps.Animation.BOUNCE
        });
        //config.updater.add('last_update', function(msg) {
        var updater = C_onnect.updater.on('last_update', function(msg) {
            //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
            console.log('MAP last_update = ', msg);
            var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
            lastpos.setPosition(newpos);
        });

        /*console.log('config = ', config);
        scope.$on('channel_data', function(event, more){
            //var message = Connect.message;
            console.log(['Map on change_last', more]);
        });*/
        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time ofter the DOM element was removed.
        e_lement.bind('$destroy', function() {
            console.log('MAP:destroy element');
            C_onnect.updater.remove('last_update', updater);
            //$timeout.cancel(timeoutId);
        });

    };
    return {
        restrict: 'A',
        transclude: false,
        //scope: {last_pos: '='},
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        //template: '<div>MAP</div>',
        link: link/*,
        controller: ["$scope", "Connect", function($scope, Connect){
            console.log("map directive:controller", $scope, Connect);
        }]*/
    };
}]);

angular.module('directives.modal', []).directive('modal', ['$parse',function($parse) {
  var backdropEl;
  var body = angular.element(document.getElementsByTagName('body')[0]);
  var defaultOpts = {
    backdrop: true,
    escape: true
  };
  return {
    restrict: 'ECA',
    link: function(scope, elm, attrs) {
      var opts = angular.extend(defaultOpts, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
      var shownExpr = attrs.modal || attrs.show;
      var setClosed;

      if (attrs.close) {
        setClosed = function() {
          scope.$apply(attrs.close);
        };
      } else {
        setClosed = function() {
          scope.$apply(function() {
            $parse(shownExpr).assign(scope, false);
          });
        };
      }
      elm.addClass('modal');

      if (opts.backdrop && !backdropEl) {
        backdropEl = angular.element('<div class="modal-backdrop"></div>');
        backdropEl.css('display','none');
        body.append(backdropEl);
      }

      function setShown(shown) {
        scope.$apply(function() {
          model.assign(scope, shown);
        });
      }

      function escapeClose(evt) {
        if (evt.which === 27) { setClosed(); }
      }
      function clickClose() {
        setClosed();
      }

      function close() {
        if (opts.escape) { body.unbind('keyup', escapeClose); }
        if (opts.backdrop) {
          backdropEl.css('display', 'none').removeClass('in');
          backdropEl.unbind('click', clickClose);
        }
        elm.css('display', 'none').removeClass('in');
        body.removeClass('modal-open');
      }
      function open() {
        if (opts.escape) { body.bind('keyup', escapeClose); }
        if (opts.backdrop) {
          backdropEl.css('display', 'block').addClass('in');
          backdropEl.bind('click', clickClose);
        }
        elm.css('display', 'block').addClass('in');
        body.addClass('modal-open');
      }

      scope.$watch(shownExpr, function(isShown, oldShown) {
        if (isShown) {
          open();
        } else {
          close();
        }
      });
    }
  };
}]);

angular.module('app.filters', [])

.filter('datetime', function(){
    return function (text, length, end) {
        var d = new Date(parseInt(text, 10)*1000);
        return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear() + ' ' +
            fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2) + ':' + fdigits(d.getSeconds(), 2);
    };
})

.filter('fromnow', function(){
    return function (text, length, end) {
        var d = new Date(parseInt(text, 10)*1000);
        return moment(parseInt(text, 10)*1000).fromNow();
    };
})

.filter('yesno', function(){
    return function (state, length, end) {
        return state?"да":"нет";
    };
});

angular.module('resources.account', ['services.i18nNotifications']);

angular.module('resources.account').factory('Account', ['SERVER', '$http', 'i18nNotifications', '$q', '$timeout', function (SERVER, $http, i18nNotifications, $q, $timeout) {

  var Account = {
    'name': 'noname-noface-nonumber',
    'access_token': null,
    'withCredentials': SERVER.api_withCredentials,
    'account': null,
    'hint': null,
    'isAuthenticated': false
  };

  if(!SERVER.api_withCredentials) {
    Account.access_token = localStorage.getItem('access_token');
    if(Account.access_token){
      $http.defaults.headers.common["Authorization"] = Account.access_token;
    } else {
      delete $http.defaults.headers.common["Authorization"];
    }
  }

  if(Account.access_token || SERVER.api_withCredentials){
    //$http.defaults.headers.common["Authorization"] = Account.access_token;
    $http({
      method: 'GET',
      url: SERVER.api + "/account"
    }).success(function(data){
      console.log('login data=', data);

      if(data.account) {
        Account.account = data.account;
        Account.access_token = data.access_token;
        Account.isAuthenticated = true;
      }
    });
  } else {
    //i18nNotifications.pushSticky('login.error.notAuthenticated', 'error', {}, {rejection: 'aaa'});
  }

  //console.log('-- resources.account.Account access_token=', Account.access_token, i18nNotifications, $q);

  Account.logout = function(){
    console.log('Account.logout');
    Account.access_token = null;
    Account.account = null;
    Account.isAuthenticated = false;

    if(SERVER.api_withCredentials) {
      $http({
        method: "POST",
        url: SERVER.api + "/logout"
      }).success(function(data){});
    } else {
      localStorage.removeItem('access_token');
      if($http.defaults.headers.common["Authorization"]){
        delete $http.defaults.headers.common["Authorization"];
      }
    }

  };

  Account.login = function(username, password){
    console.log('Account.login', username, password);
    $http({
      method: "POST",
      url: SERVER.api + "/login",
      params: {username: username, password: password}
    }).success(function(data){
      console.log('login data=', data, $http.defaults.headers);

      if(!SERVER.api_withCredentials) {
        localStorage.setItem('access_token', data.access_token);
        $http.defaults.headers.common["Authorization"] = access_token;
      }

      Account.access_token = data.access_token;
      Account.account = data.account;
      Account.isAuthenticated = true;
      if(data.result === "created") {
        i18nNotifications.pushSticky('login.newUser', 'warning', {name: data.account.username});
        //$scope.label = "Создана новая учетная запись. Вход через 3 секунды.";
        //setTimeout(function(){location.reload();}, 3000);
      } else {
        //$scope.label = "Вход в учетную запись...";
        //setTimeout(function(){location.reload();}, 1000);
      }

      //$rootScope.account = data;
    });
  };

  Account.systemadd = function(imeis){
    $http({
      method: 'POST',
      //withCredentials: SERVER.api_withCredentials,
      url: SERVER.api + "/account/systems",
      data: {cmd: 'add', imeis: imeis}
    }).success(function(data){
      console.log('return data=', data);
      var systems = data.systems;
      if(systems.length === 1) {
        if(data.systems[0].result === "already"){
          alert('Вы уже наблюдаете за этой системой.');
          return;
        }
        if(data.systems[0].result === "notfound"){
          alert('Система на найдена. Возможные причины: \n1. Система еще не выходила на связь.\n2. Проверте правильность ввода IMEI.');
          return;
        }
      }
      for(var i=0; i<systems.length; i++) {
        var item = systems[i];
        if(item.result === "added") {
          Account.account.skeys.push(item.system.key);
          Account.account.systems[item.system.key] = angular.copy(item.system);
        }
      }
      //$scope.addform = false;
      //alert('Система ни разу не выходила на связь. Но она все равно была добавлена в список наблюдения.');
    });
  };

  Account.systemsort = function(){
    $http({
      method: 'POST',
      //withCredentials: SERVER.api_withCredentials,
      url: SERVER.api + "/account/systems",
      data: {cmd: 'sort', skeys: Account.account.skeys}
    }).success(function(data){
      console.log('return data=', data);
    });
  };

  Account.systemdel = function(skey){
    $http({
      method: 'DELETE',
      //withCredentials: SERVER.api_withCredentials,
      url: SERVER.api + "/account/systems/" + encodeURIComponent(skey)
    }).success(function(data){
      console.log('return data=', data);
      var i = Account.account.skeys.indexOf(skey);
      Account.account.skeys.splice(i, 1);
      delete Account.account.systems[skey];
    });
  };


  Account.update = function(param){
    //console.log('Account.update', param);
    $http({
      method: 'PATCH',
      url: SERVER.api + "/account",
      data: JSON.stringify(param)
    }).success(function(data){
      console.log('return data=', data);
    });
  };

  //$scope.access_token = access_token;

  return Account;
}]);

angular.module('resources.system', [])

.factory('System', ['SERVER', '$http', function (SERVER, $http) {
    var System = {};

    System.change_desc = function(skey, desc){
        console.log(['System.change_desc', skey, desc]);
        $http({
            method: 'PATCH',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/system/" + encodeURIComponent(skey),
            data: JSON.stringify({desc: desc})
        }).success(function(data){
          console.log('login data=', data);
        });

        /*
        $http({
            method: 'GET',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/system/changedesc/" + encodeURIComponent(skey) +
          "?desc=" + encodeURIComponent(desc)
        }).success(function(data){
          console.log('login data=', data);
        });
        */

    };

    return System;
}]);

angular.module('resources.params', ['services.connect', 'ngResource'])

.factory('Params', ['SERVER', '$resource', 'Connect', function (SERVER, $resource, Connect) {

    console.log('-- resources.params.Params', SERVER, Connect, SERVER.api.replace(/:\d/, '\\$&'));

    var Params = $resource(SERVER.api.replace(/:\d/, '\\$&') + "/params/:skey/:controller",
    {
        skey: "@skey",
        controller: "@controller",
        apikey: "4f679234645"
    },
    {
        set: {
            method: "POST",
            params: {
                controller: "set"
            }
        }
    });

    //return $resource(SERVER.api.replace(/:\d.*\//, ':port/') + "api/params/:skey/:controller",
    //return $resource('http://localhost\\:8183/' + "api/params/:skey/:controller",
    return Params;
}]);

if(0){
    var Params = {
        'params': []
    };

    /*
    // Подпишемся на события изменения параметров
    var updater = Connect.updater.on('add_log', function(msg) {
        //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
        Logs.logs.push(msg.log);
        console.log(['Logs add_log message:', msg, Logs]);
        $rootScope.$apply();
        //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
        //lastpos.setPosition(newpos);
    });*/


    Params.get = function(skey, akey, callback){
        console.log('Params.get');
        $http.get(SERVER.api + "api/params/get/" + encodeURIComponent(skey) +
            "&akey=" + encodeURIComponent(akey)
        ).success(function(data){
            console.log('data=', data);
            /*Logs.logs = data.logs;

            if(data.logs.length === 0){
                callback(0);
            } else {
                callback(-1);
            }*/
            /*
            if(data.result === "created") {
            //i18nNotifications.pushSticky('login.newUser', 'warning', {name: data.account.name});
            //$scope.label = "Создана новая учетная запись. Вход через 3 секунды.";
            //setTimeout(function(){location.reload();}, 3000);
            } else {
            //$scope.label = "Вход в учетную запись...";
            //setTimeout(function(){location.reload();}, 1000);
            }
            */

            //$rootScope.account = data;
        });
    };

    return Params;
}

angular.module('resources.logs', ['services.connect'])

.factory('Logs', ['SERVER', '$http', 'Connect', '$rootScope', function (SERVER, $http, Connect, $rootScope) {

    console.log('-- resources.logs.Logs', SERVER, Connect);
    var Logs = {
        'logs': []
    };

    var updater = Connect.updater.on('add_log', function(msg) {
        //if(msg.data.skey == skey) table.insertBefore(log_line(msg.data), table.firstChild);
        Logs.logs.push(msg.log);
        console.log(['Logs add_log message:', msg, Logs]);
        $rootScope.$apply();
        //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
        //lastpos.setPosition(newpos);
    });


    Logs.get = function(skey, akey, callback){
        console.log('Logs.get');
        $http({
            method: 'GET',
            //withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/logs/" + encodeURIComponent(skey)
        }).success(function(data){
            console.log('data=', data);
            Logs.logs = data.logs;

            if(data.logs.length === 0){
                callback(0);
            } else {
                callback(-1);
            }
        });
    };

    return Logs;

}]);


angular.module('login', ['resources.account', 'app.filters', 'directives.modal'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl:'login/login.tpl.html',
    controller:'LoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('LoginViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
  $scope.test = "Hello, it's test.";
  $scope.showLoginForm = true;
  $scope.user = {};
  $scope.langs = [
    {id: 'ru', title: 'Русский'},
    {id: 'en', title: 'English'},
    {id: 'po', title: 'Poland'}
  ];

  $scope.clearForm = function() {
    $scope.user = {};
  };

  $scope.showLogin = function(msg) {
    $scope.authError = msg;
    $scope.showLoginForm = true;
  };

  $scope.cancelLogin = function() {
    //AuthenticationService.cancelLogin();
    $scope.showLoginForm = false;
  };

  $scope.hideLogin = function() {
    $scope.showLoginForm = false;
  };

  $scope.onLogout = function(){
      account.logout();
      $scope.user = {};
  };
  $scope.onLogin = function(user, pass){
    $scope.loginform = false;
    console.log('Login;', $scope, user, pass);

    if((user === "")||(!user)) {
      return;
    }
    account.login(user, pass);

    return false;
  };

  $scope.onChange = function(model) {
    console.log('onChange', model);
  };

  /*
  $scope.$watch(function(){
      if($scope.account.account) {
        return $scope.account.account.name;
      } else {
        return null;
      }
    }, function(el, old){
      if(!$scope.account.account) {
        return;
      }
      console.log('bind fire', el, $scope.account.account.name, old);
    }
  );
  */
  $scope.$watch('account.account.name', function(newValue, oldValue){
    console.log(['bind fire', newValue, oldValue]);
    if(newValue && oldValue) {
      $scope.account.update({"$set": {name: newValue}});
    }
  });

  //console.log('LoginViewCtrl controller', $scope, $location, account);
}]);

angular.module('map', ['resources.account', 'directives.gmap'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl:'map/map.tpl.html',
    controller:'MapCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: need to know the current user here
        return Account;
      }]
    }
  });
}])

.controller('MapCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;

  /*setTimeout(function(){
    console.log('+++++++++', $('#datepicker'));*/
    $('#datepicker').datepicker({
        format: 'mm-dd-yyyy'
    });
  /*}, 1000);*/

}]);
angular.module('logs', ['resources.account', 'resources.logs'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/logs', {
    templateUrl:'logs/logs.tpl.html',
    controller:'LogsViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      logs:['Logs', function(Logs){
        return Logs;
      }]
    }
  });
}])

.controller('LogsViewCtrl', ['$scope', '$location', 'account', 'logs', function ($scope, $location, account, logs) {
  $scope.account = account;
  $scope.skey = "";
  $scope.logs = logs;
  $scope.comment = "Данные еще не получены";
  //$scope.skey = account.account.skeys[0];
  $scope.onSelect = function(){
    console.log('selected');
  };

  var reload = function(){
    if((!$scope.skey) || ($scope.skey === "")) {
      return;
    }
    $scope.logs.logs = [];
    $scope.comment = "Данные загружаются...";
    console.log(['change skey', $scope.skey, $scope.account]);
    $scope.logs.get($scope.skey, $scope.account.akey, function(res){
      if(res === 0) {
        $scope.comment = "Нет событий.";
      } else {
        $scope.comment = "Неизвестно";
      }
    });
  };

  $scope.onReload = function(){
    reload();
  };

  $scope.$watch('skey', function(skey){
    reload();

    /*
    var logs = [];
    for(var i=0; i<100; i++) {
      logs.push({
        "dt": 0,
        "text": "Hello"
      });
    }
    $scope.logs.logs = logs;
    */
  });
  $("[rel=tooltip]").tooltip();
}]);

angular.module('config.system.params', ['resources.account', 'resources.params', 'app.filters', 'i18n'])

.config(['$routeProvider', function ($routeProvider) {
  var skey = ['$route', function($route){
    console.log(['=== route', route]);
    return $route.current.params.skey;
  }];
  console.log(['=== skey', skey]);
  $routeProvider.when('/config/:skey/params', {
    templateUrl:'config/params/params.tpl.html',
    controller:'ConfigParamsCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      params:['Params', '$route', function (Params, $route) {
        return Params.get({skey:$route.current.params.skey});
      }]
    }
  });
}])

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', 'I18N.TRASLATES', function ($scope, $route, $routeParams, account, params, i18n) {
  console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account, params);
  $scope.i18n = i18n;
  $scope.account = account;
  $scope.skey = $routeParams['skey'];
  $scope.params = params;
  $scope.filtered = true;
  //$scope.system = account.account.systems[$scope.skey];
  /*
  $scope.params = [];
  for(var i=0; i<100; i++) {
    $scope.params.push({
      'index': i,
      'name': 'name.' + i,
      'desc': 'Описание ' + i,
      'type': 'INT16',
      'value': i % 10,
      'default': i % 10,
      'queue': null,
      'filter': (i%10) === 1
    });
  }*/
  $scope.isFiltered = function(item) {
    if(!$scope.filtered) {
      return true;
    }
    return item.filter;
  };
  $("[rel=tooltip]").tooltip();
}])

.filter('isFiltered', function(){
  return function(value, status){
    console.log('isFiltered:', value, status);
    if(!status) {
      return value;
    }
    var out = [];
    for(var i=0; i<value.length; i++){
      if(value[i].filter) {
        out.push(value[i]);
      }
    }
    return out;
  };
});

angular.module('config', ['resources.account', 'resources.system', 'ui', 'config.system.params', 'directives.lists'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config', {
    templateUrl:'config/config.tpl.html',
    controller:'ConfigViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }],
      system: ['System', function (System) {
        return  System;
      }]
    }
  });
}])

.controller('ConfigViewCtrl', ['$scope', '$location', 'account', 'system', function ($scope, $location, account, system) {
  console.log(["ConfigViewCtrl:", system]);

  $scope.account = account;

  $scope.deleteenable = false;
  //$scope.addform = false;
  $scope.onAdd = function(imei){
    console.log('onAdd', imei, account, document.getElementById('config_add_file'));

    account.systemadd([imei]);
    $scope.addform = false;
  };

  $scope.onFromFiles = function(){
    console.log('multiple add', $scope.files);
    account.systemadd($scope.files);
    $scope.addform = false;
  };

  $scope.onSort = function(){
    console.log('onSort');
    account.systemsort();
  };

  $scope.onChange = function(el){
    console.log('onChange', el, $scope.account.account.systems[el].desc);
    system.change_desc(el, $scope.account.account.systems[el].desc);
  };

  $scope.onoff = function(el){
    $scope.account.account.systems[el].off = !$scope.account.account.systems[el].off;
    console.log('onoff', el);
  };

  $scope.del = function(el){
    //delete el;
    console.log('del', el);
    account.systemdel(el);
    //$scope.account.systems[]
  };
  var sortableEle = $('ul.config_sys_list').sortable({
    handle: ".msp",
    revert: true,
    scrollSpeed: 5,
    cursor: 'crosshair',
    placeholder: 'ui-sortable-placeholder2',
    stop: $scope.onSort
  });

  /*$scope.$watch('account', function(){
    console.log('$watch:account');
  }, true);*/

  $scope.manageSystem = function (skey) {
    $location.path('/config/' + skey);
  };

  $scope.manageSystemData = function (skey) {
    $location.path('/config/' + skey + '/data');
  };

  $scope.manageSystemParams = function (skey) {
    $location.path('/config/' + skey + '/params');
  };
  //$("[rel=tooltip]").tooltip();
}]);

angular.module('config.system.data', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config/:skey/data', {
    templateUrl:'config/data/data.tpl.html',
    controller:'ConfigDataCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('ConfigDataCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

angular.module('help', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl:'help/help.tpl.html',
    controller:'HelpViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('HelpViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

console.log('----------------------');
angular.module('i18n', [])
.constant('I18N.TRASLATES', {
  'copy_to_buffer':'Копировать в буффер обмена'
});


angular.module('reports', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl:'reports/reports.tpl.html',
    controller:'ReportsViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('ReportsViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

angular.module('app', [
  'resources.account',
  'login',
  'map',
  'logs',
  'gps',
  'reports',
  'config',
  'help',
  'services.i18nNotifications',
  'services.httpRequestTracker',
  'templates']);


var DEVELOP = ((location.hostname === 'localhost') || (location.hostname === 'bigbrother'));
var API_VERSION = "1.0";

angular.module('app').constant('SERVER', {
  api: (DEVELOP ? 'http://api.localhost/' : 'http://api.newgps.navi.cc/') + API_VERSION,
  api_withCredentials: true,    // Должен быть установлен для использования withCredentials, в противном случае используется авторизация через Header:
  //api_port: DEVELOP ? '8183' : '',
  point: DEVELOP ? 'http://localhost:8181/' : 'http://point.newgps.navi.cc/',
  channel: DEVELOP ? 'http://localhost:8888/socket' : 'http://channel.newgps.navi.cc:8888/socket'
});

//TODO: move those messages to a separate module
angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError':'Route change error',
  'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
  'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
  'crud.user.save.error':"Something went wrong when saving a user...",
  'login.error.notAuthorized':"Необходима авторизация чтобы пользоваться сервисом.",
  'login.error.notAuthenticated':"Необходима авторизация чтобы пользоваться сервисом.",
  'login.newUser':'Создана новая учетная запись {{name}}.'
});

angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', 'SERVER', function ($routeProvider, $locationProvider, $httpProvider, SERVER) {
  console.log(['! App CONFIG !', $httpProvider, SERVER]);
  $httpProvider.defaults.withCredentials = SERVER.api_withCredentials;

  if(!$httpProvider.defaults.headers.patch) {
    $httpProvider.defaults.headers.patch = {};
  }
  $httpProvider.defaults.headers.patch["Content-Type"] = 'application/json; charset=utf-8';

  //$locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo:'/login'});
}]);

angular.module('app').run(['$http', 'SERVER', function($http, SERVER){
  console.log(['! App RUN ! ', $http.defaults, SERVER]);
}]);

angular.module('app').controller('AppCtrl', ['$scope', '$location', 'i18nNotifications', 'localizedMessages', function($scope, location, i18nNotifications) {
//angular.module('app').controller('AppCtrl', ['$scope', function($scope) {

  $scope.notifications = i18nNotifications;
  $scope.location = location;

  $scope.removeNotification = function (notification) {
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]);

//angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'notifications', 'httpRequestTracker', function ($scope, $location, $route, notifications, httpRequestTracker) {
angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'Account', 'httpRequestTracker', function ($scope, $location, $route, Account, httpRequestTracker) {
  $scope.location = $location;
  $scope.account = Account;

  $scope.home = function () {
    /*if ($scope.currentUser.isAuthenticated()) {
      $location.path('/map');
    } else {*/
      $location.path('/login');
    //}
  };

  $scope.isNavbarActive = function (navBarPath) {
    //console.log('isNavbarActive(', navBarPath, $location, '123');
    //return navBarPath === $location.path();
    return $location.path().match(navBarPath);
  };

  $scope.hasPendingRequests = function () {
    return httpRequestTracker.hasPendingRequests();
  };

  /*$scope.collapse = function() {
    $(".collapse").collapse('toggle');
  };*/
  $scope.$on('$routeChangeSuccess', function (scope, next, current) {
    $(".collapse").collapse('hide');
  });
  /*$(".collapse").collapse({toggle: false});*/

}]);

angular.module('gps', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/gps', {
    templateUrl:'gps/gps.tpl.html',
    controller:'GPSViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });
}])

.controller('GPSViewCtrl', ['$scope', '$location', 'account', function ($scope, $location, account) {
  $scope.account = account;
}]);

angular.module("login/toolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/toolbar.tpl.html",
    "<ul class=\"nav pull-right\">" +
    "  <li class=\"divider-vertical\"></li>" +
    "  <li ng-show=\"currentUser\">" +
    "      <a href=\"#\">{{userInfo().firstName}} {{userInfo().lastName}}</a>" +
    "  </li>" +
    "  <li ng-show=\"isAuthenticated()\">" +
    "      <form class=\"navbar-form\">" +
    "          <button class=\"btn\" ng-click=\"logout()\">Log out</button>" +
    "      </form>" +
    "  </li>" +
    "  <li ng-hide=\"isAuthenticated()\">" +
    "      <form class=\"navbar-form\">" +
    "          <button class=\"btn\" ng-click=\"login()\">Log in</button>" +
    "      </form>" +
    "  </li>" +
    "</ul>");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div>" +
    "    <div ng-class=\"{hidden: account.isAuthenticated}\">" +
    "        <h4>Вход</h4>" +
    "        <div class=\"wide\">" +
    "            Чтобы пользоваться сервисом необходимо авторизоваться в системе.<br>" +
    "            Введите имя пользователя и пароль своей учетной записи.<br>" +
    "            Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически." +
    "        </div>" +
    "        <form name=\"form\" ng-submit=\"onLogin(user.name, user.password)\" style=\"width: auto\">" +
    "            <div class=\"input-prepend\">" +
    "                <span class=\"add-on\"><i class=\"icon-user\"></i></span>" +
    "                <input class=\"\" type=\"text\" placeholder=\"Имя пользователя\" ng-model=\"user.name\" required autofocus>" +
    "            </div>" +
    "" +
    "            <div class=\"input-prepend\">" +
    "                <span class=\"add-on\"><i class=\"icon-key\"></i></span>" +
    "                <input class=\"\" type=\"password\" placeholder=\"Пароль\" ng-model=\"user.password\">" +
    "            </div>" +
    "            <button class=\"btn clear\" ng-click=\"clearForm()\">Очистить</button>" +
    "            <button class=\"btn btn-primary login\" ng-click=\"onLogin(user.name, user.password)\" ng-disabled='form.$invalid'>Войти</button>" +
    "" +
    "        </form>" +
    "        <div class=\"wide\">" +
    "            Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически." +
    "        </div>" +
    "" +
    "" +
    "    </div>" +
    "    <div ng-class=\"{hidden: !account.isAuthenticated}\">" +
    "        <h4>Вы вошли как <i>{{ account.account.title }}</i></h4>" +
    "        <dl class=\"dl-horizontal\">" +
    "            <dt>Язык (language)</dt><dd><select style=\"max-width:100px;\" ng-model=\"blah\" ng-options=\"item.id as item.title for item in langs\"></select></dd>" +
    "            <dt>Имя входа</dt><dd contenteditable ng-model=\"account.account.name\" ng-change=\"onChange(account.account.name)\"></dd>" +
    "            <dt>Дата регистрации</dt><dd>{{ account.account.date | fromnow }}</dd>" +
    "            <dt>Администратор</dt><dd>{{ account.account.admin | yesno }}</dd>" +
    "            <dt>Наблюдаемых систем</dt><dd>{{ account.account.skeys.length }}</dd>" +
    "            <dt title=\"Для восстановления пароля\">email</dt><dd>{{ account.account.email }}</dd>" +
    "        </dl>" +
    "        <div style=\"text-align: center;\">" +
    "            <button class=\"btn btn-warning\" ng-click=\"onLogout();\">" +
    "                <i class=\"icon-off\"></i>" +
    "                Выйти из учетной записи" +
    "            </button>" +
    "        </div>" +
    "    </div>" +
    "</div>" +
    "" +
    "" +
    "");
}]);

angular.module("login/login-orig.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login-orig.tpl.html",
    "<div modal=\"showLoginForm\" close=\"cancelLogin()\">" +
    "    <div class=\"modal-header\">" +
    "        <h4>Sign in</h4>" +
    "    </div>" +
    "    <div class=\"modal-body\">" +
    "        <div class=\"alert alert-error\" ng-show=\"authError\">" +
    "            {{authError}}" +
    "        </div>" +
    "        <form name=\"form\" ng-submit=\"login()\" >" +
    "            <label>E-mail</label>" +
    "            <input name=\"login\" type=\"email\" ng-model=\"user.email\" required autofocus>" +
    "            <label>Password</label>" +
    "            <input name=\"pass\" type=\"password\" ng-model=\"user.password\" required>" +
    "        </form>" +
    "    </div>" +
    "    <div class=\"modal-footer\">" +
    "        <button class=\"btn btn-primary login\" ng-click=\"login()\" ng-disabled='form.$invalid'>Sign in</button>" +
    "        <button class=\"btn clear\" ng-click=\"clearForm()\">Clear</button>" +
    "        <button class=\"btn btn-warning cancel\" ng-click=\"cancelLogin()\">Cancel</button>" +
    "    </div>" +
    "</div>" +
    "");
}]);

angular.module("map/map.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("map/map.tpl.html",
    "<div gmap=\"main\"></div>" +
    "<div class=\"map-control\">" +
    "    <ul class=\"mapsyslist\">" +
    "        <li ng-repeat=\"s in account.account.skeys\">" +
    "            <span class=\"desc\">" +
    "                {{ account.account.systems[s].desc }}" +
    "            </span>" +
    "            <!--span class=\"imei\">" +
    "                {{ account.account.systems[s].imei }}" +
    "            </span-->" +
    "            <span class=\"status\">" +
    "                Стоит" +
    "            </span>" +
    "            <span class=\"signal\">" +
    "                24/05/2013 24:55" +
    "            </span>" +
    "            <br>" +
    "            <span class=\"status\">" +
    "                <span title=\"Основное питание\"><i class=\"icon-ambulance\"></i><strong>12В</strong></span>" +
    "                <span title=\"Резервное питание\"><i class=\"icon-bolt\"></i><strong>4.2В</strong></span>" +
    "                <span title=\"Сигнал GSM\"><i class=\"icon-signal\"></i></span>" +
    "                <i title=\"Сигнал GPS\" class=\"fonticon\">e</i>" +
    "            </span>" +
    "        </li>" +
    "    </ul>" +
    "    <div class=\"mapcalendar\">" +
    "      <!--div ng-model=\"date\" value=\"02-16-2012\" data-date=\"12-02-2012\" data-date-format=\"dd-mm-yyyy\" ui-date regional=\"ru\"></div-->" +
    "      <div id=\"datepicker\" data-date-language=\"ru\" data-date-weekstart=\"1\"></div>" +
    "      <!--div class=\"input-append date\" id=\"datepicker\" data-date=\"12-02-2012\" data-date-format=\"dd-mm-yyyy\">" +
    "            <input size=\"16\" type=\"text\" value=\"12-02-2012\" readonly>" +
    "            <span class=\"add-on\"><i class=\"icon-th\"></i></span>" +
    "        </div-->" +
    "    </div>" +
    "" +
    "" +
    "</div>" +
    "" +
    "<div class=\"map-timeline\">" +
    "    Шкала" +
    "    <div style=\"width: 40000px;\">uu</div>" +
    "</div>" +
    "" +
    "</div>" +
    "");
}]);

angular.module("logs/logs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("logs/logs.tpl.html",
    "<h4>События</h4>" +
    "" +
    "<div class=\"form-inline\" style=\"display: inline-block; margin:10px 0 10px 0;\">" +
    "<select name=\"\" id=\"\" ng-model=\"skey\" ng-select=\"onSelect()\">" +
    "    <option value=\"\">Выберите систему</option>" +
    "    <option ng-repeat=\"s in account.account.skeys\" value=\"{{s}}\">{{account.account.systems[s].desc}}</option>" +
    "</select>" +
    "<button class=\"btn\" ng-show=\"skey\" ng-click=\"onReload()\"><i class=\"icon-refresh\"></i> Обновить</button>" +
    "</div>" +
    "" +
    "    <table class=\"table table-bordered table-condensed table-striped table-hover\">" +
    "        <thead>" +
    "        <tr>" +
    "            <th>Дата и время</th>" +
    "            <th>Событие</th>" +
    "            <th>Примечания</th>" +
    "        </tr>" +
    "        </thead>" +
    "        <tbody>" +
    "        <!--tr ng-repeat=\"p in params | isFiltered:filtered\"-->" +
    "        <tr ng-repeat=\"l in logs.logs | filter:isFiltered\">" +
    "            <td>{{l.dt}}</td>" +
    "            <td>{{l.text}}<!--i class=\"icon-filter cmd\" title=\"Показать только события данного типа\" ng-click=\"filtered=!filtered\"></i--></td>" +
    "            <td>{{l.comments}}</td>" +
    "        </tr>" +
    "        <tr ng-show=\"!logs.logs.length\">" +
    "            <td colspan=\"7\">{{ comment }}</td>" +
    "        </tr>" +
    "        </tbody>" +
    "    </table>" +
    "" +
    "<!--div>" +
    "    {{ skey }}" +
    "    Logs: {{ logs }}" +
    "    <code>{{ account }}</code>" +
    "</div-->" +
    "");
}]);

angular.module("notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications.tpl.html",
    "<div ng-class=\"['alert', 'alert-'+notification.type]\" ng-repeat=\"notification in notifications.getCurrent()\">" +
    "    <button class=\"close\" ng-click=\"removeNotification(notification)\">x</button>" +
    "    {{notification.message}}" +
    "</div>" +
    "");
}]);

angular.module("config/config.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("config/config.tpl.html",
    "<h4>Список систем</h4>" +
    "" +
    "<div>" +
    "    <button class=\"btn\" ng-click=\"addform=!addform;\"><i class=\"icon-plus-sign\"></i> Добавить систему</button>" +
    "    <!--span ng-class=\"{hidden: !addform}\"-->" +
    "    <span ng-show=\"addform\">" +
    "        <form class=\"form-inline\" style=\"display: inline-block; margin:0;\" name=\"form\" ng-submit=\"onAdd(newimei)\">" +
    "            <label style=\"display:inline\">IMEI</label>" +
    "            <input type=\"text\" ng-model=\"newimei\" required autofocus></input>" +
    "            <button class=\"btn btn-primary login\" id=\"login\" ng-show='!form.$invalid'>Добавить</button>" +
    "            <fileload ng-model=\"files\" ng-change=\"onFromFiles()\"></fileload>" +
    "        </form>" +
    "            <!--div class=\"add_by_files\">" +
    "                <ul>" +
    "                    <li ng-repeat=\"f in files\">{{f}}</li>" +
    "                </ul>" +
    "            </div-->" +
    "    </span>" +
    "    <span style=\"display:inline-block; float:right; margin-right: 8px;\" title=\"Удаление систем\">" +
    "        <label style=\"display: inline-block\" for=\"config_delete\">Удаление</label> <input id=\"config_delete\" type=\"checkbox\" ng-model=\"deleteenable\" ></input>" +
    "    </span>" +
    "</div>" +
    "<ul class=\"config_sys_list\" ui-sortable ng-model=\"account.account.skeys\" ng-update=\"onUpdate()\">" +
    "    <li ng-repeat=\"s in account.account.skeys\" ng-class=\"{off: account.account.systems[s].off}\">" +
    "        <i class=\"msp icon-reorder icon-large\" title=\"Нажмите и тяните чтобы изменить порядок отображения объектов\"></i" +
    "        ><!--i class=\"syspicto icon-globe icon-large\" title=\"Нажмите чтобы задать значок\" ng-click=\"icon(s)\"></i" +
    "        ><i class=\"systag icon-tags icon-large\" title=\"Нажмите чтобы назначить ярлыки\" ng-click=\"tags(s)\"></i" +
    "        --><i class=\"icon-wrench icon-large\" title=\"Нажмите чтобы настроить трекер\" ng-click=\"manageSystemParams(s)\"></i>" +
    "        <span class=\"sysimei canselect\" title=\"IMEI\">{{ account.account.systems[s].imei }}</span>" +
    "        <span class=\"sysphone\" title=\"номер телефона\">{{ account.account.systems[s].phone }}</span>" +
    "        <!--span class=\"control\"><i class=\"icon-edit\" title=\"Редактировать описание системы\" ng-click=\"edit(s)\"></i></span-->" +
    "        <span class=\"sysname canselect\" contenteditable ng-model=\"account.account.systems[s].desc\" ng-change=\"onChange(s)\" title=\"Для изменения описания поместите курсор в поле\"></span>" +
    "        <span class=\"sysrightcontrol control\">" +
    "            <i class=\"systag icon-off icon-large\" title=\"Временно отключить наблюдение за системой\" ng-click=\"onoff(s)\"></i>" +
    "            <i class=\"systag icon-trash icon-large\" ng-class=\"{hidden: !deleteenable}\" title=\"Удалить систему из списка наблюдения (без подтверждения)\" ng-click=\"del(s)\"></i>" +
    "        </span>" +
    "    </li>" +
    "</ul>" +
    "" +
    "<!--" +
    "<div class=\"row\">" +
    "<div class=\"well span4\">" +
    "    <h4>Список для контроля</h4>" +
    "    <ul class=\"unstyled\">" +
    "        <li ng-repeat=\"s in account.account.skeys\">{{ account.account.systems[s].imei }}</li>" +
    "    </ul>" +
    "</div>" +
    "</div>" +
    "" +
    "" +
    "<div class=\"well\">" +
    "    <h4>Контроль сферы</h4>" +
    "    <code>{{ account }}</code>" +
    "</div>" +
    "" +
    "-->" +
    "");
}]);

angular.module("config/params/params.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("config/params/params.tpl.html",
    "<div class=\"scrollable\">" +
    "" +
    "" +
    "<!--div class=\"span4\"-->" +
    "" +
    "<div class=\"row\">" +
    "    <div class=\"well well-small span4\">" +
    "        <h4>Информация о трекере</h4>" +
    "" +
    "        <dl class=\"dl-horizontal\">" +
    "            <dt>Наименование</dt><dd>{{ account.account.systems[skey].desc }}</dd>" +
    "            <dt>IMEI</dt><dd>{{ account.account.systems[skey].imei }} <i class=\"icon-copy cmd\" title=\"{{ i18n.copy_to_buffer }}\"></i></dd>" +
    "            <dt>Телефон SIM-карты</dt><dd>{{ account.account.systems[skey].phone }}</dd>" +
    "            <dt>Зарегестрирована</dt><dd>{{ account.account.systems[skey].date | fromnow }}</dd>" +
    "            <dt>Версия ПО</dt><dd>3021 <i class=\"icon-question-sign cmd\" title=\"Проверить доступность обновления\"></i></dd>" +
    "        </dl>" +
    "" +
    "        <button class=\"btn btn-small\" ng-click=\"new()\">Добавить произвольное поле</button>" +
    "    </div>" +
    "" +
    "    <div class=\"well well-small span4\">" +
    "        <h4>Сведения о состоянии</h4>" +
    "" +
    "        <dl class=\"dl-horizontal\">" +
    "            <dt>Выход на связь</dt><dd>{{ account.account.systems[skey].date | fromnow }}</dd>" +
    "            <dt>Текущее состояние</dt><dd>Стоит</dd>" +
    "            <dt>Уровень GSM</dt><dd>неизвестно</dd>" +
    "            <dt>Уровень GPS</dt><dd>неизвестно</dd>" +
    "            <dt>Основное питание</dt><dd>-</dd>" +
    "            <dt>Резервное питание</dt><dd>-</dd>" +
    "            <dt>Координаты</dt><dd>35.4, 46.2<i class=\"icon-copy cmd\" title=\"{{ i18n.copy_to_buffer }}\"></i></dd>" +
    "            <dt>Высота над ур.моря</dt><dd>256м</dd>" +
    "            <dt>Температура</dt><dd>52гЦ</dd>" +
    "            <dt>Корпус</dt><dd>закрыт</dd>" +
    "            <dt>Вход 1</dt><dd>активен</dd>" +
    "            <dt>Вход 2</dt><dd>не активен</dd>" +
    "            <dt>Вход 3</dt><dd>не активен</dd>" +
    "            <dt>Выход 1</dt><dd>не активен</dd>" +
    "            <dt>Выход 2</dt><dd>не активен</dd>" +
    "            <dt>Уровень топлива</dt><dd>25л</dd>" +
    "        </dl>" +
    "" +
    "        <button class=\"btn btn-small\" ng-click=\"update()\">Обновить</button>" +
    "    </div>" +
    "" +
    "    <div class=\"well well-small span4\">" +
    "        <h4>Информация о транспортном средстве</h4>" +
    "" +
    "        <dl class=\"dl-horizontal\">" +
    "            <dt>Наименование</dt><dd>-</dd>" +
    "            <dt>Гос номер</dt><dd>AA 0000 AA</dd>" +
    "            <dt>Год выпуска</dt><dd>-</dd>" +
    "            <dt>№ двигателя</dt><dd>-</dd>" +
    "            <dt>№ кузова</dt><dd>-</dd>" +
    "            <dt>№ страхового полиса</dt><dd>-</dd>" +
    "        </dl>" +
    "" +
    "        <a class=\"btn btn-small\" href=\"#drivers\">Водители</a>" +
    "        <a class=\"btn btn-small\" href=\"#fuel\">Расход топлива</a>" +
    "        <a class=\"btn btn-small\" href=\"#tags\">Ярлыки</a>" +
    "        <a class=\"btn btn-small\" href=\"#zones\">Привязка к зонам</a>" +
    "    </div>" +
    "" +
    "</div>" +
    "" +
    "<div class=\"well well-small\">" +
    "    <h4>Программирование параметров системы</h4>" +
    "" +
    "    <table class=\"table table-bordered table-condensed table-striped table-hover\">" +
    "        <thead>" +
    "        <tr>" +
    "            <th>№</th>" +
    "            <th>Имя</th>" +
    "            <th>Описание<i class=\"icon-filter cmd\" rel=\"tooltip\" title=\"Показать все параметры\" ng-click=\"filtered=!filtered\"></i></th>" +
    "            <th>Тип</th>" +
    "            <th>Значение</th>" +
    "            <th>Заводское значение</th>" +
    "            <th>Очередь</th>" +
    "        </tr>" +
    "        </thead>" +
    "        <tbody>" +
    "        <!--tr ng-repeat=\"p in params | isFiltered:filtered\"-->" +
    "        <tr ng-repeat=\"(k, p) in params.value | filter:isFiltered\">" +
    "            <td>{{p.index}}</td>" +
    "            <td>{{k}}</td>" +
    "            <td>{{p.desc}}</td>" +
    "            <td>{{p.type}}</td>" +
    "            <td>{{p.value}}</td>" +
    "            <td>{{p.default}}</td>" +
    "            <td>{{p.queue}}</td>" +
    "        </tr>" +
    "        <tr ng-show=\"!params.length\">" +
    "            <td colspan=\"7\">Данные еще не получены</td>" +
    "        </tr>" +
    "        </tbody>" +
    "    </table>" +
    "    <div class=\"\" style=\"text-align: right;\">" +
    "        <button class=\"btn btn-danger\" ng-click=\"stopqueue()\"><i class=\"icon-trash icon-white\"></i> Отменить внесенные изменения</button>" +
    "        <button class=\"btn btn-warning\" ng-click=\"resetdefaults()\"><i class=\"icon-adjust icon-white\"></i> Установить все значения в заводское</button>" +
    "    </div>" +
    "<!--/div-->" +
    "<!--/div-->" +
    "" +
    "</div>");
}]);

angular.module("config/data/data.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("config/data/data.tpl.html",
    "<div class=\"well\">" +
    "    <h4>Анкета трекера</h4>" +
    "    <hr>" +
    "    В разработке..." +
    "    <hr>" +
    "    <crud-buttons></crud-buttons>" +
    "</div>" +
    "");
}]);

angular.module("help/help.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("help/help.tpl.html",
    "<h4>Информация и помощь</h4>" +
    "<hr>" +
    "В разработке" +
    "");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\" ng-controller=\"HeaderCtrl\">" +
    "    <div class=\"navbar-inner\">" +
    "        <div class=\"container\">" +
    "            <!--a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\"-->" +
    "" +
    "            <span class=\"wide\"><a class=\"brand\" href=\"#/login\">newgps.navi.cc</a></span>" +
    "            <div class=\"\">" +
    "                <ul class=\"nav\" ng-class=\"{hidden: !account.isAuthenticated}\">" +
    "                    <li ng-class=\"{active:isNavbarActive('map')}\">" +
    "                        <a href=\"#/map\">" +
    "                            <i class=\"icon-map-marker\"></i>" +
    "                            <span class=\"wide\">Карта</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('logs')}\">" +
    "                        <a href=\"#/logs\">" +
    "                            <i class=\"icon-eye-open\"></i>" +
    "                            <span class=\"wide\">События</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('reports')}\">" +
    "                        <a href=\"#/reports\">" +
    "                            <i class=\"icon-table\"></i>" +
    "                            <span class=\"wide\">Отчеты</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('gps')}\">" +
    "                        <a href=\"#/gps\">" +
    "                            <i class=\"icon-film\"></i>" +
    "                            <span class=\"wide\">Экспорт GPS</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('config')}\">" +
    "                        <a href=\"#/config\">" +
    "                            <i class=\"icon-cogs\"></i>" +
    "                            <span class=\"wide\">Настройки</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('help')}\">" +
    "                        <a href=\"#/help\">" +
    "                            <i class=\"icon-medkit\"></i>" +
    "                            <span class=\"wide\">Помощь</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('login')}\">" +
    "                        <a href=\"#/login\">" +
    "                            <i class=\"icon-off\"></i>" +
    "                            <span class=\"wide\">Пользователь</span>" +
    "                        </a>" +
    "                    </li>" +
    "" +
    "                    <!-- Admin items -->" +
    "                    <li class=\"dropdown\" ng-class=\"{active:isNavbarActive('admin'), open:isAdminOpen}\" ng-show=\"currentUser.isAdmin()\">" +
    "                        <a id=\"adminmenu\" role=\"button\" class=\"dropdown-toggle\" ng-click=\"isAdminOpen=!isAdminOpen\">Admin<b class=\"caret\"></b></a>" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"adminmenu\">" +
    "                            <li><a tabindex=\"-1\" href=\"/admin/projects\" ng-click=\"isAdminOpen=false\">Projects</a></li>" +
    "                            <li><a tabindex=\"-1\" href=\"/admin/users\" ng-click=\"isAdminOpen=false\">Users</a></li>" +
    "                        </ul>" +
    "                    </li>" +
    "                </ul>" +
    "                <ul class=\"nav pull-right\" ng-show=\"hasPendingRequests()\">" +
    "                    <li class=\"divider-vertical\"></li>" +
    "                    <li><a href=\"#\"><img src=\"img/spinner.gif\"></a></li>" +
    "                </ul>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</div>");
}]);

angular.module('templates', ['header.tpl.html', 'login/login.tpl.html', 'login/login-orig.tpl.html', 'login/toolbar.tpl.html', 'map/map.tpl.html', 'logs/logs.tpl.html', 'config/params/params.tpl.html', 'config/config.tpl.html', 'config/data/data.tpl.html', 'help/help.tpl.html', 'notifications.tpl.html', 'reports/reports.tpl.html', 'gps/gps.tpl.html']);
angular.module("reports/reports.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("reports/reports.tpl.html",
    "<h4>Отчеты</h4>" +
    "<hr>" +
    "В разработке..." +
    "");
}]);

angular.module("gps/gps.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gps/gps.tpl.html",
    "<h4>Экспорт GPS</h4>" +
    "<hr>" +
    "В разработке..." +
    "");
}]);

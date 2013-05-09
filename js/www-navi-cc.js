(function(window, I18n){
'use strict';

I18n.translations = I18n.translations || {};

I18n.translations.en = {
    enter: 'Enter',
    enter_help: 'Enter the user name and password of your account.',
    enter_comment: 'To use the service to log into the system.',
    enter_comment2: 'To create a new account, make up a name and password, your account is automatically created.',
    user_name: 'User name',
    user_password: 'Password',
    enter_cmd: 'Confirm'
  };

window.console.log('i18n.en init', I18n);

})(this, I18n);

(function(window, I18n){
'use strict';

I18n.translations = I18n.translations || {};

I18n.translations.pl = {
    enter: 'Entrance',
    enter_help: 'Wpisz nazwę użytkownika i hasło do swojego konta.',
    enter_comment: 'Aby skorzystać z usługi, aby zalogować się do systemu.',
    enter_comment2: 'Aby utworzyć nowe konto, uzupełnić nazwę i hasło, konto zostanie utworzone automatycznie.',
    user_name: 'Nazwa użytkownika',
    user_password: 'Hasło',
    enter_cmd: 'Wpisać'
  };

window.console.log('i18n.pl init', I18n);
})(this, I18n);

(function(window, I18n){
'use strict';

I18n.translations = I18n.translations || {};

I18n.translations.ru = {
    enter: 'Вход',
    enter_help: 'Введите имя пользователя и пароль своей учетной записи.',
    enter_comment: 'Чтобы пользоваться сервисом необходимо авторизоваться в системе.',
    enter_comment2: 'Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.',
    user_name: 'Имя пользователя',
    user_password: 'Пароль',
    enter_cmd: 'Войти'
  };

window.console.log('i18n.ru init', I18n);
})(this, I18n);

(function(window, I18n){
'use strict';

I18n.translations = I18n.translations || {};

I18n.translations.ua = {
    enter: 'Вхiд',
    enter_help: 'Введіть ім\'я користувача і пароль свого облікового запису.',
    enter_comment: 'Щоб користуватися сервісом необхідно авторизуватися в системі.',
    enter_comment2: 'Для створення нового облікового запису придумайте ім\'я користувача та пароль, обліковий запис буде створена автоматично.',
    user_name: 'Ім\'я користувача.',
    user_password: 'Пароль',
    enter_cmd: 'Увійти'
  };

//window.console.log('i18n.ua init', I18n);
})(this, I18n);

angular.module('directives.language', ['services.i18n'])

.directive('language', ['i18n', function(i18n) {
    return {
        restrict: 'A',
        replace: true,
        template: '<div class="btn-group" data-toggle="buttons-radio"><button type="button" class="btn" ng-class="{active: l.code == active}" ng-repeat="l in langs" title="{{ l.title }}" ng-click="onSet(l)">{{ l.text }}</button></div>',
        link: function(scope, element, attrs) {
            scope.langs = [
                {code: 'ru', text: 'RU', title: "Русский"},
                {code: 'en', text: 'EN', title: "English"},
                {code: 'ua', text: 'UA', title: "Українська"},
                {code: 'pl', text: 'PL', title: "Polski"}
            ];
            scope.active = i18n.active;
            scope.onSet = function(l){
                i18n.set(l.code);
                location.reload();
            };
            console.log('language directive: link', scope, element, i18n);
        }
        //, controller: ["account", function(account){console.log("account=", account)}]
    };
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
                    console.log(['  onload ==== before', e]);
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

console.log("*=*=*=*= I'am a spammer");


angular.module('directives.gmap', ['services.connect', 'ui'])

.directive('gmap', ["Connect", function(C_onnect) {
    console.log('gmap:directive');


    var link = function(s_cope, e_lement, a_ttrs) {
        console.log('map directive: link', s_cope, e_lement, C_onnect);
        //element.innerHTML="<div>map</div>";

        // Временное решение для доступа к главной карте
        //window["config"] = {};
        var config = window["config"] = {};

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

        config.map = map;

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

angular.module('directives.main', [])

.directive('mapsysitem', ["$location", function($location) {
    return {
        restrict: 'E',
         scope: {
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
            scope.manageSystemParams = function(skey){
                // console.log("manageSystemParams()", s, scope);
                $location.path('/config/' + skey + '/params');
            };

        }
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

angular.module('app.filters.i18n', [])

.filter('translate', ['globals', function(globals){
    return function (text, length, end) {
        console.log('i18n globals=', globals);
        return I18n.t(text);
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

angular.module('resources.geogps', [])

.factory('GeoGPS', ['SERVER', '$http', function (SERVER, $http) {
    var GeoGPS = {};

    GeoGPS.getHours = function(skey, hourfrom, hourto, callback){
        console.log(['GeoGPS.getHours', skey, hourfrom, hourto]);
        $http({
            method: 'GET',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/geo/hours/" + encodeURIComponent(skey) + "/" + encodeURIComponent(hourfrom) + "/" + encodeURIComponent(hourto) + '?rand=' + (Math.random()*1e18)
        }).success(function(data){
            console.log('hours data=', data);
            if(!data || (data.hours.length === 0)){
                callback([]);
            } else {
                callback(data.hours);
            }

        });
    };

    return GeoGPS;
}]);

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
angular.module('services.i18n', [])

.factory('i18n', ['$location', '$route', function($location, $route) {
    var i18n = {
        active: localStorage.getItem('language')
    };

    if(!i18n.active) {
        i18n.active = 'ru';
    }

    //console.log('i18 default:', i18n.active);
    //document.write('<script type="text/javascript" src="js/templates-en.js" id="templates"></script>');

    i18n.set = function(code){
        //console.log('i18n onSet', code, $location, $route);
        localStorage.setItem('language', code);
        i18n.active = code;
        I18n.defaultLocale = i18n.active;
        //$rootScope.$apply();
        //$location.path($location.$$path);
        //$route.reload();
        //location.reload();
    };

    I18n.defaultLocale = i18n.active;

    return i18n;
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
angular.module('app', [
  'resources.account',
  'app.filters',
  'app.filters.i18n',
  'error',
  'login',
  'map',
  'logs',
  'gps',
  'reports',
  'config',
  'help',
  'services.i18n',
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

angular.module('app').constant('globals', {
  locale: 'ru'
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
  //$routeProvider.otherwise({redirectTo:'/login'});
  //$routeProvider.otherwise({redirectTo:'/error'});
}]);

angular.module('app').run(['$http', 'SERVER', function($http, SERVER){
  console.log(['! App RUN ! ', $http.defaults, SERVER]);
}]);

angular.module('app').controller('AppCtrl', ['$scope', '$location', 'i18nNotifications', 'localizedMessages', 'i18n', function($scope, location, i18nNotifications, localizedMessages, i18n) {
//angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
  console.log('app:AppCtrl', i18n);
  $scope.i18n = i18n;

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

angular.module('config', ['resources.account', 'resources.system', 'ui', 'config.system.params', 'directives.lists'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/config', {
    templateUrl:'templates/config/config.tpl.html',
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

  $scope.onChange = function(el){
    console.log('onChange', el, $scope.account.account.systems[el].desc);
    system.change_desc(el, $scope.account.account.systems[el].desc);
  };

  $scope.onoff = function(el){
    $scope.account.account.systems[el].off = !$scope.account.account.systems[el].off;
    console.log('onoff', el);
  };

  $scope.sortableOptions = {
    stop: function(e, ui) {
      // console.log("Update", e, account.account.skeys);
      account.systemsort();
    },
    handle: ".msp",
    revert: true,
    scrollSpeed: 5,
    cursor: 'crosshair',
    placeholder: 'ui-sortable-placeholder2',
    axis: 'y'
  };

  $scope.del = function(el){
    //delete el;
    console.log('del', el);
    account.systemdel(el);
    //$scope.account.systems[]
  };
  // var sortableEle = $('ul.config_sys_list').sortable({
  //   handle: ".msp",
  //   revert: true,
  //   scrollSpeed: 5,
  //   cursor: 'crosshair',
  //   placeholder: 'ui-sortable-placeholder2',
  //   end: $scope.onSort
  // }).on('update', function(ev){
  //   console.log('on update', ev);
  // });

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
    templateUrl:'templates/config/data/data.tpl.html',
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

angular.module('config.system.params', ['resources.account', 'resources.params', 'app.filters'])

.config(['$routeProvider', function ($routeProvider) {
  var skey = ['$route', function($route){
    console.log(['=== route', route]);
    return $route.current.params.skey;
  }];
  console.log(['=== skey', skey]);
  $routeProvider.when('/config/:skey/params', {
    templateUrl:'templates/config/params/params.tpl.html',
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

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', function ($scope, $route, $routeParams, account, params) {
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

angular.module('error', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/error', {
    templateUrl:'templates/en/error.tpl.html',
    controller:'ErrorCtrl'
  });

}])

.controller('ErrorCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
  console.log('ErrorCtrl', $location, $route);
  //$route.current.$route.template = "<div>Loaded</div>";
}]);

angular.module('gps', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/gps', {
    templateUrl:'templates/gps/gps.tpl.html',
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

angular.module('help', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl:'templates/help/help.tpl.html',
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

angular.module('login', ['resources.account', 'app.filters', 'directives.modal', 'directives.language'])

.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl:'login.tpl.html',
    controller:'LoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
      }]
    }
  });

  $routeProvider.when('/test-login', {
    //templateUrl:'templates/en/login.tpl.html',
    template: '<div>Loading...</div>',
    controller:'TestLoginViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        return Account;
      }]
    }
  });

}])

.controller('TestLoginViewCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
  console.log('TestLoginViewCtrl', $location, $route);
  $route.current.$route.template = "<div>Loaded</div>";
}])

.controller('LoginViewCtrl', ['$scope', '$location', 'account', '$templateCache', function ($scope, $location, account, $templateCache) {
  $scope.account = account;
  $scope.test = "Hello, it's test.";
  $scope.showLoginForm = true;
  $scope.user = {};

  console.log('$templateCache=', $templateCache.get('templates/ru/login.tpl.html'));

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
    console.log('Login:', $scope, user, pass);

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

  //console.log('LoginViewCtrl controller', $scope, $location, account, i18n);
}]);



angular.module('logs', ['resources.account', 'resources.logs'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/logs', {
    templateUrl:'templates/logs/logs.tpl.html',
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

var path = null;

angular.module('map', ['resources.account', 'directives.gmap', 'directives.main', 'resources.geogps'])

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
  });
}])

.controller('MapCtrl', ['$scope', '$location', 'account', 'GeoGPS', function ($scope, $location, account, GeoGPS) {
  $scope.account = account;

  var days = {};
  var skey = null;

  /*setTimeout(function(){
    console.log('+++++++++', $('#datepicker'));*/
    // console.log('+++++++++', $('#datepicker'));
    // var nowTemp = new Date();
    // var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var datepicker = $('#datepicker').datepicker({
        beforeShowDay: function(date) {
          var hour = date.valueOf()/1000/3600;
          var day = hour/24;
          // console.log("beforeShowDay", day, (hour%2 === 0)?'enabled':'disabled');
          // return (day%2 === 0)?'enabled':'disabled';
          // return date.valueOf() < now.valueOf() ? 'disabled' : '';
          return (day in days)?'enabled':'disabled';
        }
    }).on('changeDate', function(ev){
      var date = ev.date;
      var tz = (new Date()).getTimezoneOffset()/60;
      var hourfrom = date.valueOf() / 1000 / 3600 + tz;
      console.log(["datepicker: on changeDate", ev, date]);
      loadTrack(skey, hourfrom, hourfrom+23);
    });
    // }).on('Render', function(ev){
    //   console.log(["datepicker: on Render", ev]);
    // });
  /*}, 1000);*/


  var loadTrack = function(skey, hourfrom, hourto){
    console.log("loadTrack", skey, hourfrom, hourto);
    var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://localhost:8182/1.0/geo/get/dGVzdC0wMQ/379952/379954', true);
    // xhr.open('GET', 'http://localhost:8182/1.0/geo/get/dGVzdC0wMQ/379962/379962', true);
    xhr.open('GET', 'http://localhost:8182/1.0/geo/get/' + skey + '/' + hourfrom + '/' + hourto, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
      if(!this.response) {
        // alert('No data');
        if(path) {
          path.setMap(null);
          path = null;
        }
        return;
      }
      var uInt8Array = new Uint8Array(this.response); // this.response == uInt8Array.buffer
      // var byte3 = uInt8Array[4]; // byte at offset 4

      bingpsparse(uInt8Array);
      console.log("Got data", uInt8Array.length, 'bytes');

    };

    xhr.send();

  };

  var loadHours = function(s){

    GeoGPS.getHours(s, 0, 1000000, function (data){
      console.log(["loadHours", s, data]);
      days = {};
      for(var i=0, l=data.length; i<l; i++){
        var hour = data[i];
        var date = new Date(hour * 3600 * 1000);
        date.setHours(0); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0);
        var dayhour = date.getTime()/1000/3600; // Первый час суток
        var dateepoch = +(new Date(date.toDateString() + " GMT")) / 1000 / 3600 / 24;
        if(dateepoch in days){
          days[dateepoch] += 1;
          // console.log("set", days);
        } else {
          days[dateepoch] = 1;
          // console.log("grow", days);
        }
        // console.log("hour", hour, "->", date.toDateString(), dayhour, dateepoch);
      }
      console.log(["days", days]);
      // $('#datepicker').datepicker("update");
      $('#datepicker').datepicker("fill"); // Undocumented stuff
    });
  };

  $scope.onSysSelect = function(s){
    // loadTrack(skey);
    skey = s;
    loadHours(skey);
  };

  $scope.hideTrack = function(){
      console.log("Hide track");
    if(path) {
      path.setMap(null);
      path = null;
    }
  };

}]);

var parse_onebin = function(packet){
  // 0xFF,                   # D0: Заголовок (должен быть == 0xFF)
  // 0xF4,                   # D1: Идентификатор пакета (должен быть == 0xF4)
  // 32,                     # D2: Длина пакета в байтах, включая HEADER, ID и LENGTH (32)
  if((packet[0] == 0xFF) && (packet[1] == 0xF4) && (packet[2] == 32)){
    // dt,                     # D3: Дата+время
    var dt = packet[3] + packet[4]*256 + packet[5]*256*256 + packet[6]*256*256*256;
    // latitude,               # D4: Широта 1/10000 минут
    var lat = (packet[7] + packet[8]*256 + packet[9]*256*256 + packet[10]*256*256*256) / 600000.0;
    // longitude,              # D5: Долгота 1/10000 минут
    var lon = (packet[11] + packet[12]*256 + packet[13]*256*256 + packet[14]*256*256*256) / 600000.0;
    // speed,                  # D6: Скорость 1/100 узла
    var speed = packet[15] + packet[16]*256;
    // int(round(course/2)),   # D7: Направление/2 = 0..179
    var course = packet[17]*2;
    // sats,                   # D8: Кол-во спутников 3..12
    var sats = packet[18];
    // vout,                   # D9: Напряжение внешнего питания 1/100 B
    var vout = packet[19] + packet[20]*256;
    // vin,                    # D10: Напряжение внутреннего аккумулятора 1/100 B
    var vin = packet[21] + packet[22]*256;
    // fsource,                # D11: Тип точки   Причина фиксации точки
    var fsource = packet[23];
    // 0,                      # D12: Флаги
    var flags = packet[24] + packet[25]*256;
    // 0,                      # D13: Резерв
    var reserve1 = packet[26] + packet[27]*256 + packet[28]*256*256 + packet[29]*256*256*256;
    // 0,                      # D14: Резерв
    var reserve2 = packet[30];
    // 0                       # D15: Локальная CRC (пока не используется)
    var lcrc = packet[31];
    return {
      "dt": dt,
      "lat": lat,
      "lon": lon,
      "speed": speed,
      "course": course,
      "sats": sats,
      "vout": vout,
      "vin": vin,
      "fsource": fsource,
      "flags": flags,
      "reserve1": reserve1,
      "reserve2": reserve2,
      "lcrc": lcrc
    };
  } else {
    return null;
  }
};

var bingpsparse = function(array){
  console.log('parse');
  var track = [];
  for(var i=0; i<array.length; i+=32){
    point = parse_onebin(array.subarray(i, i+32));
    // console.log('point=', point);
    if(point){
      track.push(new google.maps.LatLng(point.lat, point.lon));
    }
  }
  console.log('track length =', track.length);
  if(path) {
    path.setMap(null);
    path = null;
  }
  path = new google.maps.Polyline({
    path: track,
    strokeColor: 'blue',
    strokeOpacity: 1.0,
    strokeWeigth: 3,
    icons: [{
            icon: {
              path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
              strokeColor: 'blue',
              strokeWeight: 2,
              scale: 2
            },
            offset: '50px',
            repeat: '100px'
        }],
    map: window.config.map
  });
};
angular.module('reports', ['resources.account'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl:'templates/reports/reports.tpl.html',
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

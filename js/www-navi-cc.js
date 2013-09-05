angular.module('i18n', ['i18n.ru', 'i18n.en', 'i18n.pl', 'i18n.ua'])
.config(['$translateProvider', function ($translateProvider) {

    // console.log(["$translateProvider", $translateProvider, $translateProvider.translations()]);

    // All other langs
    // $translateProvider.translations({
    //     "error_msg": "Ууууупс. Что-то произошло. Попробуйте перейти по одной из следующих ссылок:",

    //     // Login page
    //     "enter": "Вход",
    //     "enter_help": "Введите имя пользователя и пароль своей учетной записи.",
    //     "enter_comment": "Чтобы пользоваться сервисом необходимо авторизоваться в системе.",
    //     "enter_comment2": "Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.",
    //     "user_name": "Имя пользователя",
    //     "user_password": "Пароль",
    //     "enter_cmd": "Войти",
    //     "register_cmd": "Зарегестритоваться",

    //     'SIMPLE': 'Простое значение',
    //     'COMPLEX': 'value равно {{value}}.',

    //     'MAP': 'Карта',

    //     // Панель настроек карты
    //     'AUTO_BOUND_TRACK': 'Автоматически центровать трек',
    //     'ANIMATION_DIR': 'Анимация направления',
    //     'STOP_NUMBERS': 'Нумерация остановок/стоянок'
    // });

    var lang = localStorage.getItem('language');
    if((lang === null) || (lang === "undefined") || !(lang in $translateProvider.translations())){
        lang = 'ru_RU';
        localStorage.setItem('language', lang);
    }
    $translateProvider.uses(lang);
    // $translateProvider.rememberLanguage(true);   // Not worked yet
}]);


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

// window.console.log('i18n.en init', I18n);

})(this, I18n);


angular.module('i18n.en', ['ngTranslate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('en_EN', {
        "translate": "Ошибка описания",
        "error_msg": "Ooooops. Something happened. Try using one of the following links:",

        // Login page
        "enter": "Enter",
        "enter_help": "Enter the user name and password of your account.",
        "enter_comment": "To use the service to log into the system.",
        "enter_comment2": "To create a new account, make up a name and password, your account is automatically created.",
        "user_name": "User name",
        "user_password": "Password",
        "enter_cmd": "Confirm",
        "register_cmd": "Register",
        "enter_as": "You enter as {{ value }}",
        "Display name": "Display name",
        "Register date": "Register date",
        "Administrator": "Administrator",
        "Observed systems": "Observed systems",
        "for_recovery": "To recover your password",

        "Login": 'Login',
        'Map': 'Map',
        "Logs": "Logs",
        "Reports": "Reports",
        "Export GPS": "Export GPS",
        "Config": "Config",
        "Help": "Help",
        "User": "User",

        // Map
        "Display Settings": "Display Settings",
        "Hide track": "Hide track",
        "points_in_track": "Points in track: {{value}}",

        'AUTO_BOUND_TRACK': 'Automatic bound track',
        'ANIMATION_DIR': 'Animation direction',
        'STOP_NUMBERS': 'Numbering of stops / parks',

        // Config page
        'add_system': 'Add system'
});
}]);

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

// window.console.log('i18n.pl init', I18n);
})(this, I18n);

angular.module('i18n.pl', ['ngTranslate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('pl_PL', {
        "translate": "Błąd Opis.",
        "error_msg": "Uuuuups. Coś się stało. Użyj jednego z poniższych linków:",

        // Login page
        "enter": "Entrance",
        "enter_help": "Wpisz nazwę użytkownika i hasło do swojego konta.",
        "enter_comment": "Aby skorzystać z usługi, aby zalogować się do systemu.",
        "enter_comment2": "Aby utworzyć nowe konto, uzupełnić nazwę i hasło, konto zostanie utworzone automatycznie.",
        "user_name": "Nazwa użytkownika",
        "user_password": "Hasło",
        "enter_cmd": "Wpisać",
        "register_cmd": "Zaregestritovatsya",
        "enter_as": "Jesteś zalogowany jako {{ value }}",
        "Display name": "Wyświetla nazwę",
        "Register date": "Data rejestracji",
        "Administrator": "Administrator",
        "Observed systems": "Obserwacji systemów",
        "for_recovery": "Aby odzyskać hasło",

        "Login": "Zaloguj się",
        "Map": "Map",
        "Logs": "Wydarzenia",
        "Reports": "Raporty",
        "Export GPS": "Eksport GPS",
        "Config": "Ustawienia",
        "Help": "Pomoc",
        "User": "Użytkownik",

        // Map
        "Display Settings": "Ustawienia ekranu",
        "Hide track": "Ukryj utwór",
        "points_in_track": "Punkty w utworu: {{value}}",

        'AUTO_BOUND_TRACK': 'Automatycznie wyśrodkować utwór',
        'ANIMATION_DIR': 'Kierunek Animacja',
        'STOP_NUMBERS': 'Numeracja przystanków / parki',

        // Config page
        'add_system': 'Add system (translate)'
    });
}]);

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

// window.console.log('i18n.ru init', I18n);
})(this, I18n);


angular.module('i18n.ru', ['ngTranslate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('ru_RU', {
        "translate": "Ошибка описания",
        "error_msg": "Ууууупс. Что-то произошло. Попробуйте перейти по одной из следующих ссылок:",

        // Login page
        "enter": "Вход",
        "enter_help": "Введите имя пользователя и пароль своей учетной записи.",
        "enter_comment": "Чтобы пользоваться сервисом необходимо авторизоваться в системе.",
        "enter_comment2": "Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.",
        "user_name": "Имя пользователя",
        "user_password": "Пароль",
        "enter_cmd": "Войти",
        "register_cmd": "Зарегестритоваться",
        "enter_as": "Вы вошли как {{ value }}",
        "Display name": "Отображаемое имя",
        "Register date": "Дата регистрации",
        "Administrator": "Администратор",
        "Observed systems": "Наблюдаемых систем",
        "for_recovery": "Для восстановления пароля",

        "Login": 'Вход',
        "Map": 'Карта',
        "Logs": "События",
        "Reports": "Отчеты",
        "Export GPS": "Экспорт GPS",
        "Config": "Настройки",
        "Help": "Помощь",
        "User": "Пользователь",

        // Карта
        "Display Settings": "Настройки отображения",
        "Hide track": "Скрыть трек",
        "points_in_track": "Точек в треке: {{value}}",

        // Панель настроек карты
        'AUTO_BOUND_TRACK': 'Автоматически центровать трек',
        'ANIMATION_DIR': 'Анимация направления движения',
        'STOP_NUMBERS': 'Нумерация остановок / стоянок',

        // Страница настроек
        'add_system': 'Добавить трекер'
    });
}]);

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

angular.module('i18n.ua', ['ngTranslate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('ua_UA', {
        "translate": "Помилка опису",
        "error_msg": "Ууууупс. Щось сталося. Спробуйте перейти по одній з наступних посилань:",

        // Login page
        "enter": "Вхiд",
        "enter_help": "Введіть ім'я користувача і пароль свого облікового запису.",
        "enter_comment": "Щоб користуватися сервісом необхідно авторизуватися в системі.",
        "enter_comment2": "Для створення нового облікового запису придумайте ім'я користувача та пароль, обліковий запис буде створена автоматично.",
        "user_name": "Ім'я користувача.",
        "user_password": "Пароль",
        "enter_cmd": "Увійти",
        "register_cmd": "Зарегестрітоваться.",
        "enter_as": "Ви увійшли як {{ value }}",
        "Display name": "Екранне ім'я",
        "Register date": "Дата реєстрації",
        "Administrator": "Адміністратор",
        "Observed systems": "Спостережуваних систем",
        "for_recovery": "Для відновлення паролю",

        "Login": 'Вхiд',
        'Map': 'Мапа',
        "Logs": "Події",
        "Reports": "Звіти",
        "Export GPS": "Експорт GPS",
        "Config": "Налаштування",
        "Help": "Допомога",
        "User": "Користувач",

        // Map
        "Display Settings": "Налаштування відображення",
        "Hide track": "Приховати трек",
        "points_in_track": "Точок в треку: {{value}}",

        'AUTO_BOUND_TRACK': 'Автоматично центрувати трек',
        'ANIMATION_DIR': 'Анімація напрямку руху',
        'STOP_NUMBERS': 'Нумерація зупинок / стоянок',

        // Config page
        'add_system': 'Add system (translate)'
    });
}]);

angular.module('directives.chart', ['i18n'])

.directive('chart', [function(){
    var path = null;

    var margin = {top: 20, right: 20, bottom: 30, left: 35},
        width = 650 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSubdivide(3)
        .tickSize(5, 3, 0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        // .tickValues([1, 2, 3, 5, 8, 13, 21])
        .tickSubdivide(1)
        .tickSize(4, 2, 0)
        .orient("left");

    var line = d3.svg.line()
        // .interpolate("basis")
        .x(function(d) { return x(d.liters); })
        .y(function(d) { return y(d.voltage); });

    var svg;

    var draw = function(element, data){

        x.domain(d3.extent(data, function(d) { return d.liters; }));
        y.domain([d3.min(data, function(d) { return 0.0; }), d3.max(data, function(d) { return 10.0; })]);

        svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Ось X: 0..емкость_бака
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
                .append("text")
                    .attr("x", width)
                    .attr("y", -6)
                    .style("text-anchor", "end")
                    .text("Объем топлива (л)");

        // var range = d3.range([0, 4]);
        // console.log('range', range);
        svg.selectAll('.yline').data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).enter().append("line")
            .attr("class", "tick minor yline")
            .attr("x1", 0)
            .attr("y1", function(d){return d * height / 10;})
            .attr("x2", width)
            .attr("y2", function(d){return d * height / 10;})
            .attr("stroke", "#eee");

        // Ось Y: 0..10V
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Напряжение (В)");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

    }

    var redraw = function(element, data){

        x.domain(d3.extent(data, function(d) { return d.liters; }));
        svg.select("g.x.axis").transition()
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        var line = d3.svg.line()
            // .interpolate("monotone")
            .x(function(d) { return x(d.liters); })
            .y(function(d) { return y(d.voltage); });

        svg.select("path.line")
            .datum(data).transition()
            .attr("d", line);

        var dots = svg.selectAll(".dot")
            .data(data);

        dots.enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5)
                .append("title")
                    .text(function(d) { return d.liters; })
                    .attr("y1", 0)
                    .attr("y2", 0);

        dots
            .transition()
            .attr("cx", function(d) { return x(d.liters); })
            .attr("cy", function(d) { return y(d.voltage); })
            .select('title')
                .text(function(d) { return d.liters + " л -> " + d.voltage + " B"; })

        dots.exit().remove();

        return;

        var chart = d3.select(element[0]).select('svg');
        var points = chart.selectAll(".point").data(data);

        var line = d3.svg.line()
            .x(function(d) { return d.liters * 5 + 10; })
            .y(function(d) { return 240 - d.voltage * 20; });

        if(!path){
            path = chart.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
        } else {
            path.transition()
                .attr("d", line);
        }

        var g = points.enter()
            .append("g")
            .attr("class", "point");

        // chart.selectAll(".point").transition()
        points.transition()
            .attr("transform", function(d) { return "translate(" + (d.liters * 5 + 10) + "," + (240 - d.voltage * 20)+ ")";});

        g.append("text")
            .attr("x", 0)
            .attr("y", -15)
            .attr("dx", 0)
            .attr("text-anchor", "middle");

        points.select("text").text(function(d) { return d.liters; });

        g.append("circle")
            .attr("x", 0)
            .attr("y", 0)
            .style("fill", "none")
            .style("stroke", "#00f")
            .style("stroke-opacity", 1)
            .style("stroke-width", 3)
            .attr("r", 5)

        points.exit().remove();

    }

    var link = function(scope, element, attrs) {
        //svg = element[0].querySelector('svg');
        console.log('chart:link', element);
        draw(element, scope.data);
        scope.$watch('data', function(data){
            redraw(element, scope.data);
        }, true);

        scope.sortableOptions = {
            handle: ".msp",
            revert: true,
            scrollSpeed: 5,
            cursor: 'crosshair',
            placeholder: 'ui-sortable-placeholder2',
            axis: 'y'
        };
    }

    return {
        restrict: 'E',
        scope: {
            data: "="
        },
        // template: '<svg width="500px" height="250px" class="chart"></svg>',
        template: '<div class="chart"></div>',
        replace: true,
        link: link
        // controller: ['$scope', '$element', function($scope, $element){}]
    };

}]);

angular.module('directives.language', ['i18n'])

.directive('chooselang', ['$translate', function($translate) {
    return {
        restrict: 'E',
        replace: true,
        // template: '<div class="btn-group" data-toggle="buttons-radio"><button type="button" class="btn" ng-class="{active: l.code == active}" ng-repeat="l in langs" title="{{ l.title }}" ng-click="onSet(l)">{{ l.text }}</button></div>',
        template: '<div class="btn-group"><button type="button" class="btn" ng-class="{active: l.code == active}" ng-repeat="l in langs" title="{{ l.title }}" ng-click="onSet(l)">{{ l.text }}</button></div>',
        // template:   '<select ng-model="lang">'+
        //             '<option value="">Выберите язык</option>'+
        //             '<option ng-repeat="l in langs" value="{{l.lang}}">{{l.title}}</option>'+
        //             '</select>',
                    // '{{ lang }}'
        link: function(scope, element, attrs) {
            console.log('chooselang.link');
            scope.langs = [
                {code: 'ru_RU', text: 'RU', title: "Русский"},
                {code: 'en_EN', text: 'EN', title: "English"},
                {code: 'ua_UA', text: 'UA', title: "Українська"},
                {code: 'pl_PL', text: 'PL', title: "Polski"}
            ];
            // scope.active = i18n.active;
            // scope.onSet = function(l){
            //     i18n.set(l.code);
            //     location.reload();
            // };
            // console.log('language directive: link', scope, element, i18n);
            // $scope.lang = "en_EN";
            scope.active = $translate.uses();
            // scope.lang = $translate.uses();
            // scope.$watch("lang", function(lang){
            //     // $log.warn("lang=", lang);
            //     $translate.uses(lang);
            //     localStorage.setItem('language', lang);
            // });
            scope.onSet = function(lang){
                console.log("lang=", lang);
                scope.active = lang.code;
                $translate.uses(lang.code);
                localStorage.setItem('language', lang.code);
            };

        }
        //, controller: ["account", function(account){console.log("account=", account)}]
    };
}]);


// angular.module('directives.language', ['services.i18n'])

// .directive('language', ['i18n', function(i18n) {
//     return {
//         restrict: 'A',
//         replace: true,
//         template: '<div class="btn-group" data-toggle="buttons-radio"><button type="button" class="btn" ng-class="{active: l.code == active}" ng-repeat="l in langs" title="{{ l.title }}" ng-click="onSet(l)">{{ l.text }}</button></div>',
//         link: function(scope, element, attrs) {
//             scope.langs = [
//                 {code: 'ru', text: 'RU', title: "Русский"},
//                 {code: 'en', text: 'EN', title: "English"},
//                 {code: 'ua', text: 'UA', title: "Українська"},
//                 {code: 'pl', text: 'PL', title: "Polski"}
//             ];
//             scope.active = i18n.active;
//             scope.onSet = function(l){
//                 i18n.set(l.code);
//                 location.reload();
//             };
//             console.log('language directive: link', scope, element, i18n);
//         }
//         //, controller: ["account", function(account){console.log("account=", account)}]
//     };
// }]);


angular.module('directives.lists', [])

.directive('mylist', function() {
    return {
        restrict: 'E',
        transclude: false,
        template: '<div>List:<ul><li ng-repeat="l in list"><mylistitem></mylistitem></li></ul></div>'
    };
})

.directive('mylistitem', function() {
    return {
        restrict: 'E',
        //scope: {l:"@"},
        transclude: true,
        template: '<div>{{l}}</div>'
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
                // console.log("read()", scope, ngModel);
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
                var reader = new FileReader();
                reader.onload = function(e) {
                    var list = e.target.result.replace(/[\r\t\n]/g, ' ').replace(/ {2}/g, ' ').split(' ').filter(function(el){return (el !== '') && (el !== ' ');});
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
        }
    };
})

.directive('addtracker', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
            account: "="
        },
        template: '<div><button class="btn btn-primary" ng-click="addform=!addform;"><i class="icon-plus-sign"></i><span translate>add_system</span></button>' +
                    '<span ng-show="addform">' +
                    '   <br><form class="form-inline" style="display: inline-block; margin:0;" name="form" ng-submit="onAdd(newimei)">' +
                    '        <label style="display:inline">IMEI</label>' +
                    '       <input class="form-control" type="text" ng-model="newimei" required autofocus></input>' +
                    '        <button class="btn btn-primary login" id="login" ng-show=\'!form.$invalid\'>Добавить</button>' +
                    '       <fileload ng-model="files" ng-change="onFromFiles()"></fileload>' +
                    '    </form>' +
                    '</span></div>',
        replace: true,
        link: function(scope, element, attr, ngModel) {
        },
        controller: ["$scope", function($scope){
            $scope.addform = false;
            $scope.onAdd = function(imei){
                console.log('onAdd', imei, $scope.account, document.getElementById('config_add_file'));

                $scope.account.systemadd([imei]);
                $scope.addform = false;
            };
            $scope.onFromFiles = function(){
                console.log('multiple add', $scope.files);
                $scope.account.systemadd($scope.files);
                $scope.addform = false;
            };
        }]
    }
})

.directive('clone', function() {
    return {
        restrict: 'C',
        // template: null,
        // replace: true,
        link: function(scope, element, attr, ngModel) {
            // console.log('clone component');
            element.attr('readonly', 'readonly');
            element.attr('type', 'text');
            element.attr('title', "Для копирования в буффер обмена нажмите правую кнопку и выберите 'Копировать'");
            element.bind('mousedown', function(){this.select();});
            //element.bind('mouseover', function(){this.select();});
        }
    }
})

.directive('datetime', [function(){
    return {
        restrict: 'E',
        scope: {
            datetime: "@",
            "default": "@",
            format: "@",
            seconds: "="
        },
        template: '<span class="datelabel" title="{{ title }}" ng-click="switch()">{{ value }}</span>',
        controller: ["$scope", "$filter", function($scope, $filter){
            $scope.invert = $scope["default"] || false;
            //$scope.format =
            var update = function(){
                // console.log("$scope.seconds", $scope.seconds);
                // console.log('$scope.datetime=', $scope.datetime);
                if(angular.isUndefined($scope.datetime) || $scope.datetime === ''){
                    $scope.value = "?";
                    $scope.title = "Значение неопределено";
                    return;
                }
                if($scope.invert){
                    $scope.value = $filter("datetime")($scope.datetime, $scope.seconds, $scope.format);
                    $scope.title = $filter("fromnow")($scope.datetime);
                } else {
                    $scope.value = $filter("fromnow")($scope.datetime);
                    $scope.title = $filter("datetime")($scope.datetime, $scope.seconds, $scope.format);
                }
            };
            $scope.switch = function(){
                $scope.invert = !$scope.invert;
                update();
            };
            $scope.enter = function(){
                $scope.invert = true;
                update();
            };
            $scope.leave = function(){
                $scope.invert = false;
                update();
            };
            $scope.$watch("datetime", update);
            $scope.$on('timetick', update);

        }]
    };
}])

.directive('navtool', [function(){
    return {
        restrict: 'E',
        template: '<div class="btn-group">' +
                    '<a type="button" class="btn btn-info" ng-click="back()" title="Назад">&lt;</a>' +
                    '<a type="button" class="btn btn-info" href="#/map" title="Карта"><i class="icon-map-marker" style="margin:0"></i></a>' +
                    '<a type="button" class="btn btn-info" href="#/config" title="Настройки"><i class="icon-gears" style="margin:0"></i></a>' +
                    '<a type="button" class="btn btn-info" href="#/help" title="Помощь"><i class="icon-medkit" style="margin:0"></i></a>' +
                  '</div>',
        controller: ["$scope", "$window", function($scope, $window){
            $scope.back = function(){
                $window.history.back();
            };

        }]
    };
}])

.directive('focusMe', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('focusMe', function(value) {
                if ( value==="true" ) {
                    $timeout(function(){
                        element[0].focus();
                    }, 100);
                }
            });
        }
    }
}]);

// Enable the visual refresh
google.maps.visualRefresh = true;

angular.module('directives.gmap', ['services.connect', 'services.eventmarker', 'services.lastmarker'/*, 'ui'*/])

.directive('gmap', ["Connect", "EventMarker", function(Connect, EventMarker) {

    // TODO! Необходима унификация для поддержки как минимум Google Maps и Leaflet

    var link = function(scope, element, attrs) {
        var path = null;
        var gmarker = null;
        // console.log('map directive: link', scope, element, Connect);
        //element.innerHTML="<div>map</div>";

        // Временное решение для доступа к главной карте
        //window["config"] = {};
        // var config = window["config"] = {};

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
        var map = new google.maps.Map(element[0], myOptions);

        // config.map = map;

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
            // console.log('zoom_changed');
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

        var center = new google.maps.MarkerImage(
            '/img/marker/marker-center.png?v=1',
            new google.maps.Size(32, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 15)
        );

        gmarker = new google.maps.Marker({
            //position: new google.maps.LatLng(data.stops[i].p[0], data.stops[i].p[1]),
            map: map,
            title: 'Положение',
            icon: center,
            draggable: false
        });

        var eventmarker = new EventMarker(map);

        //config.updater.add('last_update', function(msg) {
        var updater = Connect.updater.on('last_update', function(msg) {
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
        element.bind('$destroy', function() {
            console.log('MAP:destroy element');
            Connect.updater.remove('last_update', updater);
            //$timeout.cancel(timeoutId);
        });

        // var marker_begin = new google.maps.MarkerImage(
        //     '/img/marker/marker-begin.png',
        //     new google.maps.Size(30, 20),
        //     new google.maps.Point(0, 0),
        //     new google.maps.Point(15, 19)
        // );
        // var marker_end = new google.maps.MarkerImage(
        //     '/img/marker/marker-end.png',
        //     new google.maps.Size(30, 20),
        //     new google.maps.Point(0, 0),
        //     new google.maps.Point(15, 19)
        // );
        // var begin_marker = null,
        //     end_marker = null;
        var eventmarkers = {};

//        if(scope.config.autobounds){
        function animateCircle() {
            var count = 0;
            offsetId = window.setInterval(function() {
                if(path === null) return;                // FIXME: Не самое элегантное решение
                if(!scope.config.animation) return;     // FIXME: Не самое элегантное решение

                count = (count + 1) % 50;

                var icons = path.get('icons');
                icons[0].offset = (count*2) + 'px';
                path.set('icons', icons);
          }, 250);
        }
        animateCircle();

        var showTrack = function(data){

            path = new google.maps.Polyline({
                path: data.track,
                strokeColor: 'blue',
                strokeOpacity: 0.5,
                strokeWeight: 5,
                // editable: true,
                icons: [{
                        icon: {
                          // path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          strokeColor: 'blue',
                          strokeWeight: 3,
                          scale: 3
                        },
                        offset: '50px',
                        repeat: '100px'
                    }],
                map: map
            });
            // console.log("scope.autobounds=", scope.autobounds);
            if(scope.config.autobounds){
                map.fitBounds(data.bounds);
            }

            var eventdata = [];
            var index = 1;
            for(i=0; i<data.events.length; i++){
                var e = data.events[i];
                var title = "?";
                if(e.type === "START"){
                    title = "S";
                } else if(e.type === "FINISH"){
                    title =  "F";
                } else {
                    title = "" + index;
                    index += 1;
                }
                eventdata.push({
                    title: title,
                    type: e.type,
                    pos: e.position,
                    point: e.point
                });
            }

            eventmarker.setData(eventdata);

        };

        // TODO. Не нравится мне чтото это. Заменить бып на событие.
        scope.$watch("track", function(data){
            // console.log(['MAP:track change', data]);
            // $scope.hideTrack();
            if(path) {
                path.setMap(null);
                path = null;
                eventmarker.setData([]);
            }
            if((data === null) || (data.points.length === 0) ) return;
            showTrack(data);
        });

        var lastmarker = new LastMarker(map);
        scope.$watch("account.account.systems", function(systems){
            if(!systems) return;
            var lastpos = [];
            //for(var i in systems){}
            angular.forEach(systems, function(sys, key){
                if(sys.dynamic && sys.dynamic.latitude){
                    // console.log('forEach ', sys, key);
                    lastpos.push({
                        key: key,
                        title: sys.desc,
                        dynamic: sys.dynamic
                    })
                }
            });
            lastmarker.setData(lastpos);
            // console.log('$watch account.account.systems', systems, lastpos);
        }, true);

        scope.$watch("center", function(center){
            if(center) {
                var pos = new google.maps.LatLng(center.lat, center.lon);
                map.panTo(pos);
                gmarker.setPosition(pos);
            }
        });

    };

    return {
        restrict: 'A',
        transclude: false,
        //scope: {last_pos: '='},
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        //template: '<div>MAP</div>',
        scope: {
            track: "=",
            config: "=",
            center: "=",
            account: "="
        },
        link: link/*,
        controller: ["$scope", "Connect", function($scope, Connect){
            console.log("map directive:controller", $scope, Connect);
        }]*/
    };
}]);

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
        }]
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

var width = 2500;
var timescale = 24 * 3600 / 2500.0;

angular.module('directives.timeline', [])

.directive('timeline', [function() {

    var zoom_factor = 0.67;
    var svg;

    var tz = (new Date()).getTimezoneOffset() / 60;

    var draw_data = function(data){

        var offset;
        // Начальное смещение. Предполагам что данные будут за одни сутки.
        if(data && (data.length > 0)){
            offset = (Math.floor((data[0].start.dt / 3600 - tz) / 24) * 24 + tz) * 3600;
        }
        // console.log("timeline data=", data, offset);

        var grid = d3.select(svg);

        var days = grid.selectAll(".move")
            .data(data);

        var g = days.enter().append("g")
            .on('click', function(d) {
                console.log(d3.select(this), d);
            });

        g.append("rect")
            // .attr("x", function(d) { return (d.start.dt - offset) * zoom_factor / timescale; })
            .attr("y", "16")
            // .attr("width", function(d) { return (d.stop - d.start) * zoom_factor; })
            // .attr("width", function(d) { return 10; })
            .attr("height", "16");

        // g.append("text")
        //     .attr("x", function(d) { return zoom_factor * (d.stop + d.start) / 2; })
        //     .attr("y", "28")
        //     // .attr("dx", "0")
        //     .attr("text-anchor", "middle")
        //     .text(function(d) { return (d.move?"Движение":"Стоянка") + d.counter; });

        days.select("rect") //.transition().duration(500)
            .attr("x", function(d) { return (d.start.dt - offset) * zoom_factor / timescale; })
            .attr("width", function(d) { return (d.stop.dt - d.start.dt) * zoom_factor / timescale; });

        // days.select("text").transition().duration(500)
        //     .attr("x", function(d) { return zoom_factor * (d.stop + d.start)/2; });
        //     // .attr("width", function(d) { return d.stop - d.start; });

        days
            .attr("class", function(d) {
                return "move " + d.type;
            });

        days.exit().remove();

    };

    var draw_axes = function(){
        // svg.width = "" + ~~(2500*zoom_factor) + "px";
        d3.select(svg).attr("width", width * zoom_factor);

        var data = d3.range(25).map(function(i){
            return {
                i: i,
                title: i<24?("" + ((i<10)?"0":"") + i + ":00"):"23:59"
            };
        });

        var grid = d3.select(svg);  //"#timeline svg"
        var grid_days = grid.selectAll(".day")
            .data(data);

        var g = grid_days.enter()
            .append("g")
            .attr("class", "day")
            .attr("transform", function(d) { return "translate(" + (d.i * 100 * zoom_factor) + ",0)";});

        g.append("text")
            .attr("x", 50 * zoom_factor)
            .attr("y", 12)
            .attr("dx", 0)
            .attr("text-anchor", "middle")
            .text(function(d) { return d.title; });

        g.append("line")
            .style("stroke", '#000')
            .style("stroke-width", '1')
            .attr("x1", 50 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 50 * zoom_factor)
            .attr("y2", 48);

        g.append("line")
            .style("stroke", '#CCC')
            .attr("x1", 75 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 75 * zoom_factor)
            .attr("y2", 48);

        g.append("line")
            .style("stroke", '#888')
            .attr("x1", 100 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 100 * zoom_factor)
            .attr("y2", 48);

        g.append("line")
            .style("stroke", '#CCC')
            .attr("x1", 125 * zoom_factor)
            .attr("y1", 14)
            .attr("x2", 125 * zoom_factor)
            .attr("y2", 48);

        // grid_days.select('line')
        //     .attr("x1", function(d) { return zoom_factor; })
    };

    var link = function(scope, element, attrs) {

        svg = element[0].querySelector('svg');
        draw_axes();

        scope.$watch("data", function(data){
            // console.log(['timeline on data', data]);
            if(data)
                draw_data(data);
        }, true);

        if(0){
            element.bind('mousewheel', function(e){
                var e = window.event || e; // old IE support
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                console.log("zoom?", delta);
                if(delta > 0){
                    zoom_factor = zoom_factor * 2;
                }else{
                    zoom_factor = zoom_factor * 0.5;
                }
                draw_axes();
                //draw_data(data);
            });
        }
    };

    return {
        restrict: 'A',
        // transclude: false,
        //scope: {last_pos: '='},
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        scope: {
            data: "="
        },
        template: '<svg width="2500px" height="33px" class="timeline"></svg>',
        link: link
    };
}]);

angular.module('app.filters.i18n', [])

.filter('translate', ['globals', function(globals){
    return function (text, length, end) {
        console.log('i18n globals=', globals);
        return I18n.t(text);
    };
}]);

var fdigits = function(value, digits) {
    return ("00000000000" + value).slice(-digits);
};

var fsource = {
    0: {title: "-", icons: ["icon-question"]},
    1: {title: "SUDDENSTOP", icons: ["icon-warning", "icon-pause"]},
    2: {title: "STOPACC", icons: ["icon-eject", "icon-pause"]},
    3: {title: "TIMESTOPACC", icons: ["icon-time", "icon-stop"]},
    4: {title: "SLOW", icons: ["icon-pause"]},
    5: {title: "TIMEMOVE", icons: ["icon-time", "icon-play" ]},
    6: {title: "START", icons: ["icon-play"]},
    7: {title: "TIMESTOP", icons: ["icon-time", "icon-pause"]},
    8: {title: "ANGLE", icons: ["icon-share-alt"]},
    9: {title: "DELTALAT", icons: ["icon-resize-full"]},
    10: {title: "DELTALONG", icons: ["icon-resize-full"]},
    11: {title: "DELTA", icons: ["icon-resize-full"]},
};

angular.module('app.filters', []).

filter('datetime', function(){
    return function (text, seconds, format) {
        var d = new Date(parseInt(text, 10)*1000);

        if(format === 'date'){
            return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear()
        } else if(format === 'time'){
            if((seconds === false) || (seconds === 'false')){
                return fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2);
            } else {
                return fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2) + ':' + fdigits(d.getSeconds(), 2);
            }
        }

        if((seconds === false) || (seconds === 'false')){
            return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear() + ' ' +
                fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2);
        } else {
            return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear() + ' ' +
                fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2) + ':' + fdigits(d.getSeconds(), 2);
        }
    };
}).

filter('fromnow', function(){
    return function (text, length, end) {
        var d = new Date(parseInt(text, 10)*1000);
        return moment(parseInt(text, 10)*1000).fromNow();
    };
}).

/*
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
*/

// Преобразование значения напряжения на резервном аккумуляторе в остаточную емкость в %
filter('vin', function(){
    return function (vin) {
        if(vin){
            var v = Math.max(0, Math.min(4.2, vin));
            // Пока делаем линейно 3.5...4.2  -> 0% .. 100%
            var per = Math.round((v - 3.5) * 100 / (4.2 - 3.5));
            return per + "%";
        }
        return '?';
    };
}).

filter('yesno', function(){
    return function (state, length, end) {
        return state?"да":"нет";
    };
}).

filter('fsource', function(){
    return function (index) {
        return fsource[1 * index];
    };
});

// angular.module('resources.account', ['services.i18nNotifications']);
angular.module('resources.account', []);

// angular.module('resources.account').factory('Account', ['SERVER', '$http', 'i18nNotifications', '$q', '$timeout', function (SERVER, $http, i18nNotifications, $q, $timeout) {
angular.module('resources.account').factory('Account', ['SERVER', '$http', '$q', '$timeout', 'Connect', '$rootScope', 'System', function (SERVER, $http, $q, $timeout, Connect, $rootScope, System) {

  var Account = {
    'name': 'noname-noface-nonumber',
    'access_token': null,
    'withCredentials': SERVER.api_withCredentials,
    'account': null,
    'hint': null,
    'isAuthenticated': false,
    skey: null    // Выбранный skey. Используется как глобальное значение сквозь все страницы
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
        Account.systemsUpdate();
        Account.access_token = data.access_token;
        Account.isAuthenticated = true;
      }
    });
  } else {
    //i18nNotifications.pushSticky('login.error.notAuthenticated', 'error', {}, {rejection: 'aaa'});
  }

  //console.log('-- resources.account.Account access_token=', Account.access_token, i18nNotifications, $q);

  Account.systemsUpdate = function(){
    // TODO! Требуется унификация обработки массива систем
    angular.forEach(Account.account.systems, function(s, key){
      if(s.params && s.params.fuel){
        // console.log('fuel=', s.params.fuel, System.fuelrecalc(s.params.fuel));
        s.params.fuelarray = System.fuelrecalc(s.params.fuel);
      }
    });
  }

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
      Account.systemsUpdate();

      Account.isAuthenticated = true;
      if(data.result === "created") {
        // i18nNotifications.pushSticky('login.newUser', 'warning', {name: data.account.username});
        console.warn("TODO: Add notification here");
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
          Account.systemsUpdate();
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
  var updater = Connect.updater.on('update_dynamic', function(msg) {
      console.log('==Update dynamic', msg);
      if(msg.skey in Account.account.systems){
        if(!Account.account.systems[msg.skey].dynamic){
          Account.account.systems[msg.skey].dynamic = {};
        }
        angular.extend(Account.account.systems[msg.skey].dynamic, msg.dynamic);
      }
      $rootScope.$apply();
      //var newpos = new google.maps.LatLng(msg.point.lat, msg.point.lon);
      //lastpos.setPosition(newpos);
  });

  Account.setSkey = function(skey){
    Account.skey = skey;
  };

  // Account.skey = function(){
  //   return Account.skey;
  // };

  return Account;
}]);

/* Константы */
FSOURCE_UNKNOWN     = 0;
FSOURCE_SUDDENSTOP  = 1;
FSOURCE_STOPACC     = 2;
FSOURCE_TIMESTOPACC = 3;
FSOURCE_SLOW        = 4;
FSOURCE_TIMEMOVE    = 5;
FSOURCE_START       = 6;
FSOURCE_TIMESTOP    = 7;
FSOURCE_ANGLE       = 8;
FSOURCE_DELTALAT    = 9;
FSOURCE_DELTALONG   = 10;
FSOURCE_DELTA       = 11;
FSOURCE_DU          = 12;    // Фиксация по дельте изменения внешнего напряжения
FSOURCE_UMAX        = 13;    // Фиксация по превышению внешнего напряжения установленного порога
FSOURCE_SUDDENSTART = 14;    // Это признак возможных проблем с акселерометром
FSOURCE_SUDDENPOS   = 15;    // Это признак возможных проблем с акселерометром
FSOURCE_TIMEINIT    = 16;    // Фиксация точек при первоначальной запитке


angular.module('resources.geogps', [])

.factory('GeoGPS', ['SERVER', '$http', '$q', function (SERVER, $http, $q) {
    var GeoGPS = {},
        skey = null,    // Ключ системы с которой идет работа
        // path = null,
        days = {};      // Дни, в которые было движение

    // var days = {};

    var parse_onebin = function(packet){
        // 0xFF,                   # D0: Заголовок (должен быть == 0xFF)
        if(packet[0] !== 0xFF) return null;

        // 0xF4,                   # D1: Идентификатор пакета (должен быть == 0xF4)
        // 32,                     # D2: Длина пакета в байтах, включая HEADER, ID и LENGTH (32)
        if((packet[1] == 0xF4) && (packet[2] == 32)){
            // dt,                     # D3: Дата+время
            var dt = packet[3] + packet[4]*256 + packet[5]*256*256 + packet[6]*256*256*256;
            // latitude,               # D4: Широта 1/10000 минут
            var lat = (packet[7] + packet[8]*256 + packet[9]*256*256 + packet[10]*256*256*256) / 600000.0;
            // longitude,              # D5: Долгота 1/10000 минут
            var lon = (packet[11] + packet[12]*256 + packet[13]*256*256 + packet[14]*256*256*256) / 600000.0;
            // speed,                  # D6: Скорость 1/100 узла
            var speed = ((packet[15] + packet[16]*256) * 1.852) / 100;
            // int(round(course/2)),   # D7: Направление/2 = 0..179
            var course = packet[17]*2;
            // sats,                   # D8: Кол-во спутников 3..12
            var sats = packet[18];
            // vout,                   # D9: Напряжение внешнего питания 1/100 B
            var vout = (packet[19] + packet[20]*256) / 100;
            // vin,                    # D10: Напряжение внутреннего аккумулятора 1/100 B
            var vin = (packet[21] + packet[22]*256) / 100;
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

            if((Math.abs(lat) >= 90) || (Math.abs(lon) >= 180)) return null;

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
                "fuel": Math.floor(reserve1 / 2),
                "reserve2": reserve2,
                "lcrc": lcrc
            };
        } else if(packet[1] == 0xF5){
            // fsource,                # B: Тип точки   Причина фиксации точки
            var fsource = packet[2];
            // sats,                   # B: Кол-во спутников 3..12
            var sats = packet[3];
            // dt,                     # I: Дата+время
            var dt = packet[4] + packet[5]*256 + packet[6]*256*256 + packet[7]*256*256*256;
            // latitude,               # I: Широта 1/10000 минут
            var lat = (packet[8] + packet[9]*256 + packet[10]*256*256 + packet[11]*256*256*256) / 600000.0;
            // longitude,              # I: Долгота 1/10000 минут
            var lon = (packet[12] + packet[13]*256 + packet[14]*256*256 + packet[15]*256*256*256) / 600000.0;
            // speed,                  # H: Скорость 1/100 узла
            var speed = ((packet[16] + packet[17]*256) * 1.852) / 100;
            // altitude,               # H: Высота над уровнем моря (м)
            var altitude = packet[18] + packet[19]*256;
            if(packet[19] > 127) altitude = altitude - 65536;
            // int(round(course/2)),   # B: Направление/2 = 0..179
            var course = packet[20] * 2;
            // vout,                   # B: Напряжение внешнего питания 1/100 B
            var vout = packet[21] * 4;
            // vin,                    # B: Напряжение внутреннего аккумулятора 1/100 B
            var vin = packet[22] * 4;
            // adc1,                   # B: АЦП1 - температура
            var adc1 = packet[24] * 4;
            // adc2,                   # B: АЦП2 - уровень топлива
            var adc2 = packet[25] * 4;
            // 0,                      # B: Младшие биты полей: vout, vin, adc1, adc2
            var lsbs = packet[26];
            vout += lsbs & 3;
            vin += (lsbs >> 2) & 3;
            adc1 += (lsbs >> 4) & 3;
            adc2 += (lsbs >> 6) & 3;
            // 5 байт резерв           # B: Флаги
            packet[27]; packet[28]; packet[29]; packet[30];
            // 0                       # D15: Локальная CRC (пока не используется)
            var lcrc = packet[31];

            if((Math.abs(lat) >= 90) || (Math.abs(lon) >= 180)) return null;

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
                //"flags": flags,
                "fuel": adc2,
                "lcrc": lcrc
            };
        } else {
            return null;
        }
    };

    var bingpsparse = function(array){
        // console.log('parse');
        var track = [];
        var points = [];
        var events = [];    // События на треке: Старт, стоп, стоянки (момент), остановки (момент), заправки и т.д.
        var ranges = [];    // Интервалы: Движение, стоянка, остановка
        var bounds = null;
        var min_hour = 1e15;
        var max_hour = 0;
        var hours = {};
        var range_start;
        var stop_start = null;  // Точка начала стоянки/остановки
        var move_start = null;  // Точка начала движения

        var index = 0;
        for(var i=0; i<array.length; i+=32){
            point = parse_onebin(array.subarray(i, i+32));
            // console.log('point=', point);
            if(point){
                var gpoint = new google.maps.LatLng(point.lat, point.lon);
                points.push(point);
                if(bounds === null){
                    bounds = new google.maps.LatLngBounds(gpoint, gpoint);
                } else {
                    bounds.extend(gpoint);
                }

                var hour = ~~(point.dt / 60);
                if(hour < min_hour) min_hour = hour;
                if(hour > max_hour) max_hour = hour;
                hours[hour] = (hours[hour] || 0) + 1;

                if(i===0){  // Первая точка
                    events.push({
                        point: point,
                        position: gpoint,
                        type: 'START',
                        index: index
                    });
                    range_start = point;

                    if(point['fsource'] in [FSOURCE_STOPACC, FSOURCE_TIMESTOPACC, FSOURCE_TIMESTOP, FSOURCE_SLOW]){
                        stop_start = 0;
                        events.push({
                            point: point,
                            position: gpoint,
                            type: 'STOP',   // Стоянка/остановка (тит пока не определен)
                            index: index
                        });
                    } else {
                        move_start = 0;
                    }
                }
                // if(point['fsource'] in [FSOURCE_STOPACC, FSOURCE_TIMESTOPACC, FSOURCE_TIMESTOP, FSOURCE_SLOW]){
                if($.inArray(point['fsource'], [FSOURCE_STOPACC, FSOURCE_TIMESTOPACC, FSOURCE_TIMESTOP, FSOURCE_SLOW]) >= 0){
                    if(stop_start === null){
                        stop_start = index;
                        events.push({
                            point: point,
                            position: gpoint,
                            type: 'STOP',   // Стоянка/остановка (тит пока не определен)
                            index: index
                        });
                    } else {
                        gpoint = new google.maps.LatLng(points[stop_start].lat, points[stop_start].lon);
                    }
                    if(move_start !== null){
                        ranges.push({
                            type: 'MOVE',           // Движение
                            start_index: move_start,
                            start: points[move_start],
                            stop_index: index,
                            stop: points[index]
                        });
                        move_start = null;
                    }
                } else /*if(point['fsource'] === FSOURCE_START)*/{
                    if(stop_start !== null){
                        ranges.push({
                            type: 'STOP',           // Стоянка/остановка (тит пока не определен)
                            start_index: stop_start,
                            start: points[stop_start],
                            stop_index: index,
                            stop: points[index]
                        });
                        stop_start = null;
                    }
                    if(move_start === null){
                        move_start = index;
                    }
                }/* else {
                    stop_start = null;
                    if(!move_start){
                        move_start = index;
                    }
                }*/
                track.push(gpoint);

                index += 1;
            }
        }

        if(index > 0){
            events.push({
                point: points[index-1],
                position: track[index-1],
                type: 'FINISH',
                index: index-1
            });
            if(stop_start !== null) {
                ranges.push({
                    type: 'STOP',           // Стоянка/остановка (тит пока не определен)
                    start_index: stop_start,
                    start: points[stop_start],
                    stop_index: index-1,
                    stop: points[index-1]
                });
            } else if(move_start !== null){
                ranges.push({
                    type: 'MOVE',           // Движение
                    start_index: move_start,
                    start: points[move_start],
                    stop_index: index-1,
                    stop: points[index-1]
                });
            }
        }

        // for(var i = 0; i < ranges.length; i++){
        //     var r = ranges[i];
        //     r.start = points[r.start_index];
        //     r.stop = points[r.stop_index];
        // }

        return {
            track: track,
            bounds: bounds,
            points: points,
            min_hour: min_hour,
            max_hour: max_hour,
            hours: hours,
            events: events,
            ranges: ranges
        };
    };

    GeoGPS.select = function(newskey){
        skey = newskey;
    };

    GeoGPS.getHours = function(hourfrom, hourto){
        var defer = $q.defer();
        // console.log(['GeoGPS.getHours', skey, hourfrom, hourto, defer]);
        $http({
            method: 'GET',
            cache: false,
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/geo/hours/" + encodeURIComponent(skey) + "/" + encodeURIComponent(hourfrom) + "/" + encodeURIComponent(hourto) + '?rand=' + (Math.random()*1e18)
        }).success(function(data){
            // console.log('hours data=', data);
            days = {};
            if(!data || (data.hours.length === 0)){
                // callback([]);
                // defer.reject();
            } else {
                // callback(data.hours);
                for(var i=0, l=data.hours.length; i<l; i++){
                    var hour = data.hours[i];
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
            }
            defer.resolve();
        });
        return defer.promise;
    };

    GeoGPS.checkDay = function(day){
        return day in days;
    };

    GeoGPS.getTrack = function(hourfrom, hourto){
        var defer = $q.defer();
        // console.log("getTrack", skey, hourfrom, hourto);

        // GeoGPS.hideTrack();
        $http({
            method: 'GET',
            cache: false,
            withCredentials: SERVER.api_withCredentials,
            responseType: 'arraybuffer',
            url: SERVER.api +
                '/geo/get/' +
                encodeURIComponent(skey) + '/' + encodeURIComponent(hourfrom) + '/' + encodeURIComponent(hourto)
        }).success(function(data){
            // console.log('GeoGPS.getTrack.success', data);
            if(!data) {
                defer.resolve({
                    track: [],
                    bounds: null,
                    points: [],
                    min_hour: null,
                    max_hour: null,
                    hours: null,
                    events: [],
                    ranges: []
                });
                return;
            }
            var uInt8Array = new Uint8Array(data);
            defer.resolve(bingpsparse(uInt8Array));
        }).error(function(data, status) {
            console.log('GeoGPS.getTrack.error', data, status);
        });
        return defer.promise;
    };

    // GeoGPS.hideTrack = function(){
    //     if(path) {
    //         path.setMap(null);
    //         path = null;
    //     }
    // };

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
        Logs.logs.unshift(msg.log);
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



var params_descs = {
    "accel.deb": {
        "desc": "",
        "min": 3,
        "max": 10
    },
    "accel.lvl": {
        "desc": "Чувствительность акселерометра, mg (20-200)",
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
        "desc": "Минимальный регистрируемый угол поворота (градусы) INT 5 5",
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
        "desc": "Выключение GPS для экономии основного питания при стоянке объекта, мин",
        "primary": true,
        "comment": "INT 1440 1440"
    },
    "gps.AOFF.1": {
        "desc": "Выключение GPS для экономии резервного питания при стоянке объекта, мин",
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
        "desc": "Период принудительной регистрации координат при движении объекта, сек",
        "primary": true,
        "min": 30,
        "comment": " INT 60 60"
    },
    "gps.TF.STOP.0": {
        "desc": "Период регистрации координат при остановке объекта / основное питание, сек",
        "primary": true,
        "comment": " INT 60 60"
    },
    "gps.TF.STOP.1": {
        "desc": "Период регистрации координат при остановке объекта / резервное питание, сек",
        "primary": true,
        "comment": " INT 60 60"
    },
    "gps.TF.STOP.ACC.0": {
        "desc": "Период регистрации координат при стоянке объекта / основное питание, сек",
        "primary": true,
        "comment": " INT 600 600"
    },
    "gps.TF.STOP.ACC.1": {
        "desc": "Период регистрации координат при стоянке объекта / резервное питание, сек",
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
        "desc": "Скорость, выше которой регистрируется начало движения × 0,01852 км/ч",
        "primary": true,
        "comment": " INT 400 400"
    },
    "gps.VSTOP": {
        "desc": "Скорость, ниже которой регистрируется остановка объекта × 0,01852 км/ч",
        "primary": true,
        "comment": " INT 54 54"
    },
    "gps.flush.move": {
        "desc": "Период отправки данных на сервер при движении, сек",
        "primary": true,
        "min": 30,
        "comment": " INT 60 60 180"
    },
    "gps.flush.stop": {
        "desc": "Период отправки данных на сервер при стоянке, сек",
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
        "desc": "Конфигурация входа 1: 0-выключен / 1-Тревога / 2-Шлейф / 3-Зажигание",
        "primary": true,
        "select": [
            {"value": 0, "title": "выключен"},
            {"value": 1, "title": "тревожная кнопка"},
            {"value": 2, "title": "шлейф"},
            {"value": 3, "title": "зажигание"}
        ],
        "comment": " INT 0 0"
    },
    "in.foo.2": {
        "desc": "Конфигурация входа 2: 0-выключен / 1-Тревога / 2-Шлейф / 3-Зажигание",
        "primary": true,
        "select": [
            {"value": 0, "title": "выключен"},
            {"value": 1, "title": "тревожная кнопка"},
            {"value": 2, "title": "шлейф"},
            {"value": 3, "title": "зажигание"}
        ],
        "comment": " INT 0 0"
    },
    "in.foo.3": {
        "desc": "Конфигурация входа 3: 0-выключен / 1-Тревога / 2-Шлейф / 3-Зажигание / 4-Датчик топлива",
        "primary": true,
        "select": [
            {"value": 0, "title": "выключен"},
            {"value": 1, "title": "тревожная кнопка"},
            {"value": 2, "title": "шлейф"},
            {"value": 3, "title": "зажигание"},
            {"value": 4, "title": "датчик топлива"}
        ],
        "comment": " INT 0 0"
    },
    "out.1": {
        "desc": "Состояние выхода 1: 0-выключен / 1-включен (активный уровень - низкий)",
        "primary": true,
        "comment": " INT 1 1"
    },
    "out.2": {
        "desc": "Состояние выхода 2: 0-выключен / 1-включен (активный уровень - низкий)",
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

angular.module('resources.params', ['services.connect', 'ngResource'])

.factory('Params', ['SERVER', '$http', '$q', 'Connect', function (SERVER, $http, $q, Connect) {
    console.log('-- params.Params', SERVER, Connect, SERVER.api.replace(/:\d/, '\\$&'));

    var Params = {
        skey: null,
        value: null
    };

    var updater = Connect.updater.on('cfg_upd', function(msg) {
        console.log('Need update configure:', msg);
        if(msg.skey === Params.skey) {
            Params.get(Params.skey);
        }
        //$rootScope.$apply();
    });


    // Запросить значения параметров для системы skey
    Params.get = function(skey){
        var defer = $q.defer();

        console.log('-- params.Params.get');

        $http({
            method: 'GET',
            url: SERVER.api + "/params/" + encodeURIComponent(skey)
        }).success(function(data){
            console.log('params.Params.get.success', data);
            Params.skey = data.skey;
            Params.value = data.value;

            for (var k in data.value) {
                var p = data.value[k];
                angular.extend(p, params_descs[k]);
                // p.newvalue = p.value;
                p.newqueue = p.queue;
            };

            defer.resolve();
        });

        return defer.promise;
    }

    // Поставить в очередь на изменение параметра (skey должен быть задан при вызове .get)
    Params.set = function(k){
        var defer = $q.defer();
        var p = Params.value[k];

        if(Params.skey == null) {
            defer.reject();
            return;
        }

        $http({
            method: 'POST',
            url: SERVER.api + "/params/queue/" + encodeURIComponent(Params.skey),
            data: {key: k, value: p.queue}
        }).success(function(data){
            console.log('params.Params.set.success', data);
            /*if(p.value != p.newvalue){
              p.queue = p.newvalue;
            } else {
              p.queue = null;
            }*/
            p.newqueue = p.queue;

            defer.resolve();
        });
        //console.log("Params.set", k);
        return defer.promise;
    }

    // Отменить изменение параметра
    Params.cancel = function(k){
        var defer = $q.defer();
        var p = Params.value[k];

        $http({
            method: 'DELETE',
            url: SERVER.api + "/params/queue/" + encodeURIComponent(Params.skey) + "/" + encodeURIComponent(k)
        }).success(function(data){
            console.log('params.Params.del.success', data);

            // p.newvalue = p.value;
            p.queue = null;
            p.newqueue = null;
            defer.resolve();
        });

        return defer.promise;
    }

    // Отменить все изменения
    Params.cancelall = function(){
        var defer = $q.defer();

        $http({
            method: 'DELETE',
            url: SERVER.api + "/params/queue/" + encodeURIComponent(Params.skey)
        }).success(function(data){
            console.log('params.Params.delall.success', data);

            for (var k in Params.value) {
                var p = Params.value[k];
                // p.newvalue = p.value;
                p.queue = null;
                p.newqueue = null;
              //$scope.cancelqueue(k);
            };
            defer.resolve();
        });

        return defer.promise;
    }

    return Params;

}])

.factory('ParamsOld', ['SERVER', '$resource', 'Connect', function (SERVER, $resource, Connect) {

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

    return Params;
}]);


angular.module('resources.system', [])

.factory('System', ['SERVER', '$http', '$q', function (SERVER, $http, $q) {
    var System = {};

    // Построим формулу преобразования значения АЦП в объем топлива
    // В цепи измерения делитель: 22k/10k
    // В перспективе значение должно быть привязано к hwid
    // Результат преобразования является массив 0..1023 для 10тибитного АЦП
    System.fuelrecalc = function(fuel) {
        var r1 = 22,
            r2 = 10,
            vdd = 3.3,
            out = [],
            vmax = fuel[fuel.length-1].voltage,
            lmax = fuel[fuel.length-1].liters,
            // Функция поиска индекса по напряжению.
            // Предполагается что напряжения в возрастающей последовательности.
            b = d3.bisector(function(d){return d.voltage}).right;

        // console.log('fuel = ', fuel);

        for(var i=0; i<1024; i++){
            var v = (i * vdd / 1024) * (r1+r2) / r2 ; // +- 1lsb?
            if(v >= vmax){
                out.push(lmax);
            } else {
                var index = b(fuel, v);
                if(index == 0){
                    out.push(0);
                } else if(index >= fuel.length){
                    out.push(lmax);
                } else {
                    // console.log('index=', index, fuel, fuel[index]);
                    var v1 = fuel[index-1].voltage,
                        v2 = fuel[index].voltage,
                        l1 = fuel[index-1].liters,
                        l2 = fuel[index].liters,
                        vdelta = v2 - v1,
                        ldelta = l2 - l1,
                        liters = l1 + (l2 - l1) * (v - v1) / (v2 - v1);

                    out.push(Math.round(liters * 100) / 100); // округление до 0.01
                }
            }
        }
        // console.log('out=', out);
        // data.fuelarray = out;
        return out;
    }

    // Запросить подробности для системы skey
    System.get = function(skey){
        var defer = $q.defer();

        console.log('-- System.get');

        $http({
            method: 'GET',
            url: SERVER.api + "/system/" + encodeURIComponent(skey)
        }).success(function(data){
            console.log('System.get.success', data);
            // System.skey = data.skey;

            if(data && data.value.params.fuel){
                data.fuelarray = System.fuelrecalc(data.value.params.fuel);
            } else {
                data.fuelarray = [];
            }

            defer.resolve(data);
        });

        return defer.promise;
    }

    // Установить значение одного из параметров (или нескольких)
    System.setParams = function(skey, params){
        var defer = $q.defer();

        console.log('-- System.get');

        $http({
            method: 'PATCH',
            url: SERVER.api + "/system/" + encodeURIComponent(skey),
            withCredentials: SERVER.api_withCredentials,
            data: JSON.stringify({params: params})
        }).success(function(data){
            console.log('System.patch.success', data);
            // System.skey = data.skey;

            defer.resolve();
        });

        return defer.promise;
    }

    // Изменения описания (наименования системы)
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
        // console.log(["shared.updater.on(", msg, foo, shared.updater.queue]);
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
        // console.log(["shared.updater.process(", msg, shared.updater.queue]);
    };

    shared.updater.remove = function(msg, updater){
        var index = shared.updater.queue[msg].indexOf(updater);
        shared.updater.queue[msg].splice(index, 1);
        console.log(["===> TODO!!!! Not implemented.", updater, shared.updater.queue, index]);
    };

    // console.log("===> Connect:init");


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
            var msg = JSON.parse(event.data);
            console.log('onmessage:', msg);
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


/*
    Маркер событий трека.
    Доступны маркеры:
    1. Стоянок.
    2. Остановок.
    3. Заправки.
    4. Сливы топлива.
    5. Тревожные события.
*/

function EventMarker(map)
{
    this.map = map;
    this.div = null;
    this.data = [];
    this.setMap(map);
}

EventMarker.prototype = new google.maps.OverlayView();

var SVG = {};
SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";

EventMarker.prototype.onAdd = function() {
    var div = this.div = document.createElement('div');

    div.setAttribute("class", "eventmarker");

    div.marker = this;
    var panes = this.getPanes();
    this.panes = panes;

    // var marker = d3.select(svg);

    // console.log('market div', div);
    panes.overlayImage.appendChild(div);
}

// EventMarker.prototype.setPosition = function(position) {
//     this.position = position;
//     // this.point = point;
//     this.draw();
// }
EventMarker.prototype.setData = function(data) {
    this.data = data;
    this.draw();
}

EventMarker.prototype.onRemove = function() {
    // this.div.removeChild(this.arrdiv);
    this.div.parentNode.removeChild(this.div);
    this.arrdiv = null;
    this.div = null;
}

EventMarker.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    if(!overlayProjection) return;

    // var divpx = overlayProjection.fromLatLngToDivPixel(this.position);
    var div = this.div;

    // var x = divpx.x;
    // var y = divpx.y;

    var track = d3.select(this.div);
    var points = track.selectAll(".track")
        .data(this.data);

    var div = points.enter().append("div")
        .attr("class", "track")
        // .attr("style", function(d){
        //     var px = overlayProjection.fromLatLngToDivPixel(d.pos);
        //     // console.log("d=", d, "px=", px);
        //     return "left: " + (px.x) + "px; top: " + (px.y) + "px";
        // })
        .on('click', function(d) {
            console.log(d3.select(this), d);
        });

    div.append("span").text(function(d){
        return d.title;
    });

    points
        .attr("class", function(d){
            return "track " + d.type;
        })
        .attr("style", function(d){
            var px = overlayProjection.fromLatLngToDivPixel(d.pos);
            // console.log("d=", d, "px=", px);
            return "left: " + (px.x) + "px; top: " + (px.y) + "px";
        });

    points.exit().remove();

    // console.log('draw', this.data, points.select("div.stop"));

    // div.style.left = divpx.x - 16 + 'px';
    // div.style.top = divpx.y - 32 + 'px';
}

angular.module('services.eventmarker', [])

.factory('EventMarker', [
    "$rootScope",
    function($rootScope) {
        // console.log(":: EventMarker", $rootScope, EventMarker);
        return EventMarker;
    }
]);

angular.module('services.httpRequestTracker', []);
angular.module('services.httpRequestTracker').factory('httpRequestTracker', ['$http', function($http){

  var httpRequestTracker = {};
  httpRequestTracker.hasPendingRequests = function() {
    return $http.pendingRequests.length > 0;
  };

  return httpRequestTracker;
}]);
// angular.module('services.i18n', [])

// .factory('i18n', ['$location', '$route', function($location, $route) {
//     var i18n = {
//         active: localStorage.getItem('language')
//     };

//     if(!i18n.active) {
//         i18n.active = 'ru';
//     }

//     //console.log('i18 default:', i18n.active);
//     //document.write('<script type="text/javascript" src="js/templates-en.js" id="templates"></script>');

//     i18n.set = function(code){
//         //console.log('i18n onSet', code, $location, $route);
//         localStorage.setItem('language', code);
//         i18n.active = code;
//         I18n.defaultLocale = i18n.active;
//         //$rootScope.$apply();
//         //$location.path($location.$$path);
//         //$route.reload();
//         //location.reload();
//     };

//     I18n.defaultLocale = i18n.active;

//     return i18n;
// }]);

// angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
// angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

//   var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
//      return angular.extend({
//        message: localizedMessages.get(msgKey, interpolateParams),
//        type: type
//      }, otherProperties);
//   };

//   var I18nNotifications = {
//     pushSticky:function (msgKey, type, interpolateParams, otherProperties) {
//       console.log('pushSticky', msgKey, type, interpolateParams, otherProperties);
//       return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
//     },
//     pushForCurrentRoute:function (msgKey, type, interpolateParams, otherProperties) {
//       return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
//     },
//     pushForNextRoute:function (msgKey, type, interpolateParams, otherProperties) {
//       return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
//     },
//     getCurrent:function () {
//       return notifications.getCurrent();
//     },
//     remove:function (notification) {
//       return notifications.remove(notification);
//     }
//   };

//   return I18nNotifications;
// }]);
/*
    Маркеры последних известных положений ТС.
*/

function LastMarker(map) {
    this.map = map;
    this.div = null;
    this.data = [];
    this.setMap(map);
}

LastMarker.prototype = new google.maps.OverlayView();

var SVG = {};
SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";

LastMarker.prototype.onAdd = function() {
    var div = this.div = document.createElement('div');

    div.setAttribute("class", "lastmarker");

    div.marker = this;
    var panes = this.getPanes();
    this.panes = panes;

    // var marker = d3.select(svg);

    // console.log('market div', div);
    panes.overlayImage.appendChild(div);
}

// LastMarker.prototype.setPosition = function(position) {
//     this.position = position;
//     // this.point = point;
//     this.draw();
// }
LastMarker.prototype.setData = function(data) {
    // console.log('LastMarker.prototype.setData', data);
    this.data = data;
    this.draw();
}

LastMarker.prototype.onRemove = function() {
    // this.div.removeChild(this.arrdiv);
    this.div.parentNode.removeChild(this.div);
    this.arrdiv = null;
    this.div = null;
}

LastMarker.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    if (!overlayProjection) return;

    // var divpx = overlayProjection.fromLatLngToDivPixel(this.position);
    var div = this.div;

    // var x = divpx.x;
    // var y = divpx.y;

    var track = d3.select(this.div);
    var points = track.selectAll(".marker")
        .data(this.data);

    var div = points.enter().append("div")
        .attr("class", "marker")
    // .attr("style", function(d){
    //     var px = overlayProjection.fromLatLngToDivPixel(d.pos);
    //     // console.log("d=", d, "px=", px);
    //     return "left: " + (px.x) + "px; top: " + (px.y) + "px";
    // })
    .on('click', function(d) {
        console.log(d3.select(this), d);
    });

    div.append("i").attr("class", "icon-shopping-cart icon-large");
    div.append("span").attr("class", "title").text(function(d) {
        return d.title;
    });

    points
        .attr("style", function(d) {
            var px = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(d.dynamic.latitude, d.dynamic.longitude));
            // console.log("d=", d, "px=", px);
            return "left: " + (px.x) + "px; top: " + (px.y) + "px";
        });

    points.exit().remove();

    // console.log('draw', this.data, points.select("div.stop"));

    // div.style.left = divpx.x - 16 + 'px';
    // div.style.top = divpx.y - 32 + 'px';
}

angular.module('services.lastmarker', [])

.factory('LastMarker', [
    "$rootScope",
    function($rootScope) {
        // console.log(":: LastMarker", $rootScope, LastMarker);
        return LastMarker;
    }
]);
// angular.module('services.localizedMessages', [])
// .factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

//   var handleNotFound = function (msg, msgKey) {
//     return msg || '?' + msgKey + '?';
//   };

//   return {
//     get : function (msgKey, interpolateParams) {
//       var msg =  i18nmessages[msgKey];
//       if (msg) {
//         return $interpolate(msg)(interpolateParams);
//       } else {
//         return handleNotFound(msg, msgKey);
//       }
//     }
//   };
// }]);

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
angular.module('admin', [])

.factory('AdminUsers', [
    'SERVER', '$http', '$q',
    function(SERVER, $http, $q) {

        var _get = function(){
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: SERVER.api + "/admin/users"
            }).success(function(data){
                console.log('admin/users:get.success', data);
                defer.resolve(data);
            });

            return defer.promise;
        }

        var Users = {
            get: _get
        };
        return Users;
    }
])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/admin', {
        templateUrl:'templates/admin/admin.tpl.html',
        controller:'AdminViewCtrl',
        resolve:{
            users: ['AdminUsers', function(AdminUsers){
                console.log('AdminUsers', AdminUsers);
                return AdminUsers;
            }]
        }
    });
}])

.controller('AdminViewCtrl', ['$scope', '$location', 'users', function ($scope, $location, users) {
    var all = users.get();
    console.log("AdminViewCtrl:", users, all);
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
  'admin',
  'help',
  'i18n',
  '$strap',
  // 'services.i18n',
  // 'services.i18nNotifications',
  'services.httpRequestTracker'
  // 'templates'
]);


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
// angular.module('app').constant('I18N.MESSAGES', {
//   'errors.route.changeError':'Route change error',
//   'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
//   'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
//   'crud.user.save.error':"Something went wrong when saving a user...",
//   'login.error.notAuthorized':"Необходима авторизация чтобы пользоваться сервисом.",
//   'login.error.notAuthenticated':"Необходима авторизация чтобы пользоваться сервисом.",
//   'login.newUser':'Создана новая учетная запись {{name}}.'
// });

angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', 'SERVER', function ($routeProvider, $locationProvider, $httpProvider, SERVER) {
  // console.log(['! App CONFIG !', $httpProvider, SERVER]);
  $httpProvider.defaults.withCredentials = SERVER.api_withCredentials;

  if(!$httpProvider.defaults.headers.patch) {
    $httpProvider.defaults.headers.patch = {};
  }
  $httpProvider.defaults.headers.patch["Content-Type"] = 'application/json; charset=utf-8';

  // Перехват 401 Ошибка авторизации
  var interceptor = ['$rootScope', '$q', function (scope, $q) {
    function success(response) {
      return response;
    }
    function error(response) {
        var status = response.status;

        if (status == 401) {
            window.location = "/#/login"; // Если пользователь неавторизован, то перенаправить на страницу /#/login
            return;
        }
        // otherwise
        return $q.reject(response);

    }
    return function (promise) {
        return promise.then(success, error);
    }
  }];
  $httpProvider.responseInterceptors.push(interceptor);

  //$locationProvider.html5Mode(true);
  //$routeProvider.otherwise({redirectTo:'/login'});
  //$routeProvider.otherwise({redirectTo:'/error'});
}]);

// TIMETICK_UPDATE = 30000;  // Отправлять глобальное событие каждые 30 секунд.
TIMETICK_UPDATE = 1000;  // Отправлять глобальное событие каждые 30 секунд.

angular.module('app').run(['$http', 'SERVER', '$rootScope', '$timeout', function($http, SERVER, $rootScope, $timeout){
  // console.log(['! App RUN ! ', $http.defaults, SERVER]);

  $rootScope.now = function(){
    return Math.round((new Date()).valueOf() / 1000);
  }

  var timetick = function(){
    // $rootScope.now = Math.round((new Date()).valueOf() / 1000);
    $rootScope.$broadcast("timetick");
    $timeout(function(){
      timetick();
    }, TIMETICK_UPDATE);
  }

  $timeout(function(){
    timetick();
  }, TIMETICK_UPDATE);

}]);

angular.module('app').controller('AppCtrl', ['$scope', '$location', '$route', '$rootScope', '$window', 'Account', function($scope, $location, $route, $rootScope, $window, Account) {
  // console.log('app:AppCtrl', $location /*, $location.parse()*/);
  // $scope.i18n = i18n;

  // $scope.notifications = i18nNotifications;
  $scope.account = Account;
  $scope.location = $location;
  $scope.$route = $route;
  // $rootScope.skey = 'test';

  // $scope.$watch('account.skey', function(skey){
  //   // if(!skey) return;
  //   console.log('++=> account.skey = ', skey, $scope.account.skey);
  //   // var params = $route.current.params;
  //   // params.skey = skey;
  //   // var search = $location.search(params).path($route.current.path);
  //   // var search = $location.search('skey', skey);
  //   // $location.path();
  //   // var search = 0;
  //   // console.log("++=> params = ", params, search);
  // //   // console.log('++=> ', $route.current.params /*, $location.parse()*/);
  // });

  $scope.$on('$routeChangeSuccess', function(angularEvent, current, previous){
    // console.log('$routeChangeSuccess ', [angularEvent, current, previous]);
    Account.skey = current.params.skey;
    // if(current.params.skey && !Account.skey){
      // Account.setSkey(current.params.skey);
    // }
        // console.log('Changing route from ' + angular.toJson(current) + ' to ' + angular.toJson(next));
  });

  // $scope.removeNotification = function (notification) {
  //   i18nNotifications.remove(notification);
  // };

  // $scope.$on('$routeChangeError', function(event, current, previous, rejection){
  //   i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  // });
}]);

//angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'notifications', 'httpRequestTracker', function ($scope, $location, $route, notifications, httpRequestTracker) {
angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'Account', 'httpRequestTracker', function ($scope, $location, $route, Account, httpRequestTracker) {
  $scope.location = $location;
  $scope.account = Account;
  $scope.skey = Account.skey;

  // console.log('update Header');

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

angular.module('config', ['resources.account', 'resources.system', 'ui.sortable', 'config.system.params', 'directives.lists'])

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
  /*$scope.onAdd = function(imei){
    console.log('onAdd', imei, account, document.getElementById('config_add_file'));

    account.systemadd([imei]);
    $scope.addform = false;
  };*/

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
    // stop: function(e, ui) {
    update: function(e, ui) {
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

angular.module('config.system.params.fuel', ['resources.account', 'resources.params', 'app.filters', 'directives.chart'])

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
                return Account;
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
            }]
        }
    });
}])

.controller('ConfigParamsFuelCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', 'system', '$timeout', function ($scope, $route, $routeParams, account, params, system, $timeout) {
    // console.log('ConfigParamsFuelCtrl', $scope, $route, $routeParams, account, params);
    $scope.account = account;
    $scope.skey = $routeParams['skey'];
    $scope.params = params;
    $scope.filtered = true;

    // console.log('account.account.systems@ConfigParamsFuelCtrl=', account.account.systems);

    // $scope.fuel = [];
    $scope.fuel = [
        {liters: 0, voltage: 0.0},
        {liters: 80, voltage: 10.0}
    ];

    system.get($scope.skey).then(function(data){
        if((data.value.params) && (data.value.params.fuel)){
            $scope.fuel = data.value.params.fuel;
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

    $scope.onSave = function(){
        console.log('save');
        system.setParams($scope.skey, {
            fuel: angular.copy($scope.fuel)     // Strip $$hashkey
        });
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



angular.module('config.system.params.master', ['resources.account', 'resources.params', 'app.filters'])

.config(['$routeProvider', function ($routeProvider) {
  var skey = ['$route', function($route){
    console.log(['=== route', route]);
    return $route.current.params.skey;
  }];
  // console.log(['=== skey', skey]);
  $routeProvider.when('/config/:skey/params/master', {
    templateUrl:'templates/config/params/master.tpl.html',
    controller:'ConfigParamsMasterCtrl',
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

.controller('ConfigParamsMasterCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', '$location', function ($scope, $route, $routeParams, account, params, $location) {
  console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account, params);
  $scope.account = account;
  $scope.skey = $routeParams['skey'];
  $scope.params = params;

  $scope.steps = ['one', 'two', 'three', 'four'];
  $scope.step = 0;

  $scope.isCurrentStep = function(step) {
    return $scope.step === step;
  };

  $scope.setCurrentStep = function(step) {
    $scope.step = step;
  };

  $scope.setNextStep = function(step) {
    $scope.step += 1;
  };

  $scope.getCurrentStep = function() {
    return $scope.steps[$scope.step];
  };

  $scope.confirm = function() {
    $location.path("/config/" + $scope.skey + "/params");
  };

  // Defaults
  $scope.config = {
    in1: "off"
  };

  $("[rel=tooltip]").tooltip();
}]);


angular.module('config.system.params', ['resources.account', 'resources.params', 'app.filters', 'config.system.params.master', 'config.system.params.fuel'])

.config(['$routeProvider', function ($routeProvider) {
  var skey = ['$route', function($route){
    console.log(['=== route', route]);
    return $route.current.params.skey;
  }];
  // console.log(['=== skey', skey]);
  $routeProvider.when('/config/:skey/params', {
    templateUrl:'templates/config/params/params.tpl.html',
    controller:'ConfigParamsCtrl',
    resolve:{
      account:['Account', function (Account) {
        //TODO: sure for fetch only one for the current user
        return Account;
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
      }]
    }
  });
}])

.controller('ConfigParamsCtrl', ['$scope', '$route', '$routeParams', 'account', 'params', 'system', function ($scope, $route, $routeParams, account, params, system) {
  console.log('ConfigParamsCtrl', $scope, $route, $routeParams, account, params);
  $scope.account = account;
  $scope.skey = $routeParams['skey'];
  $scope.params = params;
  $scope.filtered = true;

  $scope.params.get($route.current.params.skey).then(function(data){
    console.log('params success', data);
  });

  $scope.isFiltered = function(item) {
    if(!$scope.filtered) {
      return true;
    }
    return item.filter;
  };


  /*$scope.onChange = function(el){
    // console.log('onChange', el);
    // console.log('onChange', el, $scope.account.account.systems[el].desc);
    system.change_desc(el, $scope.account.account.systems[el].desc);
  };*/
  $scope.onChangeValue = function(k){
    params.set(k);  // Отправим значение в очередь на сервер
  };

  $scope.setqueue = function(k){
    // console.log('setqueue', k);
    params.set(k);  // Отправим значение в очередь на сервер
  }

  $scope.cancelqueue = function(k){
    params.cancel(k);  // Отправим на сервер команду отменить изменение параметра
  }

  $scope.stopqueue = function(){
    params.cancelall();  // Отправим на сервер команду отменить все изменения
    /*for (var k in params.value) {
      $scope.cancelqueue(k);
    };*/
  }

  $scope.tofuel = function(){
    // console.log('tofuel/System', system);
    // account.account.systems[skey].dynamic.fuel

  }

  $scope.filtered = function(items) {
    var result = {};
    angular.forEach(items, function(value, key) {
        if($scope.showall || value.hasOwnProperty('primary')) {
          result[key] = value;
        }
    });
    return result;
}

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
    templateUrl:'templates/error/error.tpl.html',
    controller:'ErrorCtrl'
  });

}])

.controller('ErrorCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
  console.log('ErrorCtrl', $location, $route);
  //$route.current.$route.template = "<div>Loaded</div>";
}]);

angular.module('gps', ['resources.account', 'resources.params', 'resources.geogps', 'app.filters', 'config.system.params.master'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/gps', {
    templateUrl:'templates/gps/gps.tpl.html',
    controller:'GPSViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        return Account;
      }]
    }
  })
  .when('/gps/:skey', {
    templateUrl:'templates/gps/gps.tpl.html',
    controller:'GPSViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        return Account;
      }],
      system: ['System', function (System) {
        return  System;
      }]
    }
  })
  .when('/gps/:skey/:day', {
    templateUrl:'templates/gps/gps.tpl.html',
    controller:'GPSViewCtrl',
    resolve:{
      account:['Account', function (Account) {
        return Account;
      }],
      system: ['System', function (System) {
        return  System;
      }]
    }
  });

}])

.controller('GPSViewCtrl', ['$scope', '$route', '$routeParams', '$location', 'account', 'GeoGPS', function ($scope, $route, $routeParams, $location, account, GeoGPS) {
  var day = $scope.day = $routeParams['day'] || 0;

  $scope.skey = $routeParams['skey'];
  $scope.account = account;
  $scope.track = null;

  var date;
  var hourfrom;

  var tz = (new Date()).getTimezoneOffset()/60;

  if((1*day) === 0){
    hourfrom = (new Date((new Date()).toDateString())).valueOf() / 1000 / 3600;
    date = new Date(hourfrom * 3600 * 1000);
  } else if((1*day) === -1){
    hourfrom = (new Date((new Date()).toDateString())).valueOf() / 1000 / 3600 - 24;
  } else {
    hourfrom = day * 24 + tz;
  }
  date = new Date(hourfrom * 3600 * 1000);
  $scope.datetime = hourfrom * 3600;

  // console.log("=> Selected hour range:", hourfrom, hourfrom + 23);
  // console.log("=> Selected date range:", date, new Date((hourfrom + 24) * 3600 * 1000 - 1000));

  $scope.onSysSelect = function(){
    if($scope.skey){
      $location.path('/gps/' + $scope.skey);
    } else {
      $location.path('/gps');
    }
  }

  // $scope.$watch('skey', function(skey){
  //   if($scope.skey !== startskey) {
  //     console.log('reload', $scope.skey, skey);
  //     if(angular.isUndefined(skey) || (skey == null)){
  //       $location.path('/gps');
  //     } else {
  //       $location.path('/gps/' + $scope.skey + '/' + day);
  //     }
  //     //reload();
  //   }
  // });

  $scope.gpsdata = [{lat: 1.0, lon: 1.0}];

  /*var date = new Date();
  var tz = (new Date()).getTimezoneOffset()/60;
  var hourfrom = Math.floor(date.valueOf() / 1000 / 3600 / 24) * 24 + tz;*/

  // var hourfrom = (new Date((new Date()).toDateString())).valueOf() / 1000 / 3600;

  $scope.mapconfig = {
      autobounds: true,   // Автоматическая центровка трека при загрузке
      animation: false,   // Анимация направления трека
      numbers: true       // Нумерация стоянок/остановок
  };

  if($scope.skey && ($scope.skey != '') && ($scope.skey != '+')){
    // console.log('get Track', $scope.skey);
    GeoGPS.select($scope.skey);
    GeoGPS.getTrack(hourfrom, hourfrom+23)
        .then(function(data){
            // console.log(["getTrack: ", data]);
            $scope.track = data;
            /*$scope.track = data;
            $scope.points = data.track.length;
            fake_timeline();*/
        });

    $scope.onMouseOver = function(g) {
      $scope.center = g;
      //console.log('onmouseover', g);
    };
  }

  var dp = $('#inputDate').datepicker({
    // date: "12-02-2012",
    // dateFormat: "dd-mm-yyyy",
    // format: "dd-mm-yyyy",
    // value: "03-02-2012",
    // format: "mm-dd-yyyy",
    // todayHighlight: true,
    language: "ru",
    todayBtn: "linked",
    autoclose: true
    // autoclose: true,
    // weekStart: "1"
    // format:'d.m.Y',
    // date: "14.05.2012",
    // format:'m/d/Y',
    // date: $('#inputDate').val(),
    // current: $('#inputDate').val(),
    // starts: 1,
    // position: 'r',
    // onBeforeShow: function(){
    //   $('#inputDate').DatePickerSetDate($('#inputDate').val(), true);
    // }
  }).on('changeDate', function(ev){
    $scope.$apply(function(){
      var date = ev.date;
      // var hourfrom = date.valueOf() / 1000 / 3600 + tz;
      var newday = (date.valueOf() / 1000 / 3600 - tz) / 24;
      // console.log('datepick=', newday);
      $location.path('/gps/' + $scope.skey + '/' + newday);
      // dp.datepicker("hide");

    });
    // this.hide();
  });
  // dp.datepicker("setValue", "01-02-2012");
  // dp.datepicker("setDate", new Date(381909 * 3600 * 1000));
  // setTimeout(function(){
    // dp.datepicker("update", "01-02-2012");
    // dp.datepicker("update", new Date(1373911877014));
    // console.log("date=", );

    // Имеет баг (я так думаю) UTC
    dateline = dp.datepicker.DPGlobal.formatDate(new Date(date.valueOf() - tz * 3600 * 1000), "mm-dd-yyyy", "ru");
    dp.datepicker("update", dateline);
    // console.log("date", date, offset, dateline);
  // }, 0);
    // dp.datepicker("show");

  // var nowTemp = new Date();
  // var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate() + 1, 0, 0, 0, 0);
  // dp.datepicker("setValue", now);

  $scope.selectday = function(day){
    $location.path('/gps/' + $scope.skey + '/' + day);
  }

  /*$scope.onSelect = function(){
    console.log('onSelect', $scope.system, $scope.skey);
    //$location.path(s);
    //$location.path('/gps/' + $scope.system);
  }*/
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

angular.module('login', ['resources.account', 'app.filters', 'directives.modal', 'i18n', 'directives.language'])

.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/login', {
    // templateUrl:'login.tpl.html',
    templateUrl:'templates/login/login.tpl.html',
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

  $routeProvider.otherwise({ redirectTo: '/error' });

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
  })
  .when('/logs/:skey', {
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

.controller('LogsViewCtrl', ['$scope', '$location', '$routeParams', 'account', 'logs', function ($scope, $location, $routeParams, account, logs) {
  $scope.account = account;
  // $scope.skey = "";
  var startskey = $routeParams['skey'];
  // if(account.skey != startskey){
  //   account.setSkey(startskey);
  // }
  $scope.skey = account.skey;

  $scope.logs = logs;
  $scope.comment = "Данные еще не получены";
  //$scope.skey = account.account.skeys[0];
  $scope.onSelect = function(){
    console.log('selected');
  };

  var reload = function(){
    console.log('reload', $scope.account.skey);
    if((!$scope.account.skey) || ($scope.account.skey === "")) {
      return;
    }
    $scope.logs.logs = [];
    $scope.comment = "Данные загружаются...";
    console.log(['change skey', $scope.account.skey, $scope.account]);
    $scope.logs.get($scope.account.skey, $scope.account.akey, function(res){
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

  $scope.onSysSelect = function(){
    console.log('skey=', $scope.skey, $location);
    if($scope.skey){
      $location.path('/logs/' + $scope.skey);
    } else {
      $location.path('/logs');
    }
    // account.setSkey($scope.skey);
    // $location.path('/logs/' + $scope.account.skey);
    // reload();
  }
  reload();

  // $scope.$watch('skey', function(skey){
  //   console.log('skey=', skey);
  //   // reload();

  //   if($scope.skey !== startskey) {
  //     if(angular.isUndefined(skey) || (skey == null)){
  //       $location.path('/logs');
  //     } else {
  //       $location.path('/logs/' + $scope.skey);
  //       // $scope.$apply();
  //     }
  //   }
  //   reload();
  // });

  $("[rel=tooltip]").tooltip();
}]);

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
        },
        reloadOnSearch: false
    }).
    when('/map/:skey', {
        templateUrl:'templates/map/map.tpl.html',
        controller:'MapCtrl',
        resolve:{
            account:['Account', function (Account) {
                //TODO: need to know the current user here
                return Account;
            }]
        },
        reloadOnSearch: false
    });
}])

.controller('MapCtrl', ['$scope', '$location', '$route', '$routeParams', 'account', 'GeoGPS', '$log', function ($scope, $location, $route, $routeParams, account, GeoGPS, $log) {
    $scope.account = account;
    $scope.skey = $routeParams['skey'];
    $scope.day = $routeParams['day'] || 0;
    $scope.track = null;
    //$scope.systems = account.account.systems;

    var dp = $('#datepicker').datepicker({
        beforeShowDay: function(date) {
            var hour = date.valueOf()/1000/3600,
                day = hour/24;
            // console.log("beforeShowDay", day, (hour%2 === 0)?'enabled':'disabled');
            return GeoGPS.checkDay(day)?'enabled':'disabled';
        }
    }).on('changeDate', function(ev){
        var date = ev.date;
        var tz = (new Date()).getTimezoneOffset()/60;
        // var hourfrom = date.valueOf() / 1000 / 3600 + tz;
        var hourfrom = date.valueOf() / 1000 / 3600;
        var day = (hourfrom - tz) / 24;
        // console.log(["datepicker: on changeDate", ev, date]);
        // $log.warn("datepicker:changeDate. Bad path point inn the $scope.path array ");
        // $log.error("datepicker:changeDate. Bad path point inn the $scope.path array ");
        // $log.info("datepicker:changeDate.", $scope);
        $scope.$apply(function(){   // Без этого не будет индикации процесса загрузки
            var params = angular.copy($routeParams);
            angular.extend(params, {day: day});
            $location.search(params);
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

    // WARNING!!! Это грязный хак!!!
    // Это подавит перезагрузку ng-view и устранит мерцание страницы.
    // var lastRoute = $route.current;
    // $scope.$on('$locationChangeSuccess', function(event) {
    //     $route.current = lastRoute;
    //     console.log("~~~~~~~~~~~~~~~~====> $locationChangeSuccess:", $route, event);
    //     // account.setSkey(skey);
    //     // $scope.$apply();
    // });

    var load_date = function(){
        GeoGPS.select($scope.skey);
        GeoGPS.getHours(0, 1000000)
            .then(function(){
                var day = $scope.day || 0;
                // Недокументированный метод. Метод update изменяет текущий месяц
                $('#datepicker').datepicker("fill");

                var tz = (new Date()).getTimezoneOffset()/60;

                if((1*day) === 0){
                    hourfrom = (new Date((new Date()).toDateString())).valueOf() / 1000 / 3600;
                    date = new Date(hourfrom * 3600 * 1000);
                } else if((1*day) === -1){
                    hourfrom = (new Date((new Date()).toDateString())).valueOf() / 1000 / 3600 - 24;
                } else {
                    hourfrom = day * 24 + tz;
                }
                date = new Date(hourfrom * 3600 * 1000);
                $scope.datetime = hourfrom * 3600;

                // console.log("=> Selected day :", day);
                // console.log("=> Selected hour range:", hourfrom, hourfrom + 23);
                // console.log("=> Selected date range:", date, new Date((hourfrom + 24) * 3600 * 1000 - 1000));

                // Имеет баг (я так думаю) UTC
                dateline = dp.datepicker.DPGlobal.formatDate(new Date(date.valueOf() - tz * 3600 * 1000), "mm-dd-yyyy", "ru");
                // console.log('dateline=', dateline);
                dp.datepicker("update", dateline);

            });
    }
    var gettrack = function(){
        if(angular.isUndefined($scope.day)) return;

        var tz = (new Date()).getTimezoneOffset()/60;
        // var day = (hourfrom - tz) / 24;
        var hourfrom = $scope.day * 24 + tz;

        GeoGPS.getTrack(hourfrom, hourfrom+23)  // +23? не 24?
            .then(function(data){
                $scope.track = data;
                $scope.points = data.track.length;
                // fake_timeline();
                $scope.timeline = data.ranges;
            });
    }

    if($scope.skey){
        load_date();
        gettrack();
    }

    $scope.$on("$routeUpdate", function(a, b, c){
        // console.log("~~~~~~~~~~~~~~~~====> $routeUpdate:", a, b, c);
        $scope.skey = $routeParams['skey'];
        $scope.day = $routeParams['day'];
        load_date();
        gettrack();
    });

    // $scope.onSysSelect = function(skey){
    //     // loadTrack(skey);

    //     GeoGPS.select(skey);
    //     GeoGPS.getHours(0, 1000000)
    //         .then(function(){
    //             // Недокументированный метод. Метод update изменяет текущий месяц
    //             $('#datepicker').datepicker("fill");
    //         });
    // };

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
                // console.log("toggle", scope.item, scope);
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
  }).
  when('/reports/:skey', {
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

angular.module('templates', ['templates/config/config.tpl.html', 'templates/config/data/data.tpl.html', 'templates/config/params/params.tpl.html', 'templates/error/error.tpl.html', 'templates/gps/gps.tpl.html', 'templates/header.tpl.html', 'templates/help/help.tpl.html', 'templates/login/login-orig.tpl.html', 'templates/login/login.tpl.html', 'templates/login/toolbar.tpl.html', 'templates/logs/logs.tpl.html', 'templates/map/map.tpl.html', 'templates/map/mapsysitem.tpl.html', 'templates/notifications.tpl.html', 'templates/reports/reports.tpl.html']);

angular.module("templates/config/config.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/config/config.tpl.html",
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
    "<ul class=\"config_sys_list\" ui-sortable=\"sortableOptions\" ng-model=\"account.account.skeys\">" +
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

angular.module("templates/config/data/data.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/config/data/data.tpl.html",
    "<div class=\"well\">" +
    "    <h4>Анкета трекера</h4>" +
    "    <hr>" +
    "    В разработке..." +
    "    <hr>" +
    "    <crud-buttons></crud-buttons>" +
    "</div>" +
    "");
}]);

angular.module("templates/config/params/params.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/config/params/params.tpl.html",
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

angular.module("templates/error/error.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/error/error.tpl.html",
    "" +
    "<div translate>error_msg</div>" +
    "<ul class=\"unstyled\">" +
    "  <li><a href=\"#/login\" translate class=\"btn\">Login</a><a href=\"#/map\" translate class=\"btn\">Map</a></li>" +
    "</ul>");
}]);

angular.module("templates/gps/gps.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/gps/gps.tpl.html",
    "<h4>Экспорт GPS</h4>" +
    "<hr>" +
    "В разработке..." +
    "");
}]);

angular.module("templates/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/header.tpl.html",
    "<div class=\"navbar\" ng-controller=\"HeaderCtrl\">" +
    "    <div class=\"navbar-inner\">" +
    "        <div class=\"container\">" +
    "            <!--a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\"-->" +
    "" +
    "            <a class=\"brand\" href=\"#/login\">newgps<span class=\"wide\">.navi.cc</span></a>" +
    "            <div class=\"\">" +
    "                <ul class=\"nav\" ng-class=\"{hidden: !account.isAuthenticated}\">" +
    "                    <li ng-class=\"{active:isNavbarActive('map')}\">" +
    "                        <a href=\"#/map\">" +
    "                            <i class=\"icon-map-marker\"></i>" +
    "                            <span class=\"wide\" translate>Map</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('logs')}\">" +
    "                        <a href=\"#/logs\">" +
    "                            <i class=\"icon-eye-open\"></i>" +
    "                            <span class=\"wide\" translate>Logs</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('reports')}\">" +
    "                        <a href=\"#/reports\">" +
    "                            <i class=\"icon-table\"></i>" +
    "                            <span class=\"wide\" translate>Reports</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('gps')}\">" +
    "                        <a href=\"#/gps\">" +
    "                            <i class=\"icon-film\"></i>" +
    "                            <span class=\"wide\" translate>Export GPS</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('config')}\">" +
    "                        <a href=\"#/config\">" +
    "                            <i class=\"icon-cogs\"></i>" +
    "                            <span class=\"wide\" translate>Config</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('help')}\">" +
    "                        <a href=\"#/help\">" +
    "                            <i class=\"icon-medkit\"></i>" +
    "                            <span class=\"wide\" translate>Help</span>" +
    "                        </a>" +
    "                    </li>" +
    "                    <li ng-class=\"{active:isNavbarActive('login')}\">" +
    "                        <a href=\"#/login\">" +
    "                            <i class=\"icon-off\"></i>" +
    "                            <span class=\"wide\" translate>User</span>" +
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
    "                    <!-- <li class=\"divider-vertical\"></li> -->" +
    "                    <li><a href=\"#\"><i class=\"icon-refresh icon-large icon-spin\"></i></a></li>" +
    "                </ul>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</div>");
}]);

angular.module("templates/help/help.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/help/help.tpl.html",
    "<h4>Информация и помощь</h4>" +
    "<hr>" +
    "В разработке" +
    "");
}]);

angular.module("templates/login/login-orig.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/login/login-orig.tpl.html",
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

angular.module("templates/login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/login/login.tpl.html",
    "" +
    "<div>" +
    "  <div ng-class=\"{hidden: account.isAuthenticated}\">" +
    "    <h4 translate>enter</h4>" +
    "    <chooselang></chooselang>" +
    "    <div translate>enter_help<br></div>" +
    "    <div translate class=\"wide\">enter_comment<br></div>" +
    "    <form name=\"form\" ng-submit=\"onLogin(user.name, user.password)\" style=\"width: auto\">" +
    "      <div class=\"input-prepend\"><span class=\"add-on\"><i class=\"icon-user\"></i></span>" +
    "        <input type=\"text\" placeholder=\"{{'user_name' | translate}}\" ng-model=\"user.name\" required autofocus>" +
    "      </div><br>" +
    "      <div class=\"input-prepend\"><span class=\"add-on\"><i class=\"icon-key\"></i></span>" +
    "        <input type=\"password\" placeholder=\"{{'user_password' | translate}}\" ng-model=\"user.password\" required>" +
    "      </div><br>" +
    "      <button ng-click=\"onLogin(user.name, user.password)\" ng-disabled=\"form.$invalid\" translate class=\"btn btn-primary login\">enter_cmd</button>" +
    "      <button ng-click=\"onRegister(user.name, user.password)\" ng-disabled=\"form.$invalid\" translate class=\"btn login\">register_cmd</button>" +
    "    </form>" +
    "    <div translate class=\"wide\">enter_comment2</div>" +
    "  </div>" +
    "  <div ng-class=\"{hidden: !account.isAuthenticated}\">" +
    "    <h4>{{'enter_as' | translate:{value: account.account.title} }}</h4>" +
    "    <dl class=\"dl-horizontal wide\">" +
    "      <dt>Язык<br> (Language, Мова, Język)</dt>" +
    "      <dd>" +
    "        <chooselang></chooselang>" +
    "      </dd><br>" +
    "      <dt translate>Display name</dt>" +
    "      <dd contenteditable=\"true\" ng-model=\"account.account.name\" ng-change=\"onChange(account.account.name)\"></dd>" +
    "      <dt translate>Register date</dt>" +
    "      <dd>{{ account.account.date | fromnow }}</dd>" +
    "      <dt translate>Administrator</dt>" +
    "      <dd>{{ account.account.admin | yesno }}</dd>" +
    "      <dt translate>Observed systems</dt>" +
    "      <dd>{{ account.account.skeys.length }}</dd>" +
    "      <dt title=\"{{ 'for_recovery' | translate}}\">email</dt>" +
    "      <dd>{{ account.account.email }}</dd>" +
    "    </dl>" +
    "    <div style=\"text-align: center;\">" +
    "      <button ng-click=\"onLogout();\" class=\"btn btn-warning\"><i class=\"icon-off\"></i>Выйти из учетной записи</button>" +
    "    </div>" +
    "  </div>" +
    "</div>");
}]);

angular.module("templates/login/toolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/login/toolbar.tpl.html",
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

angular.module("templates/logs/logs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/logs/logs.tpl.html",
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

angular.module("templates/map/map.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/map/map.tpl.html",
    "<div gmap=\"main\" track=\"track\" config=\"mapconfig\"></div>" +
    "<div class=\"map-control\">" +
    "    <ul class=\"map-control-tools\">" +
    "        <li ng-click=\"doFilter()\"><span class=\"icon-filter icon-large\" title=\"Фильтр\"></span></li>" +
    "        <li ng-click=\"doZoomList()\"><span class=\"icon-zoom-in icon-large\" title=\"Размер\"></span></li>" +
    "    </ul>" +
    "    <ul class=\"mapsyslist\">" +
    "        <mapsysitem zoom=\"{{zoomlist}}\" ng-repeat=\"s in account.account.skeys\" item=\"account.account.systems[s]\" select=\"onSysSelect(s)\"></mapsysitem>" +
    "    </ul>" +
    "    <div class=\"mapcalendar\">" +
    "      <div id=\"datepicker\" data-date-language=\"ru\" data-date-weekstart=\"1\"></div>" +
    "    </div>" +
    "" +
    "" +
    "</div>" +
    "" +
    "<div class=\"map-timeline\" id=\"timeline\" data=\"timeline\" timeline></div>" +
    "" +
    "<div class=\"map-toolbar\">" +
    "    <span class=\"icon-wrench icon-large\" title=\"Настройки отображения\" ng-click=\"showconfig = !showconfig\" style=\"padding: 7px;\"></span>" +
    "    <div class=\"map-toolbar-config\" ng-show=\"showconfig\">" +
    "        <ul class=\"unstyled\">" +
    "            <li config-map-item item=\"mapconfig.autobounds\" icon-off=\"unlock\" icon-on=\"lock\">{{ 'AUTO_BOUND_TRACK' | translate }}</li>" +
    "            <li config-map-item item=\"mapconfig.animation\" icon-off=\"truck\" icon-on=\"truck\">{{ 'ANIMATION_DIR' | translate}}</li>" +
    "            <li config-map-item item=\"mapconfig.numbers\" icon-off=\"map-marker\" icon-on=\"map-marker\">{{ 'STOP_NUMBERS' | translate}}</li>" +
    "        </ul>" +
    "    </div>" +
    "    <button ng-click=\"hideTrack()\" class=\"btn\">Скрыть трек</button>" +
    "    Tочек в треке: {{points}}" +
    "    <chooselang></chooselang>" +
    "</div>" +
    "" +
    "" +
    "</div>" +
    "");
}]);

angular.module("templates/map/mapsysitem.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/map/mapsysitem.tpl.html",
    "<li ng-click=\"select()\">" +
    "    <!-- <i href=\"/#/config/{{ item.skey }}/params\"><span class=\"icon-wrench\"></span></i> -->" +
    "    <div>" +
    "        <span class=\"desc\">" +
    "            <i class=\"icon-wrench\" title=\"Нажмите чтобы настроить трекер\" ng-click=\"manageSystemParams(item.skey)\"></i>" +
    "                {{ item.desc }}" +
    "        </span>" +
    "    </div>" +
    "" +
    "    <div ng-show=\"zoom > 0\">" +
    "        <span class=\"status\">" +
    "            Стоит" +
    "        </span>" +
    "        <span class=\"signal\">" +
    "            24/05/2013 24:55" +
    "        </span>" +
    "        <br>" +
    "        <span class=\"status\">" +
    "            <span title=\"Основное питание\"><i class=\"icon-ambulance\"></i><strong>12В</strong></span>" +
    "            <span title=\"Резервное питание\"><i class=\"icon-bolt\"></i><strong>4.2В</strong></span>" +
    "            <span title=\"Сигнал GSM\"><i class=\"icon-signal\"></i></span>" +
    "            <i title=\"Сигнал GPS\" class=\"fonticon\">e</i>" +
    "        </span>" +
    "" +
    "    </div>" +
    "    <div ng-show=\"zoom > 1\">" +
    "        Тут будет много подробной<br>" +
    "        и нужной информации<br>" +
    "        как только мы<br>" +
    "        закончим дизайн.<br>" +
    "        Реально много.<br>" +
    "        Собственно тут будет<br>" +
    "        вся информация о трекере.<br>" +
    "        А возможно и связанная<br>" +
    "        информация." +
    "    </div>" +
    "</li>" +
    "");
}]);

angular.module("templates/notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/notifications.tpl.html",
    "<div ng-class=\"['alert', 'alert-'+notification.type]\" ng-repeat=\"notification in notifications.getCurrent()\">" +
    "    <button class=\"close\" ng-click=\"removeNotification(notification)\">x</button>" +
    "    {{notification.message}}" +
    "</div>" +
    "");
}]);

angular.module("templates/reports/reports.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/reports/reports.tpl.html",
    "<h4>Отчеты</h4>" +
    "<hr>" +
    "В разработке..." +
    "");
}]);

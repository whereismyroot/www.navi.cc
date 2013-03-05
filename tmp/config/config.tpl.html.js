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
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
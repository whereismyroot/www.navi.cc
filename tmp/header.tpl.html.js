angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\" ng-controller=\"HeaderCtrl\">" +
    "    <div class=\"navbar-inner\">" +
    "        <div class=\"container\">" +
    "            <!--a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\"-->" +
    "" +
    "" +
    "            <a class=\"brand\" href=\"#/login\">newgps.navi.cc</a>" +
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

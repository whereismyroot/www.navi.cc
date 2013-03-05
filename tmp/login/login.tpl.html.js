angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"row\">" +
    "<div class=\"well span4\">" +
    "    <div ng-class=\"{hidden: account.isAuthenticated}\">" +
    "        Чтобы пользоваться сервисом необходимо авторизоваться в системе.<br>" +
    "        Введите имя пользователя и пароль своей учетной записи.<br>" +
    "        Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически." +
    "    </div>" +
    "    <div ng-class=\"{hidden: !account.isAuthenticated}\">" +
    "        <h4>Вы вошли как <i>{{ account.account.title }}</i></h4>" +
    "        <dl class=\"dl-horizontal\">" +
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
    "<div class=\"well span4\">" +
    "    Состояние сервера" +
    "</div>" +
    "</div>" +
    "" +
    "" +
    "<div modal=\"!account.isAuthenticated\" close=\"cancelLogin()\">" +
    "    <div class=\"modal-header\">" +
    "        <h4>Вход</h4>" +
    "        Чтобы пользоваться сервисом необходимо авторизоваться в системе.<br>" +
    "        Введите имя пользователя и пароль своей учетной записи.<br>" +
    "        Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически." +
    "    </div>" +
    "    <div class=\"modal-body\">" +
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
    "        </form>" +
    "    </div>" +
    "    <div class=\"modal-footer\">" +
    "        <button class=\"btn clear\" ng-click=\"clearForm()\">Очистить</button>" +
    "        <button class=\"btn btn-primary login\" ng-click=\"onLogin(user.name, user.password)\" ng-disabled='form.$invalid'>Войти</button>" +
    "        <!--button class=\"btn btn-warning cancel\" ng-click=\"cancelLogin()\">Cancel</button-->" +
    "    </div>" +
    "</div>" +
    "");
}]);

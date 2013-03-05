angular.module("notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications.tpl.html",
    "<div ng-class=\"['alert', 'alert-'+notification.type]\" ng-repeat=\"notification in notifications.getCurrent()\">" +
    "    <button class=\"close\" ng-click=\"removeNotification(notification)\">x</button>" +
    "    {{notification.message}}" +
    "</div>" +
    "");
}]);

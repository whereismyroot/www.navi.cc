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

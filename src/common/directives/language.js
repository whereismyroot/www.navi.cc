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


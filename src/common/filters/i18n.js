angular.module('app.filters.i18n', [])

.filter('translate', ['globals', function(globals){
    return function (text, length, end) {
        console.log('i18n globals=', globals);
        return I18n.t(text);
    };
}]);

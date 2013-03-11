angular.module('services.i18n', [])

.factory('i18n', ['$location', '$route', function($location, $route) {
    var i18n = {
        active: localStorage.getItem('language')
    };

    if(!i18n.active) {
        i18n.active = 'ru';
    }

    i18n.set = function(code){
        //console.log('i18n onSet', code, $location, $route);
        localStorage.setItem('language', code);
        i18n.active = code;
        I18n.defaultLocale = i18n.active;
        //$rootScope.$apply();
        //$location.path($location.$$path);
        //$route.reload();
        //location.reload();
    };

    I18n.defaultLocale = i18n.active;

    return i18n;
}]);

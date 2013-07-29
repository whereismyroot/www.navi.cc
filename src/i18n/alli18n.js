angular.module('i18n', ['i18n.ru', 'i18n.en', 'i18n.pl', 'i18n.ua'])
.config(['$translateProvider', function ($translateProvider) {

    // console.log(["$translateProvider", $translateProvider, $translateProvider.translations()]);

    // All other langs
    // $translateProvider.translations({
    //     "error_msg": "Ууууупс. Что-то произошло. Попробуйте перейти по одной из следующих ссылок:",

    //     // Login page
    //     "enter": "Вход",
    //     "enter_help": "Введите имя пользователя и пароль своей учетной записи.",
    //     "enter_comment": "Чтобы пользоваться сервисом необходимо авторизоваться в системе.",
    //     "enter_comment2": "Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.",
    //     "user_name": "Имя пользователя",
    //     "user_password": "Пароль",
    //     "enter_cmd": "Войти",
    //     "register_cmd": "Зарегестритоваться",

    //     'SIMPLE': 'Простое значение',
    //     'COMPLEX': 'value равно {{value}}.',

    //     'MAP': 'Карта',

    //     // Панель настроек карты
    //     'AUTO_BOUND_TRACK': 'Автоматически центровать трек',
    //     'ANIMATION_DIR': 'Анимация направления',
    //     'STOP_NUMBERS': 'Нумерация остановок/стоянок'
    // });

    var lang = localStorage.getItem('language');
    if((lang === null) || (lang === "undefined") || !(lang in $translateProvider.translations())){
        lang = 'ru_RU';
        localStorage.setItem('language', lang);
    }
    $translateProvider.uses(lang);
    // $translateProvider.rememberLanguage(true);   // Not worked yet
}]);


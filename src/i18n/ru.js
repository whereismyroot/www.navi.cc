// (function(window, I18n){
// 'use strict';

// I18n.translations = I18n.translations || {};

// I18n.translations.ru = {
//     enter: 'Вход=',
//     enter_help: 'Введите имя пользователя и пароль своей учетной записи.',
//     enter_comment: 'Чтобы пользоваться сервисом необходимо авторизоваться в системе.',
//     enter_comment2: 'Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.',
//     user_name: 'Имя пользователя',
//     user_password: 'Пароль',
//     enter_cmd: 'Войти'
//   };

// // window.console.log('i18n.ru init', I18n);
// })(this, I18n);


angular.module('i18n.ru', ['pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('ru_RU', {
        "translate": "Ошибка описания",
        "error_msg": "Ууууупс. Что-то произошло. Попробуйте перейти по одной из следующих ссылок:",

        // Login page
        "enter": "Вход",
        "enter_help": "Введите имя пользователя и пароль своей учетной записи.",
        "enter_comment": "Чтобы пользоваться сервисом необходимо авторизоваться в системе.",
        "enter_comment2": "Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.",
        "user_name": "Имя пользователя",
        "user_password": "Пароль",
        "enter_cmd": "Войти",
        "register_cmd": "Зарегестритоваться",
        "enter_as": "Вы вошли как {{ value }}",
        "Display name": "Отображаемое имя",
        "Register date": "Дата регистрации",
        "Administrator": "Администратор",
        "Observed systems": "Наблюдаемых систем",
        "for_recovery": "Для восстановления пароля",
        "error_auth": "Ошибка авторизации, перепроверьте данные.",

        "Login": 'Вход',
        "Map": 'Карта',
        "Logs": "События",
        "Reports": "Отчеты",
        "Export GPS": "Экспорт GPS",
        "Config": "Настройки",
        "Help": "Помощь",
        "User": "Пользователь",

        // Карта
        "Display Settings": "Настройки отображения",
        "Hide track": "Скрыть трек",
        "Show track": "Показать трек",
        "points_in_track": "Точек в треке: {{value}}",

        // Панель настроек карты
        'AUTO_BOUND_TRACK': 'Автоматически центровать трек',
        'ANIMATION_DIR': 'Анимация направления движения',
        'STOP_NUMBERS': 'Нумерация остановок / стоянок',

        // Страница настроек
        'add_system': 'Добавить трекер',

        // Страница params
        'contenteditableTitle': 'Для изменения описания поместите курсор в поле',
        'TrackerInfo': 'Информация о трекере',
        'Model': 'Модель',
        'SIMNumber': 'Номер SIM-карты',
        'RegistrationDate': 'Заергистрирован',
        'Version': 'Версия ПО',
        'Undefined': 'Не определен',
        'CopyTitle': "Для копирования в буффер обмена нажмите правую кнопку и выберите 'Копировать'",
        'StateInfo': 'Сведения о состоянии',
        'LastConection': 'Выход на связь',
        'CurrentState': 'Текущее состояние',
        'SatellitesCount': 'Количество спутников',
        'GSMLevel': 'Уровень сигнала GSM',
        'GPSLevel': 'Уровень сигнала GPS',
        'MainPower': 'Основное питание',
        'BackupPower': 'Резервное питание',
        'Coordinates': 'Координаты',

        // report
        'Generate report': 'Сгенерировать отчет'
    });
}]);

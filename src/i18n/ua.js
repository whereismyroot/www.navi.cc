// (function(window, I18n){
// 'use strict';

// I18n.translations = I18n.translations || {};

// I18n.translations.ua = {
//     enter: 'Вхiд',
//     enter_help: 'Введіть ім\'я користувача і пароль свого облікового запису.',
//     enter_comment: 'Щоб користуватися сервісом необхідно авторизуватися в системі.',
//     enter_comment2: 'Для створення нового облікового запису придумайте ім\'я користувача та пароль, обліковий запис буде створена автоматично.',
//     user_name: 'Ім\'я користувача.',
//     user_password: 'Пароль',
//     enter_cmd: 'Увійти'
//   };

// //window.console.log('i18n.ua init', I18n);
// })(this, I18n);

angular.module('i18n.ua', ['pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('ua_UA', {
        "translate": "Помилка опису",
        "error_msg": "Ууууупс. Щось сталося. Спробуйте перейти по одній з наступних посилань:",

        // Login page
        "enter": "Вхiд",
        "enter_help": "Введіть ім'я користувача і пароль свого облікового запису.",
        "enter_comment": "Щоб користуватися сервісом необхідно авторизуватися в системі.",
        "enter_comment2": "Для створення нового облікового запису придумайте ім'я користувача та пароль, обліковий запис буде створена автоматично.",
        "user_name": "Ім'я користувача.",
        "user_password": "Пароль",
        "enter_cmd": "Увійти",
        "register_cmd": "Зарегестрітоваться",
        "enter_as": "Ви увійшли як {{ value }}",
        "Display name": "Екранне ім'я",
        "Register date": "Дата реєстрації",
        "Administrator": "Адміністратор",
        "Observed systems": "Спостережуваних систем",
        "for_recovery": "Для відновлення паролю",
        "error_auth": "Помилка авторизації, перевірте дані.",

        "Login": 'Вхiд',
        'Map': 'Мапа',
        "Logs": "Події",
        "Reports": "Звіти",
        "Export GPS": "Експорт GPS",
        "Config": "Налаштування",
        "Help": "Допомога",
        "User": "Користувач",

        // Map
        "Display Settings": "Налаштування відображення",
        "Hide track": "Приховати трек",
        "Show track": "Показати трек",
        "points_in_track": "Точок в треку: {{value}}",

        'AUTO_BOUND_TRACK': 'Автоматично центрувати трек',
        'ANIMATION_DIR': 'Анімація напрямку руху',
        'STOP_NUMBERS': 'Нумерація зупинок / стоянок',

        // Config page
        'add_system': 'Add system (translate)',

        // params
        'contenteditableTitle': 'Для зміни опису помістіть курсор в полі',
        'TrackerInfo': 'Информація про трекер',
        'Model': 'Модель',
        'SIMNumber': 'Номер SIM-карти',
        'RegistrationDate': 'Зареєстровано',
        'Version': 'Версія ПЗ',
        'Undefined': 'Не визначено',
        'CopyTitle': "Для копирования в буффер обмена нажмите правую кнопку и выберите 'Копировать'",
        'StateInfo': 'Відомості про стан',
        'LastConection': "Вихід на зв'язок",
        'CurrentState': 'Стан',
        'SatellitesCount': 'Кількість супутників',
        'GSMLevel': 'Рівень сигналу GSM',
        'GPSLevel': 'Рівень сигналу GPS',
        'MainPower': 'Основне живлення',
        'BackupPower': 'Резервне живлення',
        'Coordinates': 'Координати',

        'MarkerDate': 'Дата мітки',
        'Altitude': 'Висота над рівнем моря',
        'Temperature': 'Температура',
        'Body': 'Корпус',
        'Input': 'Вхід',
        'Output': 'Вихід',
        'FuelLevel': 'Рівень палива',
        'Events': 'Події',
        'ExportGPS': 'Експорт GPS',
        'LitersShort': 'л',
        'MetersShort': 'м',
        'EventsTitle': 'Натисніть щоб подивитись події трекера',
        'ExportGPSTitle': 'Натисніть щоб подивитись подробиці GPS',
        'VehicleInfo': 'Інформація про транспортний засіб',
        'Icon': 'Значок',
        'VehicleName': 'Найменування ТС',
        'LicensePlate': 'Гос номер',
        'Year': 'Рік випуску',
        'EngineNumber': 'Номер двигуна',
        'BodyNumber': 'Номер кузова',
        'Insurance': 'Номер страхового полісу',
        'FuelConsuption': 'Витрати палива',
        'ParamsProgramming': 'Програмування системних параметрів',
        'Name': "Ім'я",
        'Description': 'Опис',
        'Value': 'Значення',
        'Default': 'По умовчанню',
        'ChangeTo': 'Змінити на',
        'CancelTitle': 'Відмінити',
        'CancelChanges': 'Undo changes',

        //params descs
        'AccelerometerSensitivity': 'Чутливість акселерометра, mg (20-200)',
        'MinimumAngle': 'Мінімально-реєстрований кут повороту (градуси) INT 5 5',
        'GPSEconomyMain': "Вимкнення GPS для економії основного живлення при стоянці об'єкта, хв",
        'GPSEconomyBackup': "Вимкнення GPS для економії резервного живлення при стоянці об'єкта, хв",
        'ForcedRegMov': "Період примусової реєстрації координат при русі об'єкта, сек",
        'RegStopMain': "Період реєстрації координат при зупинці об'єкта / основне живлення, сек",
        'RegStopBackup': "Період реєстрації координат при зупинці об'єкта / резервне живлення, сек",
        'RegParkMain': "Період реєстрації координат при стоянці об'єкта / основне живлення, сек",
        'RegParkBackup': "Період реєстрації координат при стоянці об'єкта / резервне живлення, сек",

        'InputConfiguration': 'Конфігурація входу',
        'Output1State': 'Стан входу 1: 0-вимкнений / 1-увімкнений (активний рівень - низький)',
        'Output2State': 'Стан входу 2: 0-вимкнений / 1-увімкнений (активний рівень - низький)',
        'TurnedOff': 'Вимкнений',
        'AlarmBtn': 'Тривожна кнопка',
        'Loop': 'Шлейф',
        'Ignition': 'Запалювання',
        'FuelSensor': 'Датчик палива',
        'MovementRegSpeed': 'Швидкість, вище якої реєструється початок руху × 0,01852 км/год',
        'StopRegSpeed': 'Швидкість, нижче якої реєструється початок руху × 0,01852 км/год',
        'FlushMove': 'Період відправки даних на сервер при русі, сек',
        'FlushStop': 'Період відправки даних на сервер при стоянці, сек',
        // report
        'Generate report': 'Згенерувати звіт'
    });
}]);

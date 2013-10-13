// (function(window, I18n){
// 'use strict';

// I18n.translations = I18n.translations || {};

// I18n.translations.pl = {
//     enter: 'Entrance',
//     enter_help: 'Wpisz nazwę użytkownika i hasło do swojego konta.',
//     enter_comment: 'Aby skorzystać z usługi, aby zalogować się do systemu.',
//     enter_comment2: 'Aby utworzyć nowe konto, uzupełnić nazwę i hasło, konto zostanie utworzone automatycznie.',
//     user_name: 'Nazwa użytkownika',
//     user_password: 'Hasło',
//     enter_cmd: 'Wpisać'
//   };

// // window.console.log('i18n.pl init', I18n);
// })(this, I18n);

angular.module('i18n.pl', ['pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('pl_PL', {
        "translate": "Błąd Opis.",
        "error_msg": "Uuuuups. Coś się stało. Użyj jednego z poniższych linków:",

        // Login page
        "enter": "Entrance",
        "enter_help": "Wpisz nazwę użytkownika i hasło do swojego konta.",
        "enter_comment": "Aby skorzystać z usługi, aby zalogować się do systemu.",
        "enter_comment2": "Aby utworzyć nowe konto, uzupełnić nazwę i hasło, konto zostanie utworzone automatycznie.",
        "user_name": "Nazwa użytkownika",
        "user_password": "Hasło",
        "enter_cmd": "Wpisać",
        "register_cmd": "Zaregestritovatsya",
        "enter_as": "Jesteś zalogowany jako {{ value }}",
        "Display name": "Wyświetla nazwę",
        "Register date": "Data rejestracji",
        "Administrator": "Administrator",
        "Observed systems": "Obserwacji systemów",
        "for_recovery": "Aby odzyskać hasło",
        "error_auth": "Błąd autoryzacji, sprawdź dane.",

        "Login": "Zaloguj się",
        "Map": "Map",
        "Logs": "Wydarzenia",
        "Reports": "Raporty",
        "Export GPS": "Eksport GPS",
        "Config": "Ustawienia",
        "Help": "Pomoc",
        "User": "Użytkownik",
        'MainActions': 'Główne działania',
        'AdditionalActions': 'Dodatkowe działania',
        'Logout': 'Wyloguj się ze swojego konta',
        'JoinedGroups': 'Uczestnictwo w grupach',
        'ConfigureTitle': 'Skonfigurować',
        'Language': 'Język',

        //Registration
        'RegisterNew': 'Zarejestruj nowe konto',
        'UsernamePlaceholder': 'Użyj tego, aby wprowadzić',
        'PasswordPlaceholder': 'Zalecamy co najmniej 6 znaków',
        'DisplayedName': 'Wyświetlona nazwa użytkownika',
        'DisplayedNamePlaceholder': 'Inni użytkownicy będą widzieć cię z tą nazwą',
        'Email': 'Email',
        'EmailPlaceholder': 'Określ, czy chcesz być w stanie odzyskać hasła',
        'GroupInfo': 'Aby móc stworzyć wspólną listę pojazdów, obiektów na mapie, szablony, raporty, i więcej, należy utworzyć grupę użytkowników (firma) lub dołączyć do istniejącej grupy.',
        'CreateGroup': 'Utwórz grupę',
        'CreateGroupInfo': 'To stworzy grupę użytkowników{{groupname}}, a staniesz się jego administrator. Aby zaprosić użytkowników do grupy, niech wiedzą, nazwę grupy, a słowo weryfikacja {{grouppassword}}.',
        'JoinGroup': 'Dołącz do grupy',
        'JoinGroupInfo': 'Aby przyłączyć się do istniejącej grupy, należy podać poprawną nazwę grupy i weryfikację tekstów.',
        'Group': 'Grupa',
        'GroupPlaceholder': "To może być używany do połączenia grupy użytkowników",
        'CheckWord': 'Słowo weryfikacja',
        'CheckWordPlaceholder': 'Potrzebujesz za przybycie do grupy użytkowników',
        'CreateUser': 'Tworzenie użytkownika',
        'UserAlreadyExists': 'Użytkownik o nazwie {{username}} już istnieje.',
        'GroupAlreadyExists': 'Grupa o nazwie {{groupname}} już istnieje.',
        'GroupNotExists': 'Grupa o nazwie {{groupname}} nie istnieje.',
        'WrongCheckWord': 'Złe słowo weryfikacja {{groupname}} group.',
        'SuccessRegister': '{{username}} powiodło się zarejestrował. Teraz możesz zamknąć bieżącą kartę, a następnie wrócić do wejścia. Lub zamknąć okno i zarejestrować jeden więcej instrukcji.',
        'SuccessRegisterTitle': 'Rejestracja jest skuteczne',
        'RegisterMore': 'Zarejestruj się jeden użytkownik',
        'CloseWindow': 'Zamknij okno.',

        // Map
        "Display Settings": "Ustawienia ekranu",
        "Hide track": "Ukryj utwór",
        "Show track": "Pokaż utwór",
        "points_in_track": "Punkty w utworu: {{value}}",

        'AUTO_BOUND_TRACK': 'Automatycznie wyśrodkować utwór',
        'ANIMATION_DIR': 'Kierunek Animacja',
        'STOP_NUMBERS': 'Numeracja przystanków / parki',

        // Config page
        'add_system': 'Dodać systemu',
        'SystemsList': 'Lista systemów',
        'Deleting': 'Usuwanie',
        'DeletingWoutConfTitle': 'Usuwanie systemu z obserwowanych listy (bez potwierdzenia)',
        'DeletingTitle': 'Usuwania system',
        'SettingsTitle': 'Naciśnij, aby wyregulować tracker',
        'DisableObservation': 'Wyłącz system monitoringu',
        'PhoneNumberTitle': 'Numer telefonu',

        // params
        'contenteditableTitle': 'Aby zmienić opis, umieść kursor w polu',
        'TrackerInfo': 'Informacje o trackerze.',
        'Model': 'Model',
        'SIMNumber': 'Liczba kart SIM',
        'RegistrationDate': 'Zarejestrowany',
        'Version': 'Wersja',
        'Undefined': 'Nie zdefiniowano',
        'CopyTitle': 'Na kopiowanie do schowka, kliknij prawym przyciskiem myszy i wybierz opcję "Kopiuj"',
        'StateInfo': 'Informacja o stanie',
        'LastConection': 'Status związku',
        'CurrentState': 'Obecny stan',
        'SatellitesCount': 'Liczba satelitów',
        'GSMLevel': 'Sygnał GSM',
        'GPSLevel': 'Sygnał GPS',
        'MainPower': 'Zasilanie',
        'BackupPower': 'Zasilanie',
        'Coordinates': 'Koordynuje',
        'MarkerDate': 'Data znaku',
        'Altitude': 'Wysokość nad poziomem morza',
        'Temperature': 'Temperatura',
        'Body': 'Korpus',
        'Input': 'Wkład',
        'Output': 'Wytwórczość',
        'FuelLevel': 'Poziom paliwa',
        'Events': 'Wydarzenia',
        'ExportGPS': 'Eksport GPS',

        'LitersShort': 'l',
        'MetersShort': 'm',
        'VoltsShort': 'v',
        'KMPerHour': 'km/h',

        'EventsTitle': 'Szczękńcie tu, żeby obserwować za tracker wydarzeniami',
        'ExportGPSTitle': 'Naciśnijcie żeby popatrzeć szczegóły GPS',
        'VehicleInfo': 'Informacje o pojeździe.',
        'Icon': 'Ikona',
        'VehicleName': 'Nazwa pojazdu',
        'LicensePlate': 'Tablica rejestracyjna',
        'Year': 'Rok produkcji',
        'EngineNumber': 'Seryjny numer silnika',
        'BodyNumber': 'Korpus numer',
        'Insurance': 'Numer Ubezpieczenia',
        'FuelConsuption': 'Zużycie paliwa',
        'ParamsProgramming': 'Programowania parametrów systemu',
        'Name': 'Nazwa',
        'Description': 'Description',
        'Value': 'Wartość',
        'Default': 'Domyślne',
        'ChangeTo': 'Zmieni się na',
        'CancelTitle': 'Anulować',
        'CancelChanges': 'Cofnąć zmiany',
        'UnsavedTryLater': 'Konfiguracja Tracker nie jest zapisywany. Spróbuj ponownie później lub wysłać numer karty tracker SMS:',
        'ChooseIcon': 'Wybierz ikonę dla',
        'CloseBtn': 'Zamknąć',

        //params descs
        'AccelerometerSensitivity': 'Czułość akcelerometru',
        'MinimumAngle': 'Minimalna wykrywalna kąt obrotu (w stopniach)',
        'GPSEconomyMain': 'Wyłączanie GPS zapisać zasilanie, gdy obiekt jest pobyt, minuty',
        'GPSEconomyBackup': 'Turning off the GPS to save backup power when an object is staying, minutes',
        'ForcedRegMov': "Wyłączanie GPS zapisać zasilanie awaryjne, gdy obiekt jest pobyt, minuty",
        'RegStopMain': 'Okres rejestracji współrzędnych, gdy obiekt jest przystanki (zasilanie) s',
        'RegStopBackup': 'Okres rejestracji współrzędnych, gdy obiekt jest przystanki (zasilanie awaryjne) s',
        'RegParkMain': 'Okres rejestracji współrzędnych, gdy obiekt jest zaparkowany (zasilanie) sek',
        'RegParkBackup': 'Okres rejestracji współrzędnych, gdy obiekt jest zaparkowany (moc backup) sek',
        'InputConfiguration': 'Konfiguracja wejścia',
        'Output1State': 'Stan wyjścia 1: 0-wyłączony / 1-włączony (aktywny poziom - niski)',
        'Output2State': 'Stan wyjścia 2: 0-wyłączony / 1-włączony (aktywny poziom - niski)',
        'TurnedOff': 'Wyłączony',
        'AlarmBtn': 'Przycisk alarmu',
        'Loop': 'Pętla',
        'Ignition': 'Zapalenie',
        'FuelSensor': 'Czujnik paliwa',
        'MovementRegSpeed': 'Obrotów, powyżej których jest zarejestrowany ruch startowego × 0,01852 km/h',
        'StopRegSpeed': 'Prędkość poniżej której obiekt jest zarejestrowany jako zatrzymał × 0,01852 km/h',
        'FlushMove': 'Okres wysyłania danych do serwera, gdy obiekt jest w ruchu, sec',
        'FlushStop': 'Okres wysyłania danych do serwera, gdy obiekt jest zaparkowany, sec',

        //params/fuel
        'FuelSensorSettings': 'Ustawienia czujnika paliwa.',
        'FuelVolume': 'Objętość paliwa (l)',
        'Voltage': 'Napięcie (v)',
        'DeleteBtn': 'Usunąć',
        'SaveBtn': 'Zapisz',
        'AddRowBtn': 'Dodaj wiersz',
        'DragChangeOrderTitle': 'Kliknij i przeciągnij, aby zmienić obiekty',

        //addtracker directive
        'Add': 'Dodać',
        'AddAllTitle': 'Dodaj wszystkie trackery firmy',

        //fileload directive
        'FromFile': 'Z pliku...',

        //navtool directive
        'Back': 'Nazad',
        'Settings': 'Ustawienia',

        // report
        'Generate report': 'Generowanie raportu'
    });
}]);

// (function(window, I18n){
// 'use strict';

// I18n.translations = I18n.translations || {};

// I18n.translations.en = {
//     enter: 'Enter',
//     enter_help: 'Enter the user name and password of your account.',
//     enter_comment: 'To use the service to log into the system.',
//     enter_comment2: 'To create a new account, make up a name and password, your account is automatically created.',
//     user_name: 'User name',
//     user_password: 'Password',
//     enter_cmd: 'Confirm'
//   };

// // window.console.log('i18n.en init', I18n);

// })(this, I18n);


angular.module('i18n.en', ['pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {

    // Simply register translation table as object hash
    $translateProvider.translations('en_EN', {
        "translate": "Ошибка описания",
        "error_msg": "Ooooops. Something happened. Try using one of the following links:",

        // Login page
        "enter": "Enter",
        "enter_help": "Enter the user name and password of your account.",
        "enter_comment": "To use the service to log into the system.",
        "enter_comment2": "To create a new account, make up a name and password, your account is automatically created.",
        "user_name": "User name",
        "user_password": "Password",
        "enter_cmd": "Confirm",
        "register_cmd": "Register",
        "enter_as": "You enter as {{ value }}",
        "Display name": "Display name",
        "Register date": "Register date",
        "Administrator": "Administrator",
        "Observed systems": "Observed systems",
        "for_recovery": "To recover your password",
        "error_auth": "Authorization error, double-check the data.",

        "Login": 'Login',
        'Map': 'Map',
        "Logs": "Logs",
        "Reports": "Reports",
        "Export GPS": "Export GPS",
        "Config": "Config",
        "Help": "Help",
        "User": "User",

        // Map
        "Display Settings": "Display Settings",
        "Hide track": "Hide track",
        "Show track": "Show track",
        "points_in_track": "Points in track: {{value}}",

        'AUTO_BOUND_TRACK': 'Automatic bound track',
        'ANIMATION_DIR': 'Animation direction',
        'STOP_NUMBERS': 'Numbering of stops / parks',

        // Config page
        'add_system': 'Add system',

        // params
        'contenteditableTitle': 'To change the description, place the cursor in the field',
        'TrackerInfo': 'Information about tracker',
        'Model': 'Model',
        'SIMNumber': 'Number of SIM-card',
        'RegistrationDate': 'Registered',
        'Version': 'Software version',
        'Undefined': 'Not defined',
        'CopyTitle': "For copy to clipboard, right-click and select 'Copy'",
        'StateInfo': 'State information',
        'LastConection': 'Last conection',
        'CurrentState': 'Current state',
        'SatellitesCount': 'Number of satellites',
        'GSMLevel': 'GSM signal level',
        'GPSLevel': 'GPS signal level',
        'MainPower': 'Main power',
        'BackupPower': 'backup power',
        'Coordinates': 'Coordinates',
        'MarkerDate': 'Marker date',
        'Altitude': 'Altitude above sea',
        'Temperature': 'Temperature',
        'Body': 'Body',
        'Input': 'Input',
        'Output': 'Output',
        'FuelLevel': 'Fuel level',
        'Events': 'Events',
        'ExportGPS': 'Export GPS',

        'LitersShort': 'l',
        'MetersShort': 'm',
        'VoltsShort': 'v',

        'EventsTitle': 'Click here to watch tracker events',
        'ExportGPSTitle': 'Click here to watch GPS details',
        'VehicleInfo': 'Information about vehicle',
        'Icon': 'Icon',
        'VehicleName': 'Vehicle name',
        'LicensePlate': 'License plate',
        'Year': 'Year of construction',
        'EngineNumber': 'Engine serial number',
        'BodyNumber': 'Car stand number',
        'Insurance': 'Insurance number',
        'FuelConsuption': 'Fuel consumption',
        'ParamsProgramming': 'System parameters programming',
        'Name': 'Name',
        'Description': 'Description',
        'Value': 'Value',
        'Default': 'Default',
        'ChangeTo': 'Change to',
        'CancelTitle': 'Cancel',
        'CancelChanges': 'Undo changes',
        'UnsavedTryLater': 'Tracker configuration is not saved. Please try again later or send the card number tracker SMS:',
        'ChooseIcon': 'Choose icon for',
        'CloseBtn': 'Close',

        //params descs
        'AccelerometerSensitivity': 'Accelerometer sensitivity, (20-200)',
        'MinimumAngle': 'The minimum detectable angle of rotation (degrees) INT 5 5',
        'GPSEconomyMain': 'Turning off the GPS to save main power when an object is staying, minutes',
        'GPSEconomyBackup': 'Turning off the GPS to save backup power when an object is staying, minutes',
        'ForcedRegMov': "The period of forced registration of coordinates of the object, when it's moving, sec",
        'RegStopMain': 'The period of registration of coordinates, when an object is stops (main power) sec',
        'RegStopBackup': 'The period of registration of coordinates, when an object is stops (backup power) sec',
        'RegParkMain': 'The period of registration of coordinates, when an object is parked (main power) sec',
        'RegParkBackup': 'The period of registration of coordinates, when an object is parked (backup power) sec',
        'InputConfiguration': 'Configuration of input',
        'Output1State': 'Output 1 state: 0-turned off / 1-turned on (active level - low)',
        'Output2State': 'Output 2 state: 0-turned off / 1-turned on (active level - low)',
        'TurnedOff': 'Turned off',
        'AlarmBtn': 'Alarm button',
        'Loop': 'Loop',
        'Ignition': 'Ignition',
        'FuelSensor': 'Fuel sensor',
        'MovementRegSpeed': 'Speed, above which is registered starting movement × 0,01852 km/h',
        'StopRegSpeed': 'Speed ​​below which the object is registered as stopped × 0,01852 km/h',
        'FlushMove': 'The period of sending data to the server when object is moving, sec',
        'FlushStop': 'The period of sending data to the server when object is parked, sec',

        //params/fuel
        'FuelSensorSettings': 'Fuel sensor settings.',
        'FuelVolume': 'Fuel volume (l)',
        'Voltage': 'Voltage (v)',
        'DeleteBtn': 'Delete',
        'SaveBtn': 'Save',
        'AddRowBtn': 'Add row',
        'DragChangeOrderTitle': 'Click and drag to rearrange the objects',

        // report
        'Generate report': 'Generate report'
});
}]);

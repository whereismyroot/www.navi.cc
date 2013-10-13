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
        'MainActions': 'Main actions',
        'AdditionalActions': 'Additional actions',
        'Logout': 'Log out from your account',
        'JoinedGroups': 'Joined groups',
        'ConfigureTitle': 'Configure',
        'Language': 'Language',

        //Registration
        'RegisterNew': 'Register new account',
        'UsernamePlaceholder': 'Use this to enter',
        'PasswordPlaceholder': 'We recommend at least 6 characters',
        'DisplayedName': 'Displayed user name',
        'DisplayedNamePlaceholder': 'Other users will see you with this name',
        'Email': 'Email',
        'EmailPlaceholder': 'Specify, if you want to be able to recover your password',
        'GroupInfo': 'To be able to create shared lists of vehicles, objects on the map, templates, reports, and more, you must create a user group (company) or join an existing group.',
        'CreateGroup': 'Create group',
        'CreateGroupInfo': 'This will create a group of users {{groupname}}, and you will become its administrator. To invite a users to a group, let them know the name of the group, and the verification word {{grouppassword}}.',
        'JoinGroup': 'Join group',
        'JoinGroupInfo': 'To join an existing group, you must specify the correct group name and the word verification.',
        'Group': 'Group',
        'GroupPlaceholder': "It's can used to combine a group of users",
        'CheckWord': 'Verification word',
        'CheckWordPlaceholder': 'Need for coming into the group of users',
        'CreateUser': 'Create user',
        'UserAlreadyExists': 'User with name {{username }} already exists.',
        'GroupAlreadyExists': 'Group with name {{groupname }} already exists.',
        'GroupNotExists': 'Group with name {{groupname }} does not exists.',
        'WrongCheckWord': 'Wrong verification word for {{groupname}} group.',
        'SuccessRegister': '{{username}} was successful registered. Now you can close the current tab and then return to the entrance. Or close the window and register one more user.',
        'SuccessRegisterTitle': 'Registration is successful',
        'RegisterMore': 'Register one more user',
        'CloseWindow': 'Close window.',


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
        'SystemsList': 'Systems list',
        'Deleting': 'Deleting',
        'DeletingWoutConfTitle': 'Delete system from observation list (without confirmation)',
        'DeletingTitle': 'Deleting systems',
        'SettingsTitle': 'Press to configure tracker',
        'DisableObservation': 'Disable system observation',
        'PhoneNumberTitle': 'Phone number',


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
        'KMPerHour': 'km/h',

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

        //addtracker directive
        'Add': 'Add',
        'AddAllTitle': 'Add all company trackers',

        //fileload directive
        'FromFile': 'From file...',

        //navtool directive
        'Back': 'Back',
        'Settings': 'Settings',

        // report
        'Generate report': 'Generate report'
});
}]);

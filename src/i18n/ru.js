(function(window, I18n){
'use strict';

I18n.translations = I18n.translations || {};

I18n.translations.ru = {
    enter: 'Вход',
    enter_help: 'Введите имя пользователя и пароль своей учетной записи.',
    enter_comment: 'Чтобы пользоваться сервисом необходимо авторизоваться в системе.',
    enter_comment2: 'Для создания новой учетной записи придумайте имя пользователя и пароль, учетная запись будет создана автоматически.',
    user_name: 'Имя пользователя',
    user_password: 'Пароль',
    enter_cmd: 'Войти'
  };

window.console.log('i18n.ru init', I18n);
})(this, I18n);

angular.module('resources.rest', ['services.connect', 'ngResource'])

// Если я не ощибаюсь, то factory нужно как-то заменить на provider

.factory('REST', ['SERVER', '$http', '$q', 'Connect', function (SERVER, $http, $q, Connect) {

    /*
     Name - имя ресурса, например 'param'

    Запрос с сервера будет каким:
    GET /[name]s/:id

    Запрос всех документов ресурса:
    GET /[name]s

    Изменение ресурса:
    PATCH /[name]/:id
    { "field": "value" }

    При получении уведомления докумен будет обновляться автоматически

    */

    var Model = function(name, value){
        angular.copy(value || {}, this);
        this.$name = name;
    }

    // Отправить на сервер измененное значение одного поля
    Model.prototype.$patch = function(field) {
        var defer = $q.defer();
        var that = this;

        var request = {};
        request[field] = this[field];

        $http({
            method: 'PATCH',
            url: SERVER.api + "/" + this.$name + "s/" + encodeURIComponent(this.id),
            data: JSON.stringify(request)
        }).success(function(data){
            defer.resolve(data);
        });

        return defer.promise;
    }


    var REST = function(name){
        this.name = name;
        this.models = {};   // Сюда будут помещаться все документы: ключ => значение
        this.all = false;   // Будет установлен в true после вызова .getall()
        var that = this;

        Connect.on(name, function(message){
            console.log("REST:update event", message);
            console.log(that.models);
            // var system = angular.extend({}, {id: message.id}, message.data);
            // addtoset(system);

            if(that.models.hasOwnProperty(message.id)){
                console.log("extend");
                angular.extend(that.models[message.id], message.data);
            }

        });


    }

    REST.prototype.get = function(id, reload){
        var defer = $q.defer();
        var that = this;

        if(!this.models[id] || reload) {
            $http({
                method: 'GET',
                url: SERVER.api + "/" + this.name + "s/" + encodeURIComponent(id)
            }).success(function(data){
                if(that.models.hasOwnProperty(id)){
                    angular.extend(that.models[id], data);
                } else {
                    that.models[id] = new Model(that.name, data);
                }

                defer.resolve(that.models[id]);
            });
        } else {
            defer.resolve(this.models[id]);
        }
        return defer.promise;
    }

    REST.prototype.getall = function(reload){
        var defer = $q.defer();
        var that = this;

        if(!this.all || reload) {
            $http({
                method: 'GET',
                url: SERVER.api + "/" + this.name + "s"
            }).success(function(dataall){
                that.all = true;

                dataall.map(function(data){
                    var id = data.id;
                    if(that.models.hasOwnProperty(id)){
                        angular.extend(that.models[id], data);
                    } else {
                        that.models[id] = new Model(that.name, data);
                    }

                });

                defer.resolve(that.models);
            });
        } else {
            defer.resolve(this.models);
        }
        return defer.promise;
    }

    return REST;
}]);


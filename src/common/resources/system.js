angular.module('resources.system', ['services.connect'])

.factory('System', ['SERVER', '$http', '$q', 'Connect', function (SERVER, $http, $q, Connect) {
    var System = {
        data: null,
        systems: {}
    };

    // Построим формулу преобразования значения АЦП в объем топлива
    // В цепи измерения делитель: 22k/10k
    // В перспективе значение должно быть привязано к hwid
    // Результат преобразования является массив 0..1023 для 10тибитного АЦП
    System.fuelrecalc = function(fuel) {
        var r1 = 22,
            r2 = 10,
            vdd = 3.3,
            out = [],
            vmax = fuel[fuel.length-1].voltage,
            lmax = fuel[fuel.length-1].liters,
            // Функция поиска индекса по напряжению.
            // Предполагается что напряжения в возрастающей последовательности.
            b = d3.bisector(function(d){return d.voltage}).right;

        // console.log('fuel = ', fuel);

        for(var i=0; i<1024; i++){
            var v = (i * vdd / 1024) * (r1+r2) / r2 ; // +- 1lsb?
            if(v >= vmax){
                out.push(lmax);
            } else {
                var index = b(fuel, v);
                if(index == 0){
                    out.push(0);
                } else if(index >= fuel.length){
                    out.push(lmax);
                } else {
                    // console.log('index=', index, fuel, fuel[index]);
                    var v1 = fuel[index-1].voltage,
                        v2 = fuel[index].voltage,
                        l1 = fuel[index-1].liters,
                        l2 = fuel[index].liters,
                        vdelta = v2 - v1,
                        ldelta = l2 - l1,
                        liters = l1 + (l2 - l1) * (v - v1) / (v2 - v1);

                    out.push(Math.round(liters * 100) / 100); // округление до 0.01
                }
            }
        }
        // console.log('out=', out);
        // data.fuelarray = out;
        return out;
    }

    // Запросить все сисетмы авторизованного аккаунта
    // TODO: Операция должна кешироваться
    System.getall = function(reload){
        var defer = $q.defer();

        if(!System.data || reload){

            $http({
                method: 'GET',
                url: SERVER.api + "/account/systems"
            }).success(function(data){
                System.data = data;
                System.systems = {};
                for(var i=0; i<data.length; i++){
                    var s = data[i];
                    if(!s.error){
                        System.systems[s["id"]] = s;
                    }
                }
                console.log("System.getall:", data, System.systems);
                defer.resolve(System);
            });
        } else {
            defer.resolve(System);
        }
        return defer.promise;
    }

    // Запросить подробности для системы skey
    System.get = function(skey, reload){
        var defer = $q.defer();

        // console.log('-- System.get');

        if(!System.systems[skey] || reload) {
            $http({
                method: 'GET',
                url: SERVER.api + "/systems/" + encodeURIComponent(skey)
            }).success(function(data){
                console.log('System.get.success', data);

                System.data = data;
                System.systems[skey] = angular.copy(data);
                // System.skey = data.skey;

                // if(data && data.value.params.fuel){
                //     data.fuelarray = System.fuelrecalc(data.value.params.fuel);
                // } else {
                //     data.fuelarray = [];
                // }

                defer.resolve(System);
            });
        } else {
            System.data = System.systems[skey];
            defer.resolve(System);
        }

        return defer.promise;
    }

    // Установить значение одного из параметров (или нескольких)
    System.setParams = function(skey, params){
        var defer = $q.defer();

        console.log('-- System.get');

        $http({
            method: 'PATCH',
            url: SERVER.api + "/system/" + encodeURIComponent(skey),
            withCredentials: SERVER.api_withCredentials,
            data: JSON.stringify({params: params})
        }).success(function(data){
            console.log('System.patch.success', data);
            // System.skey = data.skey;

            defer.resolve();
        });

        return defer.promise;
    }

    // Изменения описания (наименования системы)
    System.update = function(skey, param){
        console.log('System.update', skey, param);
        $http({
            method: 'PATCH',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/systems/" + encodeURIComponent(skey),
            data: JSON.stringify(param)
        }).success(function(data){
          console.log('System.update.result', data);
        });

        /*
        $http({
            method: 'GET',
            withCredentials: SERVER.api_withCredentials,
            url: SERVER.api + "/system/changedesc/" + encodeURIComponent(skey) +
          "?desc=" + encodeURIComponent(desc)
        }).success(function(data){
          console.log('login data=', data);
        });
        */
    };

    Connect.on('system', function(message){
        console.log("system/update event", message, System.systems);
        angular.extend(System.systems[message.id], message.data);
        if(System.data && System.data.id == message.id){
            angular.extend(System.data, message.data);
        }
    });

    return System;
}]);

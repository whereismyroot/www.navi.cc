angular.module('app.filters', [])

.filter('datetime', function(){
    return function (text, length, end) {
        var d = new Date(parseInt(text, 10)*1000);
        return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear() + ' ' +
            fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2) + ':' + fdigits(d.getSeconds(), 2);
    };
})

.filter('fromnow', function(){
    return function (text, length, end) {
        var d = new Date(parseInt(text, 10)*1000);
        return moment(parseInt(text, 10)*1000).fromNow();
    };
})

.filter('yesno', function(){
    return function (state, length, end) {
        return state?"да":"нет";
    };
});

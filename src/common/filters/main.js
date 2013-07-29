var fdigits = function(value, digits) {
    return ("00000000000" + value).slice(-digits);
};

var fsource = {
    0: {title: "-", icons: ["icon-question"]},
    1: {title: "SUDDENSTOP", icons: ["icon-stop", "icon-warning"]},
    2: {title: "STOPACC", icons: ["icon-stop", "icon-pause"]},
    3: {title: "TIMESTOPACC", icons: ["icon-time", "icon-pause"]},
    4: {title: "SLOW", icons: ["icon-stop"]},
    5: {title: "TIMEMOVE", icons: ["icon-time", "icon-play" ]},
    6: {title: "START", icons: ["icon-play"]},
    7: {title: "TIMESTOP", icons: ["icon-time", "icon-stop"]},
    8: {title: "ANGLE", icons: ["icon-share-alt"]},
    9: {title: "DELTALAT", icons: ["icon-resize-full"]},
    10: {title: "DELTALONG", icons: ["icon-resize-full"]},
    11: {title: "DELTA", icons: ["icon-resize-full"]},
};

angular.module('app.filters', []).

filter('datetime', function(){
    return function (text, seconds, format) {
        var d = new Date(parseInt(text, 10)*1000);

        if(format === 'date'){
            return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear()
        } else if(format === 'time'){
            if((seconds === false) || (seconds === 'false')){
                return fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2);
            } else {
                return fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2) + ':' + fdigits(d.getSeconds(), 2);
            }
        }

        if((seconds === false) || (seconds === 'false')){
            return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear() + ' ' +
                fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2);
        } else {
            return '' + fdigits(d.getDate(),2) + '/' + fdigits(d.getMonth()+1, 2) + '/' + d.getFullYear() + ' ' +
                fdigits(d.getHours(), 2) + ':' + fdigits(d.getMinutes(), 2) + ':' + fdigits(d.getSeconds(), 2);
        }
    };
}).

filter('fromnow', function(){
    return function (text, length, end) {
        var d = new Date(parseInt(text, 10)*1000);
        return moment(parseInt(text, 10)*1000).fromNow();
    };
}).

/*
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
*/

filter('yesno', function(){
    return function (state, length, end) {
        return state?"да":"нет";
    };
}).

filter('fsource', function(){
    return function (index) {
        return fsource[1 * index];
    };
});

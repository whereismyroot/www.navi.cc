angular.module('directives.lists', [])

.directive('mylist', function() {
    return {
        restrict: 'E',
        //scope: {},
        transclude: false,
        //template: '<div>List:<ul><li ng-repeat="l in list">{{l}}<i class="icon-arrow-right"></i><span>{{l}}</span></li></ul></div>',
        template: '<div>List:<ul><li ng-repeat="l in list"><mylistitem></mylistitem></li></ul></div>',
        link: function(scope, element, attrs) {
            console.log('mylist directive: link', scope, element);
        }
        //, controller: ["account", function(account){console.log("account=", account)}]
    };
})

.directive('mylistitem', function() {
    return {
        restrict: 'E',
        //scope: {l:"@"},
        transclude: true,
        template: '<div>{{l}}</div>',
        link: function(scope, element, attrs) {
            console.log('mylistitem directive: link', scope, element);
        }
    };
})

.directive('mylist2', function() {
    return {
        restrict: 'E',
        scope: {},
        transclude: false,
        //template: '<div>List2:<ul><li ng-repeat="l in list">{{ l }}</li></ul></div>',
        template: '<div>List2:<ul></ul></div>',
        link: function(scope, element, attrs) {
            var ul = element[0].querySelector('ul');
            //scope.ul = ul;
            scope.list = scope.$parent.list;
            //var ul = angular.element(element);
            console.log('mylist2 directive: link', scope, element, attrs, ul);
            scope.$watch('list', function(ov, nv){
                //console.log(' == watch(list)', scope, ov, nv);
                ul.innerHTML = '';
                for(var i=0; i<scope.list.length; i++){
                    var l=scope.list[i];
                    var li = document.createElement('LI');
                    li.innerHTML = l;
                    ul.appendChild(li);
                }
            }, true);
            //console.dir(element);
            //console.dir(ul);
        }/*,
        compile: function(element, attrs) {
            console.log('mylist2 directive: compile', element, attrs);
        }
        , controller: ["$scope", function($scope) {
            console.log('mylist2 directive: controller', $scope);
            $scope._addMyData = "Hoo";
        }]*/
    };
})

.directive('contenteditable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attr, ngModel) {
            var read;
            //console.log('===contenteditable', scope, element, attr, ngModel);
            if (!ngModel) {
                return;
            }
            ngModel.$render = function() {
                return element.text(ngModel.$viewValue);
            };
            element.bind('blur', function() {
                //console.log("blur", ngModel.$viewValue, element.html());
                if($.trim(element.text()) === '') {
                    element.text(ngModel.$viewValue);
                    //scope.$apply();
                }
                if (ngModel.$viewValue !== $.trim(element.text())) {
                    return scope.$apply(read);
                }
            });
            element.bind('keypress', function(ev) {
                //console.log("keypress", ev);
                if(ev.which === 13){
                    element.trigger('blur');
                    return false;
                }
            });
            read = function() {
                console.log("read()", scope, ngModel);
                ngModel.$setViewValue($.trim(element.text()));
                element.trigger('change');  // Вызовем стандартный метод onChange, можно повесить свой обработчик на ng-change="onChange()"
                /*
                if(scope._update){
                    scope._update();
                }
                */
                /*if(scope.onChange) {
                    scope.onChange();
                }*/
                //return ngModel.$setViewValue($.trim(element.html()));
            };
            //return read;
        }
    };
})

.directive('fileload', function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: '<span class="btn btn-success fileinput-button">' +
                  '  <i class="icon-plus icon-white"></i>' +
                  '  <span>Из файла...</span>' +
//                  ' <input type="file" name="files[]" multiple="" ng-model="files" ng-change="onFileAdd()">' +
                  ' <input type="file">' +
                  '</span>',
        replace: true,
        link: function(scope, element, attr, ngModel) {
            scope.onFileAdd = function(){
                console.log('onFileAdd');
            };
            /*var input = document.createElement('input');
            input.setAttribute('type', 'file');
            //input.type = 'file';
            element.appendChild(input);*/
            element[0].querySelector('input').addEventListener('change', function (ev) {
                //var filename = ev.target.value;
                if((ev.target.value === null)||(ev.target.value === '')) {
                    return;
                }
                var file = ev.target.files[0];
                console.log('onChange', file);
                var reader = new FileReader();
                reader.onload = function(e) {
                    var list = e.target.result.replace(/[\r\t\n]/g, ' ').replace(/ {2}/g, ' ').split(' ').filter(function(el){return (el !== '') && (el !== ' ');});
                    console.log(['  onload', e, list]);
                    scope.$apply(function(){
                        ngModel.$setViewValue(list);
                        element.trigger('change');  // Вызовем стандартный метод onChange, можно повесить свой обработчик на ng-change="onChange()"
                        ev.target.value = null;
                    });
                };
                reader.readAsBinaryString(file);

            }, false);
            /*
            element.bind('change', function(ev){
                console.log('onChange', this, ev.target);
                scope.$apply(function(){
                    scope.files = ['1', '2', '3'];
                    ngModel.$setViewValue(['1', '2', '232']);
                    element.trigger('change');  // Вызовем стандартный метод onChange, можно повесить свой обработчик на ng-change="onChange()"
                });
            });
            */

            /*
            element.querySelector('input').addEventListener('change', function(){
                console.log('onChange');
            }, false);*/
            console.log(['fileload', scope, element, attr, ngModel]);
        }
    };
});


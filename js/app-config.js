/**
 * Created by Alexander Sugianto on 2016-03-20.
 */

var toDoListApp = angular.module('ToDoListApp');

toDoListApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/Detail/:toDoid', {
            templateUrl: 'templates/toDoList-detail-view.html',
            controller: 'toDoDetailController'
        }).
        when('/', {
            templateUrl: 'templates/toDoList-list-view.html',
            controller: 'toDoController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

toDoListApp.animation('.fold-animation', ['$animateCss', function($animateCss) {
    return {
        enter: function(element, doneFn) {
            var height = element[0].offsetHeight;
            return $animateCss(element, {
                addClass: 'reds large-text pulse-twice',
                easing: 'ease-out',
                from: { height:height + 'px' },
                to: { height:'0px' },
                duration: 1 // one second
            });
        }
    }
}]);
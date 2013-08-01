/* Angular Directives */
angular.module('task', []).directive('addTask', function () {
    return {
        templateUrl: 'partials/directives/addTask.htm',
        compile: function compile(tElement, tAttrs) {
            return function postLink(scope, iElement, iAttrs) { };
        }
    }
});
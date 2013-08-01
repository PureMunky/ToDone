/* Angular Directives */
angular.module('task', []).directive('addTask', function () {
    return {
        templateUrl: 'partials/directives/addTask.htm',
        compile: function compile(tElement, tAttrs) {
            return function postLink(scope, iElement, iAttrs) { };
        }
    }
});

angular.module('ToDone', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});
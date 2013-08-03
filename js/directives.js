/* Angular Directives */
ToDone.App.directive('repeatFormat', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/editRepeatFormula.htm',
        scope: {
            repeatFormula: '='
        },
        link: function (scope, elem, attrs) {
            scope.repeatOptions = [
                {ID: 'd', Title: 'Days'},
                {ID: 'w', Title: 'Weeks'},
                {ID: 'm', Title: 'Months'},
                {ID: 'y', Title: 'Years'},
            ];
            
            scope.active = (!!scope.repeatFormula && scope.repeatFormula.length > 0);
            
            var translateFormula = function () {
                var formArray = [1, 'd'];
                
                if(scope.repeatFormula) {
                    formArray = scope.repeatFormula.split('|');
                }
                
                scope.repeatCount = formArray[0];
            
                scope.repeatDuration = scope.repeatOptions[0];
                for (var i = 0; i < scope.repeatOptions.length; i++) {
                    if(formArray[1] === scope.repeatOptions[i].ID) { 
                        scope.repeatDuration = scope.repeatOptions[i];
                    }
                }
                
            };
            
            var updateFormula = function () {
                if(scope.active) {
                    scope.repeatFormula = '' + scope.repeatCount + '|' + scope.repeatDuration.ID;
                } else {
                    scope.repeatFormula = '';
                }
            };
            
            scope.$watch('repeatFormula', function (oldVal, newVal) {
                translateFormula();
            });
            
            scope.$watch('repeatCount', function (oldVal, newVal) {
                updateFormula();
            });
            
            scope.$watch('repeatDuration', function (oldVal, newVal) {
                updateFormula();
            });
            
            scope.$watch('active', function (oldVal, newVal) {
                updateFormula();
            });
            
            translateFormula();
            updateFormula();
        }
    };
});
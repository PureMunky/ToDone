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
            
            scope.rootOptions = [
                {ID: 't', Title: 'from Complete Date'},
                {ID: 'd', Title: 'from Due Date'},
                {ID: 's', Title: 'from Start Date'}
            ];
            
            var translateFormula = function () {
                var formArray = [1, 'd', 't'];
                
                scope.active = (!!scope.repeatFormula && scope.repeatFormula.length > 0);
                
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
                
                scope.repeatRoot = scope.rootOptions[0];
                for (var i = 0; i < scope.rootOptions.length; i++) {
                    if(formArray[2] === scope.rootOptions[i].ID) { 
                        scope.repeatRoot = scope.rootOptions[i];
                    }
                }
                
            };
            
            var updateFormula = function () {
                if(scope.active) {
                    scope.repeatFormula = '' + scope.repeatCount + '|' + scope.repeatDuration.ID + '|' + scope.repeatRoot.ID;
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
            
            scope.$watch('repeatRoot', function (oldVal, newVal) {
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

ToDone.App.directive('googleAuth', function ($rootScope) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/auth.htm',
        scope: {},
        link: function (scope, elem, attrs) {
            scope.user = {
                loaded: false
            };
            
            scope.SetGoogleUser = function () {
                gapi.client.load('plus', 'v1', function() {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    
                    request.execute(function(resp) {
                        scope.$apply(function() {
                            scope.user = resp;
                            scope.user.loaded = true;
                            $rootScope.Auth = {
                                UserID: scope.user.id
                            }
                        });
                    });
                });  
            };
            
            Auth.setAuthFunction(scope.SetGoogleUser);
        }
    };
});
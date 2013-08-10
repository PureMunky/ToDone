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

ToDone.App.directive('tdTagMultiSelect', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/tagMultiSelect.htm',
        scope: {
            selectedTags: '=',
            tags: '='
        },
        link: function (scope, elem, attrs) {
            function LoadSelectedTags() {
                scope.selectedTags.Include = localStorage.getItem('ToDone.SelectedTags.Include');
                scope.selectedTags.Exclude = localStorage.getItem('ToDone.SelectedTags.Exclude');
                
                SetSelectedTags(scope.selectedTags.Include, 'Include');
                SetSelectedTags(scope.selectedTags.Exclude, 'Exclude');
            }
            LoadSelectedTags();
            
            scope.GetSelectedTags = function (Type) {
                var rtnStr = '';
                
                if(scope.tags) {
                    for(var i = 0; i < scope.tags.length; i++) {
                        if(scope.tags[i][Type]) rtnStr += scope.tags[i].TagID + ',';    
                    }
                }
                
                return rtnStr.substring(0, rtnStr.length - 1);
            };
            
            function SetSelectedTags (List, Type) {
                if(List){
                    var list = List.split(',');
                    
                    if(scope.tags) {
                        for(var i = 0; i < scope.tags.length; i++) {
                            for(var j = 0; j < list.length; j++) {
                                if(list[j] == scope.tags[i].TagID) {
                                    scope.tags[i][Type] = true;
                                }
                            }
                        }
                    }
                }
            };
            
            function StoreSelectedTags(Type) {
                var FormTags = scope.GetSelectedTags(Type);
                
                localStorage.setItem('ToDone.SelectedTags.' + Type, FormTags);
            };
            
            scope.$watch(
                "GetSelectedTags('Include')",
                function () {
                    StoreSelectedTags('Include');
                    scope.selectedTags.Include = scope.GetSelectedTags('Include');
                }
            );
            
            scope.$watch(
                "GetSelectedTags('Exclude')",
                function () {
                    StoreSelectedTags('Exclude');
                    scope.selectedTags.Exclude = scope.GetSelectedTags('Exclude');
                }
            );
        }
    };
});
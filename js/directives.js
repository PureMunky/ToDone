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
            inlcudeTags: '=',
            excludeTags: '='
        },
        link: function (scope, elem, attrs) {
            scope.Tags = [{
                TagID: 1,
                Title: 'Test One'
            },
            {
                TagID: 2,
                Title: 'Test Two'
            }];
            
            scope.GetSelectedTags = function (Type) {
                var rtnStr = '';
                
                for(var i = 0; i < scope.Tags.length; i++) {
                    if(scope.Tags[i][Type]) rtnStr += scope.Tags[i].TagID + ',';    
                }
                
                return rtnStr.substring(0, rtnStr.length - 1);
            };
            
            function SetSelectedTags (List, Type) {
                if(List){
                    for(var i = 0; i < scope.Tags.length; i++) {
                        for(var j = 0; j < List.length; j++) {
                            if(List[j].TagID === scope.Tags[i].TagID) scope.Tags[i][Type] = true;
                        }
                    }
                }
            };
            
            function StoreSelectedTags(Type) {
                var FormTags = scope.GetSelectedTags(Type);
                
                localStorage.setItem('ToDone.SelectedTags.' + Type, FormTags);
                
                console.log('stored ' + Type);
            };
                
            scope.$watch('inlcudeTags', function (oldVal, newVal) {
                SetSelectedTags(newVal, 'Include');
            });
            
            scope.$watch('excludeTags', function (oldVal, newVal) {
                SetSelectedTags(newVal, 'Exclude');
            });
            
            scope.$watch(
                "GetSelectedTags('Include')",
                function () {
                    scope.includeTags = scope.GetSelectedTags('Include');
                    StoreSelectedTags('Include');
                }
            );
            
            scope.$watch(
                "GetSelectedTags('Exclude')",
                function () {
                    scope.includeTags = scope.GetSelectedTags('Exclude');
                    StoreSelectedTags('Exclude');
                }
            );
        }
    };
});
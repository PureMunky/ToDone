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
            var Form = {
                selectedTags: {
                    Include: '',
                    Exclude: ''
                }
            };
            
            function LoadSelectedTagsFromLocal() {
                console.log('LoadSelectedTagsFromLocal')
                
                if(localStorage.getItem('ToDone.SelectedTags')) {
                    Form.selectedTags = JSON.parse(localStorage.getItem('ToDone.SelectedTags'));
                }
                
                SetSelectedTagsInTagArray(Form.selectedTags.Include, 'Include');
                SetSelectedTagsInTagArray(Form.selectedTags.Exclude, 'Exclude');
            }
            LoadSelectedTagsFromLocal();
            
            scope.GetSelectedTags = function (Type) {
                console.log('GetSelectedTags - ' + Type)
                var rtnStr = '';
                
                if(scope.tags) {
                    for(var i = 0; i < scope.tags.length; i++) {
                        if(scope.tags[i][Type]) rtnStr += scope.tags[i].TagID + ',';    
                    }
                }
                
                return rtnStr.substring(0, rtnStr.length - 1);
            };
            
            function SetSelectedTagsInTagArray (List, Type) {
                console.log('SetSelectedTagsInTagArray');
                console.log(List);
                console.log(Type);
                
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
            
            function StoreSelectedTagsLocally(SelectedTags) {
                console.log('StoreSelectedTagsLocally');
            
                localStorage.setItem('ToDone.SelectedTags', JSON.stringify(SelectedTags));
            };
            
            scope.$watch(
                "GetSelectedTags('Include')",
                function () {
                    scope.selectedTags.Include = scope.GetSelectedTags('Include');
                    StoreSelectedTagsLocally(scope.selectedTags);
                }
            );
            
            scope.$watch(
                "GetSelectedTags('Exclude')",
                function () {
                    scope.selectedTags.Exclude = scope.GetSelectedTags('Exclude');
                    StoreSelectedTagsLocally(scope.selectedTags);
                }
            );
            
            scope.$watch(
                "tags", 
                function () {
                    console.log('tags changed');
                    SetSelectedTagsInTagArray(Form.selectedTags.Include, 'Include');
                    SetSelectedTagsInTagArray(Form.selectedTags.Exclude, 'Exclude');
                }
            );

        }
    };
});
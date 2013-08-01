/* Angular Controllers */
ToDone.Controllers = (function () {
    var that = {};

    that.Build = function ($scope, $http) {
        $http.get(ToDone.API.Build()).success(function (data) {
            $scope.BuildData = data;
        });
    };
    
    that.TodoList = function ($scope, $http, $rootScope, $location) {
        $scope.SelectedContext = 'Home';
        $scope.Form = {
            SelectedTag: $rootScope.CurrentTag || {},
            StaticTags: [{
                TagID: -1,
                Title: '-- All --'
            }],
            TagOptions: []
        };

        $scope.setContext = function (newContext) {
            $scope.SelectedContext = newContext;
        };

        $scope.FilterTag = function () {
            if ($scope.Form.SelectedTag.TagID > 0) {
                $http.get(ToDone.API.Todo() + 'tag/' + $scope.Form.SelectedTag.TagID).success(function (data) {
                    $scope.todos = data;
                });
            } else {
                if(ToDone.API.Online) {
                    console.log('online tasks');
                    
                    $http.get(ToDone.API.Todo() + 'list').success(function (data) {
                        $scope.todos = data;
                        localStorage.setItem('ToDone.Tasks', JSON.stringify(data));
                    });
                } else {
                    console.log('offline tasks');
                    
                    $scope.todos = JSON.parse(localStorage.getItem('ToDone.Tasks'));
                }
            }
        };

        $scope.edit = function (taskID) {
            $location.path('/edit/' + taskID);
        };

        if(ToDone.API.Online) {
            $http.get(ToDone.API.Tags()).success(function (data) {
                $scope.tags = data;
                localStorage.setItem('ToDone.Tags', JSON.stringify(data));
                $scope.Form.TagOptions = $scope.Form.StaticTags.concat($scope.tags);
                
                if(!$rootScope.CurrentTag) {
                    $scope.Form.SelectedTag = $scope.Form.TagOptions[0];
                } else {
                    for(var i = 0; i < $scope.Form.TagOptions.length; i++) {
                        if($scope.Form.TagOptions[i].TagID == $rootScope.CurrentTag) {
                            $scope.Form.SelectedTag = $scope.Form.TagOptions[i];
                        }
                    }
                }
            });
    
            $http.get(ToDone.API.Lists()).success(function (data) {
                $scope.lists = data;
                localStorage.setItem('ToDone.Lists', JSON.stringify(data));
            });
    
            $http.get(ToDone.API.Contexts()).success(function (data) {
                $scope.contexts = data;
                localStorage.setItem('ToDone.Contexts', JSON.stringify(data));
            });
        } else {
            $scope.tags = JSON.parse(localStorage.getItem('ToDone.Tags'));
            $scope.lists = JSON.parse(localStorage.getItem('ToDone.Lists'));
            $scope.contexts = JSON.parse(localStorage.getItem('ToDone.Contexts'));
        }
        
        $scope.$watch(
            "Form.SelectedTag",
            function () {
                $scope.FilterTag();
                if ($scope.Form.SelectedTag.TagID > 0) {
                    $rootScope.CurrentTag = $scope.Form.SelectedTag;
                } else {
                    $rootScope.CurrentTag = null;
                }
            }
        );
    };

    that.CurrentList = function ($scope, $http) {
        $http.get(ToDone.API.Todo() + 'current').success(function (data) {
            $scope.todos = data;
        });
    };

    that.TodoEdit = function ($scope, $http, $routeParams, $location) {
        var TaskID = $routeParams.TodoID || -1;

        $scope.Form = {
            CurrentTagText: ''
        };

        $http.get(ToDone.API.Todo() + TaskID).success(function (data) {
            $scope.todo = data;
        });

        $http.get(ToDone.API.Tags()).success(function (data) {
            $scope.tags = data;
            localStorage.setItem('ToDone.Tags', JSON.stringify(data));
        });
        
        $scope.writeTag = function () {
            if ($scope.Form.CurrentTagText) {
                $scope.todo.Tags.push({ TagID: -1, Title: $scope.Form.CurrentTagText });

                $scope.Form.CurrentTagText = '';
            }
        }

        $scope.removeTag = function (tag) {
            var index = $scope.todo.Tags.indexOf(tag);

            $scope.todo.Tags.splice(index, 1);
        }

        $scope.save = function () {
            $scope.writeTag();
            
            $http.put(ToDone.API.Todo() + TaskID, $scope.todo).success(function (data) {
                $scope.todo = data;
                $location.path('/list');
            });
        };

        $scope.cancel = function () {
            $location.path('/list');
        }
    };

    that.MainNavigation = function ($scope) {
        $scope.links = [{
            Name: 'Current',
            Link: '#/current'
        }, {
            Name: 'List',
            Link: '#/list'
        }, {
            Name: 'Recent',
            Link: '#/recent'
        }, {
            Name: 'New',
            Link: '#/create'
        }];
    };

    that.QuickAdd = function ($scope, $http, $route, $rootScope) {
        $http.get(ToDone.API.Todo() + '/-1').success(function (data) {
            $scope.todo = data;
        });

        $scope.save = function () {            
            $http.put(ToDone.API.Todo() + '/-1', $scope.todo).success(function () {
                $scope.todo.Title = '';
                $scope.todo.Tags = [];
                $route.reload();
            });
        };
        
        $rootScope.$watch(
            'CurrentTag',
            function (newValue) {
                if($scope.todo) {
                    console.log($scope.todo.Title);
                    $scope.todo.Tags[0] = newValue;
                }
            });
    };

    return that;
})();

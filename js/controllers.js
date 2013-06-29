/* Angular Controllers */
ToDone.Controllers = (function () {
    var that = {};

    that.TodoList = function ($scope, $http) {
        $scope.SelectedContext = 'Home';
        $scope.Form = {
            SelectedTag: {},
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
                $http.get(ToDone.API.Todo() + 'list').success(function (data) {
                    $scope.todos = data;
                });
            }
        };

        $http.get(ToDone.API.Tags()).success(function (data) {
            $scope.tags = data;
            $scope.Form.TagOptions = $scope.Form.StaticTags.concat($scope.tags);
            $scope.Form.SelectedTag = $scope.Form.TagOptions[0];
        });

        $http.get(ToDone.API.Lists()).success(function (data) {
            $scope.lists = data;
        });

        $http.get(ToDone.API.Contexts()).success(function (data) {
            $scope.contexts = data;
        });

        $scope.$watch(
            "Form.SelectedTag",
            function () {
                $scope.FilterTag();
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

        $http.get(ToDone.API.Todo() + '/' + TaskID).success(function (data) {
            $scope.todo = data;
        });

        $scope.writeTag = function () {
            if ($scope.Form.CurrentTagText) {
                $scope.todo.Tags.push({ TagID: -1, Title: $scope.Form.CurrentTagText });

                $scope.Form.CurrentTagText = '';
            }
        }

        $scope.save = function () {
            $http.put(ToDone.API.Todo() + '/' + TaskID, $scope.todo).success(function (data) {
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
            Name: 'New',
            Link: '#/create'
        }];
    };

    that.QuickAdd = function ($scope, $http, $route) {
        $http.get(ToDone.API.Todo() + '/-1').success(function (data) {
            $scope.todo = data;
        });

        $scope.save = function () {
            $http.put(ToDone.API.Todo() + '/-1', $scope.todo).success(function () {
                $scope.todo.Title = '';
                $route.reload();
            });
        };
    };
    return that;
})();

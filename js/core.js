/* Constants */
var ToDone = {};

ToDone.API = {
    Todo: function () {
        return '/API/ToDone/TaskService.svc/';
    },
    Lists: function () {
        return 'data/lists.json';
    },
    Contexts: function () {
        return 'data/contexts.json';
    },
    Tags: function () {
        return '/API/ToDone/TagService.svc/';
    }
};

/* Angular App */
ToDone.App = angular.module('ToDone', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/list', {
        templateUrl: 'partials/TodoList.htm',
        controller: ToDone.Controllers.TodoList
    }).when('/edit/:TodoID', {
        templateUrl: 'partials/TodoEdit.htm',
        controller: ToDone.Controllers.TodoEdit
    }).when('/create', {
        templateUrl: 'partials/TodoEdit.htm',
        controller: ToDone.Controllers.TodoEdit
    }).when('/current', {
        templateUrl: 'partials/CurrentList.htm',
        controller: ToDone.Controllers.CurrentList
    }).otherwise({
        redirectTo: '/list'
    });
}]);

/* Angular Controllers */
ToDone.Controllers = (function () {
    var that = {};

    that.TodoList = function ($scope, $http) {
        $scope.SelectedContext = 'Home';
        $scope.Form = {
            SelectedTag: {}
        };

        $scope.setContext = function (newContext) {
            $scope.SelectedContext = newContext;
        };
        
        $http.get(ToDone.API.Todo() + '/tag/' + $scope.Form.SelectedTag.TagID).success(function (data) {
            $scope.todos = data;
        });
        
        $http.get(ToDone.API.Lists()).success(function (data) {
            $scope.lists = data;
        });
        
        $http.get(ToDone.API.Contexts()).success(function (data) {
            $scope.contexts = data;
        });

        $http.get(ToDone.API.Tags()).success(function (data) {
            $scope.tags = data;
        });
    };

    that.CurrentList = function ($scope, $http) {
        $http.get(ToDone.API.Todo() + '/current').success(function (data) {
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

        $http.get(ToDone.API.Tags() + 'task/' + TaskID).success(function (data) {
            $scope.tags = data;
        });

        $scope.writeTag = function () {
            if ($scope.Form.CurrentTagText) {
                $http.put(ToDone.API.Tags() + 'task/' + TaskID, [{ TagID: -1, Title: $scope.Form.CurrentTagText }]).success(function (data) {
                    $scope.tags = data;
                });

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

/* Angular Modules */
angular.module('task', []).directive('addTask', function () {
    return {
        templateUrl: 'partials/directives/addTask.htm',
        compile: function compile(tElement, tAttrs) {
            return function postLink(scope, iElement, iAttrs) {};
        }
    }
});

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
    }).when('/user', {
      templateUrl: 'partials/User.htm',
      controller: ToDone.Controllers.User
    }).otherwise({
        redirectTo: '/list'
    });
}]);
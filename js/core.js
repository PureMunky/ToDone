/* Constants */
var API = {
	TodoEdit: 'data/todo_single.json',
	TodoList: 'data/todos.json'
};

/* Angular App */
angular.module('ToDone', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/list', {templateUrl: 'partials/TodoList.htm', controller: TodoListCtrl})
			.when('/edit/:TodoID', {templateUrl: 'partials/TodoEdit.htm', controller: TodoEditCtrl})
			.otherwise({redirectTo: '/list'});
	}]);

/* Angular Controllers */
function TodoListCtrl($scope, $http) {
	$http.get(API.TodoList).success(function(data) {
		$scope.todos = data;
	});
}

function TodoEditCtrl($scope, $http, $routeParams) {
	$http.get(API.TodoEdit).success(function(data) {
		$scope.todo = data;
	});
}
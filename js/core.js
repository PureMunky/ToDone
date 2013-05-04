angular.module('ToDone', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/list', {templateUrl: 'partials/TodoList.htm', controller: TodoListCtrl})
			.when('/edit/:TodoID', {templateUrl: 'partials/TodoEdit.htm', controler: TodoEditCtrl})
			.otherwise({redirectTo: '/list'});
	}]);

function TodoListCtrl($scope, $http) {
	$http.get('data/todos.json').success(function(data) {
		$scope.todos = data;
	});
}

function TodoEditCtrl($scope, $routeParams) {
	$scope.id = $routeParams.TodoID;
	// TODO: seems to not pass the id correctly.
}
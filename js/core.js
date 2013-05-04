function ListCtrl($scope, $http) {
	$http.get('data/todos.json').success(function(data) {
		$scope.todos = data;
	});
}

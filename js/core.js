function ListCtrl($scope) {
	$scope.todos = [
		{
			ID: 1,
			Title: 'test',
			Description: 'description',
			DueDate: new Date()
		},
		{
			ID: 2,
			Title: 'test 2',
			Description: 'description 2',
			DueDate: new Date()
		}
	];
}

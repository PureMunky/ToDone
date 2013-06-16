/* Constants */
var ToDone = {};

ToDone.API = {
	TodoEdit: function () { return 'data/todo_single.json'; },
	TodoList: function () { return 'data/todos.json'; },
  CurrentList: function () { return 'data/todos.json'; }
};

/* Angular App */
ToDone.App = angular.module('ToDone', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/list', {templateUrl: 'partials/TodoList.htm', controller: ToDone.Controllers.TodoList})
			.when('/edit/:TodoID', {templateUrl: 'partials/TodoEdit.htm', controller: ToDone.Controllers.TodoEdit})
      .when('/current', {templateUrl: 'partials/CurrentList.htm', controller: ToDone.Controllers.CurrentList})
			.otherwise({redirectTo: '/current'});
	}]);

/* Angular Controllers */
ToDone.Controllers = (function() {
  var that = {};
  
  that.TodoList = function($scope, $http) {
  	$http.get(ToDone.API.TodoList()).success(function(data) {
  		$scope.todos = data;
  	});
  };
  
  that.CurrentList = function ($scope, $http) {
    $http.get(ToDone.API.CurrentList()).success(function(data) {
      $scope.todos = data;    
    });
  };
  
  that.TodoEdit = function ($scope, $http, $routeParams) {
  	$http.get(ToDone.API.TodoEdit()).success(function(data) {
  		$scope.todo = data;
  	});
  };
  
  that.MainNavigation = function ($scope, $location) {
    $scope.links = [
      {
        Name: 'Current',
        Link: '#/current'
      },
      {
        Name: 'List',
        Link: '#/list'
      }
    ];
  };
  
  return that;
})();

/* Angular Modules */
angular.module('task', [])
  .directive('addTask', function() {
    return {
      templateUrl: 'partials/directives/addTask.htm',
      compile: function compile(tElement, tAttrs) {
        return function postLink(scope, iElement, iAttrs) {}
      }
    }
  });
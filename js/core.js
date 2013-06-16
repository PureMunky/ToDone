/* Constants */
var API = {
	TodoEdit: 'data/todo_single.json',
	TodoList: 'data/todos.json'
};

var ToDone = {};

/* Angular App */
ToDone.App = angular.module('ToDone', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/list', {templateUrl: 'partials/TodoList.htm', controller: ToDone.Controllers.TodoList})
			.when('/edit/:TodoID', {templateUrl: 'partials/TodoEdit.htm', controller: ToDone.Controllers.TodoEdit})
      .when('/current', {templateUrl: 'partials/CurrentList.htm', controller: ToDone.Controllers.CurrentList})
			.otherwise({redirectTo: '/list'});
	}]);

/* Angular Controllers */
ToDone.Controllers = (function() {
  var that = {};
  
  that.TodoList = function($scope, $http) {
  	$http.get(API.TodoList).success(function(data) {
  		$scope.todos = data;
  	});
  };
  
  that.CurrentList = function ($scope, $http) {
    $http.get(API.CurrentList)
  };
  
  that.TodoEdit = function ($scope, $http, $routeParams) {
  	$http.get(API.TodoEdit).success(function(data) {
  		$scope.todo = data;
  	});
  }
  
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
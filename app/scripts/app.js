(function (angular) {

  var ToDone = angular.module('ToDone', []);

  ToDone.factory('Svc', ['$window', function (win) {

    return function (msg) {
      return 'hello ' + msg;
    };

  }]);

  ToDone.controller('ToDone.Controllers.ListCtrl', ['$scope', 'Svc', function ($scope, svc) {

  }]);

  ToDone.controller('ToDone.Controllers.MainNavigation', ['$scope', 'Svc', function ($scope, svc) {
    var futureLinks = [{
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

    $scope.Links = [{
      Name: 'List',
      Link: '#/list'
    }, {
      Name: 'New',
      Link: '#/create'
    }];
  }]);

  // Quick Add Controller
  // Handles the ability to quickly create a new task.
  ToDone.controller('ToDone.Controllers.QuickAdd', ['$scope', 'Svc', function ($scope, svc) {

  }]);

  ToDone.controller('ToDone.Controllers.Build', ['$scope', 'Svc', function ($scope, svc) {

    $scope.BuildData = {
      BuildNumber: 1,
      GitBranch: 'testing'
    };

  }]);

  ToDone.controller('ToDone.Controllers.TodoList', ['$scope', 'Svc', function ($scope, svc) {

  }]);

  ToDone.controller('ToDone.Controllers.TodoEdit', ['$scope', 'Svc', function ($scope, svc) {

  }]);

  ToDone.controller('ToDone.Controllers.CurrentList', ['$scope', 'Svc', function ($scope, svc) {

  }]);

})(angular);

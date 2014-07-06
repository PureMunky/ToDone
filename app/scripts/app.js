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
    $scope.Links = [{
      Name: 'List',
      Link: '#/list'
    }, {
      Name: 'New',
      Link: '#/create'
    }];
  }]);

  ToDone.controller('ToDone.Controllers.QuickAdd', ['$scope', 'Svc', function ($scope, svc) {

  }]);

  ToDone.controller('ToDone.Controllers.Build', ['$scope', 'Svc', function ($scope, svc) {

    $scope.BuildData = {
      BuildNumber: 1,
      GitBranch: 'testing'
    };

  }]);

})(angular);

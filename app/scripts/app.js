(function (angular) {

  var ToDone = angular.module('ToDone', []);

  ToDone.factory('Svc', ['$window', function (win) {

    return function (msg) {
      return 'hello ' + msg;
    };

  }]);

  ToDone.controller('ListCtrl', ['$scope', 'Svc', function ($scope, svc) {

    $scope.TestFunction = function () {
      return true;
    };

    $scope.CallService = function (msg) {
      return svc(msg);
    };

  }]);

})(angular);

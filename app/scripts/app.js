(function (angular) {

  var AppName = angular.module('AppName', []);

  AppName.factory('Svc', ['$window', function (win) {

    return function (msg) {
      return 'hello ' + msg;
    };

  }]);

  AppName.controller('Ctrl', ['$scope', 'Svc', function ($scope, svc) {

    $scope.TestFunction = function () {
      return true;
    };

    $scope.CallService = function (msg) {
      return svc(msg);
    };

  }]);

})(angular);

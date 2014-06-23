describe('ToDone', function () {
  var scope,
      controller;

  beforeEach(function () {
    module('ToDone');
  });

  describe('ListCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ListCtrl', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

    it('has TestFunction', function () {
      expect(!!scope.TestFunction).toBe(true);
    });

    it('calls the service', function () {
      expect(scope.CallService('phil')).toBe('hello phil');
    });
  });
});

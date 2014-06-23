describe('AppName', function () {
  var scope,
      controller;

  beforeEach(function () {
    module('AppName');
  });

  describe('Ctrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('Ctrl', {
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

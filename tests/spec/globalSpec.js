describe('ToDone', function () {
  var scope,
      controller;

  beforeEach(function () {
    module('ToDone');
  });

  describe('ToDone.Controllers.ListCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.ListCtrl', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

  });

  describe('ToDone.Controllers.MainNavigation', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.MainNavigation', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

    it('has links', function () {
      expect(!!scope.Links).toBe(true);
    });

  });

  describe('ToDone.Controllers.QuickAdd', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.QuickAdd', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

  });

  describe('ToDone.Controllers.Build', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.Build', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

    it('has build number', function () {
      expect(scope.BuildData.BuildNumber).toBe(1);
    });

    it('has git branch', function () {
      expect(scope.BuildData.GitBranch).toBe('testing');
    });

  });

  describe('ToDone.Controllers.TodoList', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.TodoList', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

  });

  describe('ToDone.Controllers.TodoEdit', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.TodoEdit', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

  });

  describe('ToDone.Controllers.CurrentList', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('ToDone.Controllers.CurrentList', {
        '$scope': scope
      });
    }));

    it('works', function () {
      expect(true).toBe(true);
    });

  });
});

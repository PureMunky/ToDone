/* Angular Controllers */
ToDone.Controllers = (function () {
  var that = {};

  that.TodoList = ['$scope', '$rootScope', '$location', 'UserService', 'APIService', function ($scope, $rootScope, $location, UserService, APIService) {

    $scope.Form = {
      SelectedTag: $rootScope.CurrentTag || JSON.parse(localStorage.getItem('ToDone.SelectedTag')) || {},
      SelectedContext: $rootScope.SelectedContext || JSON.parse(localStorage.getItem('ToDone.SelectedContext')) || {},
      SelectedSort: {},
      StaticTags: [{
        TagID: -1,
        Title: '-- All --'
      }],
      TagOptions: [],
      ContextOptions: [],
      SortOptions: [{
        Title: "Title",
        Sort: "title"
      },
      {
        Title: "Due Date",
        Sort: "due_date"
      },
      {
        Title: "Start Date",
        Sort: "start_date"
      },
      {
        Title: "Modified",
        Sort: "last_modified desc"
      },
      {
        Title: "Special",
        Sort: "special_sort"
      },
      {
        Title: "Priority",
        Sort: "priority desc"
      },
      {
        Title: "Smart",
        Sort: "smart"
      }]
    };

    $scope.FilterTag = function () {
      if ($scope.Form.SelectedTag) localStorage.setItem('ToDone.SelectedTag', JSON.stringify($scope.Form.SelectedTag));
      if ($scope.Form.SelectedContext) localStorage.setItem('ToDone.SelectedContext', JSON.stringify($scope.Form.SelectedContext));

      if ($scope.Form.SelectedTag.TagID > 0 || $scope.Form.SelectedContext.TagID > 0) {
        APIService.get(ToDone.API.Todo() + 'filter/' + ($scope.Form.SelectedTag.TagID || -1) + ',' + ($scope.Form.SelectedContext.TagID || -1) + '/-1/' + ($scope.Form.SelectedSort.Sort || 'title'), function (err, data) {
          $scope.todos = data;
        });
      } else {
        APIService.get(ToDone.API.Todo() + 'list/' + ($scope.Form.SelectedSort.Sort || 'title'), function (err, data) {
          $scope.todos = data;
          localStorage.setItem('ToDone.Tasks', JSON.stringify(data));
        });
      }
    };

    $scope.edit = function (taskID) {
      $location.path('/edit/' + taskID);
    };

    function loadSort() {
      var SavedSort = JSON.parse(localStorage.getItem('ToDone.SelectedSort')) || "title";
      for (var i = 0; i < $scope.Form.SortOptions.length; i++) {
        if ($scope.Form.SortOptions[i].Sort == SavedSort.Sort) {
          $scope.Form.SelectedSort = $scope.Form.SortOptions[i];
        }
      }
    }

    $scope.$watch(
        "Form.SelectedTag",
        function () {
          $scope.FilterTag();
          if ($scope.Form.SelectedTag.TagID > 0) {
            $rootScope.CurrentTag = $scope.Form.SelectedTag;
          } else {
            $rootScope.CurrentTag = null;
          }
        }
    );

    $scope.$watch(
        "Form.SelectedContext",
        function () {
          $scope.FilterTag();
          if ($scope.Form.SelectedContext.TagID > 0) {
            $rootScope.SelectedContext = $scope.Form.SelectedContext;
          } else {
            $rootScope.SelectedContext = null;
          }
        }
    );

    $scope.$watch(
        "Form.SelectedSort",
        function () {
          localStorage.setItem('ToDone.SelectedSort', JSON.stringify($scope.Form.SelectedSort));
          $scope.FilterTag();
        }
    );


    loadSort();

    if (ToDone.API.Online) {
      // Get Normal Tags
      APIService.get(ToDone.API.Tags() + 'type/1', function (err, data) {
        $scope.tags = data;
        localStorage.setItem('ToDone.Tags', JSON.stringify(data));
        $scope.Form.TagOptions = $scope.Form.StaticTags.concat($scope.tags);

        if (!$rootScope.CurrentTag) {
          $scope.Form.SelectedTag = $scope.Form.TagOptions[0];
        } else {
          for (var i = 0; i < $scope.Form.TagOptions.length; i++) {
            if ($scope.Form.TagOptions[i].TagID == $rootScope.CurrentTag.TagID) {
              $scope.Form.SelectedTag = $scope.Form.TagOptions[i];
            }
          }
        }
      });

      // Get Context Tags
      APIService.get(ToDone.API.Tags() + 'type/2', function (err, data) {
        $scope.contexts = data;
        localStorage.setItem('ToDone.Contexts', JSON.stringify(data));
        $scope.Form.ContextOptions = $scope.Form.StaticTags.concat($scope.contexts);

        if (!$rootScope.SelectedContext) {
          $scope.Form.SelectedContext = $scope.Form.ContextOptions[0];
        } else {
          for (var i = 0; i < $scope.Form.ContextOptions.length; i++) {
            if ($scope.Form.ContextOptions[i].TagID == $rootScope.SelectedContext.TagID) {
              $scope.Form.SelectedContext = $scope.Form.ContextOptions[i];
            }
          }
        }
      });
    } else {
      $scope.tags = JSON.parse(localStorage.getItem('ToDone.Tags'));
      $scope.lists = JSON.parse(localStorage.getItem('ToDone.Lists'));
      $scope.contexts = JSON.parse(localStorage.getItem('ToDone.Contexts'));
    }
  }];

  that.CurrentList = ['$scope', '$http', function ($scope, $http) {
    $http.get(ToDone.API.Todo() + 'current').success(function (data) {
      $scope.todos = data;
    });
  }];

  that.TodoEdit = ['$scope', '$http', '$routeParams', '$location', '$q', function ($scope, $http, $routeParams, $location, $q) {
    var TaskID = $routeParams.TodoID || -1;

    $scope.todo = {};

    $scope.Form = {
      CurrentTagText: ''
    };

    $http.get(ToDone.API.Todo() + TaskID).success(function (data) {
      $scope.todo = data;
    });

    $http.get(ToDone.API.Tags()).success(function (data) {
      $scope.tags = data;
      localStorage.setItem('ToDone.Tags', JSON.stringify(data));
    });

    $scope.writeTag = function () {
      if ($scope.Form.CurrentTagText) {
        $scope.todo.Tags.push({ Title: $scope.Form.CurrentTagText, Type: 1 });

        $scope.Form.CurrentTagText = '';
      }
    };

    $scope.removeTag = function (tag) {
      var index = $scope.todo.Tags.indexOf(tag);

      $scope.todo.Tags.splice(index, 1);
    };

    $scope.save = function () {
      $scope.writeTag();
      var posts = [];
      var newTags = [];
      for (var i = 0; i < $scope.todo.Tags.length; i++) {
        if ($scope.todo.Tags[i]._ui == undefined) {
          posts.push($http.post(ToDone.API.Tags(), $scope.todo.Tags[i]));
        } else {
          newTags.push($scope.todo.Tags[i]._id);
        }
      }
      $q.all(posts).then(function (res) {
        for (var i = 0; i < res.length; i++) {
          newTags.push(res[i].data._id);
        }
        $scope.todo.Tags = newTags;

        if (TaskID == -1) {
          $http.post(ToDone.API.Todo(), $scope.todo).success(function (data) {
            $scope.todo = data;
            $location.path('/list');
          });
        } else {
          $http.put(ToDone.API.Todo() + TaskID, $scope.todo).success(function (data) {
            $scope.todo = data;
            $location.path('/list');
          });
        }
      });
    };

    $scope.cancel = function () {
      $location.path('/list');
    };
  }];

  that.MainNavigation = ['$scope', function ($scope) {
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

    $scope.links = [{
      Name: 'List',
      Link: '#/list'
    }, {
      Name: 'New',
      Link: '#/create'
    }, {
      Name: 'User',
      Link: '#/user'
    }, {
      Name: 'Tags',
      Link: '#/tagEditor'
    }];
  }];

  that.QuickAdd = ['$scope', '$http', '$route', '$rootScope', function ($scope, $http, $route, $rootScope) {
    $http.get(ToDone.API.Todo() + '-1').success(function (data) {
      $scope.todo = data;
    });

    $scope.save = function () {

      var squishedTags = [];
      for (var i = 0; i < $scope.todo.Tags.length; i++) {
        if ($scope.todo.Tags[i]) { squishedTags.push($scope.todo.Tags[i]); }
      }
      $scope.todo.Tags = squishedTags;

      $http.post(ToDone.API.Todo(), $scope.todo).success(function () {
        $scope.todo.Title = '';
        $scope.todo.Tags = [];
        $scope.todo.RepeatFormula = '';
        $route.reload();
      });
    };


    $rootScope.$watch(
        'CurrentTag',
        function (newValue) {
          if ($scope.todo) {
            $scope.todo.Tags[0] = newValue;
          }
        });

    $rootScope.$watch(
        'SelectedContext',
        function (newValue) {
          if ($scope.todo) {
            $scope.todo.Tags[1] = newValue;
          }
        });
  }];

  that.User = ['$scope', '$http', 'APIService', 'UserService', function ($scope, $http, APIService, UserService) {
    $scope.ready = false;

    APIService.get(ToDone.API.Users(), function (err, data) {
      $scope.User = data;
      $scope.ready = true;
    });

    $scope.save = function () {
      if (UserService.ready()) {
        $http.put(ToDone.API.Users(), $scope.User).success(function (data) {
          $scope.User = data;
        });
      }
    };
  }];

  that.TagEditor = ['$scope', 'APIService', function ($scope, APIService) {
    APIService.get(ToDone.API.Tags(), function (err, data) {
      $scope.tags = data;
    });
  }];

  return that;
})();

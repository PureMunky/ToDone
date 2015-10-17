(function (TD) {
  'use strict';

  // Interactions with the user api for key maangement.
  TD.service('UserService', ['$http', function ($http) {
    var service = {},
      initialKey = 'initialKey';

    service.get = function (cb) {
      if (!service.ready()) {
        $http.get(ToDone.API.Users() + _getStoredKey()).success(function (data) {
          _setStoredKey(data.key);
          _setHttpHeader(data.key);
          cb(null, data.key);
        }).error(function (err) {
          cb(err, null);
        });
      } else {
        _setHttpHeader(_getStoredKey());
        cb(null, _getStoredKey());
      }
    };

    service.ready = function () {
      return (_getStoredKey() !== initialKey);
    }

    service.onReady = function (cb) {
      service.get(cb);
    }

    function _setHttpHeader(key) {
      $http.defaults.headers.common.UserKey = key;
    }

    function _getStoredKey() {
      return localStorage.getItem('USERKEY') || initialKey;
    }

    function _setStoredKey(newValue) {
      localStorage.setItem('USERKEY', newValue);
    }

    return service;
  }]);

  // Standin for $http authenticates and actions automatically.
  TD.service('APIService', ['$http', 'UserService', function ($http, user) {
    var service = {};

    service.get = function (url, cb) {
      user.get(function (err, key) {
        _handlePromise($http.get(url), cb);
      });
    };

    service.put = function (url, data, cb) {
      user.get(function (err, key) {
        _handlePromise($http.put(url, data), cb);
      });
    };

    service.post = function (url, data, cb) {
      user.get(function (err, key) {
        _handlePromise($http.post(url, data), cb);
      });
    };

    function _handlePromise(prom, cb) {
      prom.success(_handle(cb)).error(_error(cb));
    }

    function _handle(cb) {
      return function (data) {
        cb(null, data);
      };
    }

    function _error(cb) {
      return function (err) {
        cb(err);
      };
    }

    return service;
  }]);

}(ToDone.App));
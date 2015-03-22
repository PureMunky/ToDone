(function (TD) {
  'use strict';

  TD.service('UserService', ['$http', function ($http) {
    var service = {};

    service.get = function (cb) {
      if (_getStoredKey() == 'initialkey') {
        $http.get(ToDone.API.Users() + _getStoredKey()).success(function (data) {
          _setStoredKey(data.key);
          _setHttpHeader(data.key);
          cb(null, data);
        }).error(function (err) {
          cb(err, null);
        });
      } else {
        _setHttpHeader(_getStoredKey());
        cb(null, _getStoredKey());
      }
    };

    function _setHttpHeader(key) {
      $http.defaults.headers.common.UserKey = key;
    }

    function _getStoredKey() {
      return localStorage.getItem('USERKEY') || 'initialkey';
    }

    function _setStoredKey(newValue) {
      localStorage.setItem('USERKEY', newValue);
    }

    return service;
  }]);

  TD.service('APIService', ['$http', 'UserService', function ($http, user) {
    var service = {};

    service.get = function (url, cb) {
      user.get(function (err, key) {
        $http.get(url).success(function (data) {
          cb(null, data);
        }).error(function (err) {
          cb(err, null);
        });
      });
    };

    service.post = function (url, data, cb) {
      user.get(function (err, key) {
        $http.post(url, data).success(function (data) {

        }).err(function (err) {

        });
      });
    };

    return service;
  }]);
}(ToDone.App));
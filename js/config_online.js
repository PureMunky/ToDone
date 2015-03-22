/* Configuration Setup */
var ToDone = {};

ToDone.API = {
    Online: true,
    Todo: function () {
        return '/todo/';
    },
    Lists: function () {
        return 'data/lists.json';
    },
    Contexts: function () {
        return 'data/contexts.json';
    },
    Tags: function () {
        return '/tag/';
    },
    Users: function () {
      return '/user/';
    },
    Build: function () {
        return 'version.json';
    }
};
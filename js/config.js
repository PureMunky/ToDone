/* Configuration Setup */
var ToDone = {};

ToDone.API = {
    Todo: function () {
        return '/API/ToDone/TaskService.svc/';
    },
    Lists: function () {
        return 'data/lists.json';
    },
    Contexts: function () {
        return 'data/contexts.json';
    },
    Tags: function () {
        return '/API/ToDone/TagService.svc/';
    }
};
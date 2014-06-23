ToDone.App.filter('jsonDate', function () {
    return function (input, format) {

        // Exit if the value isn't defined
        if (angular.isUndefined(input)) {
            return;
        }

        if (!input) {
            return '';
        }

        var date = new Date(parseInt(input.substr(6)));

        // John Pedrie added Moment.js support
        if (typeof moment !== 'undefined' && format) {
            var momentObj = moment(date);
            return momentObj.format(format);
        }
        else {
            return date.toLocaleDateString();
        }
    }
}).filter('linkify', function () {
    return function (input) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
        return input.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
    };
});
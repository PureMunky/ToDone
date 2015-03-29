ToDone.App.filter('linkify', function () {
    return function (input) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
        return input ? input.replace(exp,"<a href='$1' target='_blank'>$1</a>") : ''; 
    };
});
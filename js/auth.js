function GoogleSignIn(authResult) {
   if (authResult['access_token']) {
        Auth.SetGoogleUser();
    } else if (authResult['error']) {

        console.log('There was an error: ' + authResult['error']);
    }
}

var Auth = (function () {
    var that = {};
    
    var user = {};
    
    var setAuth = function () {
        console.log('too soon!');
    };
    
    that.setAuthFunction = function (fn) {
        setAuth = fn;
    };
    
    that.SetGoogleUser = function () {
        setAuth();
    };
    
    return that;
})();

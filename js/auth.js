var Auth = (function () {
   var that = {};
   
   that.GoogleSignIn = function(authResult) {
       if (authResult['access_token']) {
            // Successfully authorized
            // Hide the sign-in button now that the user is authorized, for example:
            document.getElementById('signinButton').setAttribute('style', 'display: none');
        } else if (authResult['error']) {
            // There was an error.
            // Possible error codes:
            //   "access_denied" - User denied access to your app
            //   "immediate_failed" - Could not automatically log in the user
            console.log('There was an error: ' + authResult['error']);
        }
   };
   
   return that;
});
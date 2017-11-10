var myWonderApp = myWonderApp || {};

var clientId// = '139949732944';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey// = 'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ';

// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes// = 'https://www.googleapis.com/auth/plus.me';
var callerClass;
var callerMethod;
var parametersToCallerMethod;
myWonderApp.GoogleAuthenticationWrapper = function(client_id, api_key, api_scope, caller_class, caller_method,parameters_to_caller_method) {
    "use strict"
    clientId = client_id;
    apiKey = api_key;
    scopes = api_scope;
    callerClass = caller_class;
    callerMethod = caller_method;
    parametersToCallerMethod = parameters_to_caller_method;
    progressMessage.setProgressMessage("initialize the google authentication wrapper");
}
myWonderApp.GoogleAuthenticationWrapper.prototype.handleClientLoad = function() {
    progressMessage.setProgressMessage("set the google authentication api key");
//    console.log('handleClientLoad: ');
    gapi.client.setApiKey(apiKey);
    progressMessage.setProgressMessage("api key set");
    window.setTimeout(this.checkAuth, 10);
    progressMessage.setProgressMessage("set timeout 10");
}
myWonderApp.GoogleAuthenticationWrapper.prototype.checkAuth = function() {
    progressMessage.setProgressMessage("check google authentication");
//    console.log('checkAuth: ');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthResult);
}
myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthResult = function(authResult) {
    progressMessage.setProgressMessage("handle authentication result " + JSON.stringify(authResult));
    authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
//        console.log('handleAuthResult: ' + JSON.stringify(authResult));
//        console.log("database start date: " + myWonderApp.CalendarWrapper.prototype.getStartDate());
//        authorizeButton.style.visibility = 'hidden';
        callerMethod.call(callerClass,parametersToCallerMethod);
    } else {
//        console.log("else")
//        authorizeButton.style.visibility = '';
//        authorizeButton.onclick = handleAuthClick;
        myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthClick();
    }
}
myWonderApp.GoogleAuthenticationWrapper.prototype.handleAuthClick = function(event) {
//    console.log('handleAuthClick: ');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, this.handleAuthResult);
    return false;
}
var myWonderApp = myWonderApp || {};

var currentTime;
var locationFieldToSet;
myWonderApp.EmptyFields = function() {
}
myWonderApp.EmptyFields.prototype.getTodaysDate = function() {
    progressMessage.setProgressMessage("The start date was left empty, assuming 0:00 today")
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    return Date.today().toString('yyyy-M-dd');
}
myWonderApp.EmptyFields.prototype.getTomorrowsDate = function() {
    progressMessage.setProgressMessage("The end date was left empty, assuming 0:00 tomorrow")
    //currentTime is global so that tomrrow and today have the same base
    var currentTime = new Date();
    var tomorrow = currentTime;
    tomorrow.setDate(tomorrow.getDate() + 1);
    var month = tomorrow.getMonth() + 1;
    var day = tomorrow.getDate()
    var year = tomorrow.getFullYear()
    return Date.parse('tomorrow').toString('yyyy-M-dd');
}
myWonderApp.EmptyFields.prototype.getMyLocation = function(callback) {
    progressMessage.setProgressMessage("Getting your current location");
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(callback, this.handleErrorsCallback, {
            enableHighAccuracy: true
        })
    }
}
myWonderApp.EmptyFields.prototype.handleErrorsCallback = function(error) {
    switch (error.code)
    {
        case error.PERMISSION_DENIED:
            progressMessage.setProgressMessage("You denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            progressMessage.setProgressMessage("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            progressMessage.setProgressMessage("The request to get your location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            progressMessage.setProgressMessage("An unknown error occurred, while getting your location");
            break;
    }
}
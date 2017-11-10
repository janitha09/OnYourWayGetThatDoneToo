var myWonderApp = myWonderApp || {};
//https://developers.google.com/maps/articles/toomanymarkers

var infowindow = null;
var googleMap = null;
var wonderApp = null;
var marker = null;
var googleRequestDataStructure = null;
var service = null;
//not sure whether I really need to create a new array
//google.maps.Map.prototype.markers;

myWonderApp.PlaceWrapper = function(mapCanvas, database) {

    "use strict";

//    if (!(mapCanvas instanceof google.maps.Map)) {
//        progressMessage.setProgressMessage("map canvas is not an instance of google.maps.Map");
//        throw (" mapCanvas is not an instance of google.maps.Map");
//    }
//    if (database['searchTodoItemsKeyIsAnArray']!=='function') {
//        throw (" database does not have the searchTodoItemsKeyIsAnArray function defined ");
//    }
    infowindow = new google.maps.InfoWindow();
    googleMap = mapCanvas;
    service = new google.maps.places.PlacesService(googleMap);
//    console.log("placeWrapper googleMap: " + googleMap)
    //not using 'this' because jasmine can't mock this.wonderapp
    wonderApp = database;
    //clear the array of places markers

//    console.log("create constructor");
    progressMessage.setProgressMessage("Initialization complete!");
};

myWonderApp.PlaceWrapper.prototype.getPlacesByBounds = function() {
    "use strict"
    progressMessage.setProgressMessage("get places by bounds");
//    if (!(boundingBox instanceof google.maps.LatLngBounds)) {
//        throw (" boundingBox is not an instance of google.maps.LatLngBounds");
//    }
//    if (!(arrayofLocations instanceof Array)) {
//        throw (" boundingBox is not an instance of Array");
//    }

    //var redmond = new google.maps.LatLng(47.69809670000001, -122.1545836);
    var request = this.getGoogleRequestDataStructure();
//    console.log("getPlacesByBounds: " + request.types + " box: " + JSON.stringify(request.bounds));
    this.getPlacesByBoundsCallGoogle(request);
};
myWonderApp.PlaceWrapper.prototype.getPlacesByBoundsCallGoogle = function(request) {
    "use strict";
    progressMessage.setProgressMessage("call the google places service");
//    console.log("getPlacesByBoundsCallGoogle: " + JSON.stringify(request));
    //map should not be a global variable
//    var service = new google.maps.places.PlacesService(googleMap);//.nearbySearch(request, markerCallback);
    //service.textSearch(request, callback);
    //prependArg
//    http://metajack.im/2009/08/06/javascript-function-tricks-for-making-callbacks-better/
    service.nearbySearch(request, this.drawMarkersCallback.prependArg(request));
};
myWonderApp.PlaceWrapper.prototype.drawMarkersCallback = function() {
    "use strict";
    for (var i = 0; i < arguments.length - 1; i++) {
//        console.log("drawMarkersCallback: " + i + " " + JSON.stringify(arguments[i]));
    }

    //using prepend args seems to screw with passing in function parameters
    var status = arguments[2];
    var results = arguments[1];
    progressMessage.setProgressMessage("drawMarkersCallback: status " + JSON.stringify(arguments[0]) + " " + status + " " + results.length);

    //console.log("callback: status " + status + " " + results.length);
    if (results.length === 0) {
        progressMessage.setProgressMessage("No places were found that match \"Where\" in your calendar: " + arguments[0].keyword +
                " try something like supermarket increase the search area or search route");
    }
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            myWonderApp.PlaceWrapper.prototype.createMarkerWithInfoWindow(arguments[0], results[i]);
        }
    }
}

myWonderApp.PlaceWrapper.prototype.createMarkerWithInfoWindow = function(googleRequest, place) {
    "use strict"
    progressMessage.setProgressMessage("create marker with info window");
//    console.log("createMarker : " + googleRequest.keyword);
    var marker = new google.maps.Marker({
        map: googleMap,
        position: place.geometry.location,
        //animation: google.maps.Animation.DROP,
        icon: place.icon
    });
    //add this marker to an array so it can be cleared later
    google.maps.Map.prototype.addMarker(marker);
    this.setMarker(marker);
    this.addEventListener.call(this, googleRequest, marker, place);
//    this.createInfoWidnowContentForPlace(place);
}

myWonderApp.PlaceWrapper.prototype.addEventListener = function(googleRequest, marker, place) {
    "use strict";
    progressMessage.setProgressMessage("add eventlistener");
//    console.log("addEventListener: " + marker + " " + place);
    var me = this;
    google.maps.event.addListener(marker, 'click', function() {
//        console.log("addEventListener: click " + googleRequest.keyword);
        var request = {
            reference: place.reference
        };
        service.getDetails(request, function(detailplace, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log ("addEventListener details service")
                me.createInfoWindowContentForPlace(googleRequest, detailplace);
                infowindow.open(googleMap, marker);
            } else {//details request failed
                me.createInfoWindowContentForPlace(googleRequest, place);
                infowindow.open(googleMap, marker);
            }
        });
    });
}
myWonderApp.PlaceWrapper.prototype.createInfoWindowContentForPlace = function(googleRequest, place) {
//    console.log("create info window content " + googleRequest.keyword);
    progressMessage.setProgressMessage("create info window content " + googleRequest.keyword);
    "use strict"
//    console.log("createInfoWindowContent: ")
//    css for the infowindow
//http://www.script-tutorials.com/google-places-api-practice/
    var infoWindowContent = "<img src=" + place.icon + " width=\"42\" height=\"42\">" +
            "<br>" + place.name + //"</p>" +
            //"<p>" + place.formatted_address + "</p>" + 
            "<br>" + place.types + //"</p>" +
            "<br>" + place.formatted_address +
            "<br><a href=\"tel:" + place.formatted_phone_number + ">call</a>"
//            "<br> open now?: " + JSON.stringify(place.opening_hours)+
            "<br> website: " + place.website;
//    console.log("createInfoWindowContentForPlace: " + infoWindowContent);
    this.setInfoWindowContent(infoWindowContent);
    wonderApp.searchTodoItemsKeyIsAnArray(googleRequest.keyword, this.appendTodoItemsToInfoWindowContent, this);
}
myWonderApp.PlaceWrapper.prototype.setInfoWindowContent = function(stringContent) {

    "use strict"
    progressMessage.setProgressMessage("set info window content " + stringContent);
    infowindow.setContent(stringContent);
//    console.log("setInfoWindowContent: " + infowindow.getContent());
}
myWonderApp.PlaceWrapper.prototype.appendTodoItemsToInfoWindowContent = function(arrayAllTodoItemsForLocation) {
    "use strict"
    progressMessage.setProgressMessage("append to info window content " + arrayAllTodoItemsForLocation);
    infowindow.setContent(this.getInfoWindowContent() + "<br> To do: " +
            arrayAllTodoItemsForLocation);
//    console.log("appendTodoItemsToInfoWindowContent: " + infowindow.getContent())
}
myWonderApp.PlaceWrapper.prototype.getInfoWindowContent = function() {
    "use strict"
    progressMessage.setProgressMessage("get info window content");
//    console.log("getInfoWindowContent");
    return infowindow.getContent();
}
myWonderApp.PlaceWrapper.prototype.setMarker = function(markerForTestAccess) {
    progressMessage.setProgressMessage("set marker");
    marker = markerForTestAccess;
}
myWonderApp.PlaceWrapper.prototype.getMarker = function() {
    progressMessage.setProgressMessage("get marker");
    return marker;
}
myWonderApp.PlaceWrapper.prototype.getGoogleRequestDataStructure = function() {
    progressMessage.setProgressMessage("get google request data structure");
    return googleRequestDataStructure;
}
myWonderApp.PlaceWrapper.prototype.setGoogleRequestDataStructure = function(arrayofLocations, boundingBox) {
    progressMessage.setProgressMessage("set google request data structure " + arrayofLocations);
    googleRequestDataStructure = {
        bounds: boundingBox,
        //location : redmond,
        //radius : 10,
//        types: arrayofLocations,
        keyword: arrayofLocations
    };
}
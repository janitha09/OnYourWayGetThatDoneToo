var map;
var infowindow;
var todoLocationArray;
var wonderApp;

function initDatabase(){
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    console.log("window.indexedDB: " + window.indexedDB)
    wonderApp = new myWonderApp.Reminder(window.indexedDB);
    console.log("init database: before open callback" + wonderApp.getDataBase());
}
 

var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
var redmond = new google.maps.LatLng(47.69809670000001,-122.1545836);
var infowindow = new google.maps.InfoWindow();
var myLocation = new Array();
myLocation[0] = pyrmont;
            
function getLocation(){
    console.log(JSON.stringify("getLocation: " + myLocation));
    return myLocation;
}
            
function initialize() {
    //init();
    drawMap();

    var timer = setTimeout(function(){
        var locations = getLocation();
        console.log("location length: " + locations.length);
        for (var index =0; index<locations.length;index++){
            console.log("timer: " + index);
            getPlaces(locations[index]);
        }
    }
    ,5000);
    showCurrentPosition();
//setLocation();
}

function showCurrentPosition() {
 
    var marker = new google.maps.Marker({
        map: map,
        position: myLocation[0],
        animation: google.maps.Animation.BOUNCE
    });
}
function drawMap(){

    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLocation[0],
        zoom: 17
    });
}
            
//            var marker = new google.maps.Marker({
//                position: redmond,
//                map: map,
//                title: 'My workplace'
//            });
                
function getPlaces(scanLocation){
    var request = {
        location: scanLocation,
        radius: 500,
        types: myWonderApp.Reminder.prototype.arrayAllLocations
    };
                
    var service = new google.maps.places.PlacesService(map);
    //service.textSearch(request, callback);
    service.search(request, callback);
}

function callback(results, status) {
    console.log("callback: status " + status + " " +results.length);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}
function searchTodoLocations(){
    //does not need to return a unique list
    "use strict";
    wonderApp.getAllTodoLocationsAsArray()
    console.log("places searchTodoLocations: " + myWonderApp.Reminder.prototype.arrayAllLocations)
}
function searchTodoItems(keyString) {
    console.log("searchTodoItems: " + keyString);
    wonderApp.searchTodoItemsKeyIsAnArray(keyString);
};
            
function createMarker(place) {
    console.log("createMarker :" + JSON.stringify(place));
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        icon: place.icon
    });

    google.maps.event.addListener(marker, 'click', function() {
        searchTodoItems(place.types);
                    
        var timer = setTimeout(function(){
            var infoWindowContent = "<img src="+ place.icon + ">" + 
            "<p>" + place.name + "</p>" + 
            //"<p>" + place.formatted_address + "</p>" + 
            "<p>" + place.types + "</p>" + 
            "<p> To do:</p>" + //locations
            myWonderApp.Reminder.prototype.arrayAllTodoItemsForLocation +
            "<p> vicinity: </p>" + place.vicinity + 
            "<p> URL: </p>" + place.url +
            "<p> Rating: </p>" + place.rating;
                    
            infowindow.setContent(infoWindowContent);
        }
        ,1000);
                    
        infowindow.open(map, marker);

                    
    });
    console.log("createMarker: end func" + myWonderApp.Reminder.prototype.arrayAllTodoItemsForLocation);
}
 
function setLocation(){
        
    if (navigator.geolocation) { 
 
        //Update location
                    
        console.log("Waiting for a location update");
        navigator.geolocation.watchPosition(updateLocation,handleErrors); 
    }else{
        console.log("GeoLocation is not supported");
    } 
}
function handleErrors(error) { 
    //handle geolocation errors and alert user 
    switch (error.code) { 
        case error.PERMISSION_DENIED:
            alert("user did not share geolocation data"); 
            break; 
 
        case error.POSITION_UNAVAILABLE:
            alert("could not detect current position"); 
            break; 
 
        case error.TIMEOUT:
            alert("retrieving position timed out"); 
            break; 
 
        default:
            alert("unknown error"); 
            break; 
    }   
}

function updateLocation(position){
    console.log("Time: " + new Date());
    console.log("updateLocation: " + position.coords.latitude + " " + position.coords.longitude);
    myLocation[0] = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //myLocation=redmond;
    //drawMap();
    //dispkays everything then filters down on the next update
    searchTodoLocations();
    initialize();
}
google.maps.event.addDomListener(window, 'load', initialize);
window.onload = function(){
    initDatabase();
    //on the first run the database isn't initialized'
    //searchTodoLocations();
    //setLocation();
    //thriws
    var interval = setInterval(function(){
        console.log("interval:");            
        navigator.geolocation.getCurrentPosition(updateLocation,handleErrors,{
            enableHighAccuracy:false
        });
    },45000);
                
}
            

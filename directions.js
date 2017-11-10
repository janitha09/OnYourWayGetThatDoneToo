var map;
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];

var boxpolys = null;
var directions = null;
var routeBoxer = null;
var placeWrapper = null;
var database = null;
var start_address = null;
var end_address = null;
var end_date = null;
var start_date = null;
var progressMessage = null;
var emptyFields = null;
//var distance = null;
//var distance = null; // km

function initialize() {

    progressMessage = new myWonderApp.ProgressMessageForUser('warnings_panel');

    showInitialMap();

    addDropDown(map);

    initializeDirections();

    stepDisplay = new google.maps.InfoWindow();

    routeBoxer = new RouteBoxer();

    //initDatabase();
    initGoogle();

    placeWrapper = new myWonderApp.PlaceWrapper(map, database);

    emptyFields = new myWonderApp.EmptyFields();
}

function addDirectionsChangedEventListener() {
//    var me = this;
    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        //        computeTotalDistance(directionsDisplay.directions);
        cleanUp();
        magic(directionsDisplay.directions,
                parseFloat(document.getElementById("distance").value) * 1.609344);
    });
}

function initializeDirections() {
    progressMessage.setProgressMessage("initialize the directions service");
    directionsService = new google.maps.DirectionsService();

    var rendererOptions = {
        map: map,
        draggable: true
    };

    progressMessage.setProgressMessage("initialize the directions renderer");
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
}

function showInitialMap() {
    // Create a map and center it on Manhattan.
    var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);
    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: manhattan,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}

function addDropDown(map) {
    var dropdown = document.getElementById('dropdown-holder');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(dropdown);
}

function initDatabase() {
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
//    console.log("window.indexedDB: " + window.indexedDB)
    database = new myWonderApp.Reminder(window.indexedDB);
//    console.log("init database: before open callback" + database.getDataBase());
}

function initGoogle() {
    database = new myWonderApp.CalendarWrapper();
}

function calcRouteGoogle() {
    var testGoogleAuthetication =
            new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/calendar',
            database, database.getAllTodoLocationsAsArray,
            restOfTheProgram);
    testGoogleAuthetication.handleClientLoad();
//        database.getAllTodoLocationsAsArray();
}
function calcRoute() {
    database.getAllTodoLocationsAsArray(restOfTheProgram);
//    restOfTheProgram(start_address,end_address);
}

function restOfTheProgram() {
    distance = distance_form;
//
//    console.log("restOfTheProgram: " + start_address + ' ' + end_address);
    cleanUp();

    // Retrieve the start and end locations and create
    // a DirectionsRequest using WALKING directions.
    var start = start_address;//document.getElementById('start').value;
    var end = end_address;//document.getElementById('end').value;

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var distance = distance_form;
    // Route the directions and pass the response to a
    // function to create markers for each step.
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var warnings = document.getElementById('warnings_panel');
            warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);

            magic(response, distance);
            //placeWrapper.getPlacesByBounds(['establishment'],boxes);
        } else {
            alert("Directions query failed: " + status);
        }
    });
    var me = this;
    addDirectionsChangedEventListener.call(me);
}
function cleanUp() {
    clearBoxes();
    // First, remove any existing markers from the map.
    google.maps.Map.prototype.clearMarkers();
    for (i = 0; i < markerArray.length; i++) {
//        console.log("markers on map: " + JSON.stringify(markerArray[i]))
        markerArray[i].setMap(null);
    }

    // Now, clear the array itself.
    markerArray = [];
}
function magic(response, distance) {

//    showSteps(response);

    var path = response.routes[0].overview_path;

    var boxes = routeBoxer.box(path, distance);

//    drawBoxes(boxes);
    if (window.navigator.onLine) {
        getPlacesWithinBoxes(boxes);
    }else{
        progressMessage.setProgressMessage("No internet connection. The markers will not be refreshed");
    }
}
function getPlacesWithinBoxes(boxes) {
    for (var i = 0; i < boxes.length; i++) {
        var locationsArray = database.getAllTodoLocationsAsArrayGenerated();
        for (var location_count = 0; location_count < locationsArray.length; location_count++) {
            placeWrapper.setGoogleRequestDataStructure([locationsArray[location_count]], boxes[i]);
            placeWrapper.getPlacesByBounds();//database.getAllTodoLocationsAsArrayGenerated(), boxes[i]);
        }
    }
}
// Draw the array of boxes as polylines on the map
function drawBoxes(boxes) {
    progressMessage.setProgressMessage("draw bounding boxes");
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
        boxpolys[i] = new google.maps.Rectangle({
            bounds: boxes[i],
            fillOpacity: 0,
            strokeOpacity: 1.0,
            strokeColor: '#000000',
            strokeWeight: 1,
            map: map
        });
    }
}

// Clear boxes currently on the map
function clearBoxes() {
    progressMessage.setProgressMessage("clear bounding boxes");
    if (boxpolys !== null) {
        for (var i = 0; i < boxpolys.length; i++) {
            boxpolys[i].setMap(null);
        }
    }
    boxpolys = null;
}

function showSteps(directionResult) {
    progressMessage.setProgressMessage("set a marker for each navigation step");

    var myRoute = directionResult.routes[0].legs[0];

    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new google.maps.Marker({
            position: myRoute.steps[i].start_point,
            map: map
        });
        attachInstructionText(marker, myRoute.steps[i].instructions);
        markerArray[i] = marker;
    }
}

function attachInstructionText(marker, text) {
    progressMessage.setProgressMessage("attach instructions to a navigation marker");
    google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on,
        // containing the text of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}
window.onload = function() {
    //initDatabase();
    initialize();
    var todobutton = document.getElementById("todo_btn");
    todobutton.onclick = function() {
        distance_form = document.getElementById("distance").value;
        if (distance_form === "") {
            document.getElementById("distance").value = 1;
            distance_form = parseFloat(document.getElementById("distance").value) * 1.609344;
        } else {
            distance_form = parseFloat(document.getElementById("distance").value) * 1.609344;
        }
        start_date = document.getElementById('startTime').value;
        if (start_date === "") {
            start_date = emptyFields.getTodaysDate();
            document.getElementById('startTime').value = start_date;
        }
        database.setStartDate(Date.parse(start_date));
//        console.log("start_date " + start_date);
        end_date = document.getElementById('endTime').value;
        if (end_date === "") {
            end_date = emptyFields.getTomorrowsDate();
            document.getElementById('endTime').value = end_date;
        }
        database.setEndDate(Date.parse(end_date));
//        console.log("end_date " + end_date);
        start_address = document.getElementById('startAddress').value;
        end_address = document.getElementById('destAddress').value;
        checkStartAddress();
    };
};
function checkStartAddress() {
    if (start_address === "") {
        progressMessage.setProgressMessage("start address is empty");
        emptyFields.getMyLocation(function(param) {
            progressMessage.setProgressMessage("start address" + param.coords.latitude + ", " + param.coords.longitude);
            document.getElementById('startAddress').value = param.coords.latitude + ", " + param.coords.longitude;
            start_address = document.getElementById('startAddress').value;
            checkEndAddress();
        });
    } else if (start_address !== "") {
        checkEndAddress();
    }
}
function checkEndAddress() {
    if (end_address === "") {
        progressMessage.setProgressMessage("end address is empty");
        emptyFields.getMyLocation(function(param) {
            progressMessage.setProgressMessage("end address" + param.coords.latitude + ", " + param.coords.longitude);
            document.getElementById('destAddress').value = param.coords.latitude + ", " + param.coords.longitude;
            end_address = document.getElementById('destAddress').value;
            calcRouteGoogle();
        });
    } else if (end_address !== "") {
        calcRouteGoogle();
    }
}
module('name to hyperlink', {
    setup: function() {
    },
    teardown: function() {
    }
});
test('check for url', function() {
    var testClass = new myWonderApp.ConditionalFormatting();
    var website = "http://www.rockbottom.com/";
    var result = testClass.convertNametoHyperlinkIfWebsiteIsDefined("Rock Bottom Restaurant & Brewery",website);
    var expected = "<div id=\"infowindowname\"><a href=\"" + "http://www.rockbottom.com/" + "\" target=\"_blank\">Rock Bottom Restaurant & Brewery</a></div>";
    equal(result,expected);
    website = undefined;
    var result = testClass.convertNametoHyperlinkIfWebsiteIsDefined("Rock Bottom Restaurant & Brewery",website);
    var expected = "<div id=\"infowindowname\">Rock Bottom Restaurant & Brewery</div>";
    equal(result,expected);
    
});
module('fit bounds', {
    setup: function() {
    },
    teardown: function() {
    }
});
test('fitbounds', function() {
    var testClass = new myWonderApp.Boxes();
    
    
    var arrayOfBoundingBoxes = [];
    
    var lowercorner = new google.maps.LatLng(47.7036, -122.1588)
    var uppercorner = new google.maps.LatLng(47.705719, -122.155375);
    var middle = new google.maps.LatLng(47.7049, -122.156928);
    
//    var allEncompassingBounds = new google.maps.LatLngBounds(
//            lowercorner,
//            uppercorner);

    var lower = new google.maps.LatLngBounds(
            lowercorner,
            middle);
    var upper = new google.maps.LatLngBounds(
            middle,
            uppercorner);
    arrayOfBoundingBoxes[0] = lower;
    arrayOfBoundingBoxes[1] = upper;    

    var wrappingBounds = testClass.getWrappingBounds(arrayOfBoundingBoxes);

    ok(wrappingBounds.contains(lowercorner));
    ok(wrappingBounds.contains(middle));
    ok(wrappingBounds.contains(uppercorner));
    deepEqual(wrappingBounds.getSouthWest(), lowercorner);
    deepEqual(wrappingBounds.getNorthEast(), uppercorner);
    
    equal(testClass.getWrappingBounds(),undefined);
    
    equal(testClass.getWrappingBounds([]),undefined)
});
module('window searh location', {
    setup: function() {
    },
    teardown: function() {
    }
});
test('location search', function() {
    var query = window.location.search.substring(1).split('=');
    equal(query[0], "testNumber");
});
module('javascript regular expressions', {
    setup: function() {
    },
    teardown: function() {
    }
});
test('john smith', function() {
//    var re = /^([-+]?\d{1,3}[.]\d+),\s*([-+]?\d{1,2}[.]\d+)$/;
//    var str = "-180,-90";
    var re = /(\w+)\s(\w+)/;
    var str = "John Smith";
    var newstr = str.replace(re, "$2, $1");
    console.log(newstr);
    var myRe = /d(b+)d/g;
    var myArray = myRe.exec("cdbbdbsbz");
    console.log(myArray);
    var re = /\w+\s/g;
    var str = "fee fi fo fum";
    myArray = str.match(re);
    console.log(myArray);
    var re = /^[-]?[0-9]{1,2}[.][0-9]*,{1}\s*[-]?[0-9]{1,3}[.][0-9]*$/;//^([-+]?\d{1,3}[.]\d+),\s*([-+]?\d{1,2}[.]\d+)$/;
    var str = '18.0,-90.0';
    myArray = str.match(re);
    console.log(myArray);
    ok(re.test(str));
});
module('prepend an argument to a callback', {
    setup: function() {
    },
    teardown: function() {
    }
});
test("inline function add numbers", function() {
    function addNumbers(a, b, callbackfunc) {
        return callbackfunc(a + b);
    }
    function displayresult(res) {
        return res + arguments[1];
    }
    equal(addNumbers(1, 1, displayresult.prependArg(1)), 3);
});
module('Get places per calendar item', {
    setup: function() {
    },
    teardown: function() {
    }
});
asyncTest("get places by bounds", 1, function() {
    var testDatabase = new myWonderApp.CalendarWrapper();

    testDatabase.setStartDate(new Date("February 8, 2013"));
    testDatabase.setEndDate(new Date("February 9, 2013"));

    var mapdiv = document.createElement('div');
    mapdiv.setAttribute('id', 'map');
    var map = new google.maps.Map(mapdiv);

    var testPlaceWrapper = new myWonderApp.PlaceWrapper(map, testDatabase);

//            new google.maps.LatLng(47.7036, -122.1588),
//            new google.maps.LatLng(47.705719, -122.155375));
    var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(47.703, -122.1588),
            new google.maps.LatLng(47.705719, -122.155375));

    testPlaceWrapper.setGoogleRequestDataStructure(['aerospace'], defaultBounds);

    var testGoogleAuthetication = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/calendar',
            testPlaceWrapper,
            testPlaceWrapper.getPlacesByBounds);


//
    testGoogleAuthetication.handleClientLoad();
    setTimeout(function() {
//        //the event listener is never fired so the content is never set.
        var marker = testPlaceWrapper.getMarker();
        google.maps.event.trigger(marker, 'click');
    }, 3000);
    setTimeout(function() {
        //the event listener is never fired so the content is never set.

        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png width=\"42\" height=\"42\"><br>Aerojet<br>establishment<br> vicinity: 11411 139th Place Northeast, Redmond<br> URL: undefined<br> Rating: undefined<br> To do: aerospace,[{\"description\":\"test item description\",\"summary\":\"test item\"}]");
        start();
    }, 5000);
    //equal(document.getElementById('map'),mapdiv);
//    start();
});

module('date functions', {
    setup: function() {
    },
    teardown: function() {
    }
});
test("Using DateJS", function() {
    var expected = new Date('Thu, 1 July 2004 22:30:00');
    var actual = Date.parse('Thu, 1 July 2004 22:30:00');
    deepEqual(actual, expected);
});
test("today's date", function() {
    var testClass = new myWonderApp.EmptyFields();
    equal(testClass.getTodaysDate(), Date.today().toString('yyyy-M-dd'));
});
test("tomorrow's date", function() {
    var testClass = new myWonderApp.EmptyFields();
    equal(testClass.getTomorrowsDate(), Date.parse('tomorrow').toString('yyyy-M-dd'));
});

module('address functions', {
    setup: function() {
    },
    teardown: function() {
    }
});
asyncTest("empty start address", 1, function() {
    var startAddressText = document.createElement("text");
    startAddressText.setAttribute("id", "startAddress");
    startAddressText.value = "";
    var endAddressText = document.createElement("text");
    endAddressText.setAttribute("id", "endAddress");

    var testClass = new myWonderApp.EmptyFields();
    setTimeout(function() {
        console.log("check start address " + startAddressText.value);
        if (startAddressText.value === "") {
            testClass.getMyLocation(function(param) {
                console.log("The start/end address was left empty, getting your current location " + param.coords.latitude + ", " + param.coords.longitude);
                startAddressText.value = param.coords.latitude + ", " + param.coords.longitude;
            });
        }
    }, 2000);
    setTimeout(function() {
        var re = /^[-]?[0-9]{1,2}[.][0-9]*,{1}\s*[-]?[0-9]{1,3}[.][0-9]*$/;//^([-+]?\d{1,3}[.]\d+),\s*([-+]?\d{1,2}[.]\d+)$/;
        var str = startAddressText.value;
        myArray = str.match(re);
        console.log(myArray);
        ok(re.test(str));
        start();
    }, 3000);
});
module('progress message for user', {
    setup: function() {
    },
    teardown: function() {
    }
});
test("show a progress message", function() {
//    progressDiv = document.createElement("div");
//    progressDiv.setAttribute('warnings_panel');
    var testClass = new myWonderApp.ProgressMessageForUser('warnings_panel');
    equal(testClass.getProgressDivID(), 'warnings_panel');
    testClass.setProgressMessage("progress");
    equal(testClass.getProgressMessage(), "progress");
});
module('google marker overlay clear', {
    setup: function() {
    },
    teardown: function() {
    }
});
test("create and clear a marker", function() {
    google.maps.Map.prototype.markers;
    var marker = {
        "setMap": function() {
            console.log("setMap called")
        }
    };
    google.maps.Map.prototype.clearMarkers();
    equal((google.maps.Map.prototype.getMarkers()).length, 0);
    google.maps.Map.prototype.addMarker(marker);
    equal((google.maps.Map.prototype.getMarkers()).length, 1);
    google.maps.Map.prototype.addMarker(marker);
    equal((google.maps.Map.prototype.getMarkers()).length, 2);
    google.maps.Map.prototype.clearMarkers();
    equal((google.maps.Map.prototype.getMarkers()).length, 0);
})
module('place wrapper with google calendar', {
    setup: function() {
    },
    teardown: function() {
    }
});
test('search', function() {
    var testDatabase = new myWonderApp.CalendarWrapper();
    var calendar = [];
    var result = testDatabase.getSummaryAndDescriptionThatMatches(calendar, "establishment");
    equal(result, undefined);
    calendar[0] = {
        'summary': "summary",
        'description': "description",
        'location': "car_dealer,car_renter"
    }

    result = testDatabase.getSummaryAndDescriptionThatMatches(calendar, "establishment");

    deepEqual(result, "[]");

    result = testDatabase.getSummaryAndDescriptionThatMatches(calendar, "car_dealer");

    deepEqual(result, "[{\"description\":\"description\",\"summary\":\"summary\"}]");
//            [
//                {
//                    'summary': "summary",
//                    'description': "description"}
//            ]);

    result = testDatabase.getSummaryAndDescriptionThatMatches(calendar, "car_renter");

    deepEqual(result, "[{\"description\":\"description\",\"summary\":\"summary\"}]");
//            [
//                {
//                    'summary': "summary",
//                    'description': "description"
//                }
//            ]);

    calendar[1] = {
        'summary': "summary 1",
        'description': "description 1",
        'location': "car_dealer,car_renter"
    }

    result = testDatabase.getSummaryAndDescriptionThatMatches(calendar, "car_dealer");
    deepEqual(result, "[{\"description\":\"description\",\"summary\":\"summary\"},{\"description\":\"description 1\",\"summary\":\"summary 1\"}]");
//            [
//                {
//                    'summary': "summary",
//                    'description': "description"
//                },
//                {
//                    'summary': "summary 1",
//                    'description': "description 1"
//                }
//            ]);
});
asyncTest("get places by bounds", 1, function() {
    var testDatabase = new myWonderApp.CalendarWrapper();

    testDatabase.setStartDate(new Date("February 8, 2013"));
    testDatabase.setEndDate(new Date("February 9, 2013"));

    var mapdiv = document.createElement('div');
    mapdiv.setAttribute('id', 'map');
    var map = new google.maps.Map(mapdiv);

    var testPlaceWrapper = new myWonderApp.PlaceWrapper(map, testDatabase);

//            new google.maps.LatLng(47.7036, -122.1588),
//            new google.maps.LatLng(47.705719, -122.155375));
    var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(47.703, -122.1588),
            new google.maps.LatLng(47.705719, -122.155375));

    testPlaceWrapper.setGoogleRequestDataStructure(['aerospace'], defaultBounds);

    var testGoogleAuthetication = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/calendar',
            testPlaceWrapper,
            testPlaceWrapper.getPlacesByBounds);


//
    testGoogleAuthetication.handleClientLoad();
    setTimeout(function() {
//        //the event listener is never fired so the content is never set.
        var marker = testPlaceWrapper.getMarker();
        google.maps.event.trigger(marker, 'click');
    }, 3000);
    setTimeout(function() {
        //the event listener is never fired so the content is never set.

        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png width=\"42\" height=\"42\"><br>Aerojet<br>establishment<br> vicinity: 11411 139th Place Northeast, Redmond<br> URL: undefined<br> Rating: undefined<br> To do: aerospace,[{\"description\":\"test item description\",\"summary\":\"test item\"}]");
        start();
    }, 5000);
    //equal(document.getElementById('map'),mapdiv);
//    start();
});
asyncTest("get all to do locations", 1, function() {
    var testDatabase = new myWonderApp.CalendarWrapper();
    testDatabase.setStartDate(new Date("February 8, 2013"));
    testDatabase.setEndDate(new Date("February 9, 2013"));
    var testGoogleAuthetication = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/calendar',
            testDatabase,
            testDatabase.getAllTodoLocationsAsArray, function() {
        console.log("get all to do locations callback fired: ");
    });

    testGoogleAuthetication.handleClientLoad();
    setTimeout(function() {
        deepEqual(testDatabase.getAllTodoLocationsAsArrayGenerated(), ['car_dealer', 'car_rental', 'aerospace']);
        start();
    }, 2000);

});
module('authentication', {
    setup: function() {

    },
    teardown: function() {

    }
});

asyncTest('google + get my name', 1, function() {
    var testCalendarWrapper = new myWonderApp.CalendarWrapper();
    var testClass = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/plus.me',
            testCalendarWrapper,
            testCalendarWrapper.getEventsListAPICall);

    testClass.handleClientLoad();
//    testCalendarWrapper.getEventsListCallendarAPICall();
    setTimeout(function() {
        equal(testCalendarWrapper.getEventsList(), "Janitha Jayaweera");
        start();
    }, 5000);
//    start();
});
asyncTest('google tasks get tasks lists', 1, function() {
    var testCalendarWrapper = new myWonderApp.CalendarWrapper();
    var testClass = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/tasks',
            testCalendarWrapper,
            testCalendarWrapper.getTaskListCall);

    testClass.handleClientLoad();

    setTimeout(function() {
        equal(testCalendarWrapper.getEventsList(), "Janitha Jayaweera's list");
        start();
    }, 5000);
//    start();
});
asyncTest('google calendar events list', 1, function() {
    var testCalendarWrapper = new myWonderApp.CalendarWrapper();
    var testClass = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/calendar',
            testCalendarWrapper,
            testCalendarWrapper.getEventsListCallendarAPICall);

    testClass.handleClientLoad();
//    testCalendarWrapper.getEventsListCallendarAPICall();
    setTimeout(function() {
        equal(testCalendarWrapper.getEventsList(), "cpp-unit test");
        start();
    }, 5000);
//    start();
});
asyncTest('google tasks get tasks', 1, function() {
    var testCalendarWrapper = new myWonderApp.CalendarWrapper();
    var testClass = new myWonderApp.GoogleAuthenticationWrapper('139949732944',
            'AIzaSyAvTq1NjuL-PAFD1JnyOPRM_jkzttb6xRQ',
            'https://www.googleapis.com/auth/tasks',
            testCalendarWrapper,
            testCalendarWrapper.getTasksCallAPI);

    testClass.handleClientLoad();

    setTimeout(function() {
        equal(testCalendarWrapper.getEventsList(), "tasks api");
        start();
    }, 5000);
//    start();
});


module('indexed db', {
    setup: function() {
        window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    },
    teardown: function() {
        myWonderApp.Reminder.prototype.removeDatabase(window.indexedDB)
    }
});
test("async", 1, function() {
    stop();
    setTimeout(function() {
        ok(true, "Passed and ready to resume!");
        start();
    }, 1000);
});

asyncTest('dbopen', 3, function() {

    var testClass = new myWonderApp.Reminder(window.indexedDB);

    setTimeout(function() {
        //ok(true, "Passed and ready to resume!" );
        equal((testClass.getDataBase()).name, 'ToDoDatabase');
        equal((testClass.getDataBase()).objectStoreNames.contains('ToDoObjectStore'), true);
        //equal(1, (testClass.getDataBase()).mode);
        equal((testClass.getDataBase()).version, 1);
        //equal('timeStamp', (testClass.getDataBase()).keypath);
        //ok(1,(testClass.getDataBase()).indexNames.contains('where'));
        start();
    }, 3000);

});

asyncTest("delete item", 2, function() {

    var testClass = new myWonderApp.Reminder(window.indexedDB);

    var todo = 'Test item';
    var where = ['Test location'];
    var id = new Date().getTime();

    setTimeout(function() {
        testClass.addForgottenItem(todo, where[0], id, testClass.displayAllTodoItems);
    }, 1000);


    setTimeout(function() {
        testClass.searchTodoItemsKeyIsAnArray(where, function() {
        });
    }, 3000);

    setTimeout(function() {
        //equal(testClass.getCount(), 9);
        var array = testClass.getArrayAllTodoItemsForLocation();
        equal((array[0])[1], todo);
        //start();
    }, 5000);
    setTimeout(function() {
        testClass.deleteTodo(id);

    }, 6000);

    setTimeout(function() {
        testClass.searchTodoItemsKeyIsAnArray(where, function() {
        });
    }, 8000);

    setTimeout(function() {
        //equal(testClass.getCount(), 9);
        var array = testClass.getArrayAllTodoItemsForLocation();
        equal(array, null);
        start();
    }, 10000);
});

asyncTest("add item", 1, function() {

    var testClass = new myWonderApp.Reminder(window.indexedDB);

    var todo = 'Test item';
    var where = ['Test location'];
    var id = new Date().getTime();

    setTimeout(function() {
        testClass.addForgottenItem(todo, where[0], id, testClass.displayAllTodoItems);
    }, 1000);

    setTimeout(function() {
        testClass.searchTodoItemsKeyIsAnArray(where, function() {
        });
    }, 2000);

    setTimeout(function() {
        //equal(testClass.getCount(), 9);
        var array = testClass.getArrayAllTodoItemsForLocation();
        equal((array[0])[1], todo);
        start();
    }, 3000);

});
module('place wrapper', {
    setup: function() {
        window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

//        testDatabase = new myWonderApp.Reminder(window.indexedDB);
//        var todo = 'Test item';
//        var where = ['Test location'];
//        var id = new Date().getTime();
//        setTimeout(function() {
//            testDatabase.addForgottenItem(todo, where[0], id, testDatabase.displayAllTodoItems);
//            //start();
//        }, 2000);
    },
    teardown: function() {
        myWonderApp.Reminder.prototype.removeDatabase(window.indexedDB)
    }
});
test("async", 1, function() {
    stop();
    setTimeout(function() {
        ok(true, "Passed and ready to resume!");
        start();
    }, 1000);
});
asyncTest("getPlacesByBounds", 1, function() {
    //this test is redundant it doesn't access the database for data
    var testDatabase = new myWonderApp.Reminder(window.indexedDB);
    var testPlaceWrapper;
    var todo = 'Test item';
    var where = ['aerospace'];
    var id = new Date().getTime();
    setTimeout(function() {
        testDatabase.addForgottenItem(todo, where[0], id, testDatabase.displayAllTodoItems);
    }, 5000);
    setTimeout(function() {
        var mapdiv = document.createElement('div');
        mapdiv.setAttribute('id', 'map');
        var map = new google.maps.Map(mapdiv);//, {
        testPlaceWrapper = new myWonderApp.PlaceWrapper(map, testDatabase);
        //var ne = google.maps.LatLng(47.7036, -122.1588);
        //var sw = google.maps.LatLng(47.6964, -122.1516);

        var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(47.7036, -122.1588),
                new google.maps.LatLng(47.705719, -122.155375));
//        var anotherBounds = new google.maps.LatLngBounds(
//                new google.maps.LatLng(47.63478364338888, -122.11933511948348),
//                new google.maps.LatLng(47.692676356611116,-122.05486476103306));

        //['establishment']
        testPlaceWrapper.setGoogleRequestDataStructure(where, defaultBounds);
        testPlaceWrapper.getPlacesByBounds();

        //start();
    }, 5000);
    setTimeout(function() {
        //the event listener is never fired so the content is never set.
//        var marker = testPlaceWrapper.getMarker();
        var markers = google.maps.Map.prototype.getMarkers();
        var marker = markers[0]
        google.maps.event.trigger(marker, 'click');
    }, 7000);
    setTimeout(function() {
        //the event listener is never fired so the content is never set.

        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png width=\"42\" height=\"42\"><br>Aerojet<br>establishment<br> vicinity: 11411 139th Place Northeast, Redmond<br> URL: undefined<br> Rating: undefined<br> To do: aerospace,Test item");
        start();
    }, 10000);
    //equal(document.getElementById('map'),mapdiv);
});
asyncTest("getAllToDoLocations", 1, function() {
    var testDatabase = new myWonderApp.Reminder(window.indexedDB);
    var todo = 'Test item';
    var where = ['establishment,store'];
    var id = new Date().getTime();
    setTimeout(function() {
        testDatabase.addForgottenItem(todo, where[0], id, testDatabase.displayAllTodoItems);
    }, 7000);
    setTimeout(function() {
        testDatabase.getAllTodoLocationsAsArray(function() {
//            console.log("callback");
        });
    }, 12000);
    setTimeout(function() {
        deepEqual(testDatabase.getAllTodoLocationsAsArrayGenerated(), ['establishment', 'store']);
        start();
    }, 18000);

});
asyncTest("get multiple places by bounds", 5, function() {

    var testDatabase = new myWonderApp.Reminder(window.indexedDB);
    var testPlaceWrapper;
    var todo = ['safeway item', 'whole foods item', 'ross item'];
    var where = ['safeway', 'whole foods', 'ross'];

    setTimeout(function() {
        testDatabase.addForgottenItem(todo[0], where[0], new Date().getTime(), testDatabase.displayAllTodoItems);
    }, 1000);
    setTimeout(function() {
        testDatabase.addForgottenItem(todo[1], where[1], new Date().getTime(), testDatabase.displayAllTodoItems);
    }, 2000);
//    setTimeout(function() {
//        testDatabase.addForgottenItem(todo[2], where[2], new Date().getTime(), testDatabase.displayAllTodoItems);
//    }, 3000);

    setTimeout(function() {
        var mapdiv = document.createElement('div');
        mapdiv.setAttribute('id', 'map');
        var map = new google.maps.Map(mapdiv);//, {
        testPlaceWrapper = new myWonderApp.PlaceWrapper(map, testDatabase);

        var anotherBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(47.63478364338888, -122.11933511948348),
                new google.maps.LatLng(47.692676356611116, -122.05486476103306));

        testPlaceWrapper.setGoogleRequestDataStructure([where[0]], anotherBounds);
        testPlaceWrapper.getPlacesByBounds();
        testPlaceWrapper.setGoogleRequestDataStructure([where[1]], anotherBounds);
        testPlaceWrapper.getPlacesByBounds();
    }, 5000);
    setTimeout(function() {
        var markers = google.maps.Map.prototype.getMarkers();
        var marker = markers[0];
        google.maps.event.trigger(marker, 'click');
    }, 7000);
    setTimeout(function() {
        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png width=\"42\" height=\"42\"><br>Safeway<br>bakery,restaurant,grocery_or_supermarket,store,food,establishment<br> vicinity: 17246 Redmond Way, Redmond<br> URL: undefined<br> Rating: 3.8<br> To do: safeway,safeway item");
    }, 10000);
    setTimeout(function() {
        var markers = google.maps.Map.prototype.getMarkers();
        var marker = markers[1];
        google.maps.event.trigger(marker, 'click');
    }, 11000);
    setTimeout(function() {
        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png width=\"42\" height=\"42\"><br>Safeway<br>bakery,restaurant,grocery_or_supermarket,store,food,establishment<br> vicinity: 17246 Redmond Way, Redmond<br> URL: undefined<br> Rating: 3.8<br> To do: safeway,safeway item");
    }, 15000);
    setTimeout(function() {
        var markers = google.maps.Map.prototype.getMarkers();
        var marker = markers[2];
        google.maps.event.trigger(marker, 'click');
    }, 16000);
    setTimeout(function() {
        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png width=\"42\" height=\"42\"><br>Safeway<br>bakery,restaurant,grocery_or_supermarket,store,food,establishment<br> vicinity: 17246 Redmond Way, Redmond<br> URL: undefined<br> Rating: 3.8<br> To do: safeway,safeway item");
    }, 19000);
    setTimeout(function() {
        var markers = google.maps.Map.prototype.getMarkers();
        var marker = markers[3];
        google.maps.event.trigger(marker, 'click');
    }, 20000);
    setTimeout(function() {
        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png width=\"42\" height=\"42\"><br>Safeway<br>bakery,restaurant,grocery_or_supermarket,store,food,establishment<br> vicinity: 17246 Redmond Way, Redmond<br> URL: undefined<br> Rating: 3.8<br> To do: safeway,safeway item");
    }, 23000);
    setTimeout(function() {
        var markers = google.maps.Map.prototype.getMarkers();
        var marker = markers[4];
        google.maps.event.trigger(marker, 'click');
    }, 24000);
    setTimeout(function() {
        equal(testPlaceWrapper.getInfoWindowContent(), "<img src=http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png width=\"42\" height=\"42\"><br>Safeway<br>bakery,restaurant,grocery_or_supermarket,store,food,establishment<br> vicinity: 17246 Redmond Way, Redmond<br> URL: undefined<br> Rating: 3.8<br> To do: safeway,safeway item");
        start();
    }, 27000);
});
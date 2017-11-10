var myWonderApp = myWonderApp || {};

var eventList = null;
var allLocations = null;
var startDate = null;
var endDate = null;
var todoItemsForLocation = null;
myWonderApp.CalendarWrapper = function() {
    progressMessage.setProgressMessage("initialize the google calendar wrapper");
//    eventList = null;
}
myWonderApp.CalendarWrapper.prototype.setEventsList = function(result) {
    progressMessage.setProgressMessage("set the events lists");
//    console.log('setEventsList');
    eventList = result;
}
myWonderApp.CalendarWrapper.prototype.getEventsList = function() {
    progressMessage.setProgressMessage("get the events lists");
//    console.log('getEventsList');
    return eventList;
}
myWonderApp.CalendarWrapper.prototype.getEventsListAPICall = function() {

//    console.log('getEventsListAPICall: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('plus', 'v1', function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google plus api call");
//            console.log("request.execute: " + JSON.stringify(resp));

            me.setEventsList(resp.displayName);
        });
    });
//    this.setEventsList(
//    {
//        "kind": "calendar#events",
//        "etag": 'etag',
//        "summary": 'string',
//        "description": 'string',
//        "updated": 'datetime',
//        "timeZone": 'string',
//        "accessRole": 'string',
//        "defaultReminders": [
//            {
//                "method": 'string',
//                "minutes": 'integer'
//            }
//        ],
//        "nextPageToken": 'string',
//        "items": [
//            'events Resource'
//                ]
//    });
}
myWonderApp.CalendarWrapper.prototype.getEventsListCallendarAPICall = function() {
    "use strict"
//    console.log('getEventsListCallendarAPICall: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary'
        });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google calendar api call");
//            console.log("request.execute: " + JSON.stringify(resp.items[0].summary));
            me.setEventsList(resp.items[0].summary);
//            me.setEventsList(resp.displayName);
        });
    });

}
myWonderApp.CalendarWrapper.prototype.getTaskListCall = function() {
    "use strict"
//    console.log('getTaskListCall: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('tasks', 'v1', function() {
        var request = gapi.client.tasks.tasklists.list();//{
//            'tasklist': 'primary'
//        });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google tasks api call");
//            console.log("request.execute: " + JSON.stringify(resp));//.items[0].summary));
            me.setEventsList(resp.items[0].title);
//            me.setEventsList(resp.displayName);
        });
    });
}

myWonderApp.CalendarWrapper.prototype.getTasksCallAPI = function() {
    "use strict"
//    console.log('getTasksCallAPI: ');
    //this.eventList = '';
    var me = this;
    gapi.client.load('tasks', 'v1', function() {
        var request = gapi.client.tasks.tasks.list(
//                {'tasklist':'MTM5Njc5MDM2ODE5NzAyNzg2MzE6MDow'});//{
                {'tasklist': '@default'
                });
        request.execute(function(resp) {
            progressMessage.setProgressMessage("google tasks api call");
//            console.log("request.execute: " + JSON.stringify(resp));//.items[0].summary));
            me.setEventsList(resp.items[0].title);
//            me.setEventsList(resp.displayName);
        });
    });
}

//This is an interface function
myWonderApp.CalendarWrapper.prototype.getAllTodoLocationsAsArray = function(callback, callerObjRef) {
    "use strict"

    var me = this;
//    progressMessage.setProgressMessage("get all to do locations as an array");
//    console.log("getAllTodoLocationsAsArray: " + me.getEndDate() + " " + me.getStartDate());
    var arrayAllLocations = [];
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMax': me.getEndDate(),
            'timeMin': me.getStartDate()
        });
        request.execute(function(resp) {
            if (!resp.items) {
                progressMessage.setProgressMessage("no items were found in your calendar" + JSON.stringify(resp));
                alert("No entries were found in your Calendar for the specified time");
                return;
//                throw("getAllTodoLocationsAsArray no items were found in your calendar" + JSON.stringify(resp));
            }
            progressMessage.setProgressMessage("get all to do locations as an array" + resp.items.length);
//            console.log("request.execute: " + resp.items.length);
            for (var i = 0; i < resp.items.length; i++) {
                if (!resp.items[i].location) {
                    progressMessage.setProgressMessage("there was no location set for " + JSON.stringify(resp.items[i]));
//                    throw ("there was no location set for " + JSON.stringify(resp.items[i]));
                } else {
                    arrayAllLocations = arrayAllLocations.concat(resp.items[i].location.split(','));
                }
            }
//            if ((callback && typeof(callback) === "function")) {
//              rely on google to deal with types duplicates
            me.setArrayAllTodoLocations(arrayAllLocations);
            callback.call(callerObjRef);
//            }
        });
    });
}
//This is an interface function
myWonderApp.CalendarWrapper.prototype.setArrayAllTodoLocations = function(locs) {
    "use strict"
    progressMessage.setProgressMessage("set an array of all to do locations " + locs);
//    console.log("setArrayAllTodoLocations: " + locs);
    allLocations = locs;
}
//This is an interface function
myWonderApp.CalendarWrapper.prototype.getAllTodoLocationsAsArrayGenerated = function() {
    "use strict"
    progressMessage.setProgressMessage("get an array of all to do locations");
//    console.log("getAllTodoLocationsAsArrayGenerated :" + allLocations);
    return allLocations;
}
myWonderApp.CalendarWrapper.prototype.setStartDate = function(date) {
    "use strict"
    progressMessage.setProgressMessage("set the start date");
//    console.log("setStartDate: " + date);
    this.startDate = new Date(date);
};
myWonderApp.CalendarWrapper.prototype.setEndDate = function(date) {
    progressMessage.setProgressMessage("set the end date");
    "use strict"
//    console.log("setEndDate: " + date);
    this.endDate = new Date(date);
}
myWonderApp.CalendarWrapper.prototype.getStartDate = function() {
    "use strict"
    progressMessage.setProgressMessage("get the start date");
//    console.log("getStartDate: " + startDate);
    return this.startDate;
};
myWonderApp.CalendarWrapper.prototype.getEndDate = function() {
    "use strict"
    progressMessage.setProgressMessage("get the end date");
//    console.log("getEndDate: " + endDate);
    return this.endDate;
}
myWonderApp.CalendarWrapper.prototype.searchTodoItems = function(key, callback, callerObjRef) {
    "use strict"

    var arrayAllTodoItemsForLocation = []

    var me = this;
//    console.log("searchTodoItems: " + me.getEndDate() + " " + me.getStartDate());
    me.setArrayAllTodoItemsForLocation(null);
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMax': me.getEndDate(),
            'timeMin': me.getStartDate()
        });
        request.execute(function(resp) {
//            console.log('searchTodoItems: ' + startDate + ' ' + endDate + ' ' + JSON.stringify(resp));
            if (!resp.items) {
                progressMessage.setProgressMessage("No items were found in your calendar " + JSON.stringify(resp));
//                throw("searchTodoItems no items were found in your calendar" + JSON.stringify(resp));
            }
            if (!(callback && typeof(callback) === "function")) {

                throw("the callback object provided is not a function");
            }
//            console.log("request.execute: " + resp.items.length + " " + JSON.stringify(resp.items));
            arrayAllTodoItemsForLocation.push(key, me.getSummaryAndDescriptionThatMatches(resp.items, key));
            me.setArrayAllTodoItemsForLocation(arrayAllTodoItemsForLocation);
            callback.call(callerObjRef, arrayAllTodoItemsForLocation);
        });
    });
};
myWonderApp.CalendarWrapper.prototype.searchTodoItemsKeyIsAnArray = function(keyArray, callback, callerObjRef) {
    "use strict"
    progressMessage.setProgressMessage("search to do items");
    for (var key in keyArray) {
        this.searchTodoItems(keyArray[key], callback, callerObjRef);
    }
}
myWonderApp.CalendarWrapper.prototype.getArrayAllTodoItemsForLocation = function() {
    "use strict"
    return todoItemsForLocation;
}
myWonderApp.CalendarWrapper.prototype.setArrayAllTodoItemsForLocation = function(todoItems) {
    "use strict"
    progressMessage.setProgressMessage("all to do items for locations");
    todoItemsForLocation = todoItems;
}
myWonderApp.CalendarWrapper.prototype.getSummaryAndDescriptionThatMatches = function(calendar_items, key) {
    if (calendar_items.length === 0) {
        return;
    }
    var pay_load = []

    for (var cal_itr = 0; cal_itr < calendar_items.length; cal_itr++) {
        if (calendar_items[cal_itr].location) {
            var locations = calendar_items[cal_itr].location.split(',');
            for (var loc_itr = 0; loc_itr < locations.length; loc_itr++) {
                if (locations[loc_itr] === key) {
//                console.log('locations: ' + locations[loc_itr] + ' ' + calendar_items[cal_itr].description + ' ' + calendar_items[cal_itr].summary);
                    pay_load.push({
                        'description': calendar_items[cal_itr].description,
                        'summary': calendar_items[cal_itr].summary
                    });
                }
            }
        }
    }
    progressMessage.setProgressMessage("get summary and description that matches");
    return JSON.stringify(pay_load);
}
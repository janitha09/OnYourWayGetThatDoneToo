//had to change the way a namespace is defined maybe a side effect of strict?
var myWonderApp = myWonderApp || {};
//trying a class static this needs to chage from a namespace variable to a class
//variable

myWonderApp.Reminder = function(databaseHandle) {
    "use strict";
    //this.forgottenItems = [];
    //Supposed to make a method called by a constructor immutable
    //Object.freeze(this.createDatabase);
//        if ('webkitIndexedDB' in window) {
//            window.IDBTransaction = window.webkitIDBTransaction;
//            window.IDBKeyRange = window.webkitIDBKeyRange;
//        }
//    console.log("database handle" + databaseHandle);
    //object variable doesn't seem to work
    //this.forgottenItemsDataBase = null;
//    this.removeDatabase(databaseHandle);
    this.createDatabase(databaseHandle);
    this.count = 0;
//this.objectStoreName = 'ToDoObjectStore';
//this.databaseName = 'ToDoDatabase';
};
myWonderApp.Reminder.forgottenItemsDataBase = null;
myWonderApp.Reminder.prototype.databaseName = 'ToDoDatabase';
myWonderApp.Reminder.prototype.objectStoreName = 'ToDoObjectStore';
//myWonderApp.Reminder.prototype.arrayAllLocations = [];

var todoItemsForLocation = null;
var allLocations = null;
//myWonderApp.Reminder.prototype.arrayAllTodoItemsForLocation = [];

myWonderApp.Reminder.prototype.createDatabase = function(databaseHandle) {
    "use strict";
//    console.log("createDatabase: db name " + this.databaseName + " object store name " + this.objectStoreName);
    var request = databaseHandle.open(this.databaseName, 1);
    //console.log("Create database request " + JSON.stringify(request));


    request.onsuccess = function(e) {
        myWonderApp.Reminder.forgottenItemsDataBase = e.target.result;
        //var transaction = myWonderApp.forgottenItemsDataBase.transaction([],window.IDBTransaction.readwrite);

        console.log("createDatabase success: Object store names: " +
                JSON.stringify(myWonderApp.Reminder.forgottenItemsDataBase.objectStoreNames));
        console.log("createDatabase success: Database open success " +
                myWonderApp.Reminder.forgottenItemsDataBase.name + " Version " +
                myWonderApp.Reminder.forgottenItemsDataBase.version);

        var transaction =
                myWonderApp.Reminder.forgottenItemsDataBase.transaction([myWonderApp.Reminder.prototype.objectStoreName], IDBTransaction.READ_ONLY);

        //explicitly ties this method to an implementation
        var todoObjectStore = transaction.objectStore(myWonderApp.Reminder.prototype.objectStoreName);
        myWonderApp.Reminder.prototype.displayAllTodoItems(todoObjectStore);
        //to call your own method you need an object - strange
        //console.log("createDatabase: " + wonderApp.getCount());

    };
    request.onupgradeneeded = function(e) {
//        console.log("createDatabase: update objectore " + myWonderApp.Reminder.prototype.objectStoreName);
        myWonderApp.Reminder.forgottenItemsDataBase = e.target.result;
        if (myWonderApp.Reminder.forgottenItemsDataBase.objectStoreNames.contains(myWonderApp.Reminder.prototype.objectStoreName)) {
            myWonderApp.Reminder.forgottenItemsDataBase.deleteObjectStore(myWonderApp.Reminder.prototype.objectStoreName);
        }

        var objectStore = myWonderApp.Reminder.forgottenItemsDataBase.createObjectStore(myWonderApp.Reminder.prototype.objectStoreName,
                {
                    keyPath: "timeStamp"
                });
        objectStore.createIndex("where", "where", {
            unique: false
        });
//        console.log("Database upgrade needed success " + myWonderApp.Reminder.forgottenItemsDataBase +
//                "Object store: " + JSON.stringify(objectStore));
    };

    request.onerror = function(event) {
        throw ("Database open error");
        //return null;
    };
};

myWonderApp.Reminder.prototype.addForgottenItem = function(todoText, whereText, timeStampText, displayCallback) {
    "use strict";
    //console.log("Add: Database " + myWonderApp.Reminder.forgottenItemsDataBase.name);
    var transaction =
            myWonderApp.Reminder.forgottenItemsDataBase.transaction(
            [this.objectStoreName], IDBTransaction.READ_WRITE);

    // Do something when all the data is added to the database.  
    transaction.oncomplete = function(event) {
//        console.log("AddFogettenItem: READ_WRITE Transaction on database " + event.target.db.name);
    };

    transaction.onerror = function(event) {
        throw("AddFogettenItem: READ_WRITE Transaction error on database " +
                event.target.db.name);
    };


    var objectStore = transaction.objectStore(this.objectStoreName);

    var data = {
        "text": todoText,
        "where": whereText,
        "timeStamp": timeStampText
    };
    var me = this;
    var objectStoreAddRequest = objectStore.add(data);
    objectStoreAddRequest.onsuccess = function(event) {
//        console.log("Object store add request success " + event.target);
        displayCallback.call(me, objectStore);
    }
    objectStoreAddRequest.onerror = function(event) {
        throw("Object store add request error " + event.target.errorCode);
    }

};

myWonderApp.Reminder.prototype.displayAllTodoItems = function(store) {
    "use strict"
    // Get everything in the store;
//    console.log("displayAllTodoItems: " + store.name);
    if (myWonderApp.Reminder.prototype.renderTodoHeader) {
        myWonderApp.Reminder.prototype.renderTodoHeader();
    }
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);
    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        if (!!result == false) {
//            console.log("displayAllTodoItems: empty cursor");
            return;
        }
//        console.log("displayAllTodoItems: cursor success: " + JSON.stringify(result.value));
        if (myWonderApp.Reminder.prototype.renderTodo) {
            myWonderApp.Reminder.prototype.renderTodo(result.value);
        }
        result.continue();
    };
    cursorRequest.onerror = function(e) {
        throw("display all to do items cursor error")
    };

};

myWonderApp.Reminder.prototype.deleteTodo = function(id) {
    "use strict"
//    console.log("deleteToDo: id" + id);
    //I want to refrain from referencing the document
    var transaction =
            myWonderApp.Reminder.forgottenItemsDataBase.transaction([this.objectStoreName], IDBTransaction.READ_WRITE);
    var objectStore = transaction.objectStore(this.objectStoreName);

    var objectStoreDeleteRequest = objectStore.delete(id);
    objectStoreDeleteRequest.onsuccess = function(event) {
//        console.log("Object store delete request success " + event.target.result);
        myWonderApp.Reminder.prototype.displayAllTodoItems(objectStore);
    }

    objectStoreDeleteRequest.onerror = function(event) {
        throw("Error Deleting: ", id);
    };
};

myWonderApp.Reminder.prototype.searchTodoItems = function(key, callback, callerObjRef) {
    "use strict"
    //why does this need to be global?
    var arrayAllTodoItemsForLocation = []

    this.setCount(2);
    var transaction =
            myWonderApp.Reminder.forgottenItemsDataBase.transaction([this.objectStoreName], IDBTransaction.READ_ONLY);
    var objectStore = transaction.objectStore(this.objectStoreName);

    var index = objectStore.index("where");

    var keyRange = IDBKeyRange.only(key);
//    console.log("searchTodoItems: keyRange " + keyRange);
    var cursorRequest = index.openCursor(keyRange);

    var me = this;
    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
//        console.log("searchTodoItems: cursor success " + result);
        me.setCount(3);
        if (!!result == false) {
//            console.log("searchTodoItems: cursor end " + result);
            // if the cursor is empty it returns undefined
            me.setArrayAllTodoItemsForLocation(null);

            if ((callback && typeof(callback) === "function") && (result === null)) {//(myWonderApp.Reminder.prototype.arrayAllTodoItemsForLocation.length >0)) {
//                console.log("callback return: " + arrayAllTodoItemsForLocation);
                me.setArrayAllTodoItemsForLocation(arrayAllTodoItemsForLocation);
                callback.call(callerObjRef, arrayAllTodoItemsForLocation);


            }

            return;
        }
        if (myWonderApp.Reminder.prototype.renderTodo) {
            myWonderApp.Reminder.prototype.renderTodo(result.value.text);
        }
        arrayAllTodoItemsForLocation.push([key, result.value.text]);

        result.continue();
    };

    cursorRequest.onerror = function(e) {
        throw("searchTodoItems: Error Searching: ");
    }
};
myWonderApp.Reminder.prototype.searchTodoItemsKeyIsAnArray = function(keyArray, callback, callerObjRef) {
    "use strict"
    for (var key in keyArray) {
        console.log("searchTodoItemsKeyIsAnArray " + key)
        this.searchTodoItems(keyArray[key], callback, callerObjRef);
    }
}
myWonderApp.Reminder.prototype.getAllTodoLocationsAsArray = function(callback, callerObjRef) {
    "use strict"
    var arrayAllLocations = [];

    var transaction =
            myWonderApp.Reminder.forgottenItemsDataBase.transaction([this.objectStoreName], IDBTransaction.READ_ONLY);
    var objectStore = transaction.objectStore(this.objectStoreName);

    var index = objectStore.index("where");

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = index.openCursor(keyRange);

    var me = this;
    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        console.log("getAllTodoLocationsAsArray: onsuccess" + result)
        if (!!result == false) {
            me.setAllTodoLocationsAsArrayGenerated(null);

            if ((callback && typeof(callback) === "function") && (result === null)) {//(myWonderApp.Reminder.prototype.arrayAllTodoItemsForLocation.length >0)) {

                me.setAllTodoLocationsAsArrayGenerated(arrayAllLocations);
                callback.call(callerObjRef);

            }
            return;
        }
        console.log("getAllTodoLocationsAsArray: " + result.value.where);
        arrayAllLocations = arrayAllLocations.concat(result.value.where.split(','));

        result.continue();
    };

    cursorRequest.onerror = function(e) {
        throw("cannot search for locations");
    }
};
myWonderApp.Reminder.prototype.getDataBase = function() {
    "use strict"
    //console.log("getDataBase: " + myWonderApp.Reminder.forgottenItemsDataBase.name);
    return myWonderApp.Reminder.forgottenItemsDataBase;
};

myWonderApp.Reminder.prototype.removeDatabase = function(databaseHandle) {
    "use strict";
//    console.log("deleteDatabase: db name " + this.databaseName + " object store name " + this.objectStoreName);
    databaseHandle.deleteDatabase(this.databaseName);
};
myWonderApp.Reminder.prototype.getCount = function() {
    "use strict"
//    console.log("getCount : " + this.count);
    return this.count;
};
myWonderApp.Reminder.prototype.setCount = function(number) {
    "use strict"
    this.count += number;
//    console.log("setCount : " + number + " : " + this.count);
};
myWonderApp.Reminder.prototype.getArrayAllTodoItemsForLocation = function() {
//    console.log("getArrayAllTodoItemsForLocation: " + todoItemsForLocation);
    return todoItemsForLocation;
}
myWonderApp.Reminder.prototype.setArrayAllTodoItemsForLocation = function(todoItems) {
//    console.log("setArrayAllTodoItemsForLocation: " + todoItems);
    todoItemsForLocation = todoItems;
}
myWonderApp.Reminder.prototype.setAllTodoLocationsAsArrayGenerated = function(locs) {
    console.log("setAllTodoLocationsAsArrayGenerated: " + locs);
    allLocations = locs;
}
myWonderApp.Reminder.prototype.getAllTodoLocationsAsArrayGenerated = function() {
//    console.log("getArrayAllTodoLocations: " + allLocations);
    return allLocations;
}
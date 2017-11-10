var wonderApp;
var locationCallBackArray = [];
function init(){
    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    wonderApp = new myWonderApp.Reminder(window.indexedDB);
    wonderApp.setCount(10);
    //                var timer = setTimeout(function(){
    //                    console.log("setTimeout: init database: " + wonderApp.getDataBase().name);
    //                    //apparently looses context of objects
    //                    //wonderApp.setCount(10);
    //                }
    //                ,1000);
    //hits this statement before the open callback is fired
    wonderAppAWS = new myWonderApp.Suggestions();
    console.log("init database: before open callback" + wonderApp.getDataBase());
}
function addTodo(){
    document.getElementById("todoItems").innerHTML="";
    var todo = document.getElementById("todo");
    var where = document.getElementById("where");
    console.log("addtodo database: " + wonderApp.getDataBase().name);
    wonderApp.addForgottenItem(todo.value,where.value);
    //wonderApp.getAllTodoLocationsAsArray();
    console.log("check count: " + wonderApp.getCount());
    whatElseCouldShouldIGet(todo);
    console.log("check count: " + wonderApp.getCount());
}
function searchTodoItems() {
    console.log("called searchtodo");
    document.getElementById("todoItems").innerHTML="";
    var where = document.getElementById("where");
    wonderApp.searchTodoItemsKeyIsAnArray(where.value);
    todo.value = "";
    where.value = "";
}
function whatElseCouldShouldIGet(searchItem){
    console.log("whatElseCouldShouldIGet: " + searchItem);
    //window.alert(searchItem.value + " Other stuff you might need: Shaving Cream, Shaving Gel, Antiperspirant, Tooth Brush, Womens Razor");
    
    var accessories = wonderAppAWS.getAccessories(searchItem);
    window.alert(searchItem.value + " Other stuff you might need: " + accessories);
}
window.onload = function(){
    init();
                
    var todobutton = document.getElementById("todo_btn");
    todobutton.onclick = function(){
        console.log("clicked todo");
        addTodo();
    //never saves this value even though this statment is hit after init()
    //wonderApp.setCount(20);
    }
    var searchbutton = document.getElementById("search_btn");
    searchbutton.onclick = function(){
        console.log("clicked search");
        searchTodoItems();
        console.log("clicked location button " + myWonderApp.Reminder.prototype.arrayAllLocations);
    }
    var locationbutton = document.getElementById("locations_btn");
    locationbutton.onclick = function(){
        console.log("clicked location button wait for the callback to finish and populate a global priviledged variable");
        wonderApp.getAllTodoLocationsAsArray();
        var timer = setTimeout(function(){
            //console.log("setTimeout: init database: " + wonderApp.getDataBase().name);
            //apparently looses context of objects
            //wonderApp.setCount(10);
            wonderApp.renderTodoLocations(myWonderApp.Reminder.prototype.arrayAllLocations)
        }
        ,1000);
                    
    }
}
myWonderApp.Reminder.prototype.renderTodoLocations = function (arry){
    "use strict"
    console.log("renderToDo: " + JSON.stringify(arry));
    var todoLoc = document.getElementById("todoLocations");

    todoLoc.innerHTML = "";
    
    var li = document.createElement("li");
    var a = document.createElement("a");
    var t = document.createTextNode(arry);
  
    li.appendChild(t);
    li.appendChild(a);
    todoLoc.appendChild(li)
}

myWonderApp.Reminder.prototype.renderTodo = function (row){
    "use strict"
    console.log("renderToDo: " + JSON.stringify(row));
    var todos = document.getElementById("todoItems");
    var li = document.createElement("li");
    var a = document.createElement("a");
    var t = document.createTextNode(row.text + " @ " + row.where);

    a.addEventListener("click", function() {
        myWonderApp.Reminder.prototype.deleteTodo(row.timeStamp);
        todos.innerHTML=""
    }, false);
      
    a.textContent = " [Delete]";
    li.appendChild(t);
    li.appendChild(a);
    todos.appendChild(li)
}
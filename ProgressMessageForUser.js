var myWonderApp = myWonderApp || {};

var progressMessageElement;
myWonderApp.ProgressMessageForUser = function(div_name) {
//    console.log("progress message for user constructor")
    progressMessageDiv = document.getElementById('warnings_panel')//document.createElement("div");
    //progressMessageDiv.setAttribute('id',div_name);
    //progressMessageDiv.setAttribute ('style',"width:100%;height:10%;text-align:center");
}
myWonderApp.ProgressMessageForUser.prototype.getProgressDivID = function(){
    return progressMessageDiv.getAttribute('id');
}
myWonderApp.ProgressMessageForUser.prototype.setProgressMessage = function(message){
    progressMessageDiv.innerHTML = message;
}
myWonderApp.ProgressMessageForUser.prototype.getProgressMessage = function(message){
    return progressMessageDiv.innerHTML;
}


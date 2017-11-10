var myWonderApp = myWonderApp || {};

myWonderApp.ConditionalFormatting = function() {
};
myWonderApp.ConditionalFormatting.prototype.convertNametoHyperlinkIfWebsiteIsDefined = function(name,website) {
    "use srtict";
    if (website){
        return "<div id=\"infowindowname\"><a href=\"" + website + "\" target=\"_blank\">"+ name +"</a></div>";
    }else{
        return "<div id=\"infowindowname\">"+ name +"</div>";
    }  
};
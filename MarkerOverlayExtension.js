google.maps.Map.prototype.markers = new Array();

google.maps.Map.prototype.addMarker = function(marker) {
    progressMessage.setProgressMessage("add to the  marker array");
    this.markers[this.markers.length] = marker;
};

google.maps.Map.prototype.getMarkers = function() {
    progressMessage.setProgressMessage("get a marker array");
    console.log("map.prototype.getmarker " + this.markers);
    return this.markers
};

google.maps.Map.prototype.clearMarkers = function() {
    progressMessage.setProgressMessage("clear all markers " + this.markers.length);
//    console.log('clearMarkers: ' + this.markers.length)
    for(var i=0; i<this.markers.length; i++){
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};
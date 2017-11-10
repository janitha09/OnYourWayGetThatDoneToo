var myWonderApp = myWonderApp || {};
//https://developers.google.com/maps/articles/toomanymarkers

var infowindow = null;
var googleMap = null;
var wonderApp = null;
var marker = null;
var googleRequestDataStructure = null;
//not sure whether I really need to create a new array
//google.maps.Map.prototype.markers;

myWonderApp.Boxes = function() {
};

myWonderApp.Boxes.prototype.getWrappingBounds = function(arrayofBoxes) {
    'use strict'
    if (typeof arrayofBoxes === 'undefined') {
        return undefined;
    } else if (arrayofBoxes.length > 0) {
        var lastIndex = arrayofBoxes.length - 1;
        var allEncompassingBounds = new google.maps.LatLngBounds(arrayofBoxes[0].getSouthWest(), arrayofBoxes[lastIndex].getNorthEast());
        console.log('lower bounds ' + arrayofBoxes[0]);
        console.log('upper bounds ' + arrayofBoxes[lastIndex]);
        console.log("getWrappingBounds " + allEncompassingBounds);
        return allEncompassingBounds;
    }
    return undefined;
};
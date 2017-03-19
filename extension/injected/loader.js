
$(document).ready(function() {

    // Get the lat / long of the ad's location
    var maps_box = document.getElementById("map");
    var latitude = maps_box.dataset.latitude;
    var longitude = maps_box.dataset.longitude;

    // Find location to place our embedded element
    var location_to_append = document.getElementsByClassName("mapbox");


    //Inject inject.html into proper location
    var iframe = document.createElement("iframe");
    iframe.src = chrome.extension.getURL("injected/inject.html");
    location_to_append[0].after(iframe);

});


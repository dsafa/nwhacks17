
$(document).ready(function() {

    // Get the lat / long of the ad's location
    var maps_box = document.getElementById("map");
    var latitude = maps_box.dataset.latitude;
    var longitude = maps_box.dataset.longitude;


    var data = {};
data.bodyText = "<div id=\"injection\"></div>"; 
    $(".mapbox").append(data.bodyText);
    $("#injection").load(chrome.extension.getURL("injected/inject.html"));






});


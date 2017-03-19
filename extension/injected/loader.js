const WEB_URL = "https://safesale.localtunnel.me/";

class RestAPI {

    sendPost(req_location, req_body) {
        $.ajax({
            url: WEB_URL + req_location,
            type: "post",
            data: req_body
        }).then(function(data) {
            return data;
        });
    }

    sendGet(req_location, success_func) {
        $.ajax({
            url: WEB_URL + req_location,
            type: "get",
        }).then(function(data) {
            success_func(data);
        });
    }

}

$(document).ready(function() {

    // Get the lat / long of the ad's location
    var maps_box = document.getElementById("map");
    var latitude = maps_box.dataset.latitude;
    var longitude = maps_box.dataset.longitude;

    // Find location to place our embedded element
    var location_to_append = document.getElementsByClassName("mapbox");

    const restAPI = new RestAPI();
    //restAPI.sendGet("", function(data) {
        //$("#map").html(data);
    //});

    //Inject inject.html into proper location
    var iframe = document.createElement("iframe");
    iframe.src = chrome.extension.getURL("injected/inject.html");
    location_to_append[0].after(iframe);

});


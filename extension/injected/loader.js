const WEB_URL = "https://safesale.localtunnel.me/";

class RestAPI {

    sendPost(req_location, req_body, success_func, error_func) {
        $.ajax({
            url: WEB_URL + req_location,
            type: "post",
            data: req_body,
            success: success_func,
            error: error_func
        });
    }

    sendGet(req_location, success_func, error_func) {
        $.ajax({
            url: WEB_URL + req_location,
            type: "get",
            success: success_func,
            error: error_func
        });
    }

}

$(document).ready(function() {

    // Get the lat / long of the ad's location
    var maps_box = document.getElementById("map");
    var latitude = maps_box.dataset.latitude;
    var longitude = maps_box.dataset.longitude;

    // Load the HTML responsible for displaying the locations to the display
    var data = {};
data.bodyText = "<div id=\"injection\"></div>"; 
    $(".mapbox").append(data.bodyText);
    $("#injection").load(chrome.extension.getURL("injected/inject.html"));

    // Start doing some api stuff
    const restAPI = new RestAPI();
    restAPI.sendGet("", function(data) {
        console.log("Get Request Succeeded");
    }, function(data) {
        console.log("Get Request Failed");
    });

});


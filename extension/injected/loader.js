const WEB_URL = "https://safesale.localtunnel.me/";

function RestAPI() {
    var self = this;

    this.sendPost = function(req_location, req_body, success_func, error_func) {
        $.ajax({
            type: 'POST',
            url: WEB_URL + req_location,
            data: JSON.stringify(req_body),
            contentType: "application/json",
            dataType: 'json',
            success: success_func,
            error: error_func
        });
    }

}

function Renderer() {
    var self = this;

    this.renderContent = function(source, context) {
        var template = Handlebars.compile(source);
        var html = (context != null) ? template(context) : template(context);
        $("#inject-display").html(html);
    }

    this.displayLoading = function() {
        var source = $("#loading").html();
        self.renderContent(source, {});
    }

    this.displayContent = function(data) {
        var source = $("#items").html();
        self.renderContent(source, data);
    }

    this.displayError = function(data) {
        var source = $("#error").html();
        self.renderContent(source, data);
    }

}

$(document).ready(function() {

    // Get the lat / long of the ad's location
    var maps_box = document.getElementById("map");
    var seller_latitude = maps_box.dataset.latitude;
    var seller_longitude = maps_box.dataset.longitude;

    const restAPI = new RestAPI();
    const renderer = new Renderer();

    // Load the HTML responsible for displaying the locations to the display
    var data = {};
    data.bodyText = "<div id=\"injection\"></div>"; 
    $(".mapbox").append(data.bodyText);
    $("#injection").load(chrome.extension.getURL("injected/inject.html"), renderer.displayLoading);

    // Get user location
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);

        var user_latitude = position.coords.latitude;
        var user_longitude = position.coords.longitude;

        // Send a request for data from remote server
        var req_data = {
            location1: user_latitude + "," + user_longitude,
            location2: seller_latitude + "," + seller_longitude,
            radius: 2,
            size: 4
        };

        restAPI.sendPost(
                "api/location",
                req_data,
                function(data) {
                    renderer.displayContent(data);
                },
                function(error) {
                    console.log(error);
                    var message = {
                        "text": "An error occurred, please try again later."
                    };
                    renderer.displayError(message);
                }
            );
    });

});


const WEB_URL = "https://safesale.localtunnel.me/";

function RestAPI() {
    var self = this;

    this.sendPost = function(req_location, req_body, success_func, error_func) {
        $.ajax({
            url: WEB_URL + req_location,
            type: "post",
            data: req_body,
            success: success_func,
            error: error_func
        });
    }

    this.sendGet = function(req_location, success_func, error_func) {
        $.ajax({
            url: WEB_URL + req_location,
            type: "get",
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

}

$(document).ready(function() {

    // Get the lat / long of the ad's location
    var maps_box = document.getElementById("map");
    var latitude = maps_box.dataset.latitude;
    var longitude = maps_box.dataset.longitude;

    const restAPI = new RestAPI();
    const renderer = new Renderer();

    var testJson = {
        "locations": [
            {
                "name": "University of British Columbia",
                "address": "2329 West Mall, Vancouver, BC V6T 1Z4",
                "distance": "0.4mi",
                "latitude": 49.2598379,
                "longitude": -123.2459363
            }
        ]
    };

    // Load the HTML responsible for displaying the locations to the display
    var data = {};
    data.bodyText = "<div id=\"injection\"></div>"; 
    $(".mapbox").append(data.bodyText);
    $("#injection").load(chrome.extension.getURL("injected/inject.html"), renderer.displayLoading);

});


// Get the lat / long of the ad's location
var maps_box = document.getElementById("map");
var latitude = maps_box.dataset.latitude;
var longitude = maps_box.dataset.longitude;

// Find location to place our embedded element
var location_to_append = document.getElementsByClassName("mapbox");

// Create a simple button with text
var some_button = document.createElement("button");
var text = document.createTextNode("test");
some_button.appendChild(text);

// Place our embedded element onto the page
location_to_append[0].after(some_button);

//Inject inject.html into proper location
var iframe = document.createElement("iframe");
var iframeloading = document.createElement("iframe");
iframeloading.src = chrome.extension.getURL("popup.html");
iframe.src = chrome.extension.getURL("inject.html");


console.log(document.readyState);
if(document.readyState === 'interactive'){
	location_to_append[0].after(iframeloading);
}
else {
	location_to_append[0].after(iframe);
}

//setTimeout(function() {location_to_append[0].after(iframeloading);}, 3000);

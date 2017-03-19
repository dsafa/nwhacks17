
//Yes, that's possible. Use chrome.extension.getURL to get an absolute URL for the resource. For example:
// $.get(chrome.extension.getURL('/template.html'), function(data) {
//     $(data).appendTo('body');
//     // Or if you're using jQuery 1.8+:
//     // $($.parseHTML(data)).appendTo('body');
// });
// 
// 
// Rob's suggestion does the job (see accepted answer). The only additional step is to register the file in the manifest under web_accessible_resources.

// {
//   ...
//   "web_accessible_resources": [
//     "myimportfile1.html",
//     "myimportfile2.html"
//   ],
//   ...
// }
// 

// var html = document.documentElement.outerHTML;
// chrome.extension.sendMessage("inject.js", html);

var google = document.getElementById("map");
var craigslist = document.getElementsById("postingbody");
var lat = google.dataset.latitude;
var long = google.dataset.longitude;
alert(long);
    var button = document.createElement("button");
    var text = document.createTextNode("test");
    button.appendChild(text);
    craigslist.appendChild(button);
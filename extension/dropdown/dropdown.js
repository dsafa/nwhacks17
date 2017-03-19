$(document).ready(function(){
    // Put stuff here :)
     var storage = chrome.storage.sync;
    
     window.onload = function() {
     	 document.getElementById("saveSize").onclick = function() {
     	var valueSize = document.getElementById('size').valueSize;
     	storage.set({'size': valueSize}, function() {
     		console.log("saved size");
     	});
     };

      document.getElementById("saveNumber").onclick = function() {
     	var valueAmount = document.getElementById('amount').valueSize;
     	storage.set({'amount': valueAmount}, function() {
     		console.log("saved amount");
     	});
      document.getElementById("boxes").onclick = function() {
      	var valueHowmany = document.getElementById('boxes').valueHowmany;
      	storage.set({'howmany': valueHowmany}, function() {
      		console.log("saved how many.");
      	});
      };
     };
     };


  //  Retrieve existing settings
$(':radio').each(function(index, element) {

    var id = this.id;
    storage.get(id, function(items) {
    	
        element.checked = items[id]; // true  OR  false / undefined (=false)

        console.log(element.checked);

    });
});

	$(".Options").on("change", ":radio", function saveSettings() {

    var id = this.id;
    var items = {};

    items[id] = this.checked;

    storage.set(items, function() {

    });
});



});


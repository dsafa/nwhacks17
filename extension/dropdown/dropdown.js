$(document).ready(function(){
    var storage = chrome.storage.sync;

    //  Retrieve existing settings
    $('input:radio').each(function () {
        storage.get({ 'transMode' : "driving"}, function(value) {
            $('input[name=transMode]').prop({checked: false});
            $('input[name=transMode][value='+value.transMode+']').prop({checked: true});
        });
    });

    storage.get('radius', function(value) {
        $("#radius").val(value.radius);
    });

    storage.get('listSize', function(value) {
        $("#boxes").val(value.listSize);
        $("#rangeVal").html(value.listSize);
    });

    // Save All Settings
    $("#saveAll").click(function() {
        var valueTrans = $('input[name=transMode]:checked').val();
        storage.set({'transMode': valueTrans}, function() {
            console.log('saved trans mode');
        });

        var valueSize = $("#radius").val();
        storage.set({'radius': valueSize}, function() {
            console.log("saved radius");
        });

        var valueAmount = $("#boxes").val();
        console.log(valueAmount);
        storage.set({'listSize': valueAmount}, function() {
            console.log("saved list size");
        });

        window.close();
    });

    // Update range text value based on slider
    $("#boxes").change(function() {
        var newValue = $(this).val();
        console.log(newValue);
        $("#rangeVal").html(newValue);
    });

});


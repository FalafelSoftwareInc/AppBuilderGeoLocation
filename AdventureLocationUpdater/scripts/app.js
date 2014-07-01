(function (global) {
    var SERVICE_URL = "http://yoursite.com/path/to/service",
    
    	app = global.app = global.app || {},
        os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? "black-translucent" : "black";
    
    app.getLocation = function() {
        $("#status").text("refreshing...");
    
        navigator.geolocation.getCurrentPosition(function (position) {
                $("#status").html("refreshed<br />(accurate to " + position.coords.accuracy + " meters)");
                $("#latitude").val(position.coords.latitude);
                $("#longitude").val(position.coords.longitude);
            }, function (error) {
                $("#status").text("error");
            }, {
                timeout: 30000,
                enableHighAccuracy: true
            });
    };
    
    app.sendLocation = function() {
        $("#status").text("updating...");
        $.ajax({
           type: "POST",
           dataType: "json",
           url: SERVICE_URL,
           data: {
                "latitude": $("#latitude").val(),
                "longitude": $("#longitude").val(),
                "name": ""
            }
        }).done(function(data) {
           $("#status").text("updated");
        });
    }

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
        app.getLocation();
    }, false);
    
    app.kendoApp = new kendo.mobile.Application(document.body, { statusBarStyle: statusBarStyle });
})(window);
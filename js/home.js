$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
    // Create the chart
    $('#stock').highcharts('StockChart', {
        rangeSelector : {
            selected : 1,
            inputEnabled: $('#container').width() > 480
        },

        title : {
            text : 'AAPL Stock Price'
        },

        series : [{
            name : 'AAPL',
            data : data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});

console.log("Creating angular module . .. ");

angular.module("anytime", []);

angular.module("anytime").controller("MainController", ["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.hours = 00;
    $rootScope.minutes = 30;
    $rootScope.seconds = 00;

    // Figure out the mode the user has selected . . .
    var environment = location.search.substring(1);
    if(environment.indexOf("&&") != -1)
        $rootScope.mode = environment.substring(environment.indexOf("=") + 1, environment.indexOf("&&"));
    else
        $rootScope.mode = environment.substring(environment.indexOf("=") + 1);

    if(environment.indexOf("&&") != -1) {
        var session = environment.substring(environment.indexOf("&&") + 2);
        $rootScope.session = session.substring(session.indexOf("=") + 1);
    } else {
        delete $rootScope.session;
    }

    console.log("Mode: ", $rootScope.mode);
    console.log("Session: ", $rootScope.session);

    $rootScope.modes = [];
    $rootScope.modes['looking-around'] = 'looking-around';
    $rootScope.modes['free-time'] = 'free-time';    
    $rootScope.modes['on-my-way'] = 'on-my-way';

    $rootScope.navbarItems = [];
    $rootScope.options = [];

    $rootScope.setDestination = function() {
        $rootScope.session = "active";

        if(location.href.indexOf("#/") != -1)
            location.href = location.href.replace("#/", "&&session=" + $rootScope.session);
        else
            location.href = location.href.replace("on-my-way", "on-my-way&&session=" + $rootScope.session);

        console.log("Set Destination", location.href);
    };

    $rootScope.setDestinationBlank = function() {}

    $rootScope.changeDestination = function() {

    };

    $rootScope.setTime = function() {
        $rootScope.session = "active";

        if(location.href.indexOf("#/") != -1)
            location.href = location.href.replace("#/", "&&session=" + $rootScope.session);
        else
            location.href = location.href.replace("free-time", "free-time&&session=" + $rootScope.session);

        console.log("Set Time", location.href);
    };

    $rootScope.setTimeBlank = function() {}

    $rootScope.changeTime = function() {

    };

    // Create the navbar items and options for the on-my-way mode . . .
    if($rootScope.mode == $rootScope.modes['on-my-way']) {
        if(!$rootScope.session) {
            $rootScope.navbarItems.push({
                text: "No Destination Set",
                color: "red"
            });

            $rootScope.navbarItems.push({
                text: "Set Destination",
                color: "blue",
                action: $rootScope.setDestinationBlank,
                modal: "change-destination"
            });
        } else {
            $rootScope.navbarItems.push({
                text: "Time since start of journey : 10:30",
                color: "red"
            });

            $rootScope.navbarItems.push({
                text: "Time remaining to destination : 19:30",
                color: "red"
            });

            $rootScope.navbarItems.push({
                text: "Tasks Completed : 1",
                color: "green"
            });

            $rootScope.options.push({
                text: "Change Destination",
                link: "#",
                action: $rootScope.changeDestination,
                modal: "change-destination"
            });
        }
    } else

    // Create the navbar items and options for the free-time mode . . .
    if($rootScope.mode == $rootScope.modes['free-time']) {
        if(!$rootScope.session) {
            $rootScope.navbarItems.push({
                text: "No Time Set",
                color: "red"
            });

            $rootScope.navbarItems.push({
                text: "Set Time",
                color: "blue",
                action: $rootScope.setTimeBlank,
                modal: "change-time"
            });
        } else {
            $rootScope.navbarItems.push({
                text: "Time Elapsed : 10:30",
                color: "red"
            });

            $rootScope.navbarItems.push({
                text: "Time Remaining : 19:30",
                color: "red"
            });

            $rootScope.navbarItems.push({
                text: "Tasks Completed : 1",
                color: "green"
            });

            $rootScope.options.push({
                text: "Change Time",
                link: "#",
                action: $rootScope.changeTime,
                modal: "change-time"
            });
        }
    } 

    // Create the navbar items and options for the looking-around mode . . .
    else {

    }


    // Push the common options . . .
    $rootScope.options.push({
        text: "Change Mode",
        link: "environment.html?environment=" + $rootScope.mode
    });

    $rootScope.options.push({
        text: "Logout",
        link: "login.html"
    });
}]);

console.log("Done");

angular.bootstrap(document, [ 'anytime' ]);
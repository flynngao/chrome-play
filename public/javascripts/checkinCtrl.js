function checkinCtrl($scope) {
    seajs.use('$', function($) {
        if (window.DeviceOrientationEvent) {
            // angular.element("#doEvent").innerHTML = "DeviceOrientation";
            var socket = io.connect('http://112.124.39.120:3000');
            window.addEventListener('deviceorientation', function(eventData) {
                $scope.tiltLR = eventData.gamma;
                $scope.tiltFB = eventData.beta;
                
                $scope.$apply();

                socket.emit('feedback', {
                    "stat": "200",
                    "uuid": $(".phone-container").data("uuid"),
                    "tiltLR": $scope.tiltLR,
                    "tiltFB": $scope.tiltFB,
                    "alpha": $scope.alpha
                });

                var logo = document.getElementById("logo");
                logo.style.webkitTransform = "rotate(" + $scope.tiltFB + "deg) rotate3d(1,0,0, " + ($scope.tiltLR * -1) + "deg)";
                logo.style.MozTransform = "rotate(" + $scope.tiltLR + "deg)";
                logo.style.transform = "rotate(" + $scope.tiltFB + "deg) rotate3d(1,0,0, " + ($scope.tiltLR * -1) + "deg)";

            }, false);

            


            window.addEventListener("devicemotion", function(eventData) {
                var x = event.acceleration.x;
                var y = event.acceleration.y;
                var z = event.acceleration.z;

                $scope.x = x;
                $scope.y = y;
                $scope.z = z;
            }, false);

        } else {
            // angular.element("#doEvent").innerHTML = "Not supported on your device or browser.  Sorry.";
        }
    });
}
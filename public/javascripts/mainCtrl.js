/**
 * [mainCtrl description]
 * @param  {[type]} $scope [description]
 * @return {[type]}        [description]
 */



function mainCtrl($scope) {


    seajs.use('$', function($) {
        var uuid = $('.play-container').data("uuid");
        var socket = io.connect('http://112.124.39.120:3000');
        socket.on('news' + uuid, function(data) {
            console.log(data.stat);
            if (data.stat == '200') {
                $('.pre-play').fadeOut();
                $('.play-content').fadeIn();
                $scope.$apply();
                console.log(data);
                var logo = document.getElementById("logo");
                logo.style.webkitTransform = "rotate(" + data.tiltLR + "deg) rotate3d(1,0,0, " + (data.tiltFB * -1) + "deg)";
                logo.style.MozTransform = "rotate(" + data.tiltLR + "deg)";
                logo.style.transform = "rotate(" + data.tiltLR + "deg) rotate3d(1,0,0, " + (data.tiltFB * -1) + "deg)";
            }


        });

    });


}
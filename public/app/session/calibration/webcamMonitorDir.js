angular.module('app')
    .directive('webcamMonitor', ['userMediaService', function(userMediaService) {
        function link (scope, element, attrs){
            userMediaService
                .then(function(stream){
                    gotStream(stream);
                });
            function gotStream(stream){
                //TODO should use element variable to modify #webcam-live
                var videoElem = document.querySelector('#webcam-live');
                // Firefox supports a src object
                if (navigator.mozGetUserMedia) {
                    videoElem.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    videoElem.src = vendorURL.createObjectURL(stream);
                }
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'app/session/calibration/webcamMonitorDir.html',
            link: link
        }
    }]);
angular.module('app').directive('webcamCalibration', [function(){

    function link(scope, element, attrs) {
        scope.validation.webcam = false;

        scope.onCalibrated = function() {
            scope.validation.webcam = true;
            scope.$emit('webcamCalibrated');
        }
    }

    return {
        restrict: '',
        templateUrl: '/app/session/calibration/webcamCalibrationDir.html',
        link: link
    }

}])

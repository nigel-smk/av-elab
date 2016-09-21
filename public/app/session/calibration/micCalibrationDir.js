angular.module('app').directive('micCalibration', function(){
    function link(scope, element, attrs) {
        scope.validation.microphone = false;

        var deregister = scope.$on('micTestPass', function(event) {
            scope.validation.microphone = true;
            scope.$apply();
            event.stopPropagation();
            deregister();
            scope.$emit('micCalibrated');
        });
        
    }

    return {
        restrict: '',
        templateUrl: '/app/session/calibration/micCalibrationDir.html',
        link: link
    }
})
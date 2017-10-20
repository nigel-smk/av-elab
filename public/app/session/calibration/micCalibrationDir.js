angular.module('app').directive('micCalibration', function(){
    function link(scope, element, attrs) {
        scope.microphone = false;

        var deregister = scope.$on('micTestPass', function(event) {
            scope.microphone = true;
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
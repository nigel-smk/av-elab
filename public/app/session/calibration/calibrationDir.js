angular.module('app').directive('calibration', [function() {
    function link(scope, element, attrs) {

        //scope.validation.calibrationComplete = false;

        scope.expectedEvents = new Set(['micCalibrated', 'webcamCalibrated', 'speakersCalibrated']);

        function registerCalibrationEvent(name) {
            scope.expectedEvents.delete(name);
            if (scope.expectedEvents.size === 0) {
                scope.$emit('calibrationComplete');
                //scope.validation.calibrationComplete = true;
            }
        }

        scope.$on('webcamCalibrated', function(event){
            registerCalibrationEvent(event.name);
            event.stopPropagation();
        });
        
        scope.$on('micCalibrated', function(event){
            registerCalibrationEvent(event.name);
            event.stopPropagation();
        });

        scope.$on('speakersCalibrated', function(event) {
            registerCalibrationEvent(event.name);
            event.stopPropagation();
        })
    }
    
    return {
        restrict: '',
        templateUrl: '/app/session/calibration/calibrationDir.html',
        link: link
    }
    
}]);
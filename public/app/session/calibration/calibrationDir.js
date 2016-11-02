angular.module('app').directive('calibration', ['$window', function($window) {
    function link(scope, element, attrs) {

        scope.expectedEvents = new Set(['micCalibrated', 'webcamCalibrated', 'speakersCalibrated']);

        scope.$on('webcamCalibrated', function(event){
            scope.expectedEvents.delete(event.name);
            event.stopPropagation();
        });
        
        scope.$on('micCalibrated', function(event){
            scope.expectedEvents.delete(event.name);
            event.stopPropagation();
        });

        scope.$on('speakersCalibrated', function(event) {
            scope.expectedEvents.delete(event.name);
            event.stopPropagation();
        })

        //detect space bar for continue
        angular.element($window).on('keydown', function(e) {
            if (scope.expectedEvents.size == 0) {
                scope.$emit('calibrationComplete');
                angular.element($window).off('keydown');
            }
        });
    }
    
    return {
        restrict: '',
        templateUrl: '/app/session/calibration/calibrationDir.html',
        link: link
    }
    
}]);
angular.module('app').directive('speakerCalibration', [function(){

    function link(scope, element, attr) {

        scope.validation.speakerTestInput = "";

        scope.$watch('validation.speakerTestInput', function(newValue, oldValue) {
           if (newValue === 'welcome') {
               scope.$emit('speakersCalibrated');
           } 
        });

    }

    return {
        restrict: '',
        templateUrl: '/app/session/calibration/speakerCalibrationDir.html',
        link: link
    }

}]);
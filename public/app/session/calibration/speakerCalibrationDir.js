angular.module('app').directive('speakerCalibration', [function(){

    function link(scope, element, attr) {

        scope.speakerTestInput = "";

        scope.playTestSound = function(){
            document.getElementById('audioTest').play();
        };

        scope.$watch('speakerTestInput', function(newValue, oldValue) {
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
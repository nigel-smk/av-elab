angular.module('app').directive('briefing', [function() {

    return {
        restrict: 'E',
        scope: {
            instructions: '='
        },
        templateUrl: '/app/session/briefing/briefingDir.html'
    }

}]);
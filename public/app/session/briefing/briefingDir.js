angular.module('app').directive('briefing', ['$window', function($window) {

    function link(scope, element, attrs) {

        //detect spacebar for continue
        angular.element($window).one('keydown', function(e) {
            if (e.keyCode == 32) {
                scope.$emit('briefingComplete');
            }
        });

    }

    return {
        restrict: 'E',
        scope: {
            instructions: '='
        },
        templateUrl: '/app/session/briefing/briefingDir.html',
        link: link
    }

}]);
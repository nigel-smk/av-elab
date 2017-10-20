angular.module('app').controller('youTubeCtrl', function($scope, YT_event, $window) {
    //initial settings
    var ctrl = this;

    ctrl.width = 800;
    ctrl.height = 600;
    ctrl.videoid = $scope.sessionData.youTubeId;
    ctrl.playerStatus = "NOT PLAYING";

    ctrl.YT_event = YT_event;

    ctrl.sendControlEvent = function(ctrlEvent) {
        console.log("SENDING");
        console.log(ctrlEvent);
        $scope.$broadcast(ctrlEvent);
    }

    $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
        ctrl.playerStatus = data;
    });
    
    $scope.$on('playerStopped', function(event, data) {
        $scope.$emit('stimulusComplete', data);
    });
    
    //detect spacebar to continue
    angular.element($window).one('keydown', function(e) {
        if (e.keyCode == 32) {
            ctrl.sendControlEvent('stopPlayer');
        }
    });

});
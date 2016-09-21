angular.module('app').controller('MainCtrl', function($rootScope, $scope, $window, $document, $interval, $http, $location, $sce, videoRecorderSvc, UM_Event, sessionAuth){
    'use strict';

    //TODO use events and listeners to drive the movement of the app. No giant if-then block.

    //VARIABLES
    var ctrl = this;
    ctrl.calibrationComplete = false;

    $scope.user = {};
    $scope.sessionData = {};
    ctrl.phase = "browser-detect";

    $scope.$on('calibrationComplete', function(event) {
        ctrl.calibrationComplete = true;
    });

    //PHASE CONTROL
    //TODO put phase control in a service?

    //detect mediaStreamReady and change to welcome phase
    $rootScope.$on(UM_Event.GOTSTREAM, function(event, stream, err){
        if (err){
            console.error(err);
        } else {
            //authenticate the session
            sessionAuth.then(function (res) {
                $scope.sessionData = res.data;
                ctrl.instructions = $scope.sessionData.instructions;
                ctrl.phase = 'welcome';
            }, function (res) {
                //ctrl.phase = 'invalid-url';
                //hacking to short circuit url validation
                ctrl.phase = 'welcome';
            });

        }
    });

    $rootScope.$on("FFORCHROME", function(event, stream, err){ //TODO is there a need for all of these parameters?
        if (err){
            console.error(err);
        } else {
            ctrl.phase = 'permissions';
        }
    });

    angular.element($window).on('keydown', function(e) {
        if (e.keyCode == 32) {
            switch(ctrl.phase) {
                case "welcome":
                    if (ctrl.calibrationComplete) {
                        ctrl.phase = "briefing";
                    }
                    break;
                case "briefing":
                    $scope.$broadcast('stimulusPhase');
                    videoRecorderSvc.record();
                    ctrl.phase = "stimulus";
                    break;
                case "stimulus":
                    $scope.$broadcast('stopPlayer');
                    videoRecorderSvc.stop();
                    $window.location = $scope.sessionData.redirect + "?sid=" + $scope.sessionData.sid + "&pid=" + $scope.sessionData.pid + "&stopTime=" + $scope.sessionData.stopTime;
                    break;
            }
        }
    });

});
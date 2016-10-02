angular.module('app').controller('MainCtrl', function($scope, $window, $location, videoRecorderSvc, sessionAuth){
    'use strict';

    var ctrl = this;

    $scope.user = {};
    $scope.sessionData = {};
    ctrl.phase = "browser-detect";

    $scope.$on("browserDetectionComplete", function(event){
        ctrl.phase = 'permissions';
    });

    $scope.$on('avAccessComplete', function(event){
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
    });
    
    $scope.$on('calibrationComplete', function(event) {
        ctrl.phase = "briefing";
    });

    $scope.$on('briefingComplete', function(event) {
        //videoRecorderSvc.record();
        //videoRecorderSvc.record($scope.sessionData);
        videoRecorderSvc.record({
            pid: $scope.sessionData.pid,
            sid: $scope.sessionData.sid
        });
        ctrl.phase = "stimulus";
    });
    
    $scope.$on('stimulusComplete', function(event, data) {
        videoRecorderSvc.stop();
        $scope.sessionData.stopTime = data;
        $window.location = $scope.sessionData.redirect + "?sid=" + $scope.sessionData.sid + "&pid=" + $scope.sessionData.pid + "&stopTime=" + $scope.sessionData.stopTime;
    });

});
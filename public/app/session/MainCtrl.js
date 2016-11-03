angular.module('app').controller('MainCtrl', function($scope, $window, $location, videoRecorderSvc, sessionAuth, activityDataSvc){
    'use strict';

    var ctrl = this;

    $scope.user = {};
    $scope.sessionData = null;
    ctrl.phase = "authenticating";

    sessionAuth.then(function (res) {
        $scope.sessionData = res.data;
        ctrl.instructions = $scope.sessionData.instructions;
        ctrl.phase = 'browser-detect'
        logActivity('login');
    }, function (res) {
        ctrl.phase = 'invalid-url';
    });

    $scope.$on("browserDetectionComplete", function(event){
        logActivity('browserDetection');
        ctrl.phase = 'permissions';
    });

    $scope.$on('avAccessComplete', function(event){
        logActivity('avAccess');
        ctrl.phase = 'welcome';
    });

    $scope.$on('calibrationComplete', function(event) {
        logActivity('calibration');
        ctrl.phase = "briefing";
    });

    $scope.$on('briefingComplete', function(event) {
        logActivity('briefing');
        videoRecorderSvc.record({
            token: $scope.sessionData.token,
            pid: $scope.sessionData.pid,
            sid: $scope.sessionData.sid
        });
        ctrl.phase = "stimulus";
    });

    $scope.$on('stimulusComplete', function(event, data) {
        logActivity('stimulus');
        videoRecorderSvc.stop();
        $scope.sessionData.stopTime = data;
        $window.location = $scope.sessionData.redirect + "?sid=" + $scope.sessionData.sid + "&pid=" + $scope.sessionData.pid + "&stopTime=" + $scope.sessionData.stopTime;
    });

    function logActivity(description) {
        activityDataSvc.create({
            pid: $scope.sessionData.pid,
            sid: $scope.sessionData.sid,
            description: description
        }, $scope.sessionData.token).then(
            //log failures to console?
        );
    }

});

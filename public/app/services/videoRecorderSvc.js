angular.module('app').factory("videoRecorderSvc", ["userMediaService", function(userMediaService) {

    //todo onDestroy? stop the stream

    var svc = this;
    //how else to init?
    svc.client = null;
    //audioContext
    svc.context = null;
    svc.micStream = null;
    svc.writeStream = null;
    var meta = {

    }

    function record(callback) {
        tapMic(function() {
            tapDestination(function() {
                initializeRecorder(svc.micStream, callback);
            });
        });
    }

    function stop() {
        svc.mediaRecorder.stop();
        svc.writeStream.end();
        svc.client.close();
    }

    function tapMic(callback) {
        userMediaService
            .then(function(stream){
                svc.micStream = stream;
                callback();
            });
    }

    function tapDestination(callback) {
        //swap in url dynamically
        svc.client = new BinaryClient('ws://localhost:3030/api/upload');

        svc.client.on('open', function() {
            if (!meta.filename) {
                meta.filename = "default.wav"
            }
            svc.writeStream = svc.client.createStream(meta);
            if (callback) { callback() };
        });
    }

    function initializeRecorder(stream, callback) {
        svc.mediaRecorder = new MediaRecorder(stream, { 'type': 'video/ogv; codecs=opus' });
        svc.mediaRecorder.ondataavailable = function(event) {
            svc.writeStream.write(event.data);
        };
        svc.mediaRecorder.start();
        if (callback) { callback() };
    }

    return {
        record: record,
        stop: stop
    }

}]);

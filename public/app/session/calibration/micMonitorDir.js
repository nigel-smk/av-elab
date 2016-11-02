angular.module('app')
    .directive('micMonitor', ['$window', 'userMediaService', function($window, userMediaService) {
        function link (scope, element, attrs){

            var rafID = null;
            var analyserContext = null;
            var analyserNode = null;

            //retrieve stream from getUserMedia
            userMediaService
                .then(function(stream){
                    //TODO rewrite as two functions: createAnalyser, createCanvas
                    
                    //create analyserNode
                    gotStream(stream);
                    //create canvas
                    var canvas = document.getElementById("analyser");
                    canvasWidth = canvas.width;
                    canvasHeight = canvas.height;
                    analyserContext = canvas.getContext('2d');
                    //start draw cycle
                    rafID = $window.requestAnimationFrame( updateAnalysers );
                });

            function gotStream(stream) {
                var audioContext = new $window.AudioContext();
                inputPoint = audioContext.createGain();

                // Create an AudioNode from the stream.
                realAudioInput = audioContext.createMediaStreamSource(stream);
                audioInput = realAudioInput;
                audioInput.connect(inputPoint);

                //    audioInput = convertToMono( input );

                analyserNode = audioContext.createAnalyser();
                analyserNode.fftSize = 2048;
                inputPoint.connect(analyserNode);
            }

            function updateAnalysers(){
                var SPACING = 3;
                var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

                analyserNode.getByteFrequencyData(freqByteData);

                analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
                analyserContext.fillStyle = '#F6D565';
                analyserContext.lineCap = 'round';
                var numBins = analyserNode.frequencyBinCount;
                var maxDec = analyserNode.maxDecibels;

                var freqSum = 0;
                for (var i = 0; i < numBins; ++i) {
                    freqSum += freqByteData[i];
                }
                var freqAvg = freqSum / numBins;
                analyserContext.fillStyle = "hsl( " + Math.round((freqAvg * 45) / -maxDec) + ", 100%, 50%)";
                analyserContext.fillRect(0, canvasHeight, canvasWidth, -freqAvg * 2);

                if (freqAvg > 50) {
                    scope.$emit('micTestPass');
                }

                $window.requestAnimationFrame( updateAnalysers );
            }

            var onDestroy = function() {
                $window.cancelAnimationFrame( rafID );
                rafID = null;
            }

        }

        return {
            restrict: 'E',
            template: "<div class='calibration-height'><canvas id='analyser' /></div>",
            link: link
        }
    }]);
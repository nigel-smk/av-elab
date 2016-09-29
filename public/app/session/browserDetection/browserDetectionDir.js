angular.module('app').directive('browserDetection', ['deviceDetector', function(deviceDetector) {
    
    function link(scope, element, attrs) {
        var data = deviceDetector;
        var version = data.browser_version.split('.')[0];
        var browser = data.browser;

        if (browser == 'chrome' && version >= 21){
            scope.$emit("browserDetectionComplete");
        }
    }
    
    return {
        restrict: 'E',
        template: '<h3 class="text-center">To use this webapp, you need to use the latest google Chrome browser.</h3>',
        link: link
    }
    
}]);
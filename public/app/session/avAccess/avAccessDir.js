angular.module('app')
    .directive('permissions', ['$rootScope', '$window', 'userMediaService', 'UM_Event', function($rootScope, $window, userMediaService, UM_Event) {
        function link (scope, element, attrs){
            scope.permissions = {};
            userMediaService
                .then(function(){
                    scope.permissions.state = 'granted';
                }, function(err){
                    if (err.name == 'PermissionDeniedError'){
                        scope.permissions.state = 'denied';
                    } else if (err.name == 'NotFoundError') {
                        scope.permissions.state = 'notFound';
                    }
                }
            );

            scope.continue = function(){
                $rootScope.$emit(UM_Event.GOTSTREAM);
            }

            scope.reload = function(){
                $window.location.reload();
            }
        }

        return {
            restrict: 'E',
            templateUrl: '/app/session/avAccess/avAccessDir.html',
            link: link
        }
    }]);
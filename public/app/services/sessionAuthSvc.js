angular.module('app').factory('sessionAuth', ['$location', '$http', function($location, $http){
    var pid = $location.search().pid;
    var sid = $location.search().sid;
    var sessionData = null;

    if (pid && sid) {
        return $http({
            method: 'POST',
            url: '/api/auth/session',
            data: {
                sid: sid,
                pid: pid
            }
        });
    } else {
        //run demo mode
        return $http.get('json/demoData.json');
    }

}]);
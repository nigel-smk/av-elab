angular.module('app').factory('sessionDataSvc', ['$http', function($http) {

    var url = '/api/sessionData'
    
    function create(data) {
        return $http({
            method: 'POST',
            url: url,
            data: data
        });
    }

    function get() {

    }

    function pushActivity(data) {
        return $http({
            method: 'PUT',
            url: url,
            data: data
        });
    }

    function remove() {

    }

    return {
        create: create,
        get: get,
        pushActivity: pushActivity,
        remove: remove
    }
}]);
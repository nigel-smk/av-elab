angular.module('app').factory('activityDataSvc', ['$http', function($http) {

    var url = '/api/activity'
    
    function create(data, token) {
        return $http({
            method: 'POST',
            url: url,
            headers: {
                'x-access-token': token
            },
            data: data
        });
    }

    return {
        create: create
    }
}]);
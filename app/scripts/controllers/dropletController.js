'use strict';
/*global DOControllers:false */

DOControllers.controller('dropletController', ['$scope', '$rootScope', '$location', '$routeParams', 'apiService', function($scope, $rootScope, $location, $routeParams, $api) {
    $scope.fetchDroplets = function(forced) {
        if (!$rootScope.droplets || forced) {
            // Loading droplets
            $scope.loader = true;
            $api.fetchDroplets(function(status, data, err) {
                $scope.loader = false;
                if (status) {
                    $rootScope.droplets = data;
                } else {
                    $scope.hasDroplets = false;
                }
            });
        }
    };

    $scope.id = $routeParams.id;

    // Fetching watcher (triggered fetch)
    $rootScope.$watch('fetch', function() {
        $scope.fetchDroplets(false);
    });

    // Reboot droplet
    $scope.reboot = function(dropletId) {
        $api.reboot(dropletId, function(data) {
        });
    };

    // View droplet details
    $scope.viewDropletDetails = function(dropletId) {
        $location.path('/droplets/'+dropletId);
    };

}]);
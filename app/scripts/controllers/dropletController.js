'use strict';
/*global DOControllers:false */

DOControllers.controller('dropletController', ['$scope', '$rootScope', 'apiService', function($scope, $rootScope, $api) {
    function fetchDroplets(forced) {
        if (!$scope.droplets || forced) {
            // Loading droplets
            $api.fetchDroplets(function(droplets) {
                if (droplets) {
                    $scope.droplets = droplets;
                }
            });
        }
    }

    // Fetching watcher (triggered fetch)
    $rootScope.$watch('fetch', function() {
        fetchDroplets(false);
    });

    // Reboot droplet
    $scope.reboot = function(dropletId) {
        $api.reboot(dropletId, function(data) {
            
        });
    };

}]);
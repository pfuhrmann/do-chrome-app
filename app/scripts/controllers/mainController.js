'use strict';
/*global DOControllers:false */

DOControllers.controller('mainController', ['$scope', '$rootScope', 'apiService', 'storageService', function($scope, $rootScope, $api, $storage) {
    function fetchDroplets() {
        if (!$rootScope.droplets) {
            // Loading droplets
            $api.fetchDroplets(function(droplets) {
                if (droplets) {
                    $rootScope.droplets = droplets;
                }
            });
        }
    }

    // Fetching watcher (triggered fetch)
    $rootScope.$watch('fetch', function() {
        fetchDroplets();
    });

    
}]);
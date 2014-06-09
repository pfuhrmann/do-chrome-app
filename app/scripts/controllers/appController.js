'use strict';
/*global DOControllers:false */

DOControllers.controller('appController', ['$scope', '$rootScope', '$location', 'storageService', 'apiService', function($scope, $rootScope, $location, $storage, $api) {
    // Load API credentials
    $api.loadCredentials(function(authorized) {
        $rootScope.authorized = authorized;
        if (authorized) {
            $rootScope.fetch = 'X';
        }
    });
    
    // Location watcher
    $rootScope.locationPath = '/droplets';
    $rootScope.$watch('locationPath', function() {
        $location.path($rootScope.locationPath);
    });

    // Authorization watcher
    $rootScope.authorized = 'loading';
    $rootScope.$watch('authorized', function() {
        $scope.authorizationStatus = $rootScope.authorized;
        // Not authorized, redirect to login
        if (!$rootScope.authorized) {
            $location.path('/login');
        }
    });
}]);
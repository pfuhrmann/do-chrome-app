'use strict';
/*global DOControllers:false */

DOControllers.controller('appController', ['$scope', '$location', 'storageService', 'apiService', function($scope, $location, $storage, $api) {
    var rootScope = $scope.$root;

    // Load API credentials
    $api.loadCredentials(function(authorized) {
        rootScope.authorized = authorized;
        if (authorized) {
            rootScope.fetch = 'X';
        }
    });
    
    // Location watcher
    rootScope.locationPath = '/main';
    rootScope.$watch('locationPath', function() {
        $location.path(rootScope.locationPath);
    });

    // Authorization watcher
    rootScope.authorized = 'loading';
    rootScope.$watch('authorized', function() {
        $scope.authorizationStatus = rootScope.authorized;
        // Not authorized, redirect to login
        if (!rootScope.authorized) {
            $location.path('/login');
        }
    });
}]);
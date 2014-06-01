'use strict';
/*global DOControllers:false */

DOControllers.controller('loginController', ['$scope', '$rootScope', 'apiService', 'storageService', function($scope, $rootScope, api, storage) {

    $scope.submit = function() {
        // Checking if we have details
        if (!$scope.clientId || !$scope.apiKey) {
            displayMessage(false, 'Fill out all fields');
            return;
        }

        // Testing connection to the DO servers
        $scope.authorizationStatus = 'loading';
        api.testAndLoad($scope.clientId, $scope.apiKey, function(authorized) {
            if (authorized) {
                // Store API Settings
                storage.store({'clientId': $scope.clientId, 'apiKey': $scope.apiKey});
                // Notify user
                displayMessage(true, 'Login successfull');
                // Redraw authorization status
                $scope.$root.authorized = true;
                // Fetch droplets
                $rootScope.fetch = 'fetch';
            } else {
                // Notify user
                displayMessage(false, 'Bad authorization details');
            }
            // Reset form
            $scope.clientId = '';
            $scope.apiKey = '';
        });
    };

    function displayMessage(status, message) {
        $scope.authorizationStatus = status;
        $scope.message = message;
    }
}]);
'use strict';
/*global DOControllers:false */

DOControllers.controller('loginController', ['$scope', 'apiService', 'storageService', function($scope, api, storage) {

    $scope.submit = function() {
        // Testing connection to the DO servers
        api.testAndLoad($scope.clientId, $scope.apiKey, function(authorized) {
            if (authorized) {
                // Store API Settings
                storage.store({'clientId': $scope.clientId, 'apiKey': $scope.apiKey});

                // Notify user
                $scope.message = 'Settings stored succesfully!';
                $scope.clientId = '';
                $scope.apiKey = '';
                $scope.$root.authorized = true;
            } else {
                $scope.message = 'Bad authorization details';
            }
        });
    };
}]);
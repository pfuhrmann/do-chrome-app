'use strict';
/*global DOServices:false */

DOServices.factory('apiService', ['$http', 'storageService', function($http, $storage) {
    var api = {};

    // Setup API credentials
    api.baseURL = 'https://api.digitalocean.com/v1';

    // Test authorization details and load droplets
    api.testAndLoad = function(clientID, apiKey, callback) {
        // Mapping API credentials
        this.clientID = clientID;
        this.key = apiKey;

        // Fetch droplets
        api.fetchDroplets(function(droplets) {
            if (droplets) {
                callback(true);
            } else {
                callback(false);
            }
        });
    };

    // Load droplets data
    api.fetchDroplets = function(callback) {
        // Call
        $http({method: 'GET', url: buildURL('droplets')}).
        success(function(data) {
            // Store droplets locally
            $storage.store({'droplets': data.droplets});
            callback(data.droplets);
        }).
        error(function() {
            callback(false);
        });
    };

    // Load droplets data
    api.loadCredentials = function(callback) {
        $storage.load(['clientId', 'apiKey'], function(data) {
            // First check if have API data
            var apiData = (data.clientId && data.apiKey) ? true : false;
            if (apiData) {
                api.clientID = data.clientId;
                api.key = data.apiKey;

                // Also testing actual connection
                api.testAndLoad(api.clientID , api.key, function(authorized) {
                    callback(authorized);
                });
            } else {
                // Not authorized
                callback(false);
            }
        });
    };

    function buildURL(slug) {
        return api.baseURL+'/'+slug+'/?client_id='+api.clientID+'&api_key='+api.key;
    }

    return api;
}]);
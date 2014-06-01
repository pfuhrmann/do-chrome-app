'use strict';
/*global DOServices:false */

DOServices.factory('apiService', ['$http', 'storageService', function($http, $storage) {
    var api = {};

    // Setup API credentials
    api.baseURL = 'https://api.digitalocean.com/v1';

    // Test authorization details and load
    api.testAndLoad = function(clientID, apiKey, callback) {
        // Mapping API credentials
        this.clientID = clientID;
        this.key = apiKey;

        // Call
        $http({method: 'GET', url: buildURL('/droplets')}).
        success(function(data) {
            // Store droplets
            $storage.store({'droplets': data.droplets});
            callback(true);
        }).
        error(function() {
            // Deleting API credentials (wrong)
            this.clientID = '';
            this.key = '';
            callback(false);
        });
    };

    // Load droplets data
    api.fetchDroplets = function(callback) {
        // Call
        console.log('fetching droplets');
        console.log(this.baseURL+'//?client_id='+this.clientID+'&api_key='+this.key);
        $http({method: 'GET', url: buildURL('/droplets')}).
        success(function(data) {
            // Store droplets
            $storage.store({'droplets': data.droplets});
            callback(data.droplets);
        }).
        error(function() {
            callback(false);
        });
    };

    // Load droplets data
    api.loadCredentials = function(callback) {
        console.log('locading credentials');
        $storage.load(['clientId', 'apiKey'], function(data) {
            var authorized = (data.clientId && data.apiKey) ? true : false;
            if (authorized) {
                api.clientID = data.clientId;
                api.key = data.apiKey;
            }
            console.log('credentials loaded');
            callback(authorized);
        });
    };

    function buildURL(slug) {
        return api.baseURL+'/'+slug+'/?client_id='+api.clientID+'&api_key='+api.key;
    }

    return api;
}]);
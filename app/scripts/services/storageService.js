'use strict';
/*global DOServices:false */

DOServices.factory('storageService', ['$http', function($http) {
    var storage = {};

    // Store data to local storage
    storage.store = function(data) {
        // Store API Settings
        chrome.storage.sync.set(data);
    };

    // Load data asynchronously
    storage.load = function(keys, callback) {
        // Store API Settings
        chrome.storage.sync.get(keys, function(data) {
            callback(data);
        });
    };

    return storage;
}]);
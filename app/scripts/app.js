'use strict';
/*global angular:false */
/*exported doChromeManager, DOControllers, DOServices */

// DI App Container - main app module
var doChromeManager = angular.module('doChromeManager', [
    'ngRoute',
    'DOControllers',
    'DOServices'
]);

// Containers
var DOControllers = angular.module('DOControllers', []);
var DOServices = angular.module('DOServices', []);

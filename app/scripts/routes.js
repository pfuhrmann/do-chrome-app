/*global doChromeManager:false */
'use strict';

doChromeManager.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            controller: 'appController'
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController'
        }).
        when('/droplets', {
            templateUrl: 'partials/droplets.html',
            controller: 'dropletController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
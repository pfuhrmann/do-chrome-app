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
        when('/droplets/:id', {
            templateUrl: 'partials/droplet_details.html',
            controller: 'dropletController'
        }).
        when('/about', {
            templateUrl: 'partials/about.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
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
        when('/main', {
            templateUrl: 'partials/main.html',
            controller: 'mainController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
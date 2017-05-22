// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.splash', {
        url: '/splash',
        views: {
            'menuContent': {
                templateUrl: 'templates/splash.html',
                controller: 'SplashCtrl'
            }
        }
    })
    .state('app.singin', {
        url: '/singin',
        views: {
            'menuContent': {
                templateUrl: 'templates/singin.html',
                controller: 'SinginCtrl'
            }
        }
    })
    
    .state('app.entercode', {
        url: '/entercode',
        views: {
            'menuContent': {
                templateUrl: 'templates/entercode.html',
                controller: 'EntercodeCtrl'
            }
        }
    })
    .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            }
        }
    })
    .state('app.menulist', {
        url: '/menulist',
        views: {
            'menuContent': {
                templateUrl: 'templates/menulist.html',
                controller: 'MenulistCtrl'
            }
        }
    })
    .state('app.sub-menu', {
        url: '/sub-menu',
        views: {
            'menuContent': {
                templateUrl: 'templates/sub-menu.html',
                controller: 'SubMenuCtrl'
            }
        }
    })
    .state('app.mycart', {
        url: '/mycart',
        views: {
            'menuContent': {
                templateUrl: 'templates/mycart.html',
                controller: 'MyCartCtrl'
            }
        }
    })
    .state('app.check-out', {
        url: '/check-out',
        views: {
            'menuContent': {
                templateUrl: 'templates/checkout.html',
                controller: 'CheckoutCtrl'
            }
        }
    })
    .state('app.offer', {
        url: '/offer',
        views: {
            'menuContent': {
                templateUrl: 'templates/offer.html',
                controller: 'OfferCtrl'
            }
        }
    })
    .state('app.order_cancel', {
        url: '/order_cancel',
        views: {
            'menuContent': {
                templateUrl: 'templates/order_cancel.html',
                controller: 'OrdercancelCtrl'
            }
        }
    })
    .state('app.contactUs', {
        url: '/contactUs',
        views: {
            'menuContent': {
                templateUrl: 'templates/contactUs.html',
                controller: 'contactUsCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/splash');
});


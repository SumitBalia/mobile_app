/* global angular, document, window */
'use strict';
angular.module('starter.controllers', ['ionic', 'ionic-toast', 'ngCordova'])
    .controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $ionicPlatform, $ionicPopup, $state) {
        // set default Path
        $scope.path = "http://nightcafe.in/";
        // $scope.path = "http://192.168.2.68/NightCafe/";
        $ionicPlatform.ready(function() {

            // Check for network connection
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.show({
                        title: 'No Internet Connection',
                        content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.',
                        buttons: [{
                            text: '<b>OK</b>',
                            type: 'button-positive',
                            onTap: function() {
                                window.close();
                                ionic.Platform.exitApp();
                            }
                        }]
                    }).then(function(result) {
                        if (!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });
        $scope.logout = function() {
            localStorage = localStorage.setItem('phonenumber', '');
        }
        $scope.loadmenu = function() {
                $state.go("app.menulist");
            }
            // Form data for the login modal
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;
        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }
        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////
        $scope.hideNavBar = function() {
            document.getElementsByClassName('navbar1')[0].style.display = 'none';
        };
        $scope.showNavBar = function() {
            document.getElementsByClassName('navbar1')[0].style.display = 'block';
        };
        $scope.noHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };
        $scope.setExpanded = function(bool) {
            $scope.isExpanded = bool;
        };
        $scope.setHeaderFab = function(location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;
            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }
            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };
        $scope.hasHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };
        $scope.hideHeader = function() {
            $scope.hideNavBar();
            // $scope.hideNavBar2();
            $scope.noHeader();
        };
        $scope.showHeader = function() {
            $scope.showNavBar();
            // $scope.hideNavBar2();
            $scope.hasHeader();
        };
        $scope.clearFabs = function() {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };

    })
    .controller('SplashCtrl', function($scope, $state, ionicMaterialInk, $ionicSideMenuDelegate, $ionicHistory, ionicToast) {
        $scope.hideHeader();
        $scope.hideNavBar();
        // $scope.hideNavBar2();
        $scope.noHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);
        $ionicSideMenuDelegate.canDragContent(false);
        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
        });
        $scope.checkLoggedIn = function() {
            window.localStorage['phonenumber'] = localStorage.getItem('phonenumber');
            if (!window.localStorage['phonenumber'] || !localStorage.getItem('area_id')) {
                $state.go("app.singin");
            } else {
                $state.go("app.map");
            }
        }
    })
    .controller('SinginCtrl', function($scope, $state, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicHistory, ionicToast, $templateCache, $cordovaDevice, $ionicPlatform, $ionicPopup) {
        // $ionicPlatform.ready(function() {
        //     var mydevice = $cordovaDevice.getDevice();
        //     $scope.uuid = mydevice.uuid;
        // });
        $scope.hideHeader();
        $scope.hideNavBar();
        // $scope.hideNavBar2();
        $scope.noHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        $ionicSideMenuDelegate.canDragContent(false);
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        // clear cache
        $templateCache.removeAll();
        $ionicHistory.clearCache();
        $scope.user = [];
        $scope.phonePattern = /^([7-8-9]{1})+([0-9]{9})$/;
        $scope.sign = function() {
            var mobilenumber = $scope.user.number;
            localStorage.setItem('phonenumber', mobilenumber);
            var phoneNumber = localStorage.getItem('phonenumber');
            $http({
                method: 'post',
                cache: false,
                url: $scope.path + 'index.php?route=mobileApi/login/loginWithOTP/',
                data: { "phone": $scope.user.number, "checkAuth": false }
            }).success(function(response) {
                ionicToast.show(response.message, 'bottom', false, 2000);
                if (response.status) {
                    $state.go("app.entercode");
                };
            }).error(function() {});
        }

        // clear history
        $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
        });

    })
    .controller('EntercodeCtrl', function($scope, $state, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicHistory, ionicToast, $templateCache, $ionicLoading) {
        $scope.hideHeader();
        $scope.hideNavBar();
        // $scope.hideNavBar2();
        $scope.noHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);
        $ionicSideMenuDelegate.canDragContent(false);
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        // clear cache
        $templateCache.removeAll();
        $ionicHistory.clearCache();
        // clear history
        $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
        });
        $scope.user = [];
        $scope.otpverify = function() {
            $ionicLoading.show({
                content: 'loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 3000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            var phoneNumber = localStorage.getItem('phonenumber');
            $http({
                method: 'post',
                cache: false,
                url: $scope.path + 'index.php?route=mobileApi/login/loginWithOTP/',
                data: { "otpcode": $scope.user.otp, "phone": phoneNumber }
            }).success(function(response) {
                $ionicLoading.hide();
                if (response.status) {
                    ionicToast.show('Congratulations you are successfully login', 'bottom', false, 2000);
                    if (response.AppKey) {
                        var appKey = localStorage.setItem('appKey', response.AppKey);
                        // console.log(response.AppKey);
                    }
                    $state.go("app.map");
                };
            }).error(function() {});
        }
    })
    .controller('MapCtrl', function($scope, $state, $http, ionicMaterialInk, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicHistory, $templateCache, ionicToast, $timeout) {
        $scope.hideHeader();
        $scope.hideNavBar();
        $scope.noHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);
        // clear cache
        $templateCache.removeAll();
        $ionicHistory.clearCache();
        $scope.init = function() {
                ionicToast.show('Dragging Marker and select your location', 'bottom', false, 2000);
                $scope.showLocationChoser();
                $cordovaGeolocation.getCurrentPosition().then(function(position) {
                    getLocation();
                }, function(err) {
                    $ionicPopup.show({
                        title: 'Please On Location Sharing',
                        content: 'Sorry, can not find your location please swich on location Sharing and try again.',
                        buttons: [{
                            text: '<b>OK</b>',
                            type: 'button-positive',
                            onTap: function() {
                                cordova.plugins.diagnostic.switchToLocationSettings();
                            }
                        }]

                    })

                });
            }
            // Map Code Starts Here
        var geocoder = new google.maps.Geocoder();
        var positionStore;
        var lat;
        var lng;
        var address;


        function geocodePosition(pos) {
            geocoder.geocode({
                latLng: pos
            }, function(responses) {
                if (responses && responses.length > 0) {
                    $scope.updateMarkerAddress(responses[0].formatted_address);
                } else {
                    $scope.updateMarkerAddress('Cannot determine address at this location.');
                }
            });
        }

        function updateMarkerPosition(latLng) {
            lat = latLng.lat();
            lng = latLng.lng();
            localStorage.setItem('latitude', lat);
            localStorage.setItem('longitude', lng);
        }
        $scope.updateMarkerAddress = function(str) {
            var d = document.getElementById("searchTextField");
            d.value = str;
            localStorage.setItem('locationaddress', str);
            d.className += " form-control";
            address = str;
        }

        function initialize(position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            localStorage.setItem('latitude', latLng.lat());
            localStorage.setItem('longitude', latLng.lng());
            var styleArray = [{
                featureType: "all",
                stylers: [
                    { saturation: -90 }
                ]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    { hue: "#2ecc71" },
                    { saturation: 100 }
                ]
            }, {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [
                    { visibility: "on" }
                ]
            }];
            var map = new google.maps.Map(document.getElementById('mapCanvas'), {
                zoom: 17,
                center: latLng,
                styles: styleArray,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                mapTypeControl: false
            });
            // Construct the circle for each value in citymap.
            // Note: We scale the area of the circle based on the population.
            var cityCircle = new google.maps.Circle({
                strokeColor: '#03b94d',
                strokeOpacity: 0.5,
                strokeWeight: 1,
                fillColor: '#03b94d',
                fillOpacity: 0.05,
                map: map,
                center: {
                    lat: 12.915261,
                    lng: 77.604482
                },
                radius: 7000
            });
            var userImage = "img/user_marker.png";
            var userMarker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: userImage,
                title: 'Your Location',
                animation: google.maps.Animation.DROP,
                draggable: true
            });
            // onClick selecting the autocomplete results
            var input = document.getElementById('searchTextField');
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            $timeout(function() {
                var predictionContainer = angular.element(document.getElementsByClassName('pac-container'));
                predictionContainer.attr('data-tap-disabled', true);
                predictionContainer.css('pointer-events', 'auto');
                predictionContainer.bind('click', function() {
                    element.find('input')[0].blur();
                });
            }, 500);
            // Update current position info.
            updateMarkerPosition(latLng);
            geocodePosition(latLng);
            // Add dragging event listeners.
            google.maps.event.addListener(userMarker, 'dragstart', function() {
                $scope.updateMarkerAddress('Dragging...');
            });
            google.maps.event.addListener(userMarker, 'drag', function() {
                updateMarkerPosition(userMarker.getPosition());
            });
            google.maps.event.addListener(userMarker, 'dragend', function() {
                geocodePosition(userMarker.getPosition());
            });
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                input.className = '';
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // Inform the user that the place was not found and return.
                    input.className = 'notfound';
                    return;
                }
                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                userMarker.setPosition(place.geometry.location);
                updateMarkerPosition(userMarker.getPosition());
                geocodePosition(userMarker.getPosition());
                //geocodePosition(marker.getPosition());
            });
        };

        $scope.showLocationChoser = function() {
            $cordovaGeolocation.getCurrentPosition().then(function(position) {
                getLocation();
            }, function(err) {
                $ionicPopup.show({
                    title: 'Please On Location Sharing',
                    content: 'Sorry, can not find your location please swich on location Sharing and try again.',
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function() {
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }]

                })

            });
        };
        window.getLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initialize);
            } else {

            }
        };
        $scope.sendLatLng = function() {
            $state.go("app.menulist");
            localStorage.setItem('coupon', '');
        }

    })
    .controller('MenulistCtrl', function($scope, $http, $ionicLoading, ionicMaterialInk, $ionicHistory, $templateCache, ionicToast, $state, $rootScope) {
        $scope.showNavBar();
        // $scope.hideNavBar2();
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        // clear cache
        $templateCache.removeAll();
        $ionicHistory.clearCache();
        $scope.menulistHideShow = true;
        $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 3000,
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });
        $scope.$parent.removeButton = function() {}
        $scope.$parent.cartButton = function() {}
        $scope.$parent.addButton = null;
        $scope.$parent.payButton = null;
        $scope.posts = [];
        var lat = localStorage.getItem('latitude');
        var lng = localStorage.getItem('longitude');
        var appKey = localStorage.getItem('appKey');
        var phoneNumber = localStorage.getItem('phonenumber');
        $scope.init = function() {
            if (lat == '' || lng == '') {
                $state.go("app.map");
            }
            $http({
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/',
                data: { "latitude": lat, "longitude": lng, "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                if (!response.status) {
                    if (lat == '' || lng == '') {
                        $state.go("app.map");
                    }
                    $http({
                        method: 'post',
                        url: $scope.path + 'index.php?route=mobileApi/login/',
                        data: { "phone": phoneNumber, "checkAuth": false }
                    }).success(function(response) {
                        var appKey = localStorage.setItem('appKey', response.AppKey);
                        $http({
                            cache: false,
                            method: 'post',
                            url: $scope.path + 'index.php?route=mobileApi/category/',
                            data: { "latitude": lat, "longitude": lng, "appKey": appKey, "phone": phoneNumber }
                        }).success(function(response) {
                            $scope.menulistHideShow = false;
                            $scope.posts = response.data.menu; // response data 
                            localStorage.setItem('itemtotal', response.itemTotal);
                            $rootScope.$broadcast("itemtotalUpdated");
                            localStorage.setItem('coupon', '');
                            var appKey = localStorage.setItem('appKey', response.AppKey);
                            var area_id = localStorage.setItem('area_id', response.area_id);
                            var areaDetails = localStorage.setItem('areaDetails', JSON.stringify(response.areaDetails));
                            $ionicLoading.hide();
                        });
                    });
                } else {
                    localStorage.setItem('itemtotal', response.itemTotal);
                    $rootScope.$broadcast("itemtotalUpdated");
                    $scope.menulistHideShow = false;
                    $scope.posts = response.data.menu; // response data 
                    var appKey = localStorage.setItem('appKey', response.AppKey);
                    var area_id = localStorage.setItem('area_id', response.area_id);
                    var areaDetails = localStorage.setItem('areaDetails', JSON.stringify(response.areaDetails));
                    $ionicLoading.hide();
                }
            });
        }
        $scope.sendId = function(id) {
            localStorage.setItem('id', id);
        }
    })
    .controller('SubMenuCtrl', function($scope, $http, $ionicLoading, ionicMaterialInk, $log, $rootScope, ionicToast) {
        $scope.showNavBar();
        // $scope.hideNavBar2();
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0,
            duration: 2000,
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });
        $scope.init = function() {
            loadSublist();
        }

        $scope.clear = function() {
                document.getElementById("search").value = '';
                loadSublist();
            }
            // Activate ink for controller
        ionicMaterialInk.displayEffect();
        $scope.$parent.removeButton = null;
        $scope.$parent.cartButton = function() {}
        $scope.$on('$stateChangeStart', function() {
            $scope.$parent.cartButton = null;
        });
        $scope.$parent.addButton = null;
        $scope.$parent.addButton = function() {}
        $scope.$on('$stateChangeStart', function() {});
        $scope.$parent.payButton = null;
        var menuId = parseInt(localStorage.getItem('id'));
        $scope.sublist = [];
        var appKey = localStorage.getItem('appKey');
        var area_id = parseInt(localStorage.getItem('area_id'));
        var phoneNumber = localStorage.getItem('phonenumber');

        function loadSublist() {
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/products/',
                data: { 'menuId': menuId, "appKey": appKey, "area_id": area_id, "phone": phoneNumber }
            }).success(function(response) {
                $scope.sublist = response.data.submenu;
                localStorage.setItem('itemtotal', response.data.itemTotal);
                $rootScope.$broadcast("itemtotalUpdated");
                var appKey = localStorage.setItem('appKey', response.AppKey);
                $ionicLoading.hide();
            });
        }
        $scope.$parent.clickPlus = function(id) {
            $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 3000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/cart/',
                data: { "productID": id, "type": "add", "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                if (response.status) {
                    ionicToast.show(response.message, 'bottom', false, 2000);
                    loadSublist();
                    $ionicLoading.hide();
                };
                if (response.AppKey) {
                    localStorage.setItem('appKey', response.AppKey);
                }
            }).error(function() {});
        }
        $scope.$parent.clickMinus = function(id) {
            $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 3000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/cart/',
                data: { "productID": id, "type": "minus", "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                if (response.status) {
                    ionicToast.show(response.message, 'bottom', false, 2000);
                    loadSublist();
                    $ionicLoading.hide();
                };
                if (response.AppKey) {
                    localStorage.setItem('appKey', response.AppKey);
                }
            }).error(function() {});
        }

    })
    .controller('MyCartCtrl', function($scope, $log, $http, $ionicLoading, ionicMaterialInk) {
        // $scope.showNavBar2();
        $scope.showNavBar();
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        $ionicLoading.show({
            duration: 3000,
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });
        $scope.$parent.addButton = null;
        $scope.$parent.payButton = function() {}
        $scope.$on('$stateChangeStart', function() {
            $scope.$parent.payButton = null;
        });
        $scope.$parent.removeButton = function() {}
        $scope.$parent.cartButton = null;
        // Activate ink for controller
        ionicMaterialInk.displayEffect();
        $scope.cart = [];
        $scope.subtotal = [];
        $scope.init = function() {
            loadCart();
            localStorage.setItem('coupon', '');
        }
        var appKey = localStorage.getItem('appKey');
        var phoneNumber = localStorage.getItem('phonenumber');
        var area_id = parseInt(localStorage.getItem('area_id'));
        var areaDetails = localStorage.getItem('areaDetails');
        var coupon = localStorage.getItem('coupon');

        function loadCart() {
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/miniCart/',
                data: { "appKey": appKey, "phone": phoneNumber, "area_id": area_id, "areaDetails": areaDetails, "coupon": coupon }
            }).success(function(data) {
                $scope.cart = data.data.cart_list; // response data
                $scope.subtotal = data.data.total; // response data
                $ionicLoading.hide();
                var appKey = localStorage.setItem('appKey', data.AppKey);
                // if($scope.subtotal < 250){

                // }
            });
        }
        $scope.$parent.clickPlus = function(id) {
            $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 3000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/cart/',
                data: { "productID": id, "type": "add", "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                if (response.status) {
                    loadCart();
                    $ionicLoading.hide();
                    var appKey = localStorage.setItem('appKey', response.AppKey);
                };
            }).error(function() {});
        }
        $scope.$parent.clickMinus = function(id) {
            $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 3000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/cart/',
                data: { "productID": id, "type": "minus", "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                if (response.status) {
                    loadCart();
                    $ionicLoading.hide();
                    var appKey = localStorage.setItem('appKey', response.AppKey);
                };
            }).error(function() {});
        }
        $scope.$parent.clickRemove = function(id) {
            $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 3000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/category/removeCart/',
                data: { "removeCartID": id, "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                if (response.status) {
                    loadCart();
                    $ionicLoading.hide();
                    var appKey = localStorage.setItem('appKey', response.AppKey);
                };
            }).error(function() {});
        }
    })
    .controller('OfferCtrl', function($scope, $http, $ionicLoading, ionicMaterialInk, $rootScope) {
        $scope.showNavBar();
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        ionicMaterialInk.displayEffect();
        $scope.menulistHideShow = true;
        $http({
            cache: false,
            method: 'post',
            url: $scope.path + 'index.php?route=mobileApi/category/offers'
        }).success(function(response) {
            $ionicLoading.show({
                content: 'loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0,
                duration: 2000,
                template: '<ion-spinner icon="ripple"></ion-spinner>'
            });
            $scope.offers = response.offers;
            localStorage.setItem('itemtotal', response.itemTotal);
            $rootScope.$broadcast("itemtotalUpdated");
        }).error(function() {

        });
        $scope.$parent.removeButton = function() {}
        $scope.$parent.cartButton = function() {}
        $scope.$parent.addButton = null;
        $scope.$parent.payButton = null;

    })
    .controller('contactUsCtrl', function($scope, $http, $ionicLoading, ionicMaterialInk, $rootScope) {
        $scope.showNavBar();
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        ionicMaterialInk.displayEffect();
        $scope.menulistHideShow = true;
        $http({
            cache: false,
            method: 'post',
            url: $scope.path + 'index.php?route=mobileApi/checkout/contactUs'
        }).success(function(response) {
            $scope.data = response;
            localStorage.setItem('itemtotal', response.itemTotal);
            $rootScope.$broadcast("itemtotalUpdated");
        }).error(function() {

        });
        $scope.$parent.removeButton = function() {}
        $scope.$parent.cartButton = function() {}
        $scope.$parent.addButton = null;
        $scope.$parent.payButton = null;

    })
.controller('OrdercancelCtrl', function($scope, $http, $ionicLoading, ionicMaterialInk, $rootScope, ionicToast) {
        $scope.showNavBar();
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        ionicMaterialInk.displayEffect();
        $scope.menulistHideShow = true;
        $scope.$parent.removeButton = function() {}
        $scope.$parent.cartButton = function() {}
        $scope.$parent.addButton = null;
        $scope.$parent.payButton = null;
        var appKey = localStorage.getItem('appKey');
        var phoneNumber = localStorage.getItem('phonenumber');
        $scope.itemtotal = localStorage.getItem('itemtotal');
        $scope.init = function() {
            $http({
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/checkout/history',
                data: { "appKey": appKey, "phone": phoneNumber }
            }).success(function(response) {
                ionicToast.show(response.message , 'bottom', false, 2000);
                var appKey = localStorage.setItem('appKey', response.AppKey);
                localStorage.setItem('itemtotal', response.itemTotal);
                $rootScope.$broadcast("itemtotalUpdated");
                if(response.orders.length < 1){
                    $scope.msg = response.message;
                }
                $scope.cancelData = response.orders;
                $scope.products = response.orders.products;
            }).error(function() {

            });

        }

        $scope.cancelOrder = function(order_id) {
            $http({
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/checkout/cancelOrder',
                data: { "appKey": appKey, "phone": phoneNumber, "order_id": order_id }
            }).success(function(response) {
                var appKey = localStorage.setItem('appKey', response.AppKey);
                localStorage.setItem('itemtotal', response.itemTotal);
                $rootScope.$broadcast("itemtotalUpdated");
                $scope.cancelData = response.orders;
                $scope.products = response.orders.products;
                ionicToast.show( response.message , 'bottom', false, 2000);
                $scope.init();

            }).error(function() {

            });
        }

    })
    .controller('CheckoutCtrl', function($scope, $http, $timeout, $ionicLoading, ionicMaterialInk, $ionicModal, $state, ionicToast, $rootScope) {
        $scope.showHeader();
        $scope.hasHeader();
        $scope.showNavBar();
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(true);
        $ionicLoading.show({
            duration: 2000,
            template: '<ion-spinner icon="ripple"></ion-spinner>'
        });
        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        $scope.$parent.removeButton = function() {}
        $scope.$parent.payButton = null;
        $scope.$parent.cartButton = function() {}
        $scope.phonePattern2 = /^([7-8-9]{1})+([0-9]{9})$/;
        $scope.email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/;

        $scope.checkout = [];
        $scope.checkout.address = localStorage.getItem('locationaddress');;
        $scope.checkout.choice = 'cod';
        var appKey = localStorage.getItem('appKey');
        var phoneNumber = localStorage.getItem('phonenumber');
        var area_id = parseInt(localStorage.getItem('area_id'));
        var areaDetails = localStorage.getItem('areaDetails');
        $scope.checkout.coupon = localStorage.getItem('coupon');
        $scope.itemtotal = localStorage.getItem('itemtotal');
        $http({
            cache: false,
            method: 'post',
            url: $scope.path + 'index.php?route=mobileApi/checkout/',
            data: { "appKey": appKey, "phone": phoneNumber, "areaDetails": areaDetails, "coupon": $scope.checkout.coupon }
        }).success(function(response) {
            var appKey = localStorage.setItem('appKey', response.AppKey);
            $scope.grandTotal = response.grandTotal;
            localStorage.setItem('itemtotal', response.itemTotal);
            $rootScope.$broadcast("itemtotalUpdated");
            if ($scope.itemtotal < 1) {
                $state.go("app.menulist");
            }
        }).error(function() {

        });
        $scope.couponApply = function() {
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/checkout/coupon/',
                data: { "appKey": appKey, "phone": phoneNumber, "areaDetails": areaDetails, "coupon": $scope.checkout.coupon }
            }).success(function(response) {
                localStorage.setItem('coupon', $scope.checkout.coupon);
                ionicToast.show('Coupon Applyed successfully', 'bottom', false, 2000);
                if (response.status) {
                    // thankyou page
                    var appKey = localStorage.setItem('appKey', response.AppKey);
                    $scope.grandTotal = response.grandTotal;
                };
            })
        }
        $scope.sendForm = function() {
            $ionicLoading.show();
            $http({
                cache: false,
                method: 'post',
                url: $scope.path + 'index.php?route=mobileApi/checkout/confirmOrder/',
                data: { "appKey": appKey, "phone": phoneNumber, "areaDetails": areaDetails, "coupon": $scope.checkout.coupon, "userName": $scope.checkout.name, "userPhone": $scope.checkout.number, "userAltPhone": $scope.checkout.number2, "userEmail": $scope.checkout.email, "userLandMark": $scope.checkout.landMark, "userDay": $scope.checkout.day, "userTime": $scope.checkout.time, "userNote": $scope.checkout.msg, "paymentMethod": $scope.checkout.choice, "userAddress": $scope.checkout.address }
            }).success(function(response) {
                if (response.status) {
                    // thankyou page
                    localStorage.setItem('coupon', '');
                    localStorage.setItem('itemtotal', '');
                    var appKey = localStorage.setItem('appKey', response.AppKey);
                    $ionicModal.fromTemplateUrl('templates/thankyou.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                        $ionicLoading.hide();
                        $scope.modal.show();
                    });
                };
            }).error(function() {

            });
        }
    })
    .controller('MenuHeaderCtrl', function($scope, $rootScope) {
        $scope.$on('itemtotalUpdated', function(event, args) {
            $scope.itemtotal = localStorage.getItem('itemtotal');
        });
    });

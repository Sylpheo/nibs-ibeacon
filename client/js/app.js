var app = angular.module('nibs_ibeacon', ['ionic', 'openfb', 'nibs_ibeacon.config', 'nibs_ibeacon.profile', 'nibs_ibeacon.auth', 'nibs_ibeacon.offer', 'nibs_ibeacon.store-locator', 'nibs_ibeacon.settings', 'nibs_ibeacon.case'])

    .run(function ($window, $location, $rootScope, $state, $ionicPlatform, $http, OpenFB, FB_APP_ID, SERVER_URL) {
         
        var user = JSON.parse($window.localStorage.getItem('user'));

        //console.log(user);

        $rootScope.user = user;
        //console.log($rootScope.user);
        //console.log('firstname of connected user : ' + $rootScope.user.firstName);
        //console.log('points of connected user : ' + $rootScope.user.points);

        $rootScope.server = {
            url: SERVER_URL || location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
        };

        // Intialize OpenFB Facebook library
        OpenFB.init(FB_APP_ID, $window.localStorage);

        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleLightContent();
                             var logToDom = function (message) {
                             var e = document.createElement('label');
                             e.innerText = message;
                             
                             var br = document.createElement('br');
                             var br2 = document.createElement('br');
                             document.body.appendChild(e);
                             document.body.appendChild(br);
                             document.body.appendChild(br2);
                             
                             window.scrollTo(0, window.document.height);
                             };
                             
                             
                             /***********************************************
                              *   NOTIFICATIONS
                              **********************************************/
                             
                             window.plugin.notification.local.cancelAll(function () {}, $rootScope);
                             
                             window.plugin.notification.local.onclick = function (id, state, json) {
                                var major = JSON.parse(json).type;
                                if (major === 1627) {
                                    window.location.href = '#/app/profile';
                             
                                } else if (major === 1629) {
                                    window.location.href = '#/app/offers';
                                }
                             }
                             
                             /***********************************************
                              *   DELEGATES
                              **********************************************/
                             
                             var delegate = new cordova.plugins.locationManager.Delegate();
                             
                             delegate.didDetermineStateForRegion = function (pluginResult) {
                             
                                console.log('didDetermineStateForRegion:', JSON.stringify(pluginResult));
                                console.log('connected user 2 : ' + $rootScope.user);
                             
                                if(pluginResult.state === "CLRegionStateInside"){
                             
                                    if (pluginResult.region.major === 1627) {
                                        window.plugin.notification.local.add({ message: 'Welcome to your store !',
                                                                         badge           : 0,
                                                                         id             : 1,
                                                                         json:       JSON.stringify({ type: 1627 })
                                        });
                                    }
                                    if (pluginResult.region.major === 1629 && $rootScope.user != null) {
                                        window.plugin.notification.local.add({ message: 'You\'ve got ' + $rootScope.user.points + ' points. Discover our fidelity offers !',
                                                                  badge           : 0,
                                                                  id             : 1,
                                                                  json:       JSON.stringify({ type: 1629 })
                                        });
                                    }
                                } /*else if(pluginResult.state === "CLRegionStateOutside"){
                                //OUTSIDE REGION
                                    window.plugin.notification.local.add({ message: 'À bientôt !',
                                                                         badge           : 0,
                                                                         id             : 1});
                                }*/
                             };
                             
                             cordova.plugins.locationManager.setDelegate(delegate);
                             
                             /***********************************************
                              *   BEACON CONFIGURATION
                              **********************************************/
                             
                             /* Beacon 1 - Bienvenue dans la chambre */
                             var uuid = '85FC11DD-4CCA-4B27-AFB3-876854BB5C3B';
                             var identifier = 'SmartBeacon_02318';
                             var minor = 942;
                             var major = 1629;
                             var beaconRegion1 = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor, true);
                             
                             cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion1)
                             .fail(console.error)
                             .done();
                             
                             /* Beacon 2 - Bienvenue dans l'hôtel */
                             uuid = '85FC11DD-4CCA-4B27-AFB3-876854BB5C3B';
                             identifier = 'SmartBeacon_02316';
                             minor = 941;
                             major = 1627;
                             var beaconRegion2 = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor, true);
                             
                             cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion2)
                             .fail(console.error)
                             .done();
                             
                             /***********************************************
                              *   PLUGIN CONFIGURATION
                              **********************************************/
                             
                             cordova.plugins.locationManager.requestAlwaysAuthorization();
                             cordova.plugins.locationManager.disableDebugLogs();

            }

        });

        // Re-route to welcome street if we don't have an authenticated token
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.name !== 'start.login' && toState.name !== 'start.signup' && toState.name !== 'start.welcome' && toState.name !== 'app.logout' && !$window.localStorage.getItem('token')) {
                console.log('Aborting state ' + toState.name + ': No token');
                $state.go('start.welcome');
                event.preventDefault();
            }
        });

        $state.go('app.profile');
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //$ionicConfigProvider.views.maxCache(0);
        $stateProvider

            .state('start', {
                url: "/start",
                abstract: true,
                templateUrl: "templates/start.html"
            })

            .state('start.welcome', {
                url: "/welcome",
                views: {
                    'pageContent': {
                        templateUrl: "templates/welcome.html"
                    }
                }
            })

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

    })

    // XMLHTTPRequest Interceptor.
    // Outbound: Adds access token to HTTP requests before they are sent to the server.
    // Inbound: Handles 401 (Not Authorized) errors by loading the Login page
    .factory('AuthInterceptor', function ($rootScope, $window, $q, $location) {

        return {
            request: function (config) {
                $rootScope.loading = true;
                config.headers = config.headers || {};
                if ($window.localStorage.getItem('token')) {
                    config.headers.authorization = $window.localStorage.getItem('token');
                }
                return config || $q.when(config);
            },
            requestError: function (request) {
                console.log('request error');
                $rootScope.loading = false;
                return $q.reject(request);
            },
            response: function (response) {
                $rootScope.loading = false;
                return response || $q.when(response);
            },
            responseError: function (response) {
                console.log(JSON.stringify(response));
                $rootScope.loading = false;
                if (response && response.status === 401) {
                    // TODO: broadcast event instead.
                    $location.path('/start/welcome');
                } else if (response && response.status !== 404) {
                    console.log(response);
                    // alert(response.data);
                }
                return $q.reject(response);
            }
        };
    })

    // Add the AuthInterceptor declared above
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });

    function handleOpenURL(url) {
        console.log('url', url);
        //window.location.href = '#/app/offers/qrcode';
        var prefix = 'accor://';
        var result = '#/app/'+ url;
        console.log('result', result);
        window.location.href = result;
    }


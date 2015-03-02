angular.module('nibs_ibeacon.auth', ['openfb', 'nibs_ibeacon.config', 'nibs_ibeacon.profile'])

    /*
     * Routes
     */
    .config(function ($stateProvider) {

        $stateProvider

            .state('start.login', {
                url: "/login",
                views: {
                    'pageContent': {
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            })

            .state('start.logout', {
                url: "/logout",
                views: {
                    'pageContent': {
                        templateUrl: "templates/welcome.html",
                        controller: "LogoutCtrl"
                    }
                }
            })

            .state('start.signup', {
                url: "/signup",
                views: {
                    'pageContent': {
                        templateUrl: "templates/signup.html",
                        controller: "SignupCtrl"
                    }
                }
            })

    })

    /*
     * REST Resources
     */
    .factory('Auth', function ($http, $window, $rootScope) {

        return {
            login: function (user) {
                return $http.post($rootScope.server.url + '/login', user)
                    .success(function (data) {
                        $rootScope.user = data.user;
                        $window.localStorage.user = JSON.stringify(data.user);
                        $window.localStorage.token = data.token;

                        console.log('Subscribing for Push as ' + data.user.email);
                        if (typeof(ETPush) != "undefined") {
                            ETPush.setSubscriberKey(
                                function () {
                                    console.log('setSubscriberKey: success');
                                },
                                function (error) {
                                    alert('Error setting Push Notification subscriber');
                                },
                                data.user.email
                            );
                        }

                    });
            },
            fblogin: function (fbUser) {
                console.log(JSON.stringify(fbUser));
                return $http.post($rootScope.server.url + '/fblogin', {
                    user: fbUser,
                    token: $window.localStorage['fbtoken']
                })
                    .success(function (data) {
                        $rootScope.user = data.user;
                        $window.localStorage.user = JSON.stringify(data.user);
                        $window.localStorage.token = data.token;

                        console.log('Subscribing for Push as ' + data.user.email);
                        if (typeof(ETPush) != "undefined") {
                            ETPush.setSubscriberKey(
                                function () {
                                    console.log('setSubscriberKey: success');
                                },
                                function (error) {
                                    alert('Error setting Push Notification subscriber');
                                },
                                data.user.email
                            );
                        }

                    });
            },
            logout: function () {
                $rootScope.user = undefined;
                var promise = $http.post($rootScope.server.url + '/logout');
                $window.localStorage.removeItem('user');
                $window.localStorage.removeItem('token');
                return promise;
            },
            signup: function (user) {
                return $http.post($rootScope.server.url + '/signup', user);
            }
        }
    })

    /*
     * Controllers
     */
    .controller('LoginCtrl', function ($scope, $rootScope, $state, $window, $location, $ionicViewService, $ionicPopup, $ionicModal, Auth, OpenFB, User) {

        /*$ionicModal.fromTemplateUrl('templates/server-url-setting.html', {
         scope: $scope,
         animation: 'slide-in-up'
         }).then(function(modal) {
         $scope.modal = modal;
         });
         $scope.openAppDialog = function() {
         $scope.modal.show();
         };

         $scope.$on('modal.hidden', function(event) {
         $window.localStorage.setItem('serverURL', $rootScope.server.url);
         });*/

        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem('token');

        $scope.user = {};

        $scope.login = function () {

            Auth.login($scope.user)
                .success(function (data) {
                    console.log('user.get');
                    console.log(data)
                    User.get().success(function(data2) {
                        console.log(data2);
                        $window.localStorage.user = JSON.stringify(data2);
                        $rootScope.user = data2;
                        $state.go("app.profile");
                    });
                })
                .error(function (err) {
                    $ionicPopup.alert({title: 'Oops', content: err});
                });
        };

        $scope.facebookLogin = function () {

            OpenFB.login('email,read_stream,publish_stream').then(
                function () {
                    OpenFB.get('/me', {fields: 'id,first_name,last_name,email,picture,birthday,gender'})
                        .success(function (fbUser) {
                            Auth.fblogin(fbUser)
                                .success(function (data) {
                                    User.get().success(function(data2) {
                                        console.log(data2);
                                        $window.localStorage.user = JSON.stringify(data2);
                                        $rootScope.user = data2;
                                        $state.go("app.profile");
                                        setTimeout(function () {
                                            $ionicViewService.clearHistory();
                                        });
                                    });
                                })
                                .error(function (err) {
                                    console.log(JSON.stringify(err));
                                    $ionicPopup.alert({title: 'Oops', content: err});
                                })
                        })
                        .error(function () {
                            $ionicPopup.alert({title: 'Oops', content: "The Facebook login failed"});
                        });
                },
                function () {
                    $ionicPopup.alert({title: 'Oops', content: "The Facebook login failed"});
                });
        };

    })

    .controller('LogoutCtrl', function ($rootScope, $window) {
        console.log("Logout");
        $rootScope.user = null;
        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem('token');

    })

    .controller('SignupCtrl', function ($scope, $state, $ionicPopup, Auth, OpenFB) {

        $scope.user = {};

        $scope.signup = function () {
            if ($scope.user.password !== $scope.user.password2) {
                $ionicPopup.alert({title: 'Oops', content: "passwords don't match"});
                return;
            }
            Auth.signup($scope.user)
                .success(function (data) {
                    $state.go("start.login");
                });
        };

        $scope.facebookLogin = function () {

            OpenFB.login('email,read_stream,publish_stream').then(
                function () {
                    OpenFB.get('/me', {fields: 'id,first_name,last_name,email,picture,birthday,gender'})
                        .success(function (fbUser) {
                            Auth.fblogin(fbUser)
                                .success(function (data) {
                                    $state.go("app.profile");
                                    setTimeout(function () {
                                        $ionicViewService.clearHistory();
                                    });
                                })
                                .error(function (err) {
                                    $ionicPopup.alert({title: 'Oops', content: err});
                                })
                        })
                        .error(function () {
                            $ionicPopup.alert({title: 'Oops', content: "The Facebook login failed"});
                        });
                },
                function () {
                    $ionicPopup.alert({title: 'Oops', content: "The Facebook login failed"});
                });
        };

    });

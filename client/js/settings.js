angular.module('nibs_ibeacon.settings', ['openfb', 'nibs_ibeacon.activity'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html",
                        controller: "SettingsCtrl"
                    }
                }
            })

    })

    .controller('SettingsCtrl', function ($scope, $rootScope, $window, $ionicPopup, $document, $state, OpenFB, Activity) {

        $scope.deleteActivities = function () {
            Activity.deleteAll().success(function () {
                $rootScope.user.status = 1;
                $ionicPopup.alert({title: 'Nibs', content: 'Activities deleted'});
            });
        };

        $scope.logout = function () {
            $rootScope.user = null;
            $window.localStorage.removeItem('user');
            $window.localStorage.removeItem('token');
            $state.go('start.welcome');
        };

        $scope.logoutAndRevoke = function () {
            if (OpenFB.isLoggedIn()) {
                OpenFB.revokePermissions().then(function () {
                    $rootScope.user = null;
                    $window.localStorage.removeItem('user');
                    $window.localStorage.removeItem('token');
                    $state.go('start.welcome');
                });
            } else {
                $ionicPopup.alert({
                    title: 'Error',
                    content: 'You need to be logged in with a Facebook user to use this option.'
                });
            }
        };

    });
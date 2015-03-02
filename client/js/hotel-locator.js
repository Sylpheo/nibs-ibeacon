angular.module('nibs_ibeacon.hotel-locator', [])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.hotel-locator', {
                url: "/hotel-locator",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/hotel-locator.html",
                        controller: "HotelLocatorCtrl"
                    }
                }
            });

    })

    // Services
    .factory('Hotel', function ($http, $rootScope) {
        return {
            all: function() {
                return $http.get($rootScope.server.url + '/hotels');
            }
        };
    })

    //Controllers
    .controller('HotelLocatorCtrl', function ($scope, Hotel) {

        var map,
            currentPosMarker,

            icon = L.icon({
                iconUrl: 'img/icone-hotel.png',
                //shadowUrl: 'img/leaf-shadow.png',
                iconSize:     [38, 44], // size of the icon
                //shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [19, 44], // point of the icon which will correspond to marker's location
                //shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
            });

        Hotel.all().success(function(hotels) {
            $scope.hotels = hotels;
            for (var i=0; i<hotels.length; i++) {
                var hotel = hotels[i];
                L.marker([hotel.latitude, hotel.longitude], {icon: icon}).addTo(map);
            }
        });

        $scope.getLocation = function() {
            map.locate({setView: true, maxZoom: 16});
        };

        setTimeout(function () {
            // create a map in the "map" div, set the view to a given place and zoom
            map = L.map('map', {zoomControl: false}).setView([37.7958340, -122.3940350], 14);

            L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
                {detectRetina: true,
                    minZoom: 1,
                    maxZoom: 17,
                    attribution: 'Tiles &copy; 2014 esri.com'}).addTo(map);

            map.on('locationfound', onLocationFound);
            $scope.getLocation();

        });

        $scope.showLocation = function(position) {
            map.panTo(position);
        };

        function onLocationFound(e) {
            var pos = e.latlng;
            console.log(pos);
            if (!currentPosMarker) {
                currentPosMarker = L.marker(pos).addTo(map);
            } else {
                currentPosMarker.setLatLng(pos);
            }
            $scope.showLocation(pos);
        }

    });
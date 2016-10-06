var app = angular.module('client');



app.controller('HomeCtrl',
  function($scope, $http, uiGmapGoogleMapApi, $rootScope, HomeService){
    var _ = window._;

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.map = {
        center: {
          latitude: 49.282,
          longitude: -123.120 },
        options: $scope.mapOptions,
        zoom: 8,
      };
      $scope.getNotes();
      console.log($rootScope.currentUser);
      $scope.windowOptions = {
        show: false
      };


    });


    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjRHF2xot_O23hvqTa7OCshWx1KcBQ37k&callback=initMap";


    $scope.getNotes = function() {
      $http.get('/api/notes').success(function (response) {
        console.log("Notes retrieved");
        $scope.allNotes = _.map(response.notes, function(note){
          return {
            id: note._id,
            title: note.title,
            body: note.body,
            latitude: note.latitude,
            longitude: note.longitude
          }
        });
        console.log($scope.allNotes);
      });
    };
    // events associative array, can also be as a field in the map instantiation
    // in html, would set events= 'map.events'
    $scope.events = {
      tilesloaded: function (map, eventName, originalEventArgs) {
        //map is ready when this callback is hit
      },
      "click": function (mapModel, eventName, args) {
        var e = args[0];
        HomeService.latLng.lat = e.latLng.lat().toFixed(6);
        HomeService.latLng.lng = e.latLng.lng().toFixed(6);
        //scope apply required because this event handler is outside of the angular domain
        $scope.$apply();
      }
    }


    $scope.markerClick = function(marker){
     $scope.windowOptions.show = true;
      $scope.selectedMarker = marker.model;
      console.log(marker);
      console.log($scope.selectedMarker);
    }

    $scope.closeClick = function () {
      $scope.windowOptions.show = false;
    };



  });
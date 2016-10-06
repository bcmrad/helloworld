var app = angular.module('client');

app.service('HomeService', function ($http, $location, $rootScope) {
  this.latLng = {
    lat: 0,
    lng: 0
  };
});
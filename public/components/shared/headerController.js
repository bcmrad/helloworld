var app = angular.module('client');

app.controller('HeaderCtrl',
  function($scope, $http, SessionService, HomeService){
    $scope.latLng = HomeService.latLng;

    $scope.logout = function(){
      SessionService.logout();
    }

    $scope.isLoggedIn = function(){
      return SessionService.isLoggedIn();
    }

    $scope.createNote = function(){
      var noteData = {
        title: $scope.noteTitle,
        body: $scope.noteBody,
        latitude: $scope.latLng.lat,
        longitude: $scope.latLng.lng
      };
      $http.post('/api/notes', noteData).success(function(response){
        console.log(response);
      });
    };
  });
var app = angular.module('client');              //client module was defined in app.js (is this waiting for client module to be created?)

app.controller('LoginCtrl',
function($scope, $http, SessionService, $rootScope, $location){
  $scope.attemptLogin = function(){
    $http.post('/api/session/login', $scope.user).success(function(response){
      console.log(response);
      $rootScope.currentUser = response.user;
      $location.path("/home");
    })
  };

  
  
  
  
});
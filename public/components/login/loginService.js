var app = angular.module('client');

app.service('SessionService', function ($http, $location, $rootScope) {

  this.currentUser = {};

  this.logout = function(){
    $http.get('/api/session/logout').success(function(response){
      console.log(response);
      $rootScope.currentUser = undefined;
      $location.path("/login");
    });
  }

  this.isLoggedIn = function(){
    return !!$rootScope.currentUser;
  }
});
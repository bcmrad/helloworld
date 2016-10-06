/*require('./login/loginController');
require('./home/homeController');
require('./signup/signupController');
*/
var client = angular.module('client', ['ngRoute', 'uiGmapgoogle-maps']);                                                             //stuff in square brackets is "dependencies" -> separate controllres


client.run(function($rootScope, $http, $location){
  $http.get('/api/users/bySession').success(function(response) {
    $rootScope.currentUser = response;
    $location.path("/home");
    console.log($rootScope.currentUser);
  }).error(function(error){
    $location.path("/login");
    console.log("Fail");
  });
});

//configure routes
client.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {


    $routeProvider.
      when('/login', {
        templateUrl: 'components/login/loginView.html',  //links view to its controller and url
        controller: 'LoginCtrl'
      }).
      when('/home',{
        templateUrl: 'components/home/homeView.html',
        controller: 'HomeCtrl'
      }).
       when('/signup',{
        templateUrl: 'components/signup/signupView.html',
        controller: 'SignupCtrl'
      }).
      when('/', {
        templateUrl: 'components/login/loginView.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/404'
      });
   //$locationProvider.html5Mode(true);
  }
  ]);

client.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCjRHF2xot_O23hvqTa7OCshWx1KcBQ37k',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});


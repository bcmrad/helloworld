var app = angular.module('client');

app.controller('SignupCtrl',
function($scope, $http){
  $scope.addUser = function(){
    if ($scope.user.password === $scope.confirm.password) {
      $http.post('/api/signup', $scope.user).success(function (response) {
        console.log(response);

      })
    }
    else{
      alert("Passwords do not match.");
    }
  };

  
  
  
  
});
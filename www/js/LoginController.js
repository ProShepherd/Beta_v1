angular.module('asbike.LoginCtrl', [])

.controller('LoginCtrl', ['$scope', 'LoginService', '$ionicPopup', '$state',  function($scope, LoginService, $ionicPopup, $state) {
    
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tabs.home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

}]); 
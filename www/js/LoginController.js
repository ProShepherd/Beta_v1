angular.module('asbike.LoginCtrl', [])

.controller('LoginCtrl', ['$scope', 'LoginService', '$ionicPopup', '$state',  function($scope, LoginService, $ionicPopup, $state) {
    
    $scope.isEventLogin = false;
    
    $scope.data = {
        loginHelp:'',
        loginType:'Event Login'
    };
    
    $scope.swapLogin = function() {
        $scope.isEventLogin = !$scope.isEventLogin;
        if($scope.isEventLogin) {
            $scope.data.loginType = 'Event Login';
        }
        else {
            $scope.data.loginType = 'Rider Login';
        }
    };
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tabs.home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    };

}]); 
angular.module('asbike.HomeCtrl', ['firebase'])

.controller('HomeCtrl', ['$scope', 'AlertFactory', 'UserFactory', '$cordovaGeolocation',  function($scope, AlertFactory, UserFactory, $cordovaGeolocation) {
    
    $scope.init = function(){
        
        $scope.alerts = {};
        $scope.user = {};
        $scope.watchOptions = {
            timeout : 5000,
            enableHighAccuracy: false // may cause errors if true
        };
        
        AlertFactory('Test-Event', 'uid-test-1').$bindTo($scope, 'alerts').then(function() {
            
            //Check to see if the user has any active requests
            angular.forEach($scope.alerts, function(key, value) {
                if(key && key.alertStatus) {
                    
                    if(key.alertStatus !== "Step4"){
                        $scope.activeRequest = true;
                        $scope.alertTimestamp = value;    
                    }
                    
                }
            });
            
            console.log($scope.alerts);
        });
        
        
        UserFactory('Test-Event', 'uid-test-1').$bindTo($scope, 'user').then(function() {
            console.log($scope.user);
        });
        
    };
    
    
    $scope.getCurrentLocation = function(){
    
        $scope.currentLocation = $cordovaGeolocation.watchPosition($scope.watchOptions);
        
        $scope.currentLocation.then(
        null,
        function(err) {
          console.log(err);
        },
        function(position) {    
            $scope.user.latitude = position.coords.latitude;
            $scope.user.longitude = position.coords.longitude;
        });
        
    }
    
    
    $scope.addAlertNotification = function(type) {
        
        $scope.alertTimestamp = Date.now();
        
        var newAlert = {
            alertStatus: "Step1", 
            alertType: type
        };
            
        $scope.alerts[$scope.alertTimestamp] = newAlert;
        $scope.activeRequest = true;
        $scope.getCurrentLocation();
        
    };
    
    
    $scope.resolveRequest = function() {            
        
        angular.forEach($scope.alerts, function(key, value) {
            if(key && key.alertStatus) {
                key.alertStatus = "Step4";
            }
        });
        
        $scope.currentLocation.clearWatch();
        $scope.activeRequest = false;
        
    };
    
    
    $scope.init();
    
    
    $scope.$watch('alerts', function(alerts) {
        if($scope.alertTimestamp && $scope.alerts[$scope.alertTimestamp].alertStatus == "Step4") {
            $scope.activeRequest = false;
            $scope.currentLocation.clearWatch();
        }
    });

}]); 
angular.module('asbike.AlertFactory', [])

.factory('AlertFactory', ['$firebaseObject', function($firebaseObject) {
   
    return function(strEventName, userID) {
       var userAlertRef = new Firebase('https://proshepard.firebaseio.com/Events/' + strEventName + '/users/' + userID + '/Alerts');
       return $firebaseObject(userAlertRef);
   }
    
}]);
angular.module('asbike.UserFactory', [])

.factory('UserFactory', ['$firebaseObject', function($firebaseObject) {
   
    return function(strEventName, userID) {
       var userRef = new Firebase('https://proshepard.firebaseio.com/Events/' + strEventName + '/users/' + userID);
       return $firebaseObject(userRef);
   }
    
}]);
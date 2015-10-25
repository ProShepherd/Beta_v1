angular.module('asbike.AlertService', [])

.service('AlertService', ['AlertFactory', function(AlertFactory) {
   
    var self = this;
    
    this.alerts = {};
    
    this.bindAlerts = function(strEventName, userID){
        
        AlertFactory(strEventName, userID).$bindTo(this, 'alerts').then(function() {
            console.log(this.alerts);
        });
        
    };
    
}]);
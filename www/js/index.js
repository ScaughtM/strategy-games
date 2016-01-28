
/**
 * Initializes the application
 *
 * Contains the main drivers for various components of the game
 */
var app = {
    /**
     * Application Constructor
     */
    initialize: function() {

        this.bindEvents();
    },

    /**
     * Binds Event Listeners
     *
     * Bind any events that are required on startup.
     */
    bindEvents: function() {
        // disables the back button on android devices
        document.addEventListener("backbutton", onBackButtonFire, false);
        function onBackButtonFire(e) {
            e.preventDefault();
        }
        document.addEventListener("deviceready", onDeviceReady, false);
    },
    /**
     * deviceReady Event Handler
     *
     * The scope of 'this' is the event. In order to call the 'receivedEvent
     *
     * function, must explicitly call 'app.receivedEvent(...);'
     */
    onDeviceReady: function($scope){
        $scope.loadingShow = false;
        angular.element(document).ready(function() {
            angular.bootstrap(document);
        })
    }
};
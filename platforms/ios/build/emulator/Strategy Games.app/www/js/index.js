/**
 * Initializes the application
 *
 * Contains the main drivers for various components of the game
 */
var app = {
    /**
     * Establishes globally accessible app variables
     *
     * Use Sparingly
     */
    userAccount: new Account(), // Stores the account data retrieved from a valid login
    localData: '', // Stores locally stored data to be parsed
    currentGame: '', // Stores the current game object once it is created from the mainMenu


    /**
     * Application Constructor
     */
    initialize: function() {
        localStorage.setItem('localAccountData', ['one']);
        this.userAccount = new Account();
        this.bindEvents();
    },

    /**
     * Binds Event Listeners
     *
     * Bind any events that are required on startup.
     */
    bindEvents: function() {
        document.addEventListener('deviceReady', this.onDeviceReady, false);
    },

    /**
     * deviceReady Event Handler
     *
     * The scope of 'this' is the event. In order to call the 'receivedEvent
     *
     * function, must explicitly call 'app.receivedEvent(...);'
     */
    onDeviceReady: function() {
        app.receivedEvent('deviceReady');
    },

    /**
     * Passes the application to different drivers based on
     *
     * @param id
     */
    receivedEvent: function(id) {
        // Debugging code
        console.log('Received Event: ' + id);

        // Checks app state and redirects to proper state
        if(id === 'deviceReady'){
            app.appDataLoading();
        }
        else if(id === 'appDataLoadingExit') {
            app.mainMenu();
        }
        else if(id === 'endGameExit'){
            app.mainMenu();
        }
        else if (id==='weMadeIt'){
            document.getElementById('mainMenuContent').innerHTML = 'we made it!';
        }
    },

    /**
     * appDataLoading event handler
     *
     * Runs code associated with loading cached app data, specifically user account data they may have stored
     */
    appDataLoading: function(){
        // Debugging code
        console.log('appDataLoading initialized...');

        // Loading animation
        app.splashScreenStart();

        // Loads localData from localStorage and inspects data
        // Redirects to login page if inspectAppCache fails
        app.loadAppCache();
        app.inspectAppCache(this.localData);

        //End Loading animation
        app.splashScreenEnd();

        // Returns to the received event handler
        app.receivedEvent('appDataLoadingExit');
    },

    /**
     * Utility method, checks the local cache for data
     */
    loadAppCache: function(){
        this.localData = localStorage.getItem('localAccountData');
    },

    /**
     * Inspects and processes the localAccountData and proceeds appropriately
     */
    inspectAppCache: function(){
        // Triggered if localData contains an invalid JSON string
        if(this.localData === null || this.localData.length === 0 || this.localData === 'null'){
            // No local account data found
            // Redirect to login page
            //Debugging code
            app.loginController();
        }
        else {
            app.mainMenu();
        }
    },

    /**
     * loginController
     *
     * Launches login related tasks
     */
    loginController: function(){
        // document.getElementById('mainMenuContent').innerHTML = 'loginController activated';

        // ToDo add listeners for initial login screen
        // ToDo add listener for loginButton
        // ToDo add listener for create account button

        // Todo loginButton press redirects to login page

        // Todo createAccountButton press redirects to create account page
    },

    /**
     * Splash Screen event controller
     *
     * Contains any markup changes for the Splash Screen on load start
     */
    splashScreenStart: function(){

    },
    /**
     * Splash Screen event controller
     *
     * Contains any markup changes for the Splash Screen on load end
     */
    splashScreenEnd: function(){
        var parentElement = document.getElementById('deviceReady');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    /**
     * mainMenu event controller
     *
     * Runs code associated with the mainMenu
     *
     * Directs the application to the appropriate handler based on user input
     */
    mainMenu: function (){
        // Debugging code
        console.log('mainMenu initialized');

        var splashElement = document.getElementById('deviceReady');
        splashElement.setAttribute('style', 'display:none;');
        var menuElement = document.getElementById('mainMenu');
        menuElement.setAttribute('style', 'display:block;');

        // TODO deploy conditionals for menu redirection

        // ToDo deploy play button listener and functions

        this.currentGame = new Game (this.userAccount);


        // ToDo deploy leaderboard button listener and functions

        // ToDo deploy account button listener and functions

        // ToDo deploy settings button listener and functions
    }
};
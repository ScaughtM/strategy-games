/**
 * Constructor for the game object
 *
 * @param {Account} localUser - Initializes a game object with the localUser as a primary object. Opponent players are added later
 * @constructor
 */
function Game(localUser){
    this.gameMainUser = localUser;
    //
    this.gameMainUser.setAccountTutorialStatus(false);

    this.initGame(this.gameMainUser.getAccountTutorialStatus());
}
Game.prototype = {
    /**
     * Checks to see if the account has passed the tutorial
     *
     * calls the appropriate function
     *
     * @param {boolean} accountTutorialStatus - true IFF the account has passed the tutorial
     * @param {boolean} accountTutorialStatus - false IFF the account has not passed the tutorial
     */
    initGame: function(accountTutorialStatus){
        if(!accountTutorialStatus){
            // run the main game driver
            this.mainGameDriver();
        }
        else{
            // run the tutorial game driver
            this.tutorialGameDriver();
        }
    },

    /**
     * This is the main driver for the tutorial
     */
    tutorialGameDriver: function(){

    },

    /**
     * main driver for the game object
     */
    mainGameDriver: function(){

    }
};
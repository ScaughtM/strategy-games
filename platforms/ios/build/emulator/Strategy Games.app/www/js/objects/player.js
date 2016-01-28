/**
 * This is the constructor for a new player object.
 * These objects will contain the internal functions for each player participating in a particular game.
 * It also passes information to the account object, which has control over many of the meta-stats present
 * during each individual session.
 *
 * @constructor
 * @param {account} acct the account object this player object is representing in-game
 * @author Oliver Gappmayer
 */
function Player (acct){
    /* Instantiate variables */
    this.parentAccount = acct;
    this.userName;
    this.funds = 0;
}

Player.prototype = {
    /**
     * This method sets the player name to the provided string
     *
     * @param {string} name - the string this method will change this player's userName to
     */
    setUserName: function (name) {
        this.userName = name;
    },

    /**
     * This method gets the player name and returns it as a string
     *
     * @returns {string} userName returned as a string
     */
    getUserName: function () {
        return this.userName;
    },

    /**
     * This method sets the player's fund amount
     *
     * @param {int} setFundsTo The value to set the player's funds to
     */
    setFunds: function (setFundsTo) {
        this.funds = setFundsTo;
    },

    /**
     * This method gets the player's fund amount
     *
     * @returns {int} Returns the player's current fund value
     */
    getFunds: function () {
        return this.funds;
    },

    /**
     * This method increases the player's fund amount by the param
     *
     * @param {int} increaseBy The value the funds should be increased by
     */
    increaseFundsBy: function (increaseBy) {
        this.funds += increaseBy;
    },

    /**
     * This method decreases the player's fund amount by the param
     *
     * @param {int} decreaseBy the amount the funds are to be decreased by
     */
    decreaseFundsBy: function (decreaseBy) {
        this.funds -= decreaseBy;
    }
}

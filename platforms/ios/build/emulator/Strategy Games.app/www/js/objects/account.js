/**
 * Constructor for the account object.
 *
 * @constructor
 */
function Account (){
    /*Variable Declaration*/
    this.accountUserName;
    this.totalRevenue;
    this.tutorialReq;
}
Account.prototype = {
    /**
     * Helper method. Sets the username for this account
     */
    setAccountUserName: function(name) {
        this.accountUserName = name;
    },

    /**
     * Helper method. Returns the account's userName variable.
     *
     * @returns {String} userName - the user name associated with this account
     */
    getAccountUserName: function(){
        return this.accountUserName;
    },

    /**
     * Helper method. Returns this object's totalRevenue variable
     *
     * @returns {integer} totalRevenue - this account's total revenue
     */
    getTotalRevenue: function(){
        return this.totalRevenue;
    },

    /**
     * Helper method. Returns this object's totalRevenue variable
     *
     * @returns {integer} totalRevenue - this account's total revenue
     */
    setTotalRevenue: function(revenue){
        this.totalRevenue=revenue;
    },

    /**
     * Helper method. Returns this object's totalRevenue variable
     *
     * @returns {integer} totalRevenue - this account's total revenue
     */
    increaseTotalRevenue: function(increaseBy){
        this.totalRevenue += increaseBy;
    },

    /**
     * Helper method. Returns this object's totalRevenue variable
     *
     * @returns {integer} totalRevenue - this account's total revenue
     */
    decreaseTotalRevenue: function(decreaseBy){
        this.totalRevenue -= decreaseBy;
    },

    /**
     * Sets the boolean which indicates whether or not the user's account is new
     *
     * Will indicate a tutorial is necessary
     *
     * @param {boolean} tutorialStatus - true IFF the player requires a tutorial
     * @param {boolean} tutorialStatus - false IFF the player does not require a tutorial
     */
    setAccountTutorialStatus: function(tutorialStatus){
        this.tutorialReq = tutorialStatus;
    },

    /**
     * Helper method. Returns the objects tutorialReq
     *
     * @returns {boolean} tutorialReq - true if the player requires a tutorial
     * @returns {boolean} tutorialReq - false if the player does not require a tutorial
     */
    getAccountTutorialStatus: function(){
        return this.tutorialReq;
    }
}

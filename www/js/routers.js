var app = angular.module('App', ['ngRoute', 'ui.bootstrap', 'angular.directives-round-progress'])

.service('gameData', function(){
    return{
        aiPlayerCount: 5,
        currRound: 0,
        currComp: 0,
        currPrice: 0,
        currStage: 0
    }
})
.service('localUser', function(){
    return{
        localName: 'Beta User',
        globalRank: 1,
        totalGlobalRevenue: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currFunds: 0,
        currCostFunc: 0,
        roundRevenue: 0,
        currRank: 0,
        type: 'return',
        research: false,
        participate: false
    }
})
.service('numbersWithCommas', function(){
    return{
        parse: function(number){
            var parts = number.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
    }
})
.service('modalService', function(ModalFactory, $modal) {
    return{
        open: function (template) {
            var thisModal = ModalFactory.modals[template];
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/partials/modal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    thisModal: function () {
                        return thisModal;
                    }
                }
            });
            /*modalInstance.result.then(function () {

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });*/
        }
    }
})
.service('lb', function(){
    return{
        sorted: [],
        findUserPosition: function(sortedArr, target){
            this.sorted = sortedArr;
            for(var i = 0; i < sortedArr.length; i++){
                if(sortedArr[i][0] == target){
                    return i+1;
                }
            }
        },
        storeSorted: function(sortedArr){
            this.sorted = sortedArr;
        }
    }
})
.service('determinePrice', function(){
    return {
        get: function(n) {
            var price = Math.max(10000, (250000-(20000*n)));
            return price;
        }
    }
})
.service('determineRevenue', function(){
    return {
        get: function(price, cost, isCompete) {
            var revenue = price - cost;
            if(isCompete == false){
                revenue = 0;
            }
            return revenue;
        }
    }
})
.service('tutorialOppArr', function(){
    return{
        // Each of these follows this pattern 'reference: [name, funds, cost function, compete intent]'
        ai1: ["Coase", 1000000, 0, false],
        ai2: ["Ricardo", 1000000, 0, false],
        ai3: ["Knight", 1000000, 0, false],
        ai4: ["Marshall", 1000000, 0, false],
        ai5: ["Hayek", 1000000, 0, false]
    }
})
.service('calcCostFun', function(){
    return{
        researchChoice: function(currCostFunc){
            var choice = false;
            if (currCostFunc === 0){
                choice = true;
                return choice
            }
            else if (currCostFunc >= 150000){
                choice = true;
                return choice
            }
            else if ((Math.round(Math.random())) === 0){
                choice = true;
                return choice;
            }
            else return choice
        },
        researchCalc: function(){
            function researchBetween(min,max)
            {
                return Math.floor(Math.random()*(max-min+1)+min);
            }
            return researchBetween(50000, 250000)
        }
    }
})
.directive('investAnimation', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/game/tutorial/tutorialInvestAnimation.html'
    }
})
.directive('gameProgress', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/progress.html'
    }
})
.directive('modal', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/modal.html'
    }
})
.controller('gameProgressController', ['$scope', 'gameData', function($scope, gameData){
    gameData.currStage = 1;
    console.log(gameData);
}])
.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            controller: betaNameController,
            templateUrl:'partials/betaNameInp.html'
        })
        .when('/menu', {
            controller: mainMenuController,
            templateUrl: 'partials/mainMenu.html'
        })
        .when('/leaderboard', {
            controller: leaderboardController,
            templateUrl: 'partials/leaderboard.html'
        })
        .when('/accountStats', {
            controller: accountStatsController,
            templateUrl: 'partials/accountStats.html'
        })
        .when('/settings', {
            controller: settingsController,
            templateUrl: 'partials/settings.html'
        })
        .when('/play', {
            controller: playController,
            templateUrl: 'partials/game/play.html'
        })
        .when('/playAI', {
            controller: playAIController,
            templateUrl: 'partials/game/vsAi/vsAiMain.html'
        })
        .when('/playAIInvest', {
            controller: aiInvestController,
            templateUrl: 'partials/game/vsAi/vsAiInvest.html'
        })
        .when('/playAIInvestResult', {
            controller: playAIInvestResultController,
            templateUrl: 'partials/game/vsAi/vsAiInvestResult.html'
        })
        .when('/playAICompPrompt', {
            controller: playAICompPromptController,
            templateUrl: 'partials/game/vsAi/vsAiCompPrompt.html'
        })
        .when('/playAICompResults', {
            controller: playAICompResultsController,
            templateUrl: 'partials/game/vsAi/vsAiCompResults.html'
        })
        .when('/playAIGameResults', {
            controller: playAIGameResultsController,
            templateUrl: 'partials/game/vsAi/vsAiGameResults.html'
        })
        .when('/tutorialStart',{
            controller: tutorialStartController,
            templateUrl:'partials/game/tutorial/tutorialMain.html'
        })
        .when('/tutorialPage1',{
            controller: tutorialPage1Controller,
            templateUrl: 'partials/game/tutorial/tutorialPage1.html'
        })
        .when('/tutorialStats',{
            controller: tutorialPreStatsController,
            templateUrl: 'partials/game/tutorial/tutorialStats.html'
        })
        .when('/tutorialInvestPrompt',{
            controller: tutorialInvestController,
            templateUrl: 'partials/game/tutorial/tutorialInvestPrompt.html'
        })
        .when('/tutorialInvestResult',{
            controller: tutorialInvestResultsController,
            templateUrl: 'partials/game/tutorial/tutorialInvestResult.html'
        })
        .when('/tutorialCompPrompt',{
            controller: tutorialCompPromptController,
            templateUrl: 'partials/game/tutorial/tutorialCompPrompt.html'
        })
        .when('/tutorialCompCalc',{
            controller: tutorialCompCalcController,
            templateUrl: 'partials/game/tutorial/tutorialCompCalc.html'
        })
        .when('/tutorialCompResults',{
            controller: tutorialCompResultsController,
            templateUrl: 'partials/game/tutorial/tutorialCompResults.html'
        })
        .when('/tutorialResults',{
            controller: tutorialGameResultsController,
            templateUrl: 'partials/game/tutorial/tutorialGameResults.html'
        })
})
.factory('ModalFactory', function() {
    var ModalFactory = {};
    ModalFactory.status = 'cha braj';
    ModalFactory.modals = {
        tutorial1: {
            title : 'Strategy Games?',
            body : 'Coase: The purpose of this game is to refine your ability to make decisions in a simulated market. You will do research to get ahead and compete for supremacy. Whether you invest or compete, or do both both, the goal is profitability.',
            src : '/img/RonaldCoase.png',
            next : 'continue'
        },
        investPrompt: {
            title : 'Research Phase',
            body : 'Ricardo:  In the first phase, you will be given the opportunity to invest funds into research. The base cost for investing stays consistent, but the potential rewards vary! A strong investment result can bring your firm to dominance. Remember, a lower cost function is better than a higher one! In this game type, the range of possible costs is $50,000-$250,000. Your odds of receiving any one cost function in this phase is distributed normally.',
            src : '/img/DavidRicardo.png',
            next : 'continue'
        },
        investResult: {
            title : 'Research Result',
            body : 'Marshall: Understanding your cost function can be difficult. The percentile value on this page helps you know where you may stand in relation to your opponents. Cost functions are generated using a normal distribution so outliers are rare!',
            src : "/img/AlfredMarshall.png",
            next : 'continue'
        },
        compPrompt: {
            title : 'Competition Phase',
            body : 'Knight: This is when the money is made. If you think you have the cost function necessary to out-compete your rivals, compete! The results for this phase are calculated based on the following: Revenue = (Price - Cost); Price = Max {10,000, (250,000- 20,000 * #Players Competing)} and the Cost is your researched Cost function from earlier!',
            src : "/img/FrankKnight.png",
            next : 'continue'
        },
        compResult: {
            title : 'Competition Result!',
            body : 'Hayek: In this phase, you have an opportunity to evaluate how successful you’ve been relative to competitors. This phase also signals the beginning of the next round. In this tutorial, there are 6. In other games, some parameters may change.',
            src : "/img/FreidrichHayek.png",
            next : 'continue'
        },
        gameResult: {
            title : 'You Finished!',
            body : 'Coase: We hope you had as much fun as we did! From this point in the game, you can return to the main menu and play another or linger on this page to learn more about the results of the game you played.',
            src : "/img/RonaldCoase.png",
            next : 'continue'
        }
    };
    return ModalFactory;
});
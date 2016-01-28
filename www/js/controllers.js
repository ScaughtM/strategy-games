function betaNameController($scope, localUser){
    $scope.changeName = function (){
        localUser.localName = $scope.tempName;
    }
}

function mainMenuController($scope, localUser, gameData, tutorialOppArr) {
    // Reset all game-related variables
    gameData.aiPlayerCount = 5;
    gameData.currRound = 0;
    gameData.currComp= 0;
    gameData.currPrice = 0;
    gameData.currCostFunc = 0;

    tutorialOppArr.ai1[1] = 1000000;
    tutorialOppArr.ai2[1] = 1000000;
    tutorialOppArr.ai3[1] = 1000000;
    tutorialOppArr.ai4[1] = 1000000;
    tutorialOppArr.ai5[1] = 1000000;

    tutorialOppArr.ai1[2] = 0;
    tutorialOppArr.ai2[2] = 0;
    tutorialOppArr.ai3[2] = 0;
    tutorialOppArr.ai4[2] = 0;
    tutorialOppArr.ai5[2] = 0;

    $scope.type = localUser.type;
    $scope.localusr = localUser.localName;
}

function leaderboardController($scope, localUser) {
    $scope.globRank = localUser.globalRank;
}

function accountStatsController($scope, localUser){
    $scope.acctName = localUser.localName;
    $scope.played = localUser.gamesPlayed;
    $scope.totalRev = "$" + localUser.totalGlobalRevenue;
    $scope.globRank = localUser.globalRank;
    $scope.gWon = localUser.gamesWon;
    $scope.gLost = localUser.gamesLost
}

function settingsController($scope, $timeout, modalService){
    $timeout(function(){
        modalService.open('investPrompt');
    }, 500);
}

function playController($scope){

}

function playAIController($scope){

}

function aiInvestController($scope){

}

function playAIInvestResultController($scope){

}

function playAICompPromptController($scope){

}

function playAICompResultsController($scope){

}

function playAIGameResultsController($scope) {

}

/**
 * These controller functions drive the tutorial game
 */
function tutorialStartController($scope){

}
function tutorialPage1Controller($scope){

}
function tutorialPreStatsController($scope, $location, localUser, modalService, gameData, numbersWithCommas){
    gameData.currRound = 0;
    modalService.open('tutorial1');
    $location.hash('top');
    localUser.currFunds = 1000000;
    localUser.currCostFunc = '';
    $scope.playerFunds = numbersWithCommas.parse(localUser.currFunds);
}
function tutorialInvestController($scope, $timeout, $interval, $location, gameData, localUser, tutorialOppArr, modalService, numbersWithCommas){
    gameData.currRound +=1;
    if(gameData.currRound == 1 || gameData.currRound == 0){
        modalService.open('investPrompt');
    }
    localUser.participate = false;
    tutorialOppArr.ai1[3] = false;
    tutorialOppArr.ai2[3] = false;
    tutorialOppArr.ai3[3] = false;
    tutorialOppArr.ai4[3] = false;
    tutorialOppArr.ai5[3] = false;


    gameData.currStage++;

    if(localUser.currCostFunc == 0 || gameData.currRound == 1){
        $scope.rdlevel = "Round 1: No Cost Function Researched";
    }
    else{
        $scope.rdlevel = "$" + numbersWithCommas.parse(localUser.currCostFunc);
    }

    $scope.currentround = gameData.currRound;
    $scope.oldFunds = localUser.currFunds;

    $scope.funds = localUser.currFunds;
    $scope.newFunds = localUser.currFunds - 100000;
    //$scope.fundsaltered = ((localUser.currFunds)-100000);
    $scope.fundsaltered = numbersWithCommas.parse(localUser.currFunds - 100000);
    $scope.lclUser = localUser.localName;
    $scope.name = localUser.localName;
    var invest = document.getElementById("invest");
    var pass = document.getElementById("pass");
    invest.onclick = function() {
        localUser.research = true;
    };
    pass.onclick = function(){
        localUser.research = false;
    };
    $scope.specialClass = false;
    $scope.loop = function() {
        $scope.researchProgressLoop = 0;
        $scope.researchBudget = $scope.oldFunds - $scope.newFunds;
        $scope.fundProgressLoop = $scope.oldFunds;
        stop = $interval(function() {
            if($scope.researchProgressLoop < $scope.researchBudget && $scope.researchProgressLoop > ($scope.researchBudget - 100)){
                $scope.researchProgressLoop++;
            } else if ($scope.researchProgressLoop < $scope.researchBudget && $scope.researchProgressLoop > ($scope.researchBudget - 1000)) {
                $scope.researchProgressLoop = $scope.researchProgressLoop + 10;
            } else if ($scope.researchProgressLoop < $scope.researchBudget && $scope.researchProgressLoop > ($scope.researchBudget - 5000)) {
                $scope.researchProgressLoop = $scope.researchProgressLoop + 50;
            } else if ($scope.researchProgressLoop < $scope.researchBudget && $scope.researchProgressLoop > ($scope.researchBudget - 10000)) {
                $scope.researchProgressLoop = $scope.researchProgressLoop + 100;
            } else if ($scope.researchProgressLoop < $scope.researchBudget) {
                $scope.researchProgressLoop = $scope.researchProgressLoop+1000;
            }

            if($scope.fundProgressLoop > $scope.newFunds && $scope.fundProgressLoop < ($scope.newFunds + 100)){
                $scope.fundProgressLoop--;
            } else if ($scope.fundProgressLoop > $scope.newFunds && $scope.fundProgressLoop < ($scope.newFunds + 1000)) {
                $scope.fundProgressLoop = $scope.fundProgressLoop - 10;
            } else if ($scope.fundProgressLoop > $scope.newFunds && $scope.fundProgressLoop < ($scope.newFunds + 5000)) {
                $scope.fundProgressLoop = $scope.fundProgressLoop - 50;
            } else if ($scope.fundProgressLoop > $scope.newFunds && $scope.fundProgressLoop < ($scope.newFunds + 10000)) {
                $scope.fundProgressLoop = $scope.fundProgressLoop - 100;
            } else if ($scope.researchProgressLoop < $scope.researchBudget) {
                $scope.fundProgressLoop = $scope.fundProgressLoop - 1000;
            }
        }, 2);
    };
    $scope.stopLoop = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };
    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopLoop();
    });
    $scope.getInvestmentResults = function(invest) {
        $scope.fundScale = $scope.oldFunds / 100;
        $scope.prefundProgress = $scope.newFunds / $scope.fundScale;
        $scope.researchProgress = 100 - $scope.prefundProgress + '%';
        $scope.fundProgress = $scope.prefundProgress + '%';
        $scope.invest = invest;
        console.log(invest);
        $interval(function() {
            if ($scope.specialClass == 'active') {
                $scope.specialClass = false;
            } else if ($scope.specialClass == false) {
                $scope.specialClass = 'active';
            }
        }, 1000);
        $scope.animate = true;
        $timeout(function(){
            $scope.progress = true;
            $scope.loop();
        }, 500);
        $timeout(function() {
            $scope.onOff = true;
            $scope.lightpole = 'lightpole';
            $timeout(function() {
                $scope.stopLoop();
                $location.path('/tutorialInvestResult');
            }, 3000);
        }, 2000);
    };
}
function tutorialInvestResultsController($scope, gameData, localUser, tutorialOppArr,calcCostFun, modalService, numbersWithCommas){
    gameData.currComp = 0;
    $scope.thisRound = gameData.currRound;
    gameData.currStage++;
    if(gameData.currRound == 1 || gameData.currRound == 0){
        modalService.open('investResult');
    }
    $scope.thisRound = gameData.currRound;

    var tempCalc = 0;

    if(localUser.currCostFunc == 0){
        $scope.currentrd = "You Do Not Have A Previous Cost Function";
    }
    else{
        $scope.currentrd = "$" + localUser.currCostFunc;
    }

    //Runs Investment result code on all participants, the local user last.

    if (calcCostFun.researchChoice(tutorialOppArr.ai1[2])){
        tutorialOppArr.ai1[1] -= 100000;
        tempCalc = calcCostFun.researchCalc();
        if (tutorialOppArr.ai1[2] > tempCalc || tutorialOppArr.ai1[2] == 0){
            tutorialOppArr.ai1[2] = tempCalc;
        }
    }
    if (calcCostFun.researchChoice(tutorialOppArr.ai2[2])){
        tutorialOppArr.ai2[1] -= 100000;
        tempCalc = calcCostFun.researchCalc();
        if (tutorialOppArr.ai2[2] > tempCalc || tutorialOppArr.ai2[2] == 0){
            tutorialOppArr.ai2[2] = tempCalc;
        }
    }
    if (calcCostFun.researchChoice(tutorialOppArr.ai3[2])){
        tutorialOppArr.ai3[1] -= 100000;
        tempCalc = calcCostFun.researchCalc();
        if (tutorialOppArr.ai3[2] > tempCalc || tutorialOppArr.ai3[2] == 0){
            tutorialOppArr.ai3[2] = tempCalc;
        }
    }
    if (calcCostFun.researchChoice(tutorialOppArr.ai4[2])){
        tutorialOppArr.ai4[1] -= 100000;
        tempCalc = calcCostFun.researchCalc();
        if (tutorialOppArr.ai4[2] > tempCalc || tutorialOppArr.ai4[2] == 0){
            tutorialOppArr.ai4[2] = tempCalc;
        }
    }
    if (calcCostFun.researchChoice(tutorialOppArr.ai5[2])){
        tutorialOppArr.ai5[1] -= 100000;
        tempCalc = calcCostFun.researchCalc();
        if (tutorialOppArr.ai5[2] > tempCalc || tutorialOppArr.ai5[2] == 0){
            tutorialOppArr.ai5[2] = tempCalc;
        }
    }
    if (localUser.research){
        localUser.currFunds -= 100000;
        tempCalc = calcCostFun.researchCalc();
        if (localUser.currCostFunc > tempCalc || localUser.currCostFunc == 0){
            localUser.currCostFunc = tempCalc;
        }
    }
    else {
        tempCalc = 0;
    }

    if(tempCalc == 0){
        $scope.gainedrd = "You Did Not Invest This Round";
    }
    else{
        $scope.gainedrd = "$" + numbersWithCommas.parse(tempCalc);
    }
    var percentWorse;
    if (localUser.currCostFunc == 0){
        percentWorse = 0;
    }
    else{
        percentWorse = parseInt(100 - (100*((localUser.currCostFunc-50000)/200000)));
    }
    $scope.data = {
        label: percentWorse + "%",
        percentage: percentWorse / 100
    };
    // Test code, displays stats for all ai opponents in tutorial
    //$scope.player1Name= tutorialOppArr.ai1[0];
    //$scope.player1Funds= tutorialOppArr.ai1[1];
    //$scope.player1Cost = tutorialOppArr.ai1[2];
    //
    //$scope.player2Name= tutorialOppArr.ai2[0];
    //$scope.player2Funds= tutorialOppArr.ai2[1];
    //$scope.player2Cost = tutorialOppArr.ai2[2];
    //
    //$scope.player3Name= tutorialOppArr.ai3[0];
    //$scope.player3Funds= tutorialOppArr.ai3[1];
    //$scope.player3Cost = tutorialOppArr.ai3[2];
    //
    //$scope.player4Name= tutorialOppArr.ai4[0];
    //$scope.player4Funds= tutorialOppArr.ai4[1];
    //$scope.player4Cost = tutorialOppArr.ai4[2];
    //
    //$scope.player5Name= tutorialOppArr.ai5[0];
    //$scope.player5Funds= tutorialOppArr.ai5[1];
    //$scope.player5Cost = tutorialOppArr.ai5[2];
}
function tutorialCompPromptController($scope, gameData, localUser, tutorialOppArr, modalService, numbersWithCommas){
    $scope.currentround = gameData.currRound;
    gameData.currStage++;
    $scope.currentfunds = numbersWithCommas.parse(localUser.currFunds);
    $scope.costlvl = numbersWithCommas.parse(localUser.currCostFunc);
    $scope.name = localUser.localName;
    if(gameData.currRound == 1 || gameData.currRound == 0){
        modalService.open('compPrompt');
    }
    // Determines which opponent players are competing
    function checkAIParticipate(){
        var howMany = 0;
        function aiCheckRoller(costFunc){
            var chosenValue = Math.random();
            if(chosenValue < .4 || costFunc <= 75000){
                howMany++;
                return true;
            }
            else return false;
        }
        tutorialOppArr.ai1[3] = aiCheckRoller(tutorialOppArr.ai1[2]);
        tutorialOppArr.ai2[3] = aiCheckRoller(tutorialOppArr.ai2[2]);
        tutorialOppArr.ai3[3] = aiCheckRoller(tutorialOppArr.ai3[2]);
        tutorialOppArr.ai4[3] = aiCheckRoller(tutorialOppArr.ai4[2]);
        tutorialOppArr.ai5[3] = aiCheckRoller(tutorialOppArr.ai5[2]);
        return howMany;
    }
    var compete = document.getElementById("competeBtn");
    var pass = document.getElementById("passBtn");
    if (localUser.currCostFunc == 0){
        compete.style.display = "none";
        pass.innerHTML = "You Cannot Compete Without a Cost Function";
    }
    compete.onclick = function() {
        localUser.participate = true;
        gameData.currComp = checkAIParticipate() + 1;

    };
    pass.onclick = function(){
        localUser.participate = false;
        gameData.currComp = checkAIParticipate();
    };
}
function tutorialCompCalcController($scope, $timeout, $interval, gameData, localUser, tutorialOppArr, determinePrice, determineRevenue){
    gameData.currStage++;

    $scope.jamesComp = tutorialOppArr.ai1[3];
    $scope.jamesCost = tutorialOppArr.ai1[2];
    $scope.mattComp = tutorialOppArr.ai2[3];
    $scope.mattCost = tutorialOppArr.ai2[2];
    $scope.scottComp = tutorialOppArr.ai3[3];
    $scope.scottCost = tutorialOppArr.ai3[2];
    $scope.alexComp = tutorialOppArr.ai4[3];
    $scope.alexCost = tutorialOppArr.ai4[2];
    $scope.stephComp = tutorialOppArr.ai5[3];
    $scope.stephCost = tutorialOppArr.ai5[2];
    $scope.thisRound = gameData.currRound;
    $scope.playerRank = localUser.currRank;
    $scope.playeriscomp = localUser.participate;
    $scope.playersComp = gameData.currComp;

    gameData.currPrice = determinePrice.get(gameData.currComp);
    $scope.currentprice = gameData.currPrice;

    localUser.roundRevenue = determineRevenue.get(gameData.currPrice, localUser.currCostFunc, localUser.participate);
    $scope.localPlayerRevenue =localUser.roundRevenue;
    $scope.localPlayerFunds = localUser.roundRevenue + localUser.currFunds;

    var jamesR = determineRevenue.get(gameData.currPrice, tutorialOppArr.ai1[2], tutorialOppArr.ai1[3]);
    $scope.jamesRev = jamesR;

    var mattR = determineRevenue.get(gameData.currPrice, tutorialOppArr.ai2[2], tutorialOppArr.ai2[3]);$scope.mattRev = mattR;
    $scope.mattRev = mattR;

    var scottR = determineRevenue.get(gameData.currPrice, tutorialOppArr.ai3[2], tutorialOppArr.ai3[3]);$scope.mattRev = mattR;
    $scope.scottRev = scottR;

    var alexR = determineRevenue.get(gameData.currPrice, tutorialOppArr.ai4[2], tutorialOppArr.ai4[3]);
    $scope.alexRev = alexR;

    var stephR = determineRevenue.get(gameData.currPrice, tutorialOppArr.ai5[2], tutorialOppArr.ai5[3]);
    $scope.stephRev = stephR;

    tutorialOppArr.ai1[1] = tutorialOppArr.ai1[1] + jamesR;
    tutorialOppArr.ai2[1] = tutorialOppArr.ai2[1] + mattR;
    tutorialOppArr.ai3[1] = tutorialOppArr.ai3[1] + scottR;
    tutorialOppArr.ai4[1] = tutorialOppArr.ai4[1] + alexR;
    tutorialOppArr.ai5[1] = tutorialOppArr.ai5[1] + stephR;

    $scope.jamesfunds = tutorialOppArr.ai1[1];
    $scope.mattfunds = tutorialOppArr.ai2[1];
    $scope.scottfunds = tutorialOppArr.ai3[1];
    $scope.alexfunds = tutorialOppArr.ai4[1];
    $scope.stephfunds = tutorialOppArr.ai5[1];

    $scope.currentGroup = tutorialOppArr;
    $scope.localUser = localUser;
    $interval(function() {
        $scope.bling = !$scope.bling;
    }, 750);
    $timeout(function() {
        $scope.resume = true;
    }, 1000);
}
function tutorialCompResultsController($scope, gameData, localUser, tutorialOppArr, lb, modalService, numbersWithCommas){
    if(gameData.currRound == 1 || gameData.currRound == 0){
        modalService.open('compResult');
    }
    gameData.currStage++;
    localUser.currFunds = localUser.currFunds + localUser.roundRevenue;
    //var rlb = lb.orderPlayers(localUser.localName, localUser.currFunds, tutorialOppArr.ai1[0], tutorialOppArr.ai1[1], tutorialOppArr.ai2[0], tutorialOppArr.ai2[1], tutorialOppArr.ai3[0], tutorialOppArr.ai3[1], tutorialOppArr.ai4[0], tutorialOppArr.ai4[1], tutorialOppArr.ai5[0], tutorialOppArr.ai5[1]);
    var rlb = [[localUser.localName, localUser.currFunds],[tutorialOppArr.ai1[0], tutorialOppArr.ai1[1]],[tutorialOppArr.ai2[0], tutorialOppArr.ai2[1]],[tutorialOppArr.ai3[0], tutorialOppArr.ai3[1]], [tutorialOppArr.ai4[0], tutorialOppArr.ai4[1]], [tutorialOppArr.ai5[0], tutorialOppArr.ai5[1]]];
    rlb = rlb.sort(compareSecondColumn);
    function compareSecondColumn(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }
    localUser.currRank = lb.findUserPosition(rlb, localUser.localName);
    lb.storeSorted(rlb);
    //function findUserPosition(sortedPlayerArr){
    //    for(var i = 0; i < sortedPlayerArr.length; i++){
    //        if(sortedPlayerArr[i][0] == localUser.localName){
    //            return i+1;
    //        }
    //    }
    //}
    $scope.thisround = gameData.currRound;
    $scope.playerRank = localUser.currRank;
    $scope.currrevenue = numbersWithCommas.parse(localUser.roundRevenue);
    $scope.curfunds = numbersWithCommas.parse(localUser.currFunds);
    $scope.rndPrice = numbersWithCommas.parse(gameData.currPrice);
    $scope.currAmtComp = gameData.currComp;
    $scope.firstName = rlb[0][0];
    $scope.firstScore = numbersWithCommas.parse(rlb[0][1]);
    $scope.secondName = rlb[1][0];
    $scope.secondScore = numbersWithCommas.parse(rlb[1][1]);
    $scope.thirdName = rlb[2][0];
    $scope.thirdScore = numbersWithCommas.parse(rlb[2][1]);
    $scope.fourthName = rlb[3][0];
    $scope.fourthScore = numbersWithCommas.parse(rlb[3][1]);
    $scope.fifthName = rlb[4][0];
    $scope.fifthScore = numbersWithCommas.parse(rlb[4][1]);
    $scope.sixthName = rlb[5][0];
    $scope.sixthScore = numbersWithCommas.parse(rlb[5][1]);

    if(gameData.currRound > 5){
        document.getElementById("nextroundbtn").style.display = 'none';
        document.getElementById("quitgamebtn").innerHTML = 'game over: See Game Results';
    }
}
function tutorialGameResultsController($scope, modalService, localUser, gameData, lb, numbersWithCommas){

    modalService.open('gameResult');

    gameData.currStage = 0;
    $scope.totalProfit = numbersWithCommas.parse((localUser.currFunds - 1000000));
    $scope.totalglobalrevenue = numbersWithCommas.parse((localUser.totalGlobalRevenue + (localUser.currFunds - 1000000)));
    $scope.finalGameRank = localUser.currRank;
    $scope.firstName = lb.sorted[0][0];
    $scope.firstScore = numbersWithCommas.parse(lb.sorted[0][1]);
    $scope.secondName = lb.sorted[1][0];
    $scope.secondScore = numbersWithCommas.parse(lb.sorted[1][1]);
    $scope.thirdName = lb.sorted[2][0];
    $scope.thirdScore = numbersWithCommas.parse(lb.sorted[2][1]);
    $scope.fourthName = lb.sorted[3][0];
    $scope.fourthScore = numbersWithCommas.parse(lb.sorted[3][1]);
    $scope.fifthName = lb.sorted[4][0];
    $scope.fifthScore = numbersWithCommas.parse(lb.sorted[4][1]);
    $scope.sixthName = lb.sorted[5][0];
    $scope.sixthScore = numbersWithCommas.parse(lb.sorted[5][1]);
}
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'thisModal', function ($scope, $modalInstance, thisModal) {
    $scope.title = thisModal.title;
    $scope.body = thisModal.body;
    $scope.footer = thisModal.footer;
    $scope.next = thisModal.next;
    $scope.src = thisModal.src;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
const states = {
    s1: 'choose a move',
    s2: 'enemy will choose a move',
    s3: 'standby',
    s4: 'damage calculation',
    s5: 'update'
}

const statuses = {
    none: 'none',
    cursed: 'cursed',
    blinded: 'blinded',
    intimidated: 'intimidated'

}

let continueButton;
let willContinue = false;
let theSwitch = true;
function changeState(moveIsMade, enemyMove){
    if(!moveIsMade && !enemyMove){
        return states.s1;
    } else if(moveIsMade && !enemyMove){
        return states.s2;
    } else if(moveIsMade && enemyMove){
        
        if(theSwitch){
            thisHud = document.getElementById('switchHud');
            continueButton = document.createElement('button');
            continueButton.className = 'move';
            continueButton.innerText = 'Continue?';
            continueButton.addEventListener('click', () => {
                willContinue = true;
            });
            thisHud.append(continueButton);
            theSwitch = false;
        }
        if(willContinue){
            return states.s4;
        } else {
            return states.s3;
        }
    }
    willContinue = false;
    theSwitch = true;
    thisHud.removeChild(continueButton);
    return states.s5;
}

function enemyMakesMove(opponent, myMon){
    let moveChoice = getRandomInt(4);
    let thisDamage = opponent.moves[moveChoice].doAttack(opponent, myMon);
    return {
        name: opponent.moves[moveChoice].name,
        damage: thisDamage
    };
}

function changeMonster(){
    
}

function calculateForMe(myMons){
    myMons[myCurrent].hp -= myDamage;
    if (myMons[myCurrent].checkFaint()) {
        container.removeChild(myMons[myCurrent].sprite);
        faintException = true;
        return false;
    } return true;
}

function calculateForEnemy(opponentMons){
    opponentMons[enemyCurrent].hp -= opponentDamage;
    if (opponentMons[enemyCurrent].checkFaint()) {
        container.removeChild(opponentMons[enemyCurrent].sprite);
        let newIndex = opponentMons.findIndex(enemy => enemy.checkFaint() == false);
        console.log(newIndex);
        if (newIndex < 0) {
            alert('you win');
        } else {
            enemyCurrent = newIndex;
            container.addChild(opponentMons[enemyCurrent].sprite);
        }
        return false;
    }
    return true;
   
}

function calculateHP(myMons, opponentMons, hud){
    if(myMons[myCurrent].spd >= opponentMons[enemyCurrent].spd){
        hud.text = turnMove;
        if(calculateForEnemy(opponentMons)){
            calculateForMe(myMons);
            hud.text = yourMove;
        }
        
    } else {
        hud.text = yourMove;
        if(calculateForMe(myMons)){
            calculateForEnemy(opponentMons);
            hud.text = turnMove;
        }

    }
}

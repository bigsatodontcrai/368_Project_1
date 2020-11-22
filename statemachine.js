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
        name: opponent.status == 'intimidated' ? 'Intimidated! NO attack' : opponent.moves[moveChoice].name,
        damage: opponent.status == 'intimidated' ? 0 : thisDamage
    };
}

function changeMonster(){
    
}

function calculateForMe(myMons){
    myMons[myCurrent].hp -= myDamage;
    if (myMons[myCurrent].checkFaint()) {
        alert(myMons[myCurrent].name + ' has fainted!');
        container.removeChild(myMons[myCurrent].sprite);
        faintException = true;
        return false;
    } return true;
}

function calculateForEnemy(opponentMons){
    opponentMons[enemyCurrent].hp -= opponentDamage;
    if (opponentMons[enemyCurrent].checkFaint()) {
        alert(opponentMons[enemyCurrent].name + ' has fainted!');
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

function useStatus(mon, curr, who){
    let Status = mon[curr].status;
    switch(Status){
        case 'none':
            break;
        case 'cursed':
            alert(mon[curr].name + ' is cursed! Take damage!');
            if (mon[curr].hp > 20) {
                mon[curr].hp -= 20;
            } else if(0 < mon[curr].hp <= 20){
                mon[curr].hp = 0;
            }
            break;
        case 'intimidated':
            alert(mon[curr].name + ' Cannot move! Intimidated by the opponent.');
            if(who == 'player'){
                moveIsMade = true;
            } else if(who == 'enemy'){
                enemyMove = true;
            }
            //mon[curr].status = 'none';
            break;
        case 'blinded':
            alert(mon[curr].name + ' is Blinded!');
            mon[curr].moves.forEach(move => {
                if(move.style == 'Attack' && move.accuracy > 0.3){
                    move.accuracy = move.accuracy * 0.6;
                } else if(move.accuracy <= 0.3){
                    alert('Blinding has worn off!');
                    move.accuracy += 0.4;
                    mon[curr].status = 'none';
                }
            });
            break;
    }
}

function calculateHP(myMons, opponentMons, hud){
    if(myMons[myCurrent].spd >= opponentMons[enemyCurrent].spd){
        
        alert('You went first: ' + turnMove);
        if(calculateForEnemy(opponentMons)){
            calculateForMe(myMons);
            alert('Your opponent used! ' + yourMove);
            
        }
        
    } else {
        alert('Opponent went first! ' + yourMove);
        
        if(calculateForMe(myMons)){
            calculateForEnemy(opponentMons);
            if(turnMove != 'You switched to ' + myMons.name){
                alert('You went second: ' + turnMove + '!');
            }
        } 
    }
}


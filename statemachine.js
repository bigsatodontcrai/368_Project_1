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
        alert('standby');
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
    thisHud.removeChild(continueButton);
    return states.s5;
}

function changeMonster(){
    
}

function calculateHP(){

}
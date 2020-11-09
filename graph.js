const typeChartGraph = [
    [1, 0.5, 2, 2, 0.5, 1],
    [2, 1, 0.5, 2, 0.5, 0],
    [0.5, 2, 1, 0.5, 2, 0.5],
    [0.5, 0.5, 1, 2, 2, 2],
    [2, 2, 0.5, 2, 0, 0.5],
    [0, 1, 2, 0.5, 2, 1],
    [1, 1, 1, 1, 1, 1]
];

let typeMap = new Map([
    ['fire', 0],
    ['water', 1],
    ['grass', 2],
    ['sound', 3],
    ['gravity', 4],
    ['flying', 5],
    ['neutral', 6]
]);

let myTeam = [];
let enemyTeam = [];

let bigArray = new Array(6);
bigArray = [
    [0,0,0],[1,1,1],[2,2,2],[3,3,3],[4,4,4],[5,5,5]
];
console.log(bigArray);
console.log(bigArray[0][0]);
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let shiftInit;
let shiftTwo;

function setArray(){
    let shift = 0;
    shift = getRandomInt(5) + 1;
    shiftInit = shift;
    console.log('shift ' + shift);

    for (let i = 0; i < 6; i++) {
        //console.log(i + shift);
        //console.log(bigArray[i + shift][0]);
        bigArray[shift % 6][1] = bigArray[i][0];
        shift++;
    }

    if (shiftInit < 5) {
        shift = shiftInit + getRandomInt(5 - shiftInit) + 1;
    } else if (shiftInit == 5) {
        shift = getRandomInt(4) + 1;
    }
    shiftTwo = shift;

    for (let i = 0; i < 6; i++) {
        bigArray[shift % 6][2] = bigArray[i][0];
        shift++;
    }
}
//the above algorithm creates randomly sorted teams
//The algorithm is always O(n) where n is the number of types there are.
//if expanded generally, it is O(m*n) where m is classes and n is types









/*
note to self, in index.html, move out all the extra divs
instead, create the divs in the script with the specifics
after the creatures have been selected

whenever the creature is shifted, change the inner text
and when you change the inner text, change the reference function
for the event listener call back. 

to break this down, each buttons will have a call back function

the call back function will be something like

move1.addEventListener('onclick', () => {
    turnCall(Attack(currentMon.move1, enemyMon))
});

there will be a universal function called 'turnCall'
this function will take the choice of your turn


where the currentMon and the currentOpponent are always
refreshed at the start of the turn. 

the attack function will take in the do attack function
on the user's monster and the enemy's monster


*/





let game;
let app;
let state = 'choose a move';

let sprites = new Array(18);
let background;
let huddy;
let hphud1;
let hphud2;

let container;

let platform1;
let platform2;
let currentSprite;
let currentMoves = new Array(4);
let thebody;
thebody = document.getElementById('bigboy');

let moveIsMade = false;
let enemyMove = false;

function createCanvas() {

    game = document.createElement('canvas');
    game.className = 'game';
    game.height = 1000;
    game.width = 1000;
    thebody.append(game);

    app = new PIXI.Application(
        {
            view: game,
            width: 900,
            height: 400,
            backgroundColor: 0xAAAAAA
        }
    );

    container = new PIXI.Container();

    console.log(myTeam);
    myTeam.forEach(creatures => {
        console.log(creatures);
        console.log(findCreatureByImage(creatures));
    })
    let myMons = myTeam.map(creatures => findCreatureByImage(creatures));
    let opponentMons = enemyTeam.map(creatures => findCreatureByImage(creatures));
    let playerSprites = [];
    let enemySprites = [];
    myTeam.forEach(creatures => {//creates my sprites
        let sprite = PIXI.Sprite.from(creatures);
        sprite.x = 100;
        sprite.y = 120;
        playerSprites.push(sprite);
    });

    enemyTeam.forEach(creatures => {//creates enemy's sprites
        let sprite = PIXI.Sprite.from(creatures);
        sprite.x = 700;
        sprite.y = 120;
        enemySprites.push(sprite);
    })
    myMons.forEach(creatures => {
        creatures.sprite = playerSprites.shift();
    });
    opponentMons.forEach(creatures => {
        creatures.sprite = enemySprites.shift();
    })

    console.log(myMons);
    console.log(opponentMons);


    let hudcontainer = new PIXI.Container();

    background = PIXI.Sprite.from('./Assets/battle-background-sunny-hillsx4.png');
    background.scale.x = 0.8;
    container.addChild(background);
    huddy = PIXI.Sprite.from('./Assets/HUD.png');
    huddy.y = 295;
    huddy.scale.y = 1.6;
    huddy.scale.x = 2.8;


    hudcontainer.addChild(huddy);
    container.addChild(hudcontainer);

    container.addChild(myMons[0].sprite);
    container.addChild(opponentMons[0].sprite);

    let text = new PIXI.Text(myMons[0].name, { fontFamily: 'Helvetica', fontSize: 18, fill: 0xF00000, align: 'center' });
    text.x = 10;
    text.y = 20;
    hphud1 = PIXI.Sprite.from('./Assets/HUD.png');
    let hp1 = new PIXI.Text('HP: ' + myMons[0].stats[0], { fontFamily: 'Helvetica', fontSize: 18, fill: 0xF00000, align: 'center' });
    hp1.y = 20;
    hp1.x = 150;
    hphud1.y = 10;
    hphud1.scale.y = 0.8;
    container.addChild(hphud1);
    container.addChild(text);
    container.addChild(hp1);


    hphud2 = PIXI.Sprite.from('./Assets/HUD.png');
    hphud2.y = 10;
    hphud2.scale.y = 0.8;
    hphud2.x = 580;
    container.addChild(hphud2);

    

    app.ticker.add(() => {
        state = changeState(moveIsMade, enemyMove);

        switch(state){
            case states.s1:

            case states.s2:

            case states.s3:
        }
        
    });


    container.addChild(text);
    app.stage.addChild(container);
    app.renderer.render(app.stage);
    createButtons(myMons, opponentMons, text, hp1);
}

function createButtons(myMons, opponentMons, nameText, hpText){
    let myHud = document.createElement('div');
    myHud.className = 'hud';
    myHud.id = 'myHud';
    let switchHud = document.createElement('div');
    switchHud.className = 'hud';
    switchHud.id = 'switchHud';
    thebody.append(myHud);
    thebody.append(switchHud);

    let myCurrent = 0;
    let enemyCurrent = 0;
    let moveButtons = new Array(4);
    let switchButtons = new Array(3);
    for(let i = 0; i < 4; i++){
        moveButtons[i] = document.createElement('button');
        moveButtons[i].className = 'move';
        let thismove = myMons[0].moves[i];
        moveButtons[i].innerText = thismove.name;
        moveButtons[i].addEventListener('click', () => {
            console.log(opponentMons[enemyCurrent].hp);
            thismove.doAttack(myMons[myCurrent], opponentMons[enemyCurrent]);
            console.log(opponentMons[enemyCurrent].hp);
            moveIsMade = true;
        });
        myHud.append(moveButtons[i]);
    }

    for(let i = 0; i < 3; i++){
        switchButtons[i] = document.createElement('button');
        switchButtons[i].className = 'move';
        let thisMon = myMons[i];
        switchButtons[i].innerText = thisMon.name;
        switchButtons[i].addEventListener('click', () => {
            if(state == 'choose a move' && !thisMon.checkFaint()){
                console.log('switch to ' + thisMon.name);
                container.removeChild(myMons[myCurrent].sprite);
                container.addChild(myMons[i].sprite);
                for(let j = 0; j < 4; j++){
                    moveButtons[j].innerText = myMons[i].moves[j].name;
                }
                myCurrent = i;
                moveIsMade = true;
            } else if(thisMon.checkFaint()){
                alert('This monster has fainted');
            }
            else {
                console.log('illegal');
            }
        });
        switchHud.append(switchButtons[i]);
    }
    

}




function createDivs(arrayOfSprites) {

    let divSet = arrayOfSprites.map(x => x.map(box => box.sprite));//creates array of images

    let userMenu = document.createElement('div');//creates the menu div
    

    userMenu.className = 'Menu';

    divSet.forEach(thing => {
        let piece = document.createElement('div');
        piece.className = 'set';

        thing.forEach(part => {
            let image = document.createElement('img');
            image.className = part;
            image.src = part;
            image.width = 30;
            image.height = 30;
            piece.append(image);
        });
        piece.addEventListener('click', () => {
            console.log('click');
            while (piece.firstChild != null) {
                myTeam.push(piece.firstChild.className);
                piece.removeChild(piece.firstChild);
            }
            userMenu.removeChild(piece);
            let next = userMenu.firstChild;
            while (next.firstChild != null) {
                enemyTeam.push(next.firstChild.className);
                next.removeChild(next.firstChild);
            }
            console.log(myTeam);
            console.log(enemyTeam);
            while (thebody.firstChild != null) {
                thebody.removeChild(thebody.firstChild);
            }
            createCanvas();
        });
        userMenu.append(piece);
    });


    thebody.append(userMenu);
    //alert('choose your randomized team');



}
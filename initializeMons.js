setArray();

let theDex = new Array(18);

let monsterArray = [];

let fireKnight = new monster('Flame Warrior', 'fire', warrior, './Assets/Sprite0.png');
monsterArray.push(fireKnight);

let fireMage = new monster('Swirling Illusionist', 'fire', magic, './Assets/Sprite1.png');
monsterArray.push(fireMage);

let fireBunny = new monster('Magma Rabbit', 'fire', beast, './Assets/Sprite2.png');
monsterArray.push(fireBunny);

let kingOfSea = new monster('King of the Sea', 'water', warrior, './Assets/Sprite3.png');
monsterArray.push(kingOfSea);

let iceWizard = new monster('Ice Wizard', 'water', magic, './Assets/Sprite4.png');
monsterArray.push(iceWizard);

let oceanWhale = new monster('Ocean Whale', 'water', beast, './Assets/Sprite5.png');
monsterArray.push(oceanWhale);

let grassKnight = new monster('Leaf the Samurai', 'grass', warrior, './Assets/Sprite6.png');
monsterArray.push(grassKnight);

let grassMage = new monster('Field Sage', 'grass', magic, './Assets/Sprite7.png');
monsterArray.push(grassMage);

let grassBeast = new monster('Forest Fang', 'grass', beast, './Assets/Sprite8.png');
monsterArray.push(grassBeast);

let sonicWarrior = new monster('Sonic Sword', 'sound', warrior, './Assets/Sprite9.png');
monsterArray.push(sonicWarrior);

let explodeMage = new monster('Mage Explode!', 'sound', magic, './Assets/Sprite10.png');
monsterArray.push(explodeMage);

let fiendishBat = new monster('Fiendish Bat', 'sound', beast, './Assets/Sprite11.png');
monsterArray.push(fiendishBat);

let gravityKnight = new monster('World Fighter', 'gravity', warrior, './Assets/Sprite12.png');
monsterArray.push(gravityKnight);

let gravityMage = new monster('Martian', 'gravity', magic, './Assets/Sprite13.png');
monsterArray.push(gravityMage);

let gravityBeast = new monster('Neptune', 'gravity', beast, './Assets/Sprite14.png');
monsterArray.push(gravityBeast);

let flyingWarrior = new monster('Ascended', 'flying', warrior, './Assets/Sprite15.png');
monsterArray.push(flyingWarrior);

let flyingMage = new monster('Weather Infector', 'flying', magic, './Assets/Sprite16.png');
monsterArray.push(flyingMage);

let dragon = new monster('King Dragon', 'flying', beast, './Assets/Sprite17.png');
dragon.stats[3] += 35;
monsterArray.push(dragon);


monsterArray.forEach(monster => {
    let oneShift = 0;
    if (monster.classType.id == 0) {
        oneShift = 0;
    } else if (monster.classType.id == 1) {
        oneShift = shiftInit;
    } else {
        oneShift = shiftTwo;
    }
    bigArray[(typeMap.get(monster.type) + oneShift) % 6][monster.classType.id] = monster;
});

//the code above creates the random teams of 3

console.log(bigArray);
console.log(bigArray[0]);
console.log(bigArray[3]);

function findCreatureByImage(image) {
    let current = monsterArray.find(thing => thing.sprite == image);
    if (current == undefined) {
        throw ('None found.');
    } else {
        return current;
    }
}
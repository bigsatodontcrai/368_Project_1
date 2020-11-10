function damageCalculation(atk, def, power, eff) {
    return eff * power * (atk / def) * ((Math.random() + 1) / 2);
}


function moveGang(name, type, style, attackPower, accuracy) {
    this.name = name;
    this.type = type;
    this.style = style;
    this.attackPower = attackPower;
    this.accuracy = accuracy;

    this.doAttack = function (player, enemy) {
        let type1 = this.type;
        let type2 = enemy.type;
        let myType = typeMap.get(type1);
        let yourType = typeMap.get(type2);
        let eff = typeChartGraph[myType][yourType];
        console.log(type1 + ' ' + type2 + ' ' + myType + ' ' + yourType);
        console.log(eff);
        let damage = damageCalculation(player.off, enemy.def, this.attackPower, eff);
        console.log(damage);
        if (this.style == 'Skill') {
            switch (this.name) {
                case 'Blind':
                    if (enemy.status == 'none' && Math.random() <= this.accuracy && player.spd >= enemy.spd) {
                        enemy.status = 'blinded';
                    } else {
                        alert('failed status');
                    }
                    break;
                case 'Strength':
                    if (player.off != 1.2 * 1.2 * 1.2 * 1.2 * 1.2 * 1.2 * player.off) {
                        player.off *= 1.2;
                    } else {
                        console.log('max attack');
                    }
                    break;
                case 'Curse':
                    if (enemy.status == 'none' && Math.random() <= this.accuracy && player.spd >= enemy.spd) {
                        enemy.status = 'cursed';
                    } else {
                        alert('failed status');
                    }
                    break;
                case 'Heal':
                    if (player.hp + 50 >= player.stats[0]) {
                        player.hp = player.stats[0];
                    } else {
                        player.hp += 50;
                    }
                    break;
                case 'Intimidate':
                    if (enemy.status == 'none' && Math.random() <= this.accuracy && player.spd >= enemy.spd) {
                        enemy.status = 'intimidated';
                    } else {
                        alert('failed status');
                    }
                    break;
                case 'Chase':
                    if (player.spd != 1.2 * 1.2 * 1.2 * 1.2 * 1.2 * 1.2 * player.spd) {
                        player.spd *= 1.2;
                    } else {
                        console.log('highest speed');
                    }
                    break;
                default:
                    throw 'Not a move';

            }
            return 0;
        } else if (this.name == enemy.immunity) {
            //alert('unaffected...');
            return 0;
        }
        if (this.style = 'Attack' && Math.random() <= this.accuracy) {
            if (damage == 0) {
                //alert('That type is immune!');
            }
            if (eff == 2) {
                //alert('That type is very weak to this move!');
            }
            return Math.floor(damage);
        }
        alert('The attack missed!');
        return 0;

    }
}

let warrior = {
    id: 0,
    baseStats: [160, 190, 130, 170],
    /*hp: stats[0],
    off: 1,
    def: 50,
    spd: 70,*/
    immunity: 'Intimidate',
    move1: 'Sword Attack',
    move2: 'Blind',
    move4: 'Strength'
}

let magic = {
    id: 1,
    baseStats: [180, 140, 180, 150],
    immunity: 'Blind',
    move1: 'Cast Spell',
    move2: 'Curse',
    move4: 'Heal'
}

let beast = {
    id: 2,
    baseStats: [170, 180, 160, 140],
    immunity: 'Curse',
    move1: 'Bite',
    move2: 'Intimidate',
    move4: 'Chase'
}

function monster(name, type, classType, sprite) {
    this.sprite = sprite;
    this.name = name;
    this.type = type;
    this.classType = classType;
    this.status = 'none';
    this.immunity = classType.immunity;
    this.moves = new Array(4);
    this.moves[0] = new moveGang(classType.move1, type, 'Attack', 70, 0.95);
    this.moves[1] = new moveGang(classType.move2, type, 'Skill', 0, 0.5);
    this.moves[2] = new moveGang('Jab', 'neutral', 'Attack', 60, 1);
    this.moves[3] = new moveGang(classType.move4, 'neutral', 'Skill', 0, 1);
    this.level = getRandomInt(4) + 47;
    this.stats = classType.baseStats.map(x => x + (4 * (this.level - 47)));
    this.hp = this.stats[0];
    this.off = this.stats[1];
    this.def = this.stats[2];
    this.spd = this.stats[3];

    this.checkFaint = function () {
        if (this.hp <= 0) {
            this.hp = 0;
            return true;
        } else {
            return false;
        }
    }
}
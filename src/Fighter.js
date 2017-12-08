"use strict";

const nameLength = 7;
const GameObject = require('./GameObject');

class Fighter extends GameObject{

    constructor (name, coordinates, age = 18, power = 1)
    {
        super(coordinates);
        let rank = '1',
            tired = 0;

        this.name = name || getRandName();
        this.age = age;
        this.power = power;
    }

    move (direction)
    {
        switch (direction) {
            case 'up': this.y++; break;
            case 'down': this.y--; break;
            case 'left': this.x--; break;
            case 'right': this.x++; break;
            default:
        }
    }
}

let getRandName = () => Math.random().toString(36).substr(2, nameLength);

module.exports = Fighter;
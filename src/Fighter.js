"use strict";

class Fighter {

    constructor (name, age, power)
    {
        let rank = '1',
            tired = 0;

        this.name = name;
        this.age = age;
        this.power = power;
    }
}

module.exports = Fighter;
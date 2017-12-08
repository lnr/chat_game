"use strict";

class GameObject
{

    constructor (coordonates = {x:0,y:0})
    {
        this.coordinates = coordonates;
    }

    get x() {
        return this.coordinates.x;
    }

    get y() {
        return this.coordinates.y;
    }

    set x(val) {
        this.coordinates.x = val;
    }

    set y(val) {
        this.coordinates.y = val;
    }
}

module.exports = GameObject;
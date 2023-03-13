export default class ShipModel {
    constructor(length) {
        this.health = length;
        this.length = length;
        this.direction = 1;
        //posArray and hitArray have same length
        this.posArray = []
        this.hitArray = []
    }

    //For direction, 0 = horizontal, 1 = vertical
    updatePos(placePos, direction) {
        if(direction == 0){
            for(var i = 0; i < this.length; i++) {
                this.posArray.push([...placePos]);
                console.log(`in updatePos: ${this.posArray}`)
                this.hitArray.push(false);
                placePos[1]++;
            }
        }else{
            for(var i = 0; i < this.length; i++) {
                this.posArray.push([...placePos]);
                this.hitArray.push(false);
                placePos[0]++;
            }
        }
    }

    //returns an itarator object of all positions of the ship
    getAllPos() {
        return [...this.posArray];
    }

    registerHit(pos) {
        if (this.posArray.includes(pos)) {
            this.hitArray[this.posArray.indexOf(pos)] = true;
        }else{
            console.log('out of ship positions');
            return;
        }
    }

    checkIfSunk() {
        let allHit = true;
        if (this.hitArray.includes(false)) {
            allHit = false;
        }
        return allHit;
    }
}
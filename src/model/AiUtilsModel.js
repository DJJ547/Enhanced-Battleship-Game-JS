import shipModel from './shipModel.js';

export default class AiUtilsModel {
    constructor(length, width) {
        this.numOfShips = 0;
        this.shipArray = [];
        this.defaultLength = 10;
        this.defaultWidth = 10;
        this.length = length;
        this.width = width;
        this.shipGrid = [];
        this.hitGrid = [];
        this.setupMap();
    }

    setupMap () {
        for (let i = 0; i < this.length; i++) {
            this.shipGrid[i] = [];
            for (let j = 0; j < this.width; j++) {
                this.shipGrid[i][j] = false;
            }
        }
        for (let i = 0; i < this.length; i++) {
            this.hitGrid[i] = [];
            for (let j = 0; j < this.width; j++) {
                this.hitGrid[i][j] = false;
            }
        }
    }

    printMap() {
        console.log('Display ship map:')
        for (var i = 0; i < this.length; i++) {
            console.log(JSON.stringify(this.shipGrid[i]))
            console.log()
        }

        console.log('Display hit map:')
        for (var i = 0; i < this.length; i++) {
            console.log(JSON.stringify(this.hitGrid[i]))
            console.log()
        }
    }

    validatePos(ship, pos, direction) {
        if(pos[0] < 0 || pos[1] < 0 || pos[0] > this.length || pos[1] > this.width) {
            return false;
        }
        if(direction == 0 && pos[1] + ship.length > this.width){
            return false;
        }
        if(direction == 1 && pos[0] + ship.length > this.length){
            return false;
        }
        return true;
    }

    randomlyPlaceAllShips() {
        
    }

    #checkEveryCol() {
        for (const row of this.shipGrid) {
            
        }
    }

    #checkEveryRow() {

    }

    removeShip(ship) {
        // remove ship on the map
        this.shipArray.splice(this.shipArray.indexOf(ship), 1);
        let posArr = ship.getAllPos();
        console.log(`in removeShip: ${posArr}`)
        for(let i = 0; i < posArr.length; i++) {
            this.shipGrid[posArr[i][0]][posArr[i][1]] = false;
        }
        //clear position array in current ship
        ship.posArray = [];
        ship.hitArray = [];
    }

    //only called before game starts
    removeAllShips() {
        this.setupMap();
        this.shipArray = [];
        //clear position arrays in each ship
        for (const ship in this.shipArray){
            ship.posArray = [];
            ship.hitArray = [];
        }
    }

    validatePlayerAttack(pos) {
        if(this.hitGrid[pos[0]][pos[1]] == true) {
            console.log('Position has been hit, Please enter a valid attack position');
            return false;
        }
        return true;
    }

    shootAiMap(pos) {
        this.hitGrid[pos[0]][pos[1]] = true;
        let JsonInputPos = JSON.stringify(pos);

        //traverse the shipArray and mark the position on the ship as true
        for(let i = 0; i < this.shipArray.length; i++) {
            for(let j = 0; j < this.shipArray[i].posArray.length; j++) {
                let JsonPos = JSON.stringify(this.shipArray[i].posArray[j]);
                if(JsonPos == JsonInputPos) {
                    this.shipArray[i].hitArray[this.shipArray[i].posArray.indexOf(pos)] = true;
                    console.log('this shot hit a ship')
                    break;
                }
            }
            break;
        }
    }
}
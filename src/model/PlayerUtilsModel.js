import shipModel from './shipModel.js';

export default class PlayerUtilsModel {
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
        for (let i = 0; i < this.shipGrid.length; i++) {
            for (let j = 0; j < this.shipGrid[i].length; j++) {
                if(this.shipGrid[i][j] == true) {
                    process.stdout.write("  " + this.#getShipLenToDisplay(i, j));
                }else {
                    process.stdout.write("  O");
                }
            }
            process.stdout.write("\n");
        }
    }

    #getShipLenToDisplay(y, x) {
        for (const ship of this.shipArray) {
            let JStrPos = JSON.stringify([y,x])
            for (const pos of ship.posArray) {
                if(JSON.stringify(pos) == JStrPos) {
                    return ship.length;
                }
            }
        }
        //throw an error
        console.log('cannot find a match position in ship array');
    }

    validatePos(ship, yPos, xPos, direction) {
        if(yPos < 0 || xPos < 0 || yPos > this.length || xPos > this.width) {
            return false;
        }
        if(direction == 0 && xPos + ship.length > this.width){
            return false;
        }
        if(direction == 1 && yPos + ship.length > this.length){
            return false;
        }
        return true;
    }

    placeShip(ship, yPos, xPos, direction) {
        this.shipArray.push(ship);
        this.numOfShips++;
        //update ship pos
        ship.updatePosAndDir(yPos, xPos, direction)
        //update grid
        if(direction == 0) {
            for (let i = 0; i < ship.length; i++) {
                this.shipGrid[yPos][xPos] = true;
                xPos++;
            }

        }else{
            for (let i = 0; i < ship.length; i++) {
                this.shipGrid[yPos][xPos] = true;
                yPos++;
            }
        }
    }

    removeShip(ship) {
        // remove ship on the map
        this.shipArray.splice(this.shipArray.indexOf(ship), 1);
        let posArr = ship.getAllPos();
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

    //This method will be having a complex AI firing technique algorithm
    AiShootPlayerMap() {
        let AvailablePos = this.#getAllUnhitPos();
        let max = AvailablePos.length - 1;
        let min = 0;
        let diff = max - min + 1;
        // generate random number 
        let rand = Math.random();
        rand = Math.floor(rand * diff) + min;

        let randomizedPos = AvailablePos[rand];
        
        this.hitGrid[randomizedPos[0]][randomizedPos[1]] = true;
        console.log(randomizedPos[0], randomizedPos[1]);
        
    }

    #getAllUnhitPos() {
        let allUnhitPos = [];
        for (let i = 0; i < this.hitGrid.length; i++){
            for (let j = 0; j < this.hitGrid[i].length; j++){
                if (this.hitGrid[i][j] == false){
                    allUnhitPos.push([i, j]);
                }
            }
        }
        return allUnhitPos;
    }

    checkIfAllShipsDestroied() {
        let AllDestroied = true;
        for(ship of this.shipArray) {
            if(!ship.checkIfSunk()) {
                AllDestroied = false;
            }
        }
        return AllDestroied;
    }
}

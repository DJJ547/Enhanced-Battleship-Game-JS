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

    setShipArray(ships) {
        this.shipArray = ships;
    }

    #switchDirection(direction) {
        let switchedDirection;
        direction == 1? switchedDirection = 0: switchedDirection = 1;
        return switchedDirection;
    }

    #RandomSelectPos(arr) {
        let min = 0;
        let max = arr.length - 1;
        let diff = max - min + 1;
        // generate a random array index
        let rand = Math.floor(Math.random() * diff) + min;
        return arr[rand];
    }

    randomlyPlaceAllShips() {
        for (const ship of this.shipArray){
            let oneOrZero = (Math.random()>=0.5)? 1 : 0;
            oneOrZero == 1?console.log('ship is vertical'):console.log('ship is horizontal');
            let len = ship.length;
            let posArr = this.findVerticalOrHorizontalPositions(len, oneOrZero);

            //=
            for (const pos of posArr) {
                console.log(`All available positions: ${pos}`);
            }
            //=

            if(!posArr.length) {
                console.log("ship direction cannot be applied, changed direction!")
                oneOrZero = this.#switchDirection(oneOrZero);
                posArr = this.findVerticalOrHorizontalPositions(len, oneOrZero);
            }
            let selectedPos = this.#RandomSelectPos(posArr);
            //verArr[rand] will be the randomly selected start position of the ship
            this.#placeShip(ship, selectedPos[0], selectedPos[1], oneOrZero);
        }
    }

    #placeShip(ship, yPos, xPos, direction) {
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
        
        //=
        console.log('Display map after each placement:')
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
        //=
    }

    findVerticalOrHorizontalPositions(shipLen, verOrHor) {
        let posArr = [];
        if(verOrHor == 1) {
            for (let i = 0; i < this.shipGrid.length - shipLen + 1; i++) {
                for (let j = 0; j < this.shipGrid[i].length; j++) {
                    let shipPartCtr = 0;
                    let ctr = 0;
                    while(ctr < shipLen) {
                        if(this.shipGrid[i + ctr][j]) {
                            shipPartCtr++;
                            break;
                        }
                        ctr++;
                    }
                    if(shipPartCtr == 0) {
                        posArr.push([i, j]);
                    }
                }
            }
        }else {
            for (let i = 0; i < this.shipGrid.length; i++) {
                for (let j = 0; j < this.shipGrid[i].length - shipLen + 1; j++) {
                    let shipPartCtr = 0;
                    let ctr = 0;
                    while(ctr < shipLen) {
                        if(this.shipGrid[i][j + ctr]) {
                            shipPartCtr++;
                            break;
                        }
                        ctr++;
                    }
                    if(shipPartCtr == 0) {
                        posArr.push([i, j]);
                    }
                }
            }
        }
        return posArr;
    }

    // testVertical() {
    //     this.shipGrid[1][0] = true;
    //     this.shipGrid[1][1] = true;
    //     this.shipGrid[3][1] = true;
    //     this.shipGrid[3][2] = true;
    //     this.shipGrid[3][3] = true;
    // }

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

    playerShootAiMap(pos) {
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
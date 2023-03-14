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

    setShipArray(ships) {
        this.shipArray = ships;
    }

    randomlyPlaceAllShips() {
        for (const ship of this.shipArray){
            let oneOrZero = (Math.random()>=0.5)? 1 : 0;
            let len = ship.length;
            if (oneOrZero == 1) {
                let posArr = this.#findVerticalStartPos(this.#checkEveryCol(), len);
                let max = posArr.length - 1;
                let min = 0;
                let diff = max - min + 1;
                // generate random number 
                let rand = Math.random();
                rand = Math.floor(rand * diff);
                rand = rand + min;
                //posArr[rand] will be the randomly selected start position of the ship
                this.#placeShip(ship, posArr[rand], oneOrZero)
            }else {
                let posArr = this.#findHorizontalStartPos(this.#checkEveryRow(), len);
                let max = posArr.length - 1;
                let min = 0;
                let diff = max - min;
                // generate random number 
                let rand = Math.random();
                rand = Math.floor(rand * diff);
                rand = rand + min;
                //posArr[rand] will be the randomly selected start position of the ship
                this.#placeShip(ship, posArr[rand], oneOrZero)
            }
        }
    }

    #placeShip(ship, startPos, direction) {
        this.numOfShips++;
        //update ship pos
        ship.updatePosAndDir([...startPos], direction)
        //update grid
        if(direction == 0) {
            for (var i = 0; i < ship.length; i++) {
                this.shipGrid[startPos[0]][startPos[1]] = true;
                startPos[1]++;
            }

        }else{
            for (var i = 0; i < ship.length; i++) {
                this.shipGrid[startPos[0]][startPos[1]] = true;
                startPos[0]++;
            }
        }
    }

    #findVerticalStartPos(colMap, shipLength) {
        let verticalStartPosArr = [];

        for (let i = 0; i < colMap.size; i++) {
            for (let j = 0; j + shipLength <= colMap.get(i).length; j++) {
                if (colMap.get(i)[j] + 1 == colMap.get(i)[j + 1] && colMap.get(i)[j + 1] + 1 == colMap.get(i)[j + 2]) {
                    verticalStartPosArr.push([j, i]);
                }
            }
        }
        return verticalStartPosArr;
    }

    #findHorizontalStartPos(rowMap, shipLength) {
        let horizontalStartPosArr = [];

        for(let i = 0; i < rowMap.size; i++) {
            if (rowMap.get(i).length >= shipLength) {
                for(let j = 0; j + shipLength <= rowMap.get(i).length; j++) {
                    if (rowMap.get(i)[j] + 1 == rowMap.get(i)[j + 1] && rowMap.get(i)[j + 1] + 1 == rowMap.get(i)[j + 2]) {
                        horizontalStartPosArr.push([i, j]);
                    }
                }
            }
        }
        return horizontalStartPosArr;
    }

    #checkEveryCol() {
        const colMap = new Map();
        for (let i = 0; i < this.shipGrid[0].length; i++) {
            colMap.set(i, []);
        }
        for (let i = 0; i < this.shipGrid.length; i++) {
            for (let j = 0; j < this.shipGrid[i].length; j++) {
                if (this.shipGrid[i][j] == false) {
                    let colArr = colMap.get(j);
                    colArr.push(i);
                }
            }
        }
        return colMap;
    }

    #checkEveryRow() {
        const rowMap = new Map();
        for (let i = 0; i < this.shipGrid.length; i++) {
            rowMap.set(i, []);
        }
        for (let i = 0; i < this.shipGrid.length; i++) {
            for (let j = 0; j < this.shipGrid[i].length; j++) {
                if (this.shipGrid[i][j] == false) {
                    let rowArr = rowMap.get(i);
                    rowArr.push(j);
                }
            }
        }
        return rowMap;
    }

    // removeShip(ship) {
    //     // remove ship on the map
    //     this.shipArray.splice(this.shipArray.indexOf(ship), 1);
    //     let posArr = ship.getAllPos();
    //     console.log(`in removeShip: ${posArr}`)
    //     for(let i = 0; i < posArr.length; i++) {
    //         this.shipGrid[posArr[i][0]][posArr[i][1]] = false;
    //     }
    //     //clear position array in current ship
    //     ship.posArray = [];
    //     ship.hitArray = [];
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
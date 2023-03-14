class Controller {
    constructor(playerModel, aiModel, view) {
        this.playerModel = playerModel;
        this.aiModel = aiModel;
        this.view = view;
    }

    startGame() {
        while(!this.playerModel.checkIfAllShipsDestroied() && !this.aiModel.checkIfAllShipsDestroied()) {
            //players round
            let isPlayerHit = false;
            do {
                let xPos = prompt('Please enter your x position');
                let yPos = prompt('Please enter your y position');
                //in a 2d array, ypos = x and xpos = y
                let pos = [yPos, xPos];
                isPlayerHit = this.aiModel.playerShootAiMap(pos);
            } while (isPlayerHit);
            //AIs round
            let isAiHit = false;
            do {
                isAiHit = this.playerModel.aiShootPlayerMap();
            } while (isAiHit);
        }
    }
}
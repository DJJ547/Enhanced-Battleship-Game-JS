import PlayerUtilsModel from './model/PlayerUtilsModel.js';
import AiUtilsModel from './model/AiUtilsModel.js';
import ShipModel from './model/shipModel.js';

const ship1 = new Map();
ship1.set([0,3], true);
ship1.set([1,3], true);

const ship2 = new Map();
ship2.set([2,0], true);
ship2.set([2,1], true);
ship2.set([2,2], true);

function main() {
  const length = 10;
  const width = 10;

  let player = new PlayerUtilsModel(length, width);
  let aiPlayer = new AiUtilsModel(length, width);
  const shipPos = [3,4];
  let shipDirection = 0;

  const shipLength1 = 2;
  const ship1 = new ShipModel(shipLength1);
  const shipLength2 = 3;
  const ship2 = new ShipModel(shipLength2);

  // if(player.validatePos(ship1, [...shipPos], shipDirection)) {
  //   player.placeShip(ship1, [...shipPos], shipDirection);
  // }

  // player.printMap();

  // console.log(player.shipArray)
  // player.removeShip(ship1);
  // console.log(player.shipArray)
  // player.printMap();
  const ships = [ship1, ship2];
  aiPlayer.setShipArray(ships);
  aiPlayer.testChangeShipGrid();
  aiPlayer.printMap();
  let verStartMap = aiPlayer.checkEveryCol();
  for (let [key, value] of verStartMap) {
    console.log(key + '=' + value);
  }
  let allVerStartPos = aiPlayer.findVerticalStartPos(verStartMap, 3);
  for (let pos of allVerStartPos) {
    console.log(pos);
  }
  aiPlayer.randomlyPlaceAllShips();
  console.log('================== after randomly assign ships ===================')
  aiPlayer.printMap();

  // let shootPos = [3, 4]
  // if(aiPlayer.validatePlayerAttack([...shootPos])){
  //   aiPlayer.shootAiMap([...shootPos]);
  // }
  // aiPlayer.printMap();

}

main()

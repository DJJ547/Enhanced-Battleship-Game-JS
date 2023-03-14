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
  const shipLength2 = 2;
  const ship2 = new ShipModel(shipLength2);
  const shipLength3 = 3;
  const ship3 = new ShipModel(shipLength3);
  const shipLength4 = 3;
  const ship4 = new ShipModel(shipLength4);
  const shipLength5 = 4;
  const ship5 = new ShipModel(shipLength5);

  // if(player.validatePos(ship1, [...shipPos], shipDirection)) {
  //   player.placeShip(ship1, [...shipPos], shipDirection);
  // }

  // player.printMap();

  // console.log(player.shipArray)
  // player.removeShip(ship1);
  // console.log(player.shipArray)
  // player.printMap();
  const ships = [ship1, ship2, ship3, ship4, ship5];
  aiPlayer.setShipArray(ships);
  aiPlayer.printMap();
  aiPlayer.randomlyPlaceAllShips();
  console.log('================== after randomly assign ships ===================')
  aiPlayer.printMap();

  console.log(aiPlayer.shipArray)

  // let shootPos = [3, 4]
  // if(aiPlayer.validatePlayerAttack([...shootPos])){
  //   aiPlayer.playerShootAiMap([...shootPos]);
  // }
  // aiPlayer.printMap();

}

main()

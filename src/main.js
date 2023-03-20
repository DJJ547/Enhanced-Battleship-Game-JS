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
  const length = 5;
  const width = 5;

  let player = new PlayerUtilsModel(length, width);
  let aiPlayer = new AiUtilsModel(length, width);

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
  aiPlayer.setShipArray([...ships]);
  // aiPlayer.testVertical();

  // let horOrVerPos = aiPlayer.findVerticalOrHorizontalPositions(3, 0);

  // for (let pos of horOrVerPos) {
  //   console.log(pos);
  // }

  aiPlayer.randomlyPlaceAllShips();
  // console.log('================== AI palyer map after randomly assign ships ===================')
  // aiPlayer.printMap();

  // for (const ship of aiPlayer.shipArray) {
  //   console.log(`ship with length: ${ship.length}`)
  //   for (const pos of ship.posArray){
  //     console.log(`contains pos: ${pos}`)
  //   }
  // }

  // const pos1 = [1,1];
  // const pos2 = [2,2];
  // const pos3 = [4,0];
  // const pos4 = [2,4];
  // const pos5 = [0,1];

  // const dir1 = 1;
  // const dir2 = 1;
  // const dir3 = 0;
  // const dir4 = 1;
  // const dir5 = 0;
  
  // player.placeShip(ship1, pos1[0], pos1[1], dir1);
  // player.placeShip(ship2, pos2[0], pos2[1], dir2);
  // player.placeShip(ship3, pos3[0], pos3[1], dir3);
  // player.placeShip(ship4, pos4[0], pos4[1], dir4);
  // player.placeShip(ship5, pos5[0], pos5[1], dir5);
  // console.log('================== player map after assign ships ===================')

  // player.printMap();

  // for (const ship of player.shipArray) {
  //   console.log(`ship with length: ${ship.length}`)
  //   for (const pos of ship.posArray){
  //     console.log(`contains pos: ${pos}`)
  //   }
  // }

  // let shootPos = [3, 4]
  // if(aiPlayer.validatePlayerAttack([...shootPos])){
  //   aiPlayer.playerShootAiMap([...shootPos]);
  // }
  // aiPlayer.printMap();

}

main()

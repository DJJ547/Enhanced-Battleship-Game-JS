import PlayerUtilsModel from './model/PlayerUtilsModel.js';
import AiUtilsModel from './model/AiUtilsModel.js';
import ShipModel from './model/shipModel.js';

// function counter() {
// let seconds = 0;
// setInterval(() => {
//   seconds += 1;
//   document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
// }, 1000);
// }

// counter();

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
  player.printMap();
  const shipPos = [3,4];
  let shipDirection = 0;
  const shipLength = 3;
  const ship1 = new ShipModel(shipLength);

  if(player.validatePos(ship1, [...shipPos], shipDirection)) {
    player.placeShip(ship1, [...shipPos], shipDirection);
  }

  player.printMap();

  console.log(player.shipArray)
  player.removeShip(ship1);
  console.log(player.shipArray)
  player.printMap();
}

main()

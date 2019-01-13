'use strict';
/*
* Author: Корнейко Александр
* Unit: mate TIC-TAC-TOE
*/

let movesCounter = 0;
let movesCounterX = 0;
let movesCounterO = 0;
let player = true;
const figure = bool => bool ? 'x' : 'o';
let filledCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const winsVariantsForEachCell = [
  [[1, 2], [3, 6], [4, 8]],
  [[0, 2], [4, 7]],
  [[0, 1], [4, 6], [5, 8]],
  [[0, 6], [4, 5]],
  [[1, 7], [3, 5], [0, 8], [2, 6]],
  [[2, 8], [4, 3]],
  [[7, 8], [0, 3], [2, 4]],
  [[6, 8], [1, 4]],
  [[0, 4], [2, 5], [6, 7]]
];
let win = false;
let isPcPlay = true;

const scoreboard = document.querySelector('#scoreboard');
const field = document.querySelector('#field');
const restartBtn = document.querySelector('#restart > span');

field.addEventListener('click', setPlayerMove);
restartBtn.addEventListener('click', restart);
scoreboard.addEventListener('click', start);

function start(event) {
  reset();
  if (event.target.id === 'hum') {
    isPcPlay = false;
  } else if (event.target.id === 'pc') {
    scoreboard.innerHTML = `    <span>First move: </span><span class="vs" id="pc1">PC</span>
        <span class="vs" id="hum1">Human</span>`;
  } else if (event.target.id === 'pc1') {
    moveFromPc();
  }
}
function setPlayerMove(event) {
  const cell = event.target;
  if (cell.id === 'field' || win || cell.textContent !== '') return;

  const index = Array.from(cell.parentNode.children).indexOf(cell);

  move(cell, index);
  if (isPcPlay && !win) moveFromPc();
}

function move(cell, index) {
  movesCounter++;
  if (player) {
    movesCounterX++;
  } else {
    movesCounterO++;
  }
  cell.textContent = figure(player);
  scoreboard.querySelector('span').textContent = figure(!player);
  filledCells[index] = figure(player);
  checkWin(cell, index);
  player = !player;
}

function checkWin(cell, index) {
  if (movesCounter < 5) return;

  win = checkWinFromCell(index);

  if (win) {
    scoreboard.innerHTML = `<h3>${figure(player).toUpperCase()} wins in ${movesCounter - Math.min(movesCounterX, movesCounterO)} moves</h3>`;
    return;
  }
  if (movesCounter === 9) {
    reset();
    scoreboard.innerHTML = '<h3>Nobody wins</h3>';
    win = true;
  }
}

function checkWinFromCell(cellIndex) {
  const letter = figure(player);

  for (let variant of winsVariantsForEachCell[cellIndex]) {
    let result = false;
    for (let position of variant) {
      if (field.children[position].textContent !== letter) {
        result = false;
        break;
      } else {
        result = true;
      }
    }

    if (result) return true;
  }

  return false;
}


function restart() {
  reset();
  scoreboard.innerHTML = `    <span class="vs" id="hum">VS Human</span>
      <span class="vs" id="pc">VS PC</span>`;
  player = true;
  win = false;
  isPcPlay = true;
  for (let cell of field.childNodes) {
    cell.textContent = '';
  }
}

function moveFromPc() {
  //const avlblMoves = filledCells.fil
  const humLetter = figure(!player);
  const pcLetter = figure(player);
  let index;
  const humanWinMove = findNextWin(humLetter);
  if (humanWinMove >= 0) {
    index = humanWinMove;
  } else {
    const pcWinMove = findNextWin(pcLetter);

    if (pcWinMove >= 0) {
      index = pcWinMove;
    } else {
      const emptyCells = filledCells.map(
        (el, i) => {
          if (!el) return i;
        }
      ).filter(el => el);

      if (emptyCells.length === 0) {
        scoreboard.innerHTML = '<h3>Nobody wins</h3>';
        return;
      }
      index = emptyCells[getRandomInt(0, emptyCells.length)];
    }
  }

  move(field.children[index], index);

}

function findNextWin(letterForCheck) {

  for (let i = 0; i < filledCells.length; i++) {

    const letterAtPos = filledCells[i];
    if (letterAtPos !== letterForCheck) continue;


    for (let variant of winsVariantsForEachCell[i]) {

      if (filledCells[variant[0]] === letterForCheck && filledCells[variant[1]] === 0) {
        return variant[1];
      }

      if (filledCells[variant[1]] === letterForCheck && filledCells[variant[0]] === 0) {
        return variant[0];
      }

    }

  }
  return -1;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function reset() {
  movesCounter = 0;
  movesCounterX = 0;
  movesCounterO = 0;
  filledCells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  scoreboard.innerHTML = '<p>next move: <span>x</span></p>';
}

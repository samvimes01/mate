'use strict';
/**
 * Author: Oleksandr Korneiko
 * Unit: Minesweeper
 **/

const start = document.querySelector('#start');
const input = document.querySelector('#grid-size');
const initGridSize = input.value;

const parentSelector = '.minesweeper';
const parent = document.querySelector(`${parentSelector}`);
const field = document.querySelector(`${parentSelector}__field`);
const fieldInfo = document.querySelector(`${parentSelector}__info`);
const cellSelector = `${parentSelector}__field-cell`;

const htmlStyles = window.getComputedStyle(document.querySelector('html'));
const cellColor = htmlStyles.getPropertyValue('--cellColor');

const maxGridSize = 25;

let cellsArray;
let minesAmount;
let minesPositions;
let openedCells;
let leftFlagsCounter = initGridSize;
let size;

start.addEventListener('click', buildField);
field.addEventListener('contextmenu', markCell);


function buildField() {
  field.addEventListener('click', revealCell);

  size = +((input.value <= maxGridSize && input.value > 5) ? input.value : (input.value > maxGridSize) ? maxGridSize : input.value);
  minesPositions = [];
  openedCells = new Set();
  clearDom(field);
  setGridSize(size);

  setMines(size);
  changeFlags(minesAmount);

  for (let i = 0; i < cellsArray.length; i++) {
    const elem = `<span data-index = "${i}" class = "minesweeper__field-cell"></span>`;
    field.insertAdjacentHTML('beforeEnd', elem);
  }

  parent.classList.remove('hidden');
}

function revealCell(event) {
  const cell = event.target.closest(cellSelector);
  if (!cell) return;
  const value = getCellValue(cell);

  if (value === '*') {
    for (const cell of field.children) {
      cell.textContent = getCellValue(cell) === 0 ? '' : getCellValue(cell);
      cell.style.color = '#000';
    }
    cell.style.color = 'red';
    field.removeEventListener('click', revealCell);
    return;
  }
  if (value > 0) {
    cell.textContent = value;
    cell.style.color = '#000';
    openedCells.add(+cell.dataset.index);
    checkWin();
  } else {
    openAdjacentCells(cell);
  }

}

function markCell(event) {
  event.preventDefault();
  const cell = event.target.closest(cellSelector);
  if (!cell) return;
  const val = cell.textContent;
  if (val === '') {
    if (leftFlagsCounter === 0) return;
    changeFlags('-');
    cell.textContent = '⥜';
    cell.style.color = 'red';
  } else if (val === '⥜') {
    changeFlags('+');
    //   cell.textContent = '?';
    // } else if (val === '?') {
    cell.textContent = '';
    cell.style.color = cellColor;
  }
}

function setMines(size) {
  // minesAmount 10% from cells count
  minesAmount = Math.round(size * size * 0.1);
  cellsArray = Array(size * size).fill(0);

  let i = 0;
  while (true) {
    if (i === minesAmount) break;
    const minePosition = Math.trunc(Math.random() * size * size);
    if (!minesPositions.includes(minePosition)) {
      minesPositions.push(minePosition);
      i++;
    }
  }

  minesPositions.forEach(mine => setCellValue(cellsArray, mine, size));
}

function changeFlags(up) {
  if (up === '+') {
    leftFlagsCounter++;
  } else if (up === '-') {
    leftFlagsCounter--;
  } else {
    leftFlagsCounter = up;
  }
  fieldInfo.textContent = `⥜: ${leftFlagsCounter}`;
}

function setCellValue(array, mine, rowSize) {
  array[mine] = '*';

  //side cells
  if ((mine + 1) % rowSize !== 0) {
    if (array[mine + 1] !== undefined && array[mine + 1] !== '*') {
      array[mine + 1] += 1;
    }
  }
  if ((mine % rowSize) !== 0) {
    if (array[mine - 1] !== undefined && array[mine - 1] !== '*') {
      array[mine - 1] += 1;
    }
  }

  //top cells
  if (array[mine - rowSize] !== undefined) {
    if (array[mine - rowSize] !== '*') {
      array[mine - rowSize] += 1;
    }
  }
  if ((mine + 1) % rowSize !== 0) {
    if (array[mine - rowSize + 1] !== undefined && array[mine - rowSize + 1] !== '*') {
      array[mine - rowSize + 1] += 1;
    }
  }
  if ((mine % rowSize) !== 0) {
    if (array[mine - rowSize - 1] !== undefined && array[mine - rowSize - 1] !== '*') {
      array[mine - rowSize - 1] += 1;
    }
  }

  //bottom cells
  if (array[mine + rowSize] !== undefined) {
    if (array[mine + rowSize] !== '*') {
      array[mine + rowSize] += 1;
    }
  }
  if ((mine + 1) % rowSize !== 0) {
    if (array[mine + rowSize + 1] !== undefined && array[mine + rowSize + 1] !== '*') {
      array[mine + rowSize + 1] += 1;
    }
  }
  if ((mine % rowSize) !== 0) {
    if (array[mine + rowSize - 1] !== undefined && array[mine + rowSize - 1] !== '*') {
      array[mine + rowSize - 1] += 1;
    }
  }

}

function openAdjacentCells(cell) {
  if (getCellValue(cell) !== 0 || cell.classList.contains('opened')) return;
  const ind = +cell.dataset.index;
  if (ind < 0 || ind > size * size - 1) return;
  cell.classList.add('opened');
  openedCells.add(ind);
  const adjCellsInd = [ind + 1, ind - 1, ind - size + 1, ind - size - 1, ind + size + 1, ind + size - 1, ind + size, ind - size];
  //to do more sophisticated code to route
  for (const i of adjCellsInd) {
    if (i < 0 || i > size * size - 1) continue;
    const cell = field.children[i];
    if (getCellValue(cell) === 0) {
      cell.classList.add('opened');
      openedCells.add(+cell.dataset.index);
    }
  }
  checkWin();
}

function checkWin() {
  if (cellsArray.length - openedCells.size === minesAmount) {
    field.removeEventListener('click', revealCell);
    fieldInfo.textContent = 'You win!!!';
  }
}

function getCellValue(cell) {
  // let position = [...cell.parentNode.children].indexOf(cell); до data-index
  const position = cell.dataset.index;
  return cellsArray[position];
}

// utility function to clear suggestions list
function clearDom(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function setGridSize(size) {
  document.documentElement.style.setProperty('--rowNum', size);
  document.documentElement.style.setProperty('--colNum', size);
}


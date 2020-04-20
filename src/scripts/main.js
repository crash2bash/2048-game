'use strict';

const game = document.querySelector('.game');
const startGame = document.querySelector('.game__button--start');
// const restart = document.querySelector('.game__button--restart');
const score = document.querySelector('.game__score');
const cells = document.querySelectorAll('.game__cell');
const randomNumber = () => Math.random() < 0.9 ? 2 : 4;
const randomIndex = () => Math.floor(Math.random() * 16);

startGame.addEventListener('click', () => {
  init();

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'ArrowLeft') {
      moveLeft();
    }

    if (evt.key === 'ArrowRight') {
      moveRight();
    }

    if (evt.key === 'ArrowUp') {
      moveUp();
    }

    if (evt.key === 'ArrowDown') {
      moveDown();
    }
  });
});

function init() {
  cells.forEach(item => {
    item.textContent = '0';
  });

  const firstNumber = Math.random() < 0.9 ? 2 : 4;
  const secondNumber = Math.random() < 0.9 ? 2 : 4;

  const randomCellIndex = randomIndex();
  let randomCellIndex2 = randomIndex();

  while (randomCellIndex === randomCellIndex2) {
    randomCellIndex2 = Math.random() < 0.9 ? 2 : 4;
  }

  const cell = cells[randomCellIndex];
  const cell2 = cells[randomCellIndex2];

  cell.textContent = `${firstNumber}`;
  cell2.textContent = `${secondNumber}`;
  updateColors();
}

function addTile() {
  const res = [];

  for (let x = 1; x <= 16; x++) {
    if (document.querySelector(`.game__cell-${x}`).textContent === '0') {
      res.push(x);
    }
  }

  const index = res[Math.floor(Math.random() * res.length)];

  if (res.length === 0) {
    game.classList.add('game__over');
  } else {
    document.querySelector(`.game__cell-${index}`)
      .textContent = `${randomNumber()}`;
  }
}

function moveLeft() {
  const firstIndexes = row(1, 2, 3, 4);
  const secondIndexes = row(5, 6, 7, 8);
  const thirdIndexes = row(9, 10, 11, 12);
  const fourthIndexes = row(13, 14, 15, 16);

  if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
    addTile();
    updateColors();
  }
}

function moveRight() {
  const firstIndexes = row(4, 3, 2, 1);
  const secondIndexes = row(8, 7, 6, 5);
  const thirdIndexes = row(12, 11, 10, 9);
  const fourthIndexes = row(16, 15, 14, 13);

  if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
    addTile();
    updateColors();
  }
}

function moveUp() {
  const firstIndexes = row(1, 5, 9, 13);
  const secondIndexes = row(2, 6, 10, 14);
  const thirdIndexes = row(3, 7, 11, 15);
  const fourthIndexes = row(4, 8, 12, 16);

  if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
    addTile();
    updateColors();
  }
}

function moveDown() {
  const firstIndexes = row(13, 9, 5, 1);
  const secondIndexes = row(14, 10, 6, 2);
  const thirdIndexes = row(15, 11, 7, 3);
  const fourthIndexes = row(16, 12, 8, 4);

  if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
    addTile();
    updateColors();
  }
}

function row(aa, bb, cc, dd) {
  const inputs = [aa, bb, cc, dd];

  const a = parseInt(document.querySelector(`.game__cell-${aa}`).innerHTML);
  const b = parseInt(document.querySelector(`.game__cell-${bb}`).innerHTML);
  const c = parseInt(document.querySelector(`.game__cell-${cc}`).innerHTML);
  const d = parseInt(document.querySelector(`.game__cell-${dd}`).innerHTML);

  const vals = [];
  const res = [];

  if (a !== 0) {
    vals.push(a);
  }

  if (b !== 0) {
    vals.push(b);
  }

  if (c !== 0) {
    vals.push(c);
  }

  if (d !== 0) {
    vals.push(d);
  }

  for (let x = 0; x < vals.length; x++) {
    if (typeof vals[x + 1] !== 'undefined') {
      if (vals[x] === vals[x + 1]) {
        res.push(vals[x] + vals[x + 1]);

        score.textContent = `${parseInt(score.textContent) + vals[x]
        + vals[x + 1]}`;
        x += 1;
      } else {
        res.push(vals[x]);
      }
    } else {
      res.push(vals[x]);
    }
  }

  let z = 0;
  const input = [a, b, c, d];
  const output = [];

  while (z < res.length) {
    document.querySelector(`.game__cell-${inputs[z]}`).textContent
      = `${res[z]}`;
    output.push(res[z]);
    z += 1;
  }

  while (z < 4) {
    document.querySelector(`.game__cell-${inputs[z]}`).textContent = '0';
    output.push(0);
    z += 1;
  }

  return `${input[0]},${input[1]},${input[2]},${input[3]}`
    !== `${output[0]},${output[1]},${output[2]},${output[3]}`;
}

function updateColors() {
  for (let x = 0; x < 16; x++) {
    switch (cells[x].textContent === '0') {
      case cells[x].textContent === '2':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '4':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '8':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '16':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '32':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '64':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '128':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '256':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '512':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '1024':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '2048':
        cells[x].classList.add('game__cell--active');
        break;

      case cells[x].textContent === '0':
        cells[x].classList.remove('game__cell--active');
        break;
    }
  }
}

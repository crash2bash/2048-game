'use strict';

const game = document.querySelector('.game');
const randomNumber = () => Math.random() < 0.9 ? 2 : 4;
const randomIndex = () => Math.floor(Math.random() * 16);

document.addEventListener('DOMContentLoaded', () => {
  createGame();

  const score = document.querySelector('.game__score');
  const startGame = document.querySelector('.game__button--start');
  const restart = document.querySelector('.game__button--restart');
  const sectionGame = document.querySelector('.game__container');
  const cells = document.querySelectorAll('.game__cell');
  const gameOverModalShow = document.querySelector('.game__over');
  const highScoreItem = document.querySelector('.game__score--best');

  startGame.addEventListener('click', () => {
    init();

    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();

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

  restart.addEventListener('click', () => {
    score.textContent = '0';
    gameOverModalShow.classList.remove('game__over--show');

    init();
  });

  function createGame() {
    const section = document.createElement('section');
    const scoreField = document.createElement('p');
    const startButton = document.createElement('button');
    const restartButton = document.createElement('button');
    const gameField = document.createElement('div');
    const gameCell = document.createElement('div');
    const gameOverModal = document.createElement('div');
    const gameOverModalText = document.createElement('p');
    const highScore = document.createElement('p');
    const scoreContainer = document.createElement('div');
    const scoreText = document.createElement('p');
    const highScoreText = document.createElement('p');

    section.className = 'game__container';

    scoreField.className = 'game__score';
    scoreField.textContent = '0';

    startButton.className = 'game__button game__button--start';
    startButton.textContent = 'новая игра';

    gameField.className = 'game__field';

    restartButton.className = 'game__button game__button--restart';
    restartButton.textContent = 'рестарт';

    gameOverModal.className = 'game__over';
    gameOverModalText.className = 'game__over-text';

    gameOverModalText.textContent = `Жаль, но вы проиграли!`;

    scoreContainer.className = 'game__score-container';

    highScore.className = 'game__score game__score--best';

    scoreText.className = 'game__score-text';
    scoreText.textContent = 'Ваш счет:';
    highScoreText.className = 'game__score-text game__score-text--best';
    highScoreText.textContent = 'Ваш рекорд:';

    game.append(section);
    section.append(scoreContainer);
    scoreContainer.append(scoreText);
    scoreContainer.append(scoreField);
    scoreContainer.append(highScoreText);
    scoreContainer.append(highScore);
    section.append(startButton);
    section.append(gameField);
    section.append(restartButton);

    let i = 1;

    while (i < 17) {
      gameCell.className = `game__cell game__cell-${i}`;
      gameField.append(gameCell.cloneNode(true));
      i++;
    }

    gameField.append(gameOverModal);
    gameOverModal.append(gameOverModalText);
  }

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

    if (localStorage.getItem('highScore') !== null) {
      highScoreItem.textContent = localStorage.getItem('highScore');
    } else {
      localStorage.setItem('highScore', '0');
    }
  }

  function addTile() {
    const result = [];

    for (let i = 1; i <= 16; i++) {
      if (document.querySelector(`.game__cell-${i}`).textContent === '0') {
        result.push(i);
      }
    }

    const index = result[Math.floor(Math.random() * result.length)];

    if (result.length === 0) {
      if ((!gameCheck())) {
        gameOver();
      }
    } else {
      document.querySelector(`.game__cell-${index}`)
        .textContent = `${randomNumber()}`;
    }

    updateColors();
  }

  function moveLeft() {
    const firstIndexes = row(1, 2, 3, 4);
    const secondIndexes = row(5, 6, 7, 8);
    const thirdIndexes = row(9, 10, 11, 12);
    const fourthIndexes = row(13, 14, 15, 16);

    if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
      addTile();
    }

    if (!gameCheck()) {
      gameOver();
    }
  }

  function moveRight() {
    const firstIndexes = row(4, 3, 2, 1);
    const secondIndexes = row(8, 7, 6, 5);
    const thirdIndexes = row(12, 11, 10, 9);
    const fourthIndexes = row(16, 15, 14, 13);

    if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
      addTile();
    }

    if (!gameCheck()) {
      gameOver();
    }
  }

  function moveUp() {
    const firstIndexes = row(1, 5, 9, 13);
    const secondIndexes = row(2, 6, 10, 14);
    const thirdIndexes = row(3, 7, 11, 15);
    const fourthIndexes = row(4, 8, 12, 16);

    if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
      addTile();
    }

    if (!gameCheck()) {
      gameOver();
    }
  }

  function moveDown() {
    const firstIndexes = row(13, 9, 5, 1);
    const secondIndexes = row(14, 10, 6, 2);
    const thirdIndexes = row(15, 11, 7, 3);
    const fourthIndexes = row(16, 12, 8, 4);

    if (firstIndexes || secondIndexes || thirdIndexes || fourthIndexes) {
      addTile();
    }

    if (!gameCheck()) {
      gameOver();
    }
  }

  function row(firstValue, secondValue, thirdValue, fourthValue) {
    const inputs = [firstValue, secondValue, thirdValue, fourthValue];

    const a = parseInt(document.querySelector(`.game__cell-${firstValue}`)
      .textContent);
    const b = parseInt(document.querySelector(`.game__cell-${secondValue}`)
      .textContent);
    const c = parseInt(document.querySelector(`.game__cell-${thirdValue}`)
      .textContent);
    const d = parseInt(document.querySelector(`.game__cell-${fourthValue}`)
      .textContent);

    const values = [];
    const result = [];

    if (a !== 0) {
      values.push(a);
    }

    if (b !== 0) {
      values.push(b);
    }

    if (c !== 0) {
      values.push(c);
    }

    if (d !== 0) {
      values.push(d);
    }

    for (let i = 0; i < values.length; i++) {
      if (typeof values[i + 1] !== 'undefined') {
        if (values[i] === values[i + 1]) {
          result.push(values[i] + values[i + 1]);

          score.textContent = `${parseInt(score.textContent) + values[i]
          + values[i + 1]}`;

          const newScore = parseInt(score.textContent) + values[i]
            + values[i + 1];

          score.textContent = newScore;

          if (newScore > parseInt(highScoreItem.textContent)) {
            localStorage.setItem('highScore', newScore);
          }

          i += 1;
        } else {
          result.push(values[i]);
        }
      } else {
        result.push(values[i]);
      }
    }

    let maxLength = 0;
    const input = [a, b, c, d];
    const output = [];

    while (maxLength < result.length) {
      document.querySelector(`.game__cell-${inputs[maxLength]}`)
        .textContent = `${result[maxLength]}`;
      output.push(result[maxLength]);
      maxLength += 1;
    }

    while (maxLength < 4) {
      document.querySelector(`.game__cell-${inputs[maxLength]}`)
        .textContent = '0';
      output.push(0);
      maxLength += 1;
    }

    return `${input[0]},${input[1]},${input[2]},${input[3]}`
      !== `${output[0]},${output[1]},${output[2]},${output[3]}`;
  }

  function updateColors() {
    for (let x = 0; x < 16; x++) {
      cells[x].classList.remove('game__cell--two');

      switch (cells[x].textContent >= '0') {
        case cells[x].textContent === '2':
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--two');
          break;

        case cells[x].textContent === '4':
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--two');
          break;

        case cells[x].textContent === '8':
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--eight');
          break;

        case cells[x].textContent === '16':
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--eight');
          break;

        case cells[x].textContent === '32':
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--third');
          break;

        case cells[x].textContent === '64':
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--third');
          break;

        case cells[x].textContent === '128':
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.add('game__cell--ten');
          break;

        case cells[x].textContent === '256':
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.add('game__cell--ten');
          break;

        case cells[x].textContent === '512':
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.add('game__cell--almost-win');
          break;

        case cells[x].textContent === '1024':
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.add('game__cell--almost-win');
          break;

        case cells[x].textContent === '2048':
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.remove('game__cell--almost-win');
          cells[x].classList.add('game__cell--win');

          win();

          break;

        default:
          cells[x].classList.remove('game__cell--two');
          cells[x].classList.remove('game__cell--eight');
          cells[x].classList.remove('game__cell--third');
          cells[x].classList.remove('game__cell--ten');
          cells[x].classList.remove('game__cell--almost-win');
          break;
      }
    }
  }

  function gameCheck() {
    return rowCheck(1, 2, 3, 4)
      || rowCheck(5, 6, 7, 8)
      || rowCheck(9, 10, 11, 12)
      || rowCheck(13, 14, 15, 16)
      || rowCheck(4, 3, 2, 1)
      || rowCheck(8, 7, 6, 5)
      || rowCheck(12, 11, 10, 9)
      || rowCheck(16, 15, 14, 13)
      || rowCheck(1, 5, 9, 13)
      || rowCheck(2, 6, 10, 14)
      || rowCheck(3, 7, 11, 15)
      || rowCheck(4, 8, 12, 16)
      || rowCheck(13, 9, 5, 1)
      || rowCheck(14, 10, 6, 2)
      || rowCheck(15, 11, 7, 3)
      || rowCheck(16, 12, 8, 4);
  }

  function rowCheck(firstValue, secondValue, thirdValue, fourthValue) {
    const a = parseInt(document.querySelector(`.game__cell-${firstValue}`)
      .textContent);
    const b = parseInt(document.querySelector(`.game__cell-${secondValue}`)
      .textContent);
    const c = parseInt(document.querySelector(`.game__cell-${thirdValue}`)
      .textContent);
    const d = parseInt(document.querySelector(`.game__cell-${fourthValue}`)
      .textContent);

    const values = [];

    if (a !== 0) {
      values.push(a);
    } else {
      return true;
    }

    if (b !== 0) {
      values.push(b);
    } else {
      return true;
    }

    if (c !== 0) {
      values.push(c);
    } else {
      return true;
    }

    if (d !== 0) {
      values.push(d);
    } else {
      return true;
    }

    for (let i = 0; i < values.length; i++) {
      if (typeof values[i + 1] !== 'undefined') {
        if (values[i] === values[i + 1]) {
          return true;
        }
      }
    }

    return false;
  }

  function gameOver() {
    gameOverModalShow.classList.add('game__over--show');
  }

  function win() {
    const winModal = document.createElement('div');
    const winModalText = document.createElement('p');

    winModal.className = 'game__win-modal';
    winModalText.className = 'game__win-modal-text';
    winModalText.textContent = 'Вау, ты сделал это!';
    sectionGame.append(winModal);
    winModal.append(winModalText);
  }
});

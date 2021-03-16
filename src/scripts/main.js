import { rock, paper, scissors } from './images.js';

const playBtn = document.querySelector('[data-play-btn]');
const homeContainer = document.querySelector('[data-home]');
const gameContainer = document.querySelector('[data-game]');
const homeBtn = document.querySelector('[data-home-btn]');
const restartBtn = document.querySelector('[data-restart-btn]');
const computerScoreContainer = document.querySelector('[data-computer-score]');
const playerScoreContainer = document.querySelector('[data-player-score]');
const optionsBtn = document.querySelector('[data-options]');
const resultMessage = document.querySelector('[data-action-message]');
const actionComputer = document.querySelector('[data-action-computer]');
const actionPlayer = document.querySelector('[data-action-player]');

let computerScore = 0;
let playerScore = 0;

const handleDraw = () => {
  resultMessage.classList.add('game__action-message--draw');
  resultMessage.innerHTML = 'Empatou!';
};

const handleVictory = () => {
  resultMessage.classList.add('game__action-message--win');
  resultMessage.innerHTML = 'Você Venceu!';
  playerScore += 1;
  playerScoreContainer.innerHTML = playerScore;
};

const handleLost = () => {
  resultMessage.classList.add('game__action-message--lost');
  resultMessage.innerHTML = 'Computador Venceu!';
  computerScore += 1;
  computerScoreContainer.innerHTML = computerScore;
};

const cleanResultMessage = () => {
  resultMessage.classList.remove('game__action-message--draw');
  resultMessage.classList.remove('game__action-message--win');
  resultMessage.classList.remove('game__action-message--lost');
  resultMessage.innerHTML = 'Escolha sua jogada!';
};

const newRound = () => {
  actionComputer.classList.remove('game__action-image-left--animate');
  actionPlayer.classList.remove('game__action-image-right--animate');
  actionComputer.classList.remove('game__action-image-left--scissors');
  actionPlayer.classList.remove('game__action-image-right--scissors');
  actionComputer.src = rock;
  actionPlayer.src = rock;
  cleanResultMessage();

  optionsBtn.addEventListener('click', handleOptions);
  homeBtn.addEventListener('click', finishGame);
  restartBtn.addEventListener('click', resetScore);
};

const setResult = (result) => {
  if (result === 'draw') handleDraw();
  if (result === 'win') handleVictory();
  if (result === 'lost') handleLost();
};

const resultAnimation = () => {
  actionComputer.classList.add('game__action-image-left--animate');
  actionPlayer.classList.add('game__action-image-right--animate');
};

const getImage = (option) => {
  if (option === 'rock') return rock;
  if (option === 'paper') return paper;

  return scissors;
};

const addOptionsToDom = (playerOption, computerOption) => {
  actionComputer.src = getImage(computerOption);

  if (computerOption === 'scissors')
    actionComputer.classList.add('game__action-image-left--scissors');

  actionPlayer.src = getImage(playerOption);

  if (playerOption === 'scissors')
    actionPlayer.classList.add('game__action-image-right--scissors');
};

const handleResult = (result, playerOption, computerOption) => {
  optionsBtn.removeEventListener('click', handleOptions);
  homeBtn.removeEventListener('click', finishGame);
  restartBtn.removeEventListener('click', resetScore);
  resultMessage.innerHTML = 'Aguarde...';

  resultAnimation();

  setTimeout(() => {
    addOptionsToDom(playerOption, computerOption);
    setResult(result);

    setTimeout(() => newRound(), 1000);
  }, 1000);
};

const getResult = (playerOption, computerOption) => {
  let result = '';

  if (playerOption === computerOption) {
    result = 'draw';
  } else if (
    (playerOption === 'rock' && computerOption === 'scissors') ||
    (playerOption === 'paper' && computerOption === 'rock') ||
    (playerOption === 'scissors' && computerOption === 'paper')
  ) {
    result = 'win';
  } else {
    result = 'lost';
  }

  return result;
};

const getComputerOption = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  const computerOption = optionsBtn.children[randomIndex].dataset.option;

  return computerOption;
};

const handleOptions = (e) => {
  const playerOption = e.target.dataset.option;

  if (!playerOption) return;

  const computerOption = getComputerOption();

  const result = getResult(playerOption, computerOption);

  handleResult(result, playerOption, computerOption);
};

const resetScore = () => {
  computerScore = 0;
  playerScore = 0;

  computerScoreContainer.innerHTML = computerScore;
  playerScoreContainer.innerHTML = playerScore;
};

const finishGame = () => {
  homeContainer.classList.remove('hide');
  gameContainer.classList.add('hide');

  resetScore();
};

const startGame = () => {
  homeContainer.classList.add('hide');
  gameContainer.classList.remove('hide');
};

export default (function init() {
  playBtn.addEventListener('click', startGame);
  homeBtn.addEventListener('click', finishGame);
  restartBtn.addEventListener('click', resetScore);
  optionsBtn.addEventListener('click', handleOptions);
})();

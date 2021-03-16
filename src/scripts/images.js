import rock from '../images/rock.png';
import paper from '../images/paper.png';
import scissors from '../images/scissors.png';
import rockPaperScissors from '../images/rock-paper-scissors.png';

const rockEl = document.querySelector('[data-option="rock"]');
const paperEl = document.querySelector('[data-option="paper"]');
const scissorsEl = document.querySelector('[data-option="scissors"]');
const imageOneEl = document.querySelector('[data-image-one]');
const imageTwoEl = document.querySelector('[data-image-two]');
const actionPlayer = document.querySelector('[data-action-player]');
const actionComputer = document.querySelector('[data-action-computer]');

const setImages = (() => {
  rockEl.src = rock;
  paperEl.src = paper;
  scissorsEl.src = scissors;
  imageOneEl.src = rockPaperScissors;
  imageTwoEl.src = rockPaperScissors;
  actionPlayer.src = rock;
  actionComputer.src = rock;
})();

export { setImages, rock, paper, scissors };

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');       // Fixed: initialize const
const timerDisplay = document.querySelector('#timer'); // Fixed: initialize const

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") return 1500;
  if (difficulty === "normal") return 1000;
  if (difficulty === "hard") return randomInteger(600, 1200);
  return 1000; // default
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) return chooseHole(holes);
  lastHole = hole;
  return hole;
}

/**
 * Game over check.
 */
function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

/**
 * Shows a mole at a hole with a delay.
 */
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * Shows and hides a mole.
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

/**
 * Toggles the 'show' class for a hole.
 */
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}

/**
 * Updates the score.
 */
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

/**
 * Clears the score.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the timer display.
 */
function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 * Starts the timer.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * Handles mole click.
 */
function whack(event) {
  updateScore();
  event.target.classList.remove('show');
  return points;
}

/**
 * Adds click listeners to moles.
 */
function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

/**
 * Sets game duration.
 */
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

/**
 * Stops the game.
 */
function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

/**
 * Starts the game.
 */
function startGame() {
  clearScore();
  setDuration(10);       // 10 seconds for example
  setEventListeners();
  startTimer();
  showUp();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Expose functions for testing
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

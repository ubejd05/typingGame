const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];


let randomWord;
let score = 0;
let highScore = localStorage.getItem('highScore') !== null ? localStorage.getItem('highScore') : 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
let newHighScore = false;

// Set difficulty select value
difficultySelect.value = difficulty;

addWordToDOM();

// Focus on text input on start
text.focus();

highScoreEl.innerHTML = highScore;

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Event listeners
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';
    
    if(difficulty === 'easy') {
      time += 5;
    } else if(difficulty === 'medium') {
      time += 3;
    } else {
      time += 1;
    }

    updateTime();
  }
})

// Settings btn click
settingsBtn.addEventListener('click', (e) => {
  settings.classList.toggle('hide')
});

// Settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty)
  location.reload();
})


// const words = getRandomWord();
// console.log(words);


// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
  // fetch('https://random-word-api.herokuapp.com/word?number=1&swear=0')
  // .then(result => result.json())
  // .then(data => data[0])
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord; 
}

function updateScore() {
  score++
  scoreEl.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore)
    newHighScore = true;
  }
  highScoreEl.innerHTML = localStorage.getItem('highScore');
}

// Update time
function updateTime() {
  time--
  timeEl.innerHTML = time + 's'

  if (time === 0) {
    clearInterval(timeInterval)
    // End game
    gameOver();
  }
}

// Game over, show end screen 
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    ${newHighScore === true ? '<h2 id="newHighScore">New High Score!!!</h2>'  : ''}
    <button onclick="location.reload()">Play Again?</button>
  `;

  endgameEl.style.display = 'flex';
}
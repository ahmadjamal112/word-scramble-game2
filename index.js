const easyWords = ["cat", "dog", "sun", "ball", "car", "tree", "book"];
const mediumWords = ["planet", "garden", "purple", "window", "river", "yellow"];
const hardWords = ["javascript", "function", "algorithm", "developer", "framework"];

let words = [];
let currentWord = '';
let scrambled = '';
let score = 0;
let timeLeft = 30;
let timerInterval;

function startGame(level) {
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');

  if (level === "easy") words = [...easyWords];
  else if (level === "medium") words = [...mediumWords];
  else words = [...hardWords];

  score = 0;
  document.getElementById('score').innerText = score;

  nextWord();
  startTimer();
}

function startTimer() {
  timeLeft = 30;
  document.getElementById('timer').innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function scrambleWord(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function nextWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  scrambled = scrambleWord(currentWord);
  document.getElementById('scrambledWord').innerText = scrambled;
}

function submitAnswer() {
  const userGuess = document.getElementById('userInput').value.trim().toLowerCase();
  if (userGuess === currentWord) {
    score += 10;
    document.getElementById('score').innerText = score;
    document.getElementById('feedback').innerText = "✅ Correct!";
    document.getElementById('feedback').style.color = 'green';
    document.getElementById('userInput').value = '';
    nextWord();
  } else {
    document.getElementById('feedback').innerText = "❌ Try again!";
    document.getElementById('feedback').style.color = 'red';
  }
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('endScreen').classList.remove('hidden');
  document.getElementById('finalScore').innerText = score;
}

function restartGame() {
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
}

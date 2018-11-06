// Game values
let min = 1,
    max = 10,
    winningNum = setWinningNumber(),
    guesseLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num')
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;  

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);

  // Validate the guess
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Enter a number between ${min} and ${max}`);
    guessInput.value = '';
  } else {
    // Check if won
    if(guess === winningNum) {
      gameOver(true, `${winningNum} is correct, YOU WIN!!!`)
    }else {
      guesseLeft -= 1;
      
      if(guesseLeft === 0) {
        gameOver(false, `Game Over. The correct number was ${winningNum}`)
      }else {
        setMessage(`${guess} is not correct, ${guesseLeft} guesses left!`);
        guessInput.value = '';
      }
    }
  }

});

// Game Over

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
} 

// Set the message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Set winning number
function setWinningNumber() {
  return Math.floor(Math.random()*(max-min+1)+min)
}
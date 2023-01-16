// variable to store game solution word
let targetWord = "banana";

// request a solution word from the server
const fetchWord = fetch('/api/game/my-word');
fetchWord.then(response => response.json())
.then(data => {
  targetWord = data.word;
})

// Get the elements from the HTML
var submitForm = document.querySelector(".submitForm");
var guessInput = document.querySelector("#guess");
var message = document.querySelector("#message");
var guesses = document.querySelector("#guesses");
var letterDivs = document.querySelectorAll(".grid-item");

// variable to keep track of empty divs for the letters
var nextEmptyDiv = 0;

var correctGuesses = 0;
var totalGuesses = 0;

// submit form for guess
submitForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // gets the value entered by the user
  var guess = guessInput.value;

  // makes sure the user enters a 6 letter word
  if (guess.length !== 6) {
    message.textContent = "Please enter a 6 letter word.";
    return;
  }

  // checks if the guess is correct
  if (guess === targetWord) {
    // you win message
    message.textContent = "Congratulations! You guessed the word correctly.";
    // stops user from guessing again
    guessInput.disabled = true;
    // loop to remove the change in color to the specific divs
    for (var i = 0; i < letterDivs.length; i++) {
      letterDivs[i].textContent = targetWord[i];
      letterDivs[i].classList.remove("correct");
      letterDivs[i].classList.remove("correct-letter");
    }
  } else {
    // you lose message
    if (totalGuesses >= 6) {
      message.textContent =
        "You have reached the maximum number of guesses. The correct word was: " +
        targetWord;
      guessInput.disabled = true;
    } else {
      // guess again message
      message.textContent = "Incorrect. Please try again.";
      // increases the amount of guesses the player has made
      totalGuesses++;
      guesses.textContent = "Guesses: " + totalGuesses;
      // adds color change for tiles according to if letters are correct or in wrong spot
      for (var i = 0; i < guess.length; i++) {
        letterDivs[nextEmptyDiv].textContent = guess[i];
        if (targetWord.indexOf(guess[i]) !== -1 && targetWord.indexOf(guess[i]) !== i) {
            letterDivs[nextEmptyDiv].classList.add("correct-letter");
        } else if (targetWord.indexOf(guess[i]) !== -1) {
            letterDivs[nextEmptyDiv].classList.add("correct");
        }
        nextEmptyDiv++;
    }
    }
  }
});
// Handle the reset button click event
var resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function () {
  // Reset the game state
  correctGuesses = 0;
  totalGuesses = 0;
  guesses.textContent = "Guesses: 0";
  nextEmptyDiv = 0;
  for (var i = 0; i < letterDivs.length; i++) {
    letterDivs[i].classList.remove("correct");
    letterDivs[i].classList.remove("correct-letter");
    letterDivs[i].textContent = "";
  }
  // Randomly choose a new word (needs to be figured out)
  // word = words[Math.floor(Math.random() * words.length)];

  // Clear the letter divs and enable the input
  for (var i = 0; i < letterDivs.length; i++) {
    letterDivs[i].textContent = "";
  }
  guessInput.disabled = false;
  guessInput.value = "";
  message.textContent = "";
});

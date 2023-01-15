const WORD_LENGTH = 6;
const SPIN_ANIMATION_PERIOD = 500;
const BOUNCE_ANIMATION_PERIOD = 500;
const keyboard = document.querySelector("[data-keyboard]");
const alertBox = document.querySelector("[data-alert-box]");
const guessMatrix = document.querySelector("[data-guess-matrix]");

// variable to store game solution word
let secretWord;

// request a solution word from the server
const fetchWord = fetch('/api/game/my-word');

// process the fetch() promise response
fetchWord.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
})
.then((data) => {
  secretWord = data.word;
  startGamePlay(data.word);
})

function startGamePlay() {
  console.log('startGamePlay secretWord = ', secretWord);
  document.addEventListener("click", handleMouse);
  document.addEventListener("keydown", handleKeyboard);
}

function stopGamePlay() {
  document.removeEventListener("click", handleMouse);
  document.removeEventListener("keydown", handleKeyboard);
}

function handleMouse(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key);
    return;
  }

  if (e.target.matches("[data-enter]")) {
    sendGuess();
    return;
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey();
    return;
  }
}

function handleKeyboard(e) {
  if (e.key === "Enter") {
    sendGuess(secretWord);
    return;
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  }

  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function pressKey(key) {
  const activeBlocks = getActiveBlocks();
  if (activeBlocks.length >= WORD_LENGTH) return;
  const nextBlock = guessMatrix.querySelector(":not([data-letter])");
  nextBlock.dataset.letter = key.toLowerCase();
  nextBlock.textContent = key;
  nextBlock.dataset.state = "active";
}

function deleteKey() {
  const activeBlocks = getActiveBlocks();
  const lastBlock = activeBlocks[activeBlocks.length - 1];
  if (lastBlock == null) return;
  lastBlock.textContent = "";
  delete lastBlock.dataset.state;
  delete lastBlock.dataset.letter;
}

function sendGuess() {
  const activeBlocks = [...getActiveBlocks()];
  if (activeBlocks.length !== WORD_LENGTH) {
    showAlert("Word not long enough");
    shakeBlocks(activeBlocks);
    return;
  }

  const guess = activeBlocks.reduce((word, block) => {
    return word + block.dataset.letter;
  }, "");

  // Request word matching "guess" from dictionary on server
  const fetchDictionaryWord = fetch(`/api/game/dictionary/${guess}`);

  fetchDictionaryWord.then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // actions if dictionary lookup returns "false"
    if (data === false) {
      showAlert("Not in dictionary");
      shakeBlocks(activeBlocks);
      return;
    }
    // execute these actions no matter what
    stopGamePlay();
    activeBlocks.forEach((...params) => spinBlock(...params, guess));
  })
}

function spinBlock(block, index, array, guess) {
  const letter = block.dataset.letter;
  const key = keyboard.querySelector(`[data-key="${letter}"i]`);
  setTimeout(() => {
    block.classList.add("spin");
  }, (index * SPIN_ANIMATION_PERIOD) / 2);

  block.addEventListener(
    "transitionend",
    () => {
      block.classList.remove("spin");
      if (secretWord[index] === letter) {
        block.dataset.state = "correct";
        key.classList.add("correct");
      } else if (secretWord.includes(letter)) {
        block.dataset.state = "wrong-spot";
        key.classList.add("wrong-spot");
      } else {
        block.dataset.state = "wrong";
        key.classList.add("wrong");
      }

      if (index === array.length - 1) {
        block.addEventListener(
          "transitionend",
          () => {
            startGamePlay();
            checkCorrect(guess, array);
          },
          { once: true }
        );
      }
    },
    { once: true }
  );
}

function getActiveBlocks() {
  return guessMatrix.querySelectorAll('[data-state="active"]');
}

function showAlert(message, duration = 1000) {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.classList.add("alert");
  alertBox.prepend(alert);
  if (duration == null) return;

  setTimeout(() => {
    alert.classList.add("hide");
    alert.addEventListener("transitionend", () => {
      alert.remove();
    });
  }, duration);
}

function shakeBlocks(blocks) {
  blocks.forEach((block) => {
    block.classList.add("shake");
    block.addEventListener(
      "animationend",
      () => {
        block.classList.remove("shake");
      },
      { once: true }
    );
  });
}

function checkCorrect(guess, blocks) {
  if (guess === secretWord) {
    showAlert("You Win", 5000);
    bounceBlocks(blocks);
    stopGamePlay();
    return;
  }

  const remainingBlocks = guessMatrix.querySelectorAll(":not([data-letter])");
  if (remainingBlocks.length === 0) {
    showAlert(secretWord.toUpperCase(), null);
    stopGamePlay();
  }
}

function bounceBlocks(blocks) {
  blocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.add("bounce");
      block.addEventListener(
        "animationend",
        () => {
          block.classList.remove("bounce");
        },
        { once: true }
      );
    }, (index * BOUNCE_ANIMATION_PERIOD) / 5);
  });
}

replayBtn.addEventListener("click", () => {
  location.reload();
});
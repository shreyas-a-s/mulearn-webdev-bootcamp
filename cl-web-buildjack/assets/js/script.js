// Automatically adjust Bootstrap theme
const updateTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-bs-theme",
    isDark ? "dark" : "light",
  );
};

// Listen for theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateTheme);

// Set initial theme
updateTheme();

// Game logic
const $startGameBtn = $("#startGame");
const $hitBtn = $("#hit");
const $standBtn = $("#stand");
const $playerHandEl = $("#player-hand");
const $dealerHandEl = $("#dealer-hand");
const $playerScoreEl = $("#player-score");
const $dealerScoreEl = $("#dealer-score");
const $resultEl = $("#result");

let deck, playerHand, dealerHand;

function createDeck() {
  const suits = ["♠", "♣", "♦", "♥"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
  if (["J", "Q", "K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
}

function calculateScore(hand) {
  let score = hand.reduce((acc, card) => acc + getCardValue(card), 0);
  let aces = hand.filter((card) => card.value === "A").length;
  while (score > 21 && aces) {
    score -= 10;
    aces--;
  }
  return score;
}

function updateUI() {
  $playerHandEl.text(
    playerHand.map((card) => `${card.value}${card.suit}`).join(" "),
  );
  $dealerHandEl.text(
    dealerHand.map((card) => `${card.value}${card.suit}`).join(" "),
  );
  $playerScoreEl.text(calculateScore(playerHand));
  $dealerScoreEl.text(calculateScore(dealerHand));
}

function checkGameOver() {
  let playerScore = calculateScore(playerHand);
  let dealerScore = calculateScore(dealerHand);
  if (playerScore > 21) {
    $resultEl.text("You Busted! Dealer Wins!");
    disableButtons();
  } else if (dealerScore > 21) {
    $resultEl.text("Dealer Busted! You Win!");
    disableButtons();
  } else if (playerScore === 21) {
    $resultEl.text("Blackjack! You Win!");
    disableButtons();
  }
}

function disableButtons() {
  $hitBtn.prop("disabled", true);
  $standBtn.prop("disabled", true);
}

$startGameBtn.on("click", () => {
  deck = createDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  $resultEl.text("");
  updateUI();
  $hitBtn.prop("disabled", false);
  $standBtn.prop("disabled", false);
});

$hitBtn.on("click", () => {
  playerHand.push(deck.pop());
  updateUI();
  checkGameOver();
});

$standBtn.on("click", () => {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }
  updateUI();
  let playerScore = calculateScore(playerHand);
  let dealerScore = calculateScore(dealerHand);
  if (dealerScore > 21 || playerScore > dealerScore) {
    $resultEl.text("You Win!");
  } else if (playerScore < dealerScore) {
    $resultEl.text("Dealer Wins!");
  } else {
    $resultEl.text("It's a Draw!");
  }
  disableButtons();
});

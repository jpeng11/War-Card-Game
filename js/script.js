/*----- constants -----*/

/*----- app's state (variables) -----*/
let playerDeck = [],
  compDeck = [];
let suits = ["\u2660", "\u2666", "\u2663", "\u2665"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let playerScore = 0,
  compScore = 0;

/*----- cached element references -----*/
const scorePlayer = document.querySelector("#scorePlayer");
const scoreComp = document.querySelector("#scoreComputer");
const playerDraw = document.querySelector(".playerDraw");
const compDraw = document.querySelector(".compDraw");

/*----- event listeners -----*/
document.querySelector("#newGame").addEventListener("click", newGame);
document.querySelector("#draw").addEventListener("click", dealCard);

/*----- functions -----*/

// Return new deck of card
function buildNewDeck() {
  let deck = new Array();
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { Value: values[j], Suit: suits[i] };
      deck.push(card);
    }
  }
  shuffleDeck(deck);
}

// Shuffle the deck we generated
function shuffleDeck(deck) {
  let temp;
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  splitDeck(deck);
}

// Split new deck equality to player & computer
function splitDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    if (i % 2 === 0) {
      playerDeck.push(deck[i]);
    } else {
      compDeck.push(deck[i]);
    }
  }
  return [playerDeck, compDeck];
}

// Draw a card from each stack and put it on game table
function dealCard() {
  let playerCard = playerDeck.shift();
  let compCard = compDeck.shift();

  playerDraw.textContent = `${playerCard.Value}${playerCard.Suit}`;
  compDraw.innerHTML = `${compCard.Value}${compCard.Suit}`;

  // Convert A,J,Q,K to number
  let playerCardValue = convertValue(playerCard.Value);
  let compCardValue = convertValue(compCard.Value);

  if (playerCardValue === compCardValue) {
    handleWar();
  } else if (playerCardValue > compCardValue) {
    playerScore += 1;
    console.log(playerScore);
  }
}

function handleWar() {}

function convertValue(cardValue) {
  switch (cardValue) {
    case "A":
      cardValue = 14;
    case "J":
      cardValue = 11;
    case "Q":
      cardValue = 12;
    case "K":
      cardValue = 13;
      break;
  }
  cardValue = parseInt(cardValue, 10);
  return cardValue;
}
function checkWin() {}
function newGame() {}

var deck1 = buildNewDeck();

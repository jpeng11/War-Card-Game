/*----- constants -----*/

/*----- app's state (variables) -----*/
let playerDeck = [],
  compDeck = [];
let suits = ["\u2660", "\u2666", "\u2663", "\u2665"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let playerScore = 0,
  compScore = 0;
// Store draw on War if max card value of player's and computer's draw are the same
let warTempDeck = [];
let war = false;

/*----- cached element references -----*/
const scorePlayer = document.querySelector("#scorePlayer");
const scoreComp = document.querySelector("#scoreComputer");
const draw = document.querySelector("#draw");
const playerDraw = document.querySelector(".playerDraw");
const compDraw = document.querySelector(".compDraw");
const total = document.querySelector("#total");
const playerCardsLeft = document.querySelector("#playerCardsLeft");
const compCardsLeft = document.querySelector("#compCardsLeft");
const msg = document.querySelector("#msg");
const warMsg = document.querySelector("#warMsg");

scorePlayer.innerHTML = 0;
scoreComp.innerHTML = 0;

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
  playerCardsLeft.innerHTML = playerDeck.length;
  compCardsLeft.innerHTML = compDeck.length;
  return [playerDeck, compDeck];
}

// Draw a card from each stack and put it on game table
function dealCard() {
  checkWin(war);
  let playerCard = playerDeck.shift();
  let compCard = compDeck.shift();

  playerDraw.style.fontSize = "50px";
  compDraw.style.fontSize = "50px";
  warMsg.innerHTML = "";
  playerDraw.innerHTML = `${playerCard.Value}${playerCard.Suit}`;
  compDraw.innerHTML = `${compCard.Value}${compCard.Suit}`;

  // Convert A,J,Q,K to number
  let playerCardValue = convertValue(playerCard.Value);
  let compCardValue = convertValue(compCard.Value);

  if (playerCardValue === compCardValue) {
    warTempDeck.push(compCard, playerCard);
    warMsg.innerHTML = "WAR";
    war = true;
    handleWar();
  } else if (playerCardValue > compCardValue) {
    playerScore += 1;
    playerDeck.push(playerCard, compCard);
    scorePlayer.innerHTML = playerScore;
  } else {
    compScore += 1;
    compDeck.push(compCard, playerCard);
    scoreComp.innerHTML = compScore;
  }
  playerCardsLeft.innerHTML = playerDeck.length;
  compCardsLeft.innerHTML = compDeck.length;
}

function handleWar() {
  checkWin(war);
  let playerWarCard = [],
    compWarCard = [];
  let tempDeck = [];
  // Disable button to prevent player draw another card
  draw.disabled = true;

  // Draw 3 cards face down and last card face up
  // compare last card to determine who wins
  for (let i = 0; i < 4; i++) {
    playerWarCard.push(playerDeck.shift());
    compWarCard.push(compDeck.shift());
  }
  tempDeck = tempDeck.concat(playerWarCard);
  tempDeck = tempDeck.concat(compWarCard);

  // Clear draw table
  setTimeout(function () {
    playerDraw.innerHTML = "";
    compDraw.innerHTML = "";

    // Display card, face down cards are display as card X
    // Only last card will be display
    setTimeout(function () {
      playerDraw.style.fontSize = "20px";
      compDraw.style.fontSize = "20px";
      playerDraw.innerHTML = `
      Card 1<br/>
      Card 2<br/>
      Card 3<br/>
      ${playerWarCard[playerWarCard.length - 1].Value}${
        playerWarCard[playerWarCard.length - 1].Suit
      }`;
      compDraw.innerHTML = `
      Card 1<br/>
      Card 2<br/>
      Card 3<br/>
      ${compWarCard[compWarCard.length - 1].Value}${
        compWarCard[compWarCard.length - 1].Suit
      }`;
      draw.disabled = false;
    }, 1000);
  }, 1000);

  // Find the card has biggest number in player's draw

  let playerCardValue = convertValue(
    playerWarCard[playerWarCard.length - 1].Value
  );
  let compCardValue = convertValue(compWarCard[compWarCard.length - 1].Value);

  // Compare biggest card from each side and determine who wins
  if (playerCardValue === compCardValue) {
    // If biggest number are the same,
    // Store cards played on this round into temporary array and run the war again
    warTempDeck.concat(tempDeck);
    handleWar();
  } else if (playerCardValue > compCardValue) {
    // Merge cards played on war round into player's deck
    playerDeck = playerDeck.concat(tempDeck);
    playerDeck = playerDeck.concat(warTempDeck);
    // Clear temporary array
    warTempDeck = [];
    playerScore += tempDeck.length + warTempDeck.length;
    scorePlayer.innerHTML = playerScore;
  } else {
    // Merge cards played on war round into computer's deck
    compDeck = compDeck.concat(tempDeck);
    compDeck = compDeck.concat(warTempDeck);
    // Clear temporary array
    warTempDeck = [];
    compScore += tempDeck.length + warTempDeck.length;
    scoreComp.innerHTML = compScore;
  }
}
// Convert A,J,Q,K into number
function convertValue(cardValue) {
  switch (cardValue) {
    case "A":
      cardValue = 14;
      break;
    case "J":
      cardValue = 11;
      break;
    case "Q":
      cardValue = 12;
      break;
    case "K":
      cardValue = 13;
      break;
  }
  // Convert passed in value from string to number
  cardValue = parseInt(cardValue, 10);
  return cardValue;
}

// Check winner
function checkWin(war) {
  if (!war) {
    if (playerDeck.length === 0) {
      msg.innerHTML = "Player Wins";
      draw.disabled = true;
    }
    if (compDeck.length === 0) {
      msg.innerHTML = "Computer Wins";
      draw.disabled = true;
    }
  } else {
    if (playerDeck.length < 4) {
      msg.innerHTML = "Player Wins";
      draw.disabled = true;
    }
    if (compDeck.length < 4) {
      msg.innerHTML = "Computer Wins";
      draw.disabled = true;
    }
  }
}

// New Game button function, reset everything to start
function newGame() {
  let playerDeck = [],
    compDeck = [];
  let war = false;
  playerDraw.innerHTML = "";
  compDraw.innerHTML = "";
  scorePlayer.innerHTML = 0;
  scoreComp.innerHTML = 0;
  playerCardsLeft.innerHTML = 0;
  compCardsLeft.innerHTML = 0;
  msg.innerHTML = "";
  warMsg.innerHTML = "";
}

buildNewDeck();

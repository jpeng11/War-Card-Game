/*----- constants -----*/

/*----- app's state (variables) -----*/
let playerDeck = [],
  compDeck = [];
let suits = ["\u2660", "\u2666", "\u2663", "\u2665"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let playerScore = 0,
  compScore = 0;
let warTempDeck = [];

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
    console.log("-----WAR-----");
    handleWar();
  } else if (playerCardValue > compCardValue) {
    playerScore += 1;
    playerDeck.push(playerCard, compCard);
  } else {
    compScore += 1;
    compDeck.push(compCard, playerCard);
  }
  console.log(playerDeck);
  console.log(compDeck);
  console.log("---------");
}

function handleWar() {
  let playerWarCard = [],
    compWarCard = [];

  for (let i = 0; i < 3; i++) {
    playerWarCard.push(playerDeck.shift());
    compWarCard.push(compDeck.shift());
  }

  let tempDeck = [];
  let playerMax = [{ Value: 0 }];
  let compMax = [{ Value: 0 }];

  // Find the card has biggest number in player's draw
  for (let i = 0; i < playerWarCard.length; i++) {
    let playerCardValue = convertValue(playerWarCard[i].Value);
    let playerMaxValue = convertValue(playerMax[0].Value);
    if (playerCardValue > playerMaxValue) {
      playerMax[0] = playerWarCard[i];
    }
    tempDeck.push(playerWarCard[i]);
  }

  // Find the card has biggest number in computer's draw
  for (let j = 0; j < compWarCard.length; j++) {
    let compCardValue = convertValue(compWarCard[j].Value);
    let compMaxValue = convertValue(compMax[0].Value);
    if (compCardValue > compMaxValue) {
      compMax[0] = compWarCard[j];
    }
    tempDeck.push(compWarCard[j]);
  }

  let playerWarMax = convertValue(playerMax.Value);
  let compWarMax = convertValue(compMax.Value);
  if (playerWarMax === compWarMax) {
    warTempDeck.concat(tempDeck);
    handleWar();
  } else if (playerWarMax > compWarMax) {
    if (warTempDeck.length > 0) {
      playerDeck.concat(tempDeck);
      playerDeck.concat(warTempDeck);
      playerScore = tempDeck.length + warTempDeck.length;
    } else {
      playerDeck.concat(tempDeck);
      playerScore += tempDeck.length;
    }
  } else {
    if (warTempDeck.length > 0) {
      compDeck.concat(tempDeck);
      compDeck.concat(warTempDeck);
      compScore = tempDeck.length + warTempDeck.length;
    } else {
      compDeck.concat(tempDeck);
      compScore += tempDeck.length;
    }
  }
}

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
  cardValue = parseInt(cardValue, 10);
  return cardValue;
}
function checkWin() {}
function newGame() {}

var deck1 = buildNewDeck();

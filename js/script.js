/*----- constants -----*/

/*----- app's state (variables) -----*/
let playerDeck = [],
  compDeck = [];
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
/*----- cached element references -----*/
const scorePlayer = document.querySelector("#scorePlayer");
const scoreComp = document.querySelector("#scoreComputer");

/*----- event listeners -----*/
document.querySelector("#newGame").addEventListener("click", newGame);

/*----- functions -----*/

// Return new deck of card
function buildNewDeck() {
  let deck = new Array();
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { Value: values[j], Suit: suits[i] };
      deck.push(card);
    }
    console.log(deck);
  }
}
buildNewDeck();

// Shuffl
function newGame() {}

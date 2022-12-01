const displayTypeEnum = {
  startGame: "startGame",
  dealerTurn: "dealerTurn",
  playerTurn: "playerTurn",
  distributeCards: "distributeCards",
};

const actionsEnum = {
  deal: "deal",
  hit: "hit",
  stay: "stay",
  doubleDown: "doubleDown",
  fold: "fold",
  call: "call",
  split: "split",
};

let gameStartButton;
let gamePlayerNumberInput;
let preGameActions;
let gameBoard;
let dealerContainer;
let dealerCardsContainer;
let additionalPlayerContainer;
let displayGameboardMessage;
let gameboardActions;
let playerContainer;
let playerCardsContainer;

let myGame;

window.addEventListener("load", () => {
  console.log("Scripts are connected!", { document });

  gameStartButton = document.querySelector("#button__next--game-start");
  gamePlayerNumberInput = document.querySelectorAll(
    ".game__container--game-start-actions input"
  );
  preGameActions = document.querySelector(
    ".game__container--game-start-actions"
  );
  gameBoard = document.querySelector(".game__container--game-board");
  dealerContainer = document.querySelectorAll(
    ".game__container--game-board-dealer"
  );
  dealerCardsContainer = document.querySelector(
    ".game_container--game-board-dealer-cards.center-content"
  );
  additionalPlayerContainer = document.querySelectorAll(
    ".game__container--game-board-additional_players"
  );
  displayGameboardMessage = document.querySelector(
    ".game__container--game-board-additional_players_display-center h3"
  );
  gameboardActions = document.querySelector(
    ".game__container--game-board-additional_players_display-center div.game__container--game-board-additional_players_display-center--actions"
  );
  playerContainer = document.querySelectorAll(
    ".game__container--game-board-player"
  );
  playerCardsContainer = document.querySelector(
    ".game__container--game-board-player-cards"
  );

  // this is for organization.
  // try to keep your functions organized the same way you would a file for readability. Variables on top, functions to be used in the middle, actual functionality after the functions.

  gameStartButton.addEventListener("click", () => {
    myGame = new Game(gamePlayerNumberInput[0].valueAsNumber);

    shared.sharedFunctions.toggleHide(preGameActions);
    shared.sharedFunctions.toggleHide(gameBoard);

    // console.log({ myGame, displayGameboardMessage });
    // generateGameBoardCards(myGame, myGame.dealer);
    displayGameboardMessage.innerHTML = displayMessage(
      displayTypeEnum.distributeCards
    );

    displayGameActions([actionsEnum.deal]);
  });
});

function displayInitialCards() {
  //   let cardDiv = document.createElement("div");

  // display dealers card
  for (let i = 0; i < 2; i++) {
    let cardDiv = document.createElement("div");
    let card =
      i == 0
        ? myGame.dealer.cardsInHand[i].imageBack
        : myGame.dealer.cardsInHand[i].imageFront;
    cardDiv.innerHTML = `<img src="${card}" />`;
    dealerCardsContainer.appendChild(cardDiv);
  }

  // display players card

  for (let i = 0; i < 2; i++) {
    let cardDiv = document.createElement("div");
    let card = myGame.players[0].cardsInHand[i].imageFront;
    cardDiv.innerHTML = `<img src="${card}" />`;
    playerCardsContainer.appendChild(cardDiv);
  }
}

function generateGameBoardCards(gameElement, playerElement) {
  console.log({ gameElement, playerElement });
  let gameDiv = document.createElement("div");

  //Dealers Card
}

function displayMessage(messageType) {
  const displayMessageTypes = {
    startGame: "Game Start",
    dealerTurn: "Dealers Turn",
    playerTurn: "Player's Turn",
    distributeCards: "Click to tell dealer to pass out cards!",
  };

  return displayMessageTypes[messageType];
}

function displayGameActions(gameActionsArray) {
  gameboardActions.innerHTML = "";
  console.log({ gameActionsArray });

  let actionsDiv = document.createElement("div");

  gameActionsArray.forEach((action, index) => {
    actionsDiv.innerHTML += `<button onclick="handleAction('${action}')" >
									${action}
								</button>
							`;
  });

  gameboardActions.appendChild(actionsDiv);
}

// this function is outside the window on load event because it is being used by the html and needs to be globally scoped in order for the html elements to be able to call on it.
function handleAction(actionToHandle) {
  console.log("Action!!");
  console.log({ actionToHandle });
  switch (actionToHandle) {
    case actionsEnum.deal:
      let filteredActions = [];
      for (let anAction in actionsEnum) {
        filteredActions.push(actionsEnum[anAction]);
      }

      const correctlyFilteredActions = filteredActions.filter((action) => {
        return action !== actionsEnum.deal;
      });

      myGame.distributeStartingCards();
      displayGameActions(correctlyFilteredActions);
      displayGameboardMessage.innerHTML = displayMessage(
        displayTypeEnum.playerTurn
      );
      console.log({ myGame });
      //   generateGameBoardCards(myGame, myGame.players[0]);
      displayInitialCards();
      break;
    default:
      break;
  }
}

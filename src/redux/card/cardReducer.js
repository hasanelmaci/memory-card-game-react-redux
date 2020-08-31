import { CARD_OPEN_FIRST } from "./cardTypes";
import { CARD_OPEN_SECOND } from "./cardTypes";
import { CARD_IS_SAME } from "./cardTypes";
import { CARDS_MATCHED } from "./cardTypes";
import { CARDS_NOT_MATCHED } from "./cardTypes";
import { RESTART_THE_GAME } from "./cardTypes";

const isSame = (firstCard, secondCard) => {
  if (
    Number(firstCard) + 10 === Number(secondCard) ||
    Number(firstCard) === Number(secondCard) + 10
  ) {
    return true;
  } else {
    return false;
  }
};

const isOpen = (firstCardStatus, secondCardStatus) => {
  if (firstCardStatus === false) {
    return true;
  } else if (firstCardStatus === true && secondCardStatus === false) {
    return true;
  }
};

export const cardState = {
  firstCard: "",
  firstCardStatus: false, //open = true , close = false
  secondCard: "",
  secondCardStatus: false,
  same: false,
  counter: 0,
  numOfCardsLeft: 18,
};

export const cardReducer = (state = cardState, action) => {
  switch (action.type) {
    case CARD_OPEN_FIRST:
      return {
        ...state,
        firstCard: action.payload,
        firstCardStatus: isOpen(state.firstCardStatus, state.secondCardStatus),
      };
    case CARD_OPEN_SECOND:
      return {
        ...state,
        secondCard: action.payload,
        secondCardStatus: isOpen(state.firstCardStatus, state.secondCardStatus),
        counter: state.counter + 1,
      };
    case CARD_IS_SAME:
      return {
        ...state,
        same: isSame(state.firstCard, state.secondCard),
      };
    case CARDS_MATCHED:
      return {
        ...state,
        firstCard: "",
        firstCardStatus: false,
        secondCard: "",
        secondCardStatus: false,
        same: false,
        numOfCardsLeft: state.numOfCardsLeft - 2,
      };
    case CARDS_NOT_MATCHED:
      return {
        ...state,
        firstCard: "",
        firstCardStatus: false,
        secondCard: "",
        secondCardStatus: false,
        same: false,
      };
    case RESTART_THE_GAME:
      return {
        firstCard: "",
        firstCardStatus: false,
        secondCard: "",
        secondCardStatus: false,
        same: false,
        counter: 0,
        numOfCardsLeft: 18,
      };

    default:
      return state;
  }
};

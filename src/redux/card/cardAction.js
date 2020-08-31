import { CARD_OPEN_FIRST, CARDS_MATCHED, CARDS_NOT_MATCHED } from "./cardTypes";
import { CARD_OPEN_SECOND } from "./cardTypes";
import { CARD_IS_SAME } from "./cardTypes";
import { RESTART_THE_GAME } from "./cardTypes";

export const openFirstCard = (cardID) => {
  return {
    type: CARD_OPEN_FIRST,
    payload: cardID,
  };
};

export const openSecondCard = (cardID) => {
  return {
    type: CARD_OPEN_SECOND,
    payload: cardID,
  };
};

export const cardIsSame = () => {
  return {
    type: CARD_IS_SAME,
  };
};

export const cardsMatched = () => {
  return {
    type: CARDS_MATCHED,
  };
};

export const cardsNotMatched = () => {
  return {
    type: CARDS_NOT_MATCHED,
  };
};

export const restartTheGame = () => {
  return {
    type: RESTART_THE_GAME,
  };
};

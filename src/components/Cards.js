import React, { useEffect } from "react";
import apple from "../img/apple.png";
import car from "../img/car.png";
import cat from "../img/cat.png";
import flower from "../img/flower.png";
import saturn from "../img/saturn.png";
import snake from "../img/snake.png";
import star from "../img/star.png";
import butterfly from "../img/butterfly.png";
import tree from "../img/tree.png";

import {
  openFirstCard,
  openSecondCard,
  cardIsSame,
  cardsMatched,
  cardsNotMatched,
  restartTheGame,
} from "../redux";
import { connect } from "react-redux";

let imgList1 = [
  { id: 1, img: apple },
  { id: 2, img: car },
  { id: 3, img: cat },
  { id: 4, img: flower },
  { id: 5, img: saturn },
  { id: 6, img: snake },
  { id: 7, img: star },
  { id: 8, img: butterfly },
  { id: 9, img: tree },
];
let imgList2 = [
  { id: 11, img: apple },
  { id: 12, img: car },
  { id: 13, img: cat },
  { id: 14, img: flower },
  { id: 15, img: saturn },
  { id: 16, img: snake },
  { id: 17, img: star },
  { id: 18, img: butterfly },
  { id: 19, img: tree },
];

imgList1 = imgList1.sort(() => Math.random() - 0.5);
imgList2 = imgList2.sort(() => Math.random() - 0.5);

function Cards(props) {
  const animationFilter = (
    e,
    firstCardStatus,
    secondCardStatus,
    openFirstCard,
    openSecondCard,
    secondCard
  ) => {
    //Check the cards if first card is open or not then check second card
    //So it can understand if it should open first card or second card
    //true maeans card is open. False means card is close

    const cardImgId = e.target.getAttribute("img-id");

    if (firstCardStatus === false && cardImgId != null) {
      openFirstCard(cardImgId);
      openFirstCardAnimation(e);
      console.log(e);
    } else if (
      firstCardStatus === true &&
      secondCardStatus === false &&
      cardImgId != null
    ) {
      const cardImgId = e.target.getAttribute("img-id");

      openSecondCard(cardImgId);

      openSecondCardAnimation(e, secondCard);
    }
  };

  const openFirstCardAnimation = (e) => {
    e.target.parentElement.style.transform = "rotateY(180deg)";
  };

  const openSecondCardAnimation = (e, secondCard) => {
    if (secondCard != null) {
      e.target.parentElement.style.transform = "rotateY(180deg)";
      props.cardIsSame();
    }
  };

  const cardsSuccess = (currentFirstCard, currentSecondCard) => {
    setTimeout(() => {
      currentFirstCard.parentElement.style.visibility = "hidden";
      currentSecondCard.parentElement.style.visibility = "hidden";
      props.cardsMatched();
    }, 500);
  };

  const cardsFailure = (currentFirstCard, currentSecondCard) => {
    setTimeout(() => {
      currentFirstCard.style.transform = "rotateY(360deg)";
      currentSecondCard.style.transform = "rotateY(360deg)";
      props.cardsNotMatched();
    }, 1500);
  };

  useEffect(() => {
    const currentFirstCardId = props.firstCard;
    const currentSecondCardId = props.secondCard;

    let currentFirstCard = document.querySelector(
      `[img-id="${currentFirstCardId}"]`
    );
    let currentSecondCard = document.querySelector(
      `[img-id="${currentSecondCardId}"]`
    );

    if (props.same === true) {
      cardsSuccess(currentFirstCard, currentSecondCard);
    } else if (props.same === false && props.secondCardStatus === true) {
      cardsFailure(currentFirstCard, currentSecondCard);
    }
  }, [props.secondCardStatus]);

  useEffect(() => {
    const numOfCardsLeft = props.numOfCardsLeft;
    setTimeout(() => {
      if (numOfCardsLeft === 0) {
        alert(`CONGRATULATION!\n YOU WON THE GAME WITH ${props.counter} ATTEMPTS`);
        props.restartTheGame();
        window.location.reload();
      }
    }, 1000);
  }, [props.numOfCardsLeft]);

  return (
    <div className="desk">
      {imgList1.map((
        item // First Cards
      ) => (
        <div key={item.id}>
          <div className="maincontainer">
            <div
              img-id={item.id}
              className="thecard"
              onClick={(e) =>
                animationFilter(
                  e,
                  props.firstCardStatus,
                  props.secondCardStatus,
                  props.openFirstCard,
                  props.openSecondCard,
                  props.secondCard
                )
              }
            >
              <div img-id={item.id} className="thefront"></div>
              <div className="theback">
                <img src={item.img} alt={item.id} />{" "}
              </div>
            </div>
          </div>
        </div>
      ))}

      {imgList2.map((
        item // Second Cards
      ) => (
        <div key={item.id}>
          <div className="maincontainer">
            <div
              img-id={item.id}
              className="thecard"
              onClick={(e) =>
                animationFilter(
                  e,
                  props.firstCardStatus,
                  props.secondCardStatus,
                  props.openFirstCard,
                  props.openSecondCard,
                  props.secondCard
                )
              }
            >
              <div img-id={item.id} className="thefront"></div>
              <div className="theback">
                <img src={item.img} alt={item.id} />{" "}
              </div>
            </div>
          </div>
        </div>
      ))}

      <h1 id="counter"> Attemp:{props.counter}</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    firstCard: state.card.firstCard,
    firstCardStatus: state.card.firstCardStatus,
    secondCard: state.card.secondCard,
    secondCardStatus: state.card.secondCardStatus,
    same: state.card.same,
    counter: state.card.counter,
    numOfCardsLeft: state.card.numOfCardsLeft,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openFirstCard: (cardID) => dispatch(openFirstCard(cardID)),
    openSecondCard: (cardID) => dispatch(openSecondCard(cardID)),
    cardIsSame: () => dispatch(cardIsSame()),
    cardsMatched: () => dispatch(cardsMatched()),
    cardsNotMatched: () => dispatch(cardsNotMatched()),
    restartTheGame: () => dispatch(restartTheGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import Card from "components/Card";
import { DELAY_EFFECT } from "constants/common";
import { CARDS } from "constants/cards";

function Cards(props) {
  const { 
    isReady, 
    totalCards, 
    handleFullCardsLoaded, 
    handleFullPoint, 
    counterHP, 
    fx, 
    playFx 
  } = props;
  const [playCards, setPlayCards] = useState([]);
  const [prevCard, setPrevCard] = useState({id: null, uuid: null});
  const point = useRef(0);
  const fullCardsLoaded = useRef(0);

  const handleLoadCard = () => {
    fullCardsLoaded.current++;

    if (fullCardsLoaded.current  === totalCards * 4) {
      /**
     * A card: front + back
     * A pair card: card * 2
     */
      return handleFullCardsLoaded();
    }
  };

  const handleFlipCard = (id, uuid) => {
    playFx(fx.fxFlip);

    if (prevCard.id === null) {
      setPrevCard({id, uuid});
    } else {
      if (prevCard.id === id) {
        setPlayCards(playCards.map(currentCard => 
          currentCard.id === id
          ? {...currentCard, isHidden: true}
          : currentCard));
        point.current++;
        
        setTimeout(() => {
          playFx(fx.fxCorrect);
        }, DELAY_EFFECT);

        if (point.current === totalCards) {
          handleFullPoint();
        }
      } else {
        setPlayCards(playCards.map(currentCard => 
          (currentCard.uuid === uuid || currentCard.uuid === prevCard.uuid)
          ? {...currentCard, rollBack: !currentCard.rollBack} 
          : currentCard));

          setTimeout(() => {
            playFx(fx.fxIncorrect);
          }, DELAY_EFFECT);
        
        counterHP();
      }

      setPrevCard({id: null, uuid: null});
    }
  };

  useEffect(() => {
    const shuffee = (cards, len) => {
      var newCards = cards.slice(0, len);
      newCards = newCards.concat(newCards);

      for (let i = newCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
      }

      return newCards.map(el => ({...el, rollBack: false, isHidden: false, uuid: uuidv4()}));
    };

    setPlayCards(shuffee(CARDS, totalCards));
  }, [totalCards]);

  return (
    <div className="row">
      {playCards.map(card => 
        <Card 
          card={card} 
          isReady={isReady}
          handleLoadCard={handleLoadCard}
          handleFlipCard={handleFlipCard} 
          key={card.uuid} 
        />)}
    </div>
  );
}

Cards.propTypes = {
  isReady: PropTypes.bool.isRequired,
  totalCards: PropTypes.number.isRequired,
  handleFullCardsLoaded: PropTypes.func.isRequired,
  handleFullPoint: PropTypes.func.isRequired,
  counterHP: PropTypes.func.isRequired,
  fx: PropTypes.object.isRequired,
  playFx: PropTypes.func.isRequired
};

export default Cards;

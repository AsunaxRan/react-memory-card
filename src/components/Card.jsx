import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DELAY_EFFECT } from "constants/common"; 

function Card({ card, handleFlipCard, handleLoadCard }) {
  const [flip, setFlip] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleLoad = () => {
    handleLoadCard();
  }

  const handleClick = (id, uuid) => {
    setFlip(true);

    handleFlipCard(id, uuid);
  };

  useEffect(() => {
    if (card.isHidden) {
      setTimeout(() => {
        setHidden(true);
      }, DELAY_EFFECT);
    }
  }, [card.isHidden]);

  useEffect(() => {
    setTimeout(() => {
      setFlip(false);
    }, DELAY_EFFECT);
  }, [card.rollBack]);

  return (
    <div className="col-6 col-lg-3">
      <div className={classNames('card animated flipInY', {
          'card--flipped': flip,
          'card--hidden': hidden
        })} 
        onClick={() => handleClick(card.id, card.uuid)}
      >
        <div className="card__content card__content--front">
          <img 
            className="card__img" 
            src={card.front} 
            alt="front card"
            onLoad={handleLoad}
          />
        </div>
        <div className="card__content card__content--back">
          <img 
            className="card__img" 
            src={card.back} 
            alt="back card"
            onLoad={handleLoad}
          />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  handleFlipCard: PropTypes.func.isRequired
};

export default Card;

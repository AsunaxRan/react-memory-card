import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DELAY_EFFECT } from "constants/common"; 

function Card(props) {
  const { 
    card, 
    isReady, 
    handleFlipCard, 
    handleLoadCard 
  } = props;
  const [flip, setFlip] = useState(false);
  const [hidden, setHidden] = useState(false);

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
      <div className={classNames('card', {
          'card--flipped': flip,
          'card--hidden': hidden,
          'animated flipInY': isReady
        })} 
        onClick={() => handleClick(card.id, card.uuid)}
      >
        <div className="card__content card__content--front">
          <img 
            className="card__img" 
            src={card.front} 
            alt="front card"
            onLoad={() => handleLoadCard()}
          />
        </div>
        <div className="card__content card__content--back">
          <img 
            className="card__img" 
            src={card.back} 
            alt="back card"
            onLoad={() => handleLoadCard()}
          />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  isReady: PropTypes.bool.isRequired,
  handleLoadCard: PropTypes.func.isRequired,
  handleFlipCard: PropTypes.func.isRequired
};

export default Card;

import React, { useState, useEffect, useContext } from "react";
import BloodBar from "components/BloodBar";
import Timer from "components/Timer";
import Cards from "components/Cards";
import Modal from "components/Modal";
import { LinkInContext } from "contexts/LinkInContext";
import { MESSAGE } from "constants/common";
import PropTypes from "prop-types";

function FullDiver({ fx, playFx }) {
  const { linkIn, linkInDispatch } = useContext(LinkInContext);
  const [cardsReady, setCardsReady] = useState(false);
  const [finish, setFinish] = useState({
    isFinish: false,
    message: ""
  });
  const [HP, setHP] = useState(linkIn.level.levelHP);

  const handleFullCardsLoaded = () => {
    setCardsReady(true);
  };

  const handleTimeOut = () => {
    setFinish({
      isFinish: true,
      message: MESSAGE.lose
    });
    playFx(fx.fxLose);
  };

  const handleFullPoint = () => {
    setFinish({
      isFinish: true,
      message: MESSAGE.win
    });
    playFx(fx.fxWin);
  };

  const counterHP = () => {
    (HP > linkIn.level.damage) 
    ? setHP(HP - linkIn.level.damage)
    : setHP(0);
  };

  const handleDecision = () => {
    linkInDispatch({
      type: "LOG_OUT"
    });
  };

  useEffect(() => {
    if (HP <= 0) {
      setFinish({
        isFinish: true,
        message: MESSAGE.lose
      });
      playFx(fx.fxLose);
    }
  }, [HP, fx, playFx]);

  useEffect(() => {
    if (!finish.isFinish) {
      cardsReady && playFx(fx.fxThemeSong);
    } else {
      playFx(fx.fxThemeSong, false);
    }
  }, [cardsReady, finish.isFinish, fx, playFx]);

  return (
    <div className="full-diver">
      <div className="snow" />
      <div className="container py-5">
        <BloodBar 
          HP={HP}
          levelHP={linkIn.level.levelHP}
          user={linkIn.user} 
        />
        <Timer 
          isReady={cardsReady}
          duration={linkIn.level.duration} 
          timeOut={finish.isFinish} 
          handleTimeOut={handleTimeOut} 
        />
        <Cards 
          isReady={cardsReady}
          totalCards={linkIn.level.totalCards}
          handleFullCardsLoaded={handleFullCardsLoaded}
          handleFullPoint={handleFullPoint} 
          counterHP={counterHP}
          fx={fx}
          playFx={playFx}
        />
      </div>
      <Modal 
        show={finish.isFinish} 
        msg={finish.message} 
        handleDecision={handleDecision}
      />
    </div>
  );
}

FullDiver.propTypes = {
  fx: PropTypes.object.isRequired,
  playFx: PropTypes.func.isRequired
};

export default FullDiver;

import React, { useState, useEffect } from "react";
import ToolBar from "components/ToolBar";
import { FiClock } from "react-icons/fi";
import PropTypes from "prop-types";

function Timer({ ready, duration, timeOut, handleTimeOut }) {
  const [seconds, setSeconds] = useState(duration % 60);
  const [minutes, setMinutes] = useState(Math.floor(duration / 60));

  useEffect(() => {
    if (!ready) return;

    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          
          return handleTimeOut();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    if (timeOut) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  });

  return (
    <ToolBar symbol={<FiClock />} className="mb-2">
      <div className="timer">{
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      }</div>
    </ToolBar>
  );
}

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  timeOut: PropTypes.bool.isRequired,
  handleTimeOut: PropTypes.func.isRequired
};

export default Timer;


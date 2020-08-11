import React, { useState, useContext } from "react";
import { LinkInContext } from "contexts/LinkInContext";
import { LINK_IN } from "constants/common";
import classNames from "classnames";
import { useForm } from "react-hook-form";

function LinkedIn() {
  const { linkIn, linkInDispatch } = useContext(LinkInContext);
  const [level, setLevel] = useState(linkIn.level.title);
  const { register, handleSubmit } = useForm();

  const handleLevelChange = (e, level) => {
    e.preventDefault();
    setLevel(level);
  };

  const onSubmit = (data) => {
    linkInDispatch({
      type: "LOG_IN",
      linkedIn: true,
      level: LINK_IN.levels[level],
      user: data.loginInput
    });
  };

  return (
    <div className="linked-in">
      <div className="control-panel animated bounceInDown">
        <h1 className="control-panel__title">
          MEMORY CARD
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="login-input" className="d-block text-center login-label">username:</label>
          <input 
            id="login-input"
            name="loginInput"
            type="text" 
            defaultValue={linkIn.user}
            placeholder="Enter your username"
            autoComplete="off" 
            ref={register({ required: true, maxLength: 12 })}
          />
          <h3 className="font-weight-normal">Choose play mode</h3>
          <div className="play-mode mt-4">
            <div className="btn-group btn-group-sm" role="group">
              <button 
                className="btn btn-warning d-flex align-items-center"
                onClick={(e) => handleLevelChange(e, "easy")}
              >
                <span 
                  className={classNames("sao-btn sao-btn--circle sao-btn--easy", {
                    "active": level === "easy"
                  })}
                  title="Easy"
                />
                <span className="ml-2">EASY</span>
              </button>
              <button 
                className="btn btn-warning d-flex align-items-center"
                onClick={(e) => handleLevelChange(e, "normal")}
              >
                <span 
                  className={classNames("sao-btn sao-btn--circle sao-btn--normal", {
                    "active": level === "normal"
                  })} 
                  title="Normal"
                />
                <span className="ml-2">NORMAL</span>
              </button>
              <button 
                className="btn btn-warning d-flex align-items-center"
                onClick={(e) => handleLevelChange(e, "hard")}
              >
                <span 
                  className={classNames("sao-btn sao-btn--circle sao-btn--hard", {
                    "active": level === "hard"
                  })}
                  title="Hard" 
                />
                <span className="ml-2">HARD</span>
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button 
              type="submit"
              className="sao-btn sao-btn--cell sao-btn--immortal">Link In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkedIn;

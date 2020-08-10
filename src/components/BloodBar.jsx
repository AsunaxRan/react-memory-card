import React from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";
import ToolBar from "components/ToolBar";
import classNames from "classnames";

function BloodBar({ HP, levelHP, user }) {
  var variant = "bg-success";

  if (HP <= 60) {
    variant = "bg-warning";
  }
  if (HP <= 20) {
    variant = "bg-danger";
  }

  return (
    <ToolBar symbol={<FiPlus />} className="sao-toolbar--blood mb-2">
      <span className="sao-toolbar__username">{user}</span>
      <div className="progress">
        <div 
          className={classNames("progress-bar", variant)} 
          role="progressbar" 
          aria-valuenow={HP} 
          aria-valuemin="0" 
          aria-valuemax={levelHP} 
          style={{ width: `${Math.floor(HP) * 100 / levelHP}%` }}
        />
      </div>
    </ToolBar>
  );
}

BloodBar.propTypes = {
  HP: PropTypes.number.isRequired,
  levelHP: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired
};

export default BloodBar;

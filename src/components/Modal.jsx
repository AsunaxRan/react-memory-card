import React from "react";
import PropTypes from "prop-types";

function Modal({ show, msg, handleDecision }) {
  if (!show) return null;

  const handleClick = () => {
    return handleDecision();
  };

  return (
    <div className="sao-modal">
      <div className="sao-modal__dialog">
        <div className="sao-modal__content">
          <h3 className="sao-modal__title animated flipInX">Alert</h3>
          <div className="sao-modal__message animated flipInX">{msg}</div>
          <div className="sao-modal__actions animated flipInX">
            <button className="sao-btn sao-btn--circle sao-btn--yes" onClick={handleClick} />
            <button className="sao-btn sao-btn--circle sao-btn--no" />
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  handleDecision: PropTypes.func.isRequired
};

export default Modal;

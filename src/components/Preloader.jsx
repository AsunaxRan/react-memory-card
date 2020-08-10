import React from "react";

function Preloader({ loading }) {
  if (!loading) {
    return null;
  }

  return (
    <div className="preloader">
      <div className="spinner">
        <div className="rect"></div>
        <div className="rect"></div>
        <div className="rect"></div>
        <div className="rect"></div>
        <div className="rect"></div>
      </div>
    </div>
  );
}

export default Preloader;

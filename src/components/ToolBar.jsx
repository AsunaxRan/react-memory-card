import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function ToolBar({ symbol, className, children }) {
  return (
    <div className={classNames('sao-toolbar', className)}>
      <div className="sao-toolbar__holder">
        <div className="sao-toolbar__symbol">
          {symbol}
        </div>
        <div className="sao-toolbar__content">
          {children}
        </div>
      </div>
    </div>
  );
}

ToolBar.propTypes = {
  symbol: PropTypes.element.isRequired,
  className: PropTypes.string
};

export default ToolBar;

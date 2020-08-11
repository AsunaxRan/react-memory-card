import React, { useContext } from "react";
import { LinkInContext } from "contexts/LinkInContext";
import LinkedIn from "components/LinkedIn";
import FullDiver from "components/FullDiver";
import PropTypes from "prop-types";

function AinCrad({ fx, playFx }) {
  const { linkIn } = useContext(LinkInContext);
  
  return linkIn.linkedIn === false
    ? <LinkedIn />
    : <FullDiver fx={fx} playFx={playFx} />;
}

AinCrad.propTypes = {
  fx: PropTypes.object.isRequired,
  playFx: PropTypes.func.isRequired
};

export default AinCrad;
import React, { useContext } from "react";
import { LinkInContext } from "contexts/LinkInContext";
import LinkedIn from "components/LinkedIn";
import FullDiver from "components/FullDiver";

function AinCrad({ fx, playFx }) {
  const { linkIn } = useContext(LinkInContext);
  
  return linkIn.linkedIn === false
    ? <LinkedIn />
    : <FullDiver fx={fx} playFx={playFx} />;
}

export default AinCrad;
import React, { useEffect, useReducer, createContext } from "react";
import { LinkInReducer } from "reducers/LinkInReducer";
import { LINK_IN } from "constants/common";

export const LinkInContext = createContext();

const LinkInContextProvider = props => {
  const [linkIn, linkInDispatch] = useReducer(LinkInReducer, {}, () => {
    const localData = localStorage.getItem("linkIn");
    return localData 
      ? {
        linkedIn: false,
        level: JSON.parse(localData).level,
        user: JSON.parse(localData).user
      } 
      : {
        linkedIn: false,
        level: LINK_IN.levels.normal,
        user: LINK_IN.user
      };
  });

  useEffect(() => {
    localStorage.setItem("linkIn", JSON.stringify({
      level: linkIn.level,
      user: linkIn.user
    }));
  }, [linkIn.level, linkIn.user]);

  return (
    <LinkInContext.Provider value={{ linkIn, linkInDispatch }}>
      {props.children}
    </LinkInContext.Provider>
  );
};

export default LinkInContextProvider;
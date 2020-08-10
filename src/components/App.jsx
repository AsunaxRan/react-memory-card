import React, { useEffect, useState, useRef } from "react";
import "styles/custom.scss";
import Preloader from "components/Preloader";
import AinCrad from "components/AinCrad";
import LinkInContextProvider from "contexts/LinkInContext";
import { SOUND } from "constants/sounds";

function App() {
  const [loading, setLoading] = useState(true);
  const fx5s = useRef(new Audio(SOUND.five_seconds));
  const fx10s = useRef(new Audio(SOUND.ten_seconds));
  const fxFlip = useRef(new Audio(SOUND.flip));
  const fxCorrect = useRef(new Audio(SOUND.correct));
  const fxIncorrect = useRef(new Audio(SOUND.incorrect));
  const fxWin = useRef(new Audio(SOUND.win));
  const fxLose = useRef(new Audio(SOUND.lose));
  const fxThemeSong = useRef(new Audio(SOUND.theme_song));

  const playFx = (sound, play = true) => {
    if (play) {
      sound.current.volume = 0.5;
      sound.current.load();
      sound.current.play()
        .then(_ => {})
        .catch(error => {
          console.error(error);
        });
    } else {
      sound.current.pause();
    }
  };

  useEffect(() => {
    const handler = () => {
      setLoading(false);
    };

    window.addEventListener("load", handler, true);

    return () => window.removeEventListener("load", handler, true);
  }, []);

  return (
    <div className="app">
      <Preloader loading={loading} />

      <LinkInContextProvider>
        <AinCrad 
          fx={{ fx5s, fx10s, fxFlip, fxCorrect, fxIncorrect, fxWin, fxLose, fxThemeSong }} 
          playFx={playFx}
        />
      </LinkInContextProvider>
    </div>
  );
}

export default App;

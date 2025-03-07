import React, { useState } from "react";
import { Audio } from "./types";
import "./App.css";
import Drum from "./Drum";

const audioClips: Audio[] = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  },
];

function App() {
  const [power, setPower] = useState(true); // Power state (on/off)
  const [volume, setVolume] = useState(50); // Volume state (0-100)

  const playVoice = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!power) return; // Do nothing if power is off

    const clip = audioClips.find(
      (clip) => clip.keyTrigger === e.key.toUpperCase()
    );

    if (!clip) return;
    const audioElement = document.getElementById(
      clip.keyTrigger
    ) as HTMLAudioElement;
    audioElement.volume = volume / 100; // Set volume
    audioElement.play().catch(console.error);

    document.getElementById("drum-" + clip.keyTrigger)?.focus();
    document.getElementById("display")!.innerText = clip.description;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    document.getElementById("display")!.innerText = `Volume: ${newVolume}%`;
  };

  return (
    <>
      <div>
        <div className="container" id="drum-machine" onKeyDown={playVoice}>
          <h1>FCC Drum Machine</h1>
          <div className="controls">
            {/* Power Switch */}
            <div className="power-switch">
              <label>Power:</label>
              <button
                onClick={() => setPower(!power)}
                className={power ? "power-on" : "power-off"}
              >
                {power ? "ON" : "OFF"}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="volume-slider">
              <label>Volume:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
              <span>{volume}%</span>
            </div>
          </div>
          <div className="whole-drum">
            {audioClips.map((clip) => (
              <Drum
                audio={clip}
                key={clip.keyTrigger}
                power={power}
                volume={volume}
              />
            ))}
          </div>
          <div id="display"></div>
        </div>
      </div>
    </>
  );
}

export default App;

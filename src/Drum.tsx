import { Audio } from "./types";

interface Drums {
  audio: Audio;
  power: boolean;
  volume: number;
}

const Drum = ({ audio, power, volume }: Drums) => {
  const playVoice = (clip: Audio) => {
    if (!power) return;

    const audioElement = document.getElementById(
      clip.keyTrigger
    ) as HTMLAudioElement;
    audioElement.volume = volume / 100; // Set volume
    audioElement.play().catch(console.error);

    document.getElementById("display")!.innerText = clip.description;
  };

  return (
    <div>
      <button
        className="drum-pad"
        id={`drum-${audio.keyTrigger}`}
        onClick={() => playVoice(audio)}
      >
        <audio src={audio.url} id={audio.keyTrigger} className="clip" />
        {audio.keyTrigger}
      </button>
    </div>
  );
};

export default Drum;

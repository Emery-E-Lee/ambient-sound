import React, { useState, useRef } from 'react';
import song from './audio/campfire.mp3';
import Slider from './components/slider/Slider';
import ControlPanel from './components/controls/ControlPanel';
import videoBg from './video/Campfire.mp4';

function App() {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.volume = 1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
    <>
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="player">
          <h1>CampFire</h1>
          <p>...feel the warmth🔥</p>
          <div className="app-container">
            <Slider percentage={percentage} onChange={onChange} />
            <audio
              ref={audioRef}
              onTimeUpdate={getCurrDuration}
              onLoadedData={(e) => {
                setDuration(e.currentTarget.duration.toFixed(2));
              }}
              src={song}
            ></audio>
            <ControlPanel
              play={play}
              isPlaying={isPlaying}
              duration={duration}
              currentTime={currentTime}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

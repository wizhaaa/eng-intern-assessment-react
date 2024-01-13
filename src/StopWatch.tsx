import React, {useState, useEffect} from "react";

import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";

export default function StopWatch() {
  // states to store if stopwatch is running and all elapsed time & time per lap.
  const [stopped, setStopped] = useState(false);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [laps, setLaps] = useState([]);

  // format the time to hh:mm:ss
  const formatTime = (seconds: number) => {
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor(hh / 60);
    const ss = Math.floor(seconds % 60);

    const pad = (num: number, length = 2) => {
      return num.toString().padStart(length, "0");
    };

    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  };

  const handleStartTimer = () => {
    setRunning(true);
    setStopped(false);
    setStarted(true);
  };

  const handleStopTimer = () => {
    setRunning(false);
    setStarted(false);
    setStopped(true);
    setElapsedTime(0);
    setLapTime(0);
    setLaps([]);
  };

  const handleResumeTimer = () => {
    setRunning(true);
  };

  const handlePauseTimer = () => {
    setRunning(false);
  };

  const handleResetTimer = () => {
    setRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const lap = () => {
    const lapNo = laps.length;
    setLaps([...laps, formatTime(lapTime)]);
    setLapTime(0);
  };

  // Update the stopwatch & lap time
  useEffect(() => {
    let interval: any;
    let lapInterval: any;
    if (running) {
      interval = setInterval(() => setElapsedTime((time) => time + 1), 1000);
      lapInterval = setInterval(
        () => setLapTime((lapTime) => lapTime + 1),
        1000
      );
    } else {
      clearInterval(interval);
      clearInterval(lapInterval);
    }
    return () => {
      clearInterval(interval);
      clearInterval(lapInterval);
    };
  }, [running, elapsedTime]);

  return (
    <>
      <div id="stopwatch">
        <h2>{!stopped && formatTime(elapsedTime)}</h2>
        <div id="all-buttons">
          <div id="buttons">
            {(!started || stopped) && (
              <StopWatchButton onClick={handleStartTimer} variant="start">
                Start
              </StopWatchButton>
            )}

            {started && !stopped && (
              <StopWatchButton onClick={handleStopTimer} variant="pause">
                Stop
              </StopWatchButton>
            )}
          </div>

          <div>
            {started && (
              <div id="buttons">
                {running && (
                  <StopWatchButton onClick={handlePauseTimer}>
                    Pause
                  </StopWatchButton>
                )}
                {!running && (
                  <StopWatchButton onClick={handleResumeTimer}>
                    Resume
                  </StopWatchButton>
                )}
                <StopWatchButton onClick={handleResetTimer}>
                  Reset
                </StopWatchButton>
                <StopWatchButton onClick={lap}>Lap</StopWatchButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <Laps laps={laps}></Laps>
    </>
  );
}

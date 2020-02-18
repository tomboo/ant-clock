import React from 'react';
import { useState } from "react";
import { Button } from 'antd';
import { useInterval } from "../utilities/hooks";
import { clockify, toDate } from "../utilities";

const STATE_INIT = "initial";
const STATE_RUN = "run";
const STATE_PAUSE = "pause";

const INTERVAL = 10; // update interval (10 ms)

// Stopwatch Component
function Stopwatch(props) {
  const [timerState, setTimerState] = useState(STATE_INIT);
  const [start, setStart] = useState(0);
  const [base, setBase] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState([]);

  const [delay, setDelay] = useState(null);
  useInterval(() => {
    tick();
  }, delay);

  function onStart() {
    const now = Date.now();
    setStart(now);
    setTimerState(STATE_RUN);
    startTimer();
  }

  function onStop() {
    const now = Date.now();
    setBase(base + now - start);
    setTimerState(STATE_PAUSE);
    stopTimer();
  }

  function onLap() {
    setLaps([...laps, elapsed]);
  }

  function onReset() {
    setBase(0);
    setStart(0);
    setElapsed(0);
    setLaps([]);
    setTimerState(STATE_INIT);
  }

  function startTimer() {
    console.log("startTimer", toDate(Date.now()));
    setDelay(INTERVAL);
  }

  function stopTimer() {
    console.log("stopTimer", toDate(Date.now()));
    setDelay(null);
  }

  function tick() {
    switch (timerState) {
      default:
      case STATE_INIT:
        setElapsed(0);
        break;
      case STATE_RUN:
        setElapsed(base + Date.now() - start);
        break;
      case STATE_PAUSE:
        setElapsed(base);
        break;
    }
  }

  const lapsList = laps.map((elapsedTime, index) => {
    let lapTime = 0;
    if (index === 0) {
        lapTime = elapsedTime;
    }
    else {
        lapTime = elapsedTime - laps[index - 1];
    }
    return (
        <tr key={index}>
            <td>{index}</td>
            <td>{clockify(elapsedTime, 1)}</td>
            <td>{clockify(lapTime, 1)}</td>
        </tr>
    );
  });

  return (
    <div className="Stopwatch">
      {/* Display */}
      <div className="StopwatchDisplay">
        <h2>{clockify(elapsed, 1)}</h2>
      </div>

      {/* Button 1 */}
      <div className="StopwatchControls">
        {timerState !== STATE_PAUSE && (
          <Button
            className="StopwatchButton"
            onClick={onLap}
            disabled={timerState === STATE_INIT}
          >
            Lap
          </Button>
        )}
        {timerState === STATE_PAUSE && (
          <Button className="StopwatchButton" onClick={onReset}>
            Reset
          </Button>
        )}

      {/* Button 2 */}
      {timerState === STATE_INIT && (
          <Button className="StopwatchButton" onClick={onStart}>
            Start
          </Button>
        )}
        {timerState === STATE_RUN && (
          <Button className="StopwatchButton" onClick={onStop}>
            Pause
          </Button>
        )}
        {timerState === STATE_PAUSE && (
          <Button className="StopwatchButton" onClick={onStart}>
            Resume
          </Button>
        )}
      </div>

      {/* Laps */}
      <div className="StopwatchLaps">
        <table>
          <thead>
            <tr>
                <td>Index</td>
                <td>Elapsed</td>
                <td>Lap</td>
            </tr>
          </thead>
          <tbody>
            {lapsList}
          </tbody>
         </table>
      </div>
    </div>
  );
};

export default Stopwatch;
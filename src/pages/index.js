import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Progress } from 'antd';
import { clockify, fromMin, toMin, toDate } from "../utilities";
import { useState } from "react";
import { useInterval } from "../utilities/hooks";

const STATE_INIT = "initial";
const STATE_RUN = "run";
const STATE_PAUSE = "pause";

const INTERVAL = 1000; // update interval (1 sec)

function Timer(props) {
  const [timerState, setTimerState] = useState(STATE_INIT);

  // current interval
  const [duration, setDuration] = useState(fromMin(1));
  const [remaining, setRemaining] = useState(fromMin(1));
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  
  const [delay, setDelay] = useState(null);
  useInterval(() => {
    tick();
  }, delay);

  // Handle click on IntegerControl increment/decrement buttons
  function setLength(increment) {
    if (timerState !== STATE_INIT) return;

    let newLength = toMin(duration) + increment;
    if (0 < newLength && newLength <= 60) {
      newLength = fromMin(newLength);

      setDuration(newLength);
      setRemaining(newLength);
    }
  }

  function onCancel() {
    stopTimer();
    setRemaining(0);
    setStart(0);
    setEnd(0);
    setTimerState(STATE_INIT);
  }

  function onStart() {
    const now = Date.now();
    setRemaining(duration);
    setStart(now);
    setEnd(now + duration);
    setTimerState(STATE_RUN);
    startTimer();
  }

  function onPause() {
    setTimerState(STATE_PAUSE);
    stopTimer();
  }

  function onResume() {
    const now = Date.now();
    setEnd(now + remaining);
    setTimerState(STATE_RUN);
    startTimer();
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
    const now = Date.now();
    setRemaining(Math.max(0, end - now));
    console.log("tick ", "now: ", toDate(now), ", remaining: ", clockify(remaining, 1));
    console.log("start: ", toDate(start), ", end: ", toDate(end));

    // on update remaining time
    /*
      this.tickWarn(remaining);
      this.tickAlarm(remaining);
      this.tickPhase(remaining);
    */
    if (remaining === 0) {
      stopTimer();
      setTimerState(STATE_INIT);

      console.log("*** Play Audio ***");
    }
  }

  const percent = duration ? Math.floor((remaining / duration) * 100) : 0;
  
  return (
    <div>
      <h1>Timer</h1>

      <div>
        <Progress
          type="circle"
          percent={percent}
          format={percent => clockify(remaining)}
        />
      </div>

      <div className="TimerControls">
        <Button className="TimerButton" onClick={onCancel}>
          Reset
        </Button>

        {timerState === STATE_INIT && (
          <Button className="TimerButton" onClick={onStart}>
            Start
          </Button>
        )}
        {timerState === STATE_RUN && (
          <Button className="TimerButton" onClick={onPause}>
            Pause
          </Button>
        )}
        {timerState === STATE_PAUSE && (
          <Button className="TimerButton" onClick={onResume}>
            Resume
          </Button>
        )}
      </div>

    </div>
  );
}

export default Timer;
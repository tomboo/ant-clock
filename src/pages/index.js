import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Progress, TimePicker } from 'antd';
import { useState } from "react";
import { useInterval } from "../utilities/hooks";
import moment from 'moment';

const STATE_INIT = "initial";
const STATE_RUN = "run";
const STATE_PAUSE = "pause";

const INTERVAL = 500; // update interval (500 msec)

// Convert moment.duration to ms
function totalMS(d) {
  return (
    ((d.hours() * 60
    + d.minutes()) * 60
    + d.seconds()) * 1000
    + d.milliseconds()
  );
}

// Timer Component
function Timer(props) {
  // timer state
  const [timerState, setTimerState] = useState(STATE_INIT);

  // current interval
  const [duration, setDuration] = useState(10000);  // duration (ms)
  const [remaining, setRemaining] = useState(duration);    // duration (ms)
  const [start, setStart] = useState(0);            // time (ms)
  const [end, setEnd] = useState(0);                // time (ms)
  
  // update interval
  const [delay, setDelay] = useState(null);         // update interval (ms)
  useInterval(() => {
    tick();
  }, delay);

  // event handlers
  function onDurationChange(time) {
    const ms = totalMS(time);
    setDuration(ms);
    setRemaining(ms);
  }

  function progressText() {
    if (timerState !== STATE_INIT) {
      return moment(remaining).utc().format('HH:mm:ss')
    }
    else {
      return 'Done';
    }
  }

  function onCancel() {
    stopTimer();
    setRemaining(duration);
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
    setDelay(INTERVAL);
  }

  function stopTimer() {
    setDelay(null);
  }

  function tick() {
    const now = Date.now();
    setRemaining(Math.max(0, end - now));

    console.log("tick ");
    console.log("now: ", now);
    console.log("remaining: ", remaining);
    console.log("start: ", start);
    console.log("end: ", end);
    console.log("duration: ", duration);

    // on update remaining time
    /*
      this.tickWarn(remaining);
      this.tickAlarm(remaining);
      this.tickPhase(remaining);
    */
    if (remaining <= 0) {
      stopTimer();
      setTimerState(STATE_INIT);
      setRemaining(duration);

      console.log("*** Play Audio ***");
    }
  }

  const percentRemaining = (remaining && duration)
    ? Math.floor(remaining / duration * 100)
    : 0;
  const durationMoment = moment(duration).utc();
  console.log('duration:', duration);

  return (
    <div>
      <h1>Timer</h1>

      <div>
          {/* defaultValue={moment('00:05:00', 'HH:mm:ss')} */}
          <TimePicker
            defaultValue={durationMoment}
            onChange={(time) => onDurationChange(time)}
            size="large"
            secondStep={10}
            disabled={timerState !== STATE_INIT}
          />
      </div>

      <div>
        <Progress
          type="circle"
          percent={percentRemaining}
          format={() => progressText()}
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
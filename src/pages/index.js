import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Button, Progress, TimePicker } from 'antd';
import { useState } from "react";
import { useInterval } from "../utilities/hooks";
import moment from 'moment';
import './index.css';

const STATE_INIT = "initial";
const STATE_RUN = "run";
const STATE_PAUSE = "pause";

const UPDATE_INTERVAL = 500;      // update interval (500 msec)
const DEFAULT_DURATION = 60000;

// Convert moment.duration to milliseconds
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
  const [duration, setDuration] = useState(DEFAULT_DURATION);  // duration (ms)
  const [remaining, setRemaining] = useState(DEFAULT_DURATION);    // duration (ms)
  const [start, setStart] = useState(0);            // time (ms)
  const [end, setEnd] = useState(0);                // time (ms)
  
  // update interval
  const [delay, setDelay] = useState(null);         // update interval (ms)
  useInterval(() => {
    tick();
  }, delay);

  // event handlers
  function onDurationChange(time) {
    let ms = DEFAULT_DURATION;
    if (time) {
      ms = totalMS(time);
    }
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
    setDelay(UPDATE_INTERVAL);
  }

  function stopTimer() {
    setDelay(null);
  }

  function tick() {
    const now = Date.now();
    setRemaining(Math.max(0, end - now));

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

  return (
    <div>  
      <Row type="flex" justify="center" gutter={[24, 24]}>
        <Col span={24}>
          {/* defaultValue={moment('00:05:00', 'HH:mm:ss')} */}
          <TimePicker
            value={durationMoment}
            onChange={(time) => onDurationChange(time)}
            size="large"
            secondStep={10}
            disabled={timerState !== STATE_INIT}
          />
        </Col>
      </Row>

      <Row type="flex" justify="center" gutter={[24, 24]}>
        <Col span={24}>
          <Progress
            type="circle"
            percent={percentRemaining}
            format={() => progressText()}
            width={200}
          />
          </Col>
      </Row>

      <Row type="flex" justify="center" gutter={[16, 16]} >
        <Col span={12}>
          <Button className="TimerButton" onClick={onCancel} size="large">
            Reset
          </Button>
        </Col>
        <Col span={12}>
          {timerState === STATE_INIT && (
            <Button className="TimerButton" onClick={onStart} size="large">
              Start
            </Button>
          )}
          {timerState === STATE_RUN && (
            <Button className="TimerButton" onClick={onPause} size="large">
              Pause
            </Button>
          )}
          {timerState === STATE_PAUSE && (
            <Button className="TimerButton" onClick={onResume} size="large">
              Resume
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Timer;
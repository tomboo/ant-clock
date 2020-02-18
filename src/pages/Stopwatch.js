import React from 'react';
import { useState } from "react";
import { Button, Table } from 'antd';
import { useInterval } from "../utilities/hooks";
import { clockify, toDate } from "../utilities";

const STATE_INIT = "initial";
const STATE_RUN = "run";
const STATE_PAUSE = "pause";

const UPDATE_INTERVAL = 10; // update interval (10 ms)

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

  function onReset() {
    setBase(0);
    setStart(0);
    setElapsed(0);
    setLaps([]);
    setTimerState(STATE_INIT);
  }

  function startTimer() {
    console.log("startTimer", toDate(Date.now()));
    setDelay(UPDATE_INTERVAL);
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

  function onLap() {
    let index = laps.length;
    let lapTime = 0;
    if (index === 0) {
        lapTime = elapsed;
    }
    else {
        lapTime = elapsed - laps[index - 1].elapsed;
    }
    setLaps([...laps, {
      key: index,
      index: index,
      elapsed: elapsed,
      lap: lapTime,
    }]);
  }

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Elapsed',
      dataIndex: 'elapsed',
      key: 'elapsed',
      render: elapsed => clockify(elapsed, 1),
    },
    {
      title: 'Lap',
      dataIndex: 'lap',
      key: 'lap',
      render: lap => clockify(lap, 1),
    },
  ];

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
      <Table
        columns={columns}
        dataSource={laps}
        bordered
        size="small"
      />
    </div>
  );
};

export default Stopwatch;
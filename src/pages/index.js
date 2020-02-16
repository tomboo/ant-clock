import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Progress } from 'antd';
import { clockify, fromMin, toMin, toDate } from "../utilities";
import { useState } from "react";
import { useInterval } from "../utilities/hooks";

const STATE_INIT = "initial";
const STATE_RUN = "run";
const STATE_PAUSE = "pause";

const INTERVAL = 1000; // update interval (1 sec)

function Timer(props) {
  return (
    <div>
      <h1>Timer</h1>
      <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
    </div>
  );
}

export default Timer;
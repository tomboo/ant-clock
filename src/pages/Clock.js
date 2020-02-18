import React from 'react';
import { useState } from "react";
import { useInterval } from "../utilities/hooks";

// Clock Component
function Clock(props) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [delay, setDelay] = useState(500);
  useInterval(() => {
    setCurrentTime(Date.now());
  }, delay);

  const date = new Date(currentTime);

  return (
    <div className="Clock">
      <div className="Label">
        {date.toLocaleDateString(undefined, { weekday: "long" })}
      </div>
      <div className="Label">
        {date.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric"
        })}
      </div>
      <div className="Label">{date.toLocaleTimeString()}</div>
    </div>
  );
}

export default Clock;
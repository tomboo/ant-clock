import { useState, useEffect, useRef } from "react";

// Custom Hooks

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => {
      clearInterval(id);
    };
  }, [currentTime]);

  return currentTime;
}


// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
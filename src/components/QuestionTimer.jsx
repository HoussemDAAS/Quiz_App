import React from "react";
import { useState, useEffect } from "react";
const QuestionTimer = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer= setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
  const interfal=  setInterval(
      () => setRemainingTime((prevRemainingTime) => prevRemainingTime - 100),
      100
    );
    return () => clearInterval(interfal);
  }, []);
  return <progress id="question-time" max={timeout} value={remainingTime} />;
};

export default QuestionTimer;

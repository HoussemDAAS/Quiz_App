import React, { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffeldAnswers = useRef();
  if (!shuffeldAnswers.current) {
    shuffeldAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffeldAnswers.current.map((answer) => {
        let cssClass = "";
        if (
          answerState === "answered" &&
          selectedAnswer === answer
        ) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          selectedAnswer === answer
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState !== ""}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;

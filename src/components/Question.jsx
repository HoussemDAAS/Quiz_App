import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../question";
const Question = ({
  onSelectAnswer,
  selectedAnswer,
  onSkipAnswer,
  activeQuestionIndex,
}) => {
  const [answerC, setAnswerC] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;
  if (answerC.selectedAnswer) {
    timer = 1000;
  }
  if (answerC.isCorrect !== null) {
    timer = 2000;
  }
  const handleSelectAnswer = (answer) => {
    setAnswerC({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswerC({
        selectedAnswer: answer,

        isCorrect: answer === QUESTIONS[activeQuestionIndex].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };
  let answerState = "";
  if (answerC.selectedAnswer && answerC.isCorrect !== null) {
    answerState = answerC.isCorrect ? "correct" : "wrong";
  } else if (answerC.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        mode={answerState}
        timeout={timer}
        onTimeout={answerC.selectedAnswer=== '' ? onSkipAnswer : null}
      />
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswer={answerC.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;

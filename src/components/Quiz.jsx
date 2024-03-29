import React from "react";
import { useState, useCallback } from "react";
import QUESTIONS from "../question";
import Question from "./Question";
import Summary from "./Summary";
const Quiz = () => {
  const [answerState, setAnswerState] = useState("");
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswerState("answered");
    setAnswers((prevState) => {
      return [...prevState, answer];
    });
    setTimeout(() => {
      if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizCompleted) {
    return (
      <Summary  userAnswers={answers}/>
    );
  }

  return (
    <div id="quiz">
      <Question
      key={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        activeQuestionIndex={activeQuestionIndex}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;

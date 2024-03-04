import React from "react";
import { useState } from "react";
import QUESTIONS from "../question";
const Quiz = () => {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = (answer) => {
    setAnswers((prevState) => {
      return [...prevState, answer];
    });
  };
  if (quizCompleted) {
    return (
      <div id="summary"> 
      <img src="/src/assets/quiz-complete.png" alt="" />
        <h2>Quiz Completed</h2>
        {/* <ul>
          {QUESTIONS.map((question, index) => (
            <li key={question.id}>
              {question.text} - {answers[index]}
            </li>
          ))}
        </ul> */}
      </div>
    )
  
  }
  const shuffeldAnswers=[...QUESTIONS[activeQuestionIndex].answers].sort(()=>Math.random()-0.5);

  return (
    
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffeldAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;

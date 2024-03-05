import React from "react";
import { useState, useCallback } from "react";
import QUESTIONS from "../question";
import QuestionTimer from "../components/QuestionTimer";
const Quiz = () => {
  const  [answerState, setAnswerState] = useState('');
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answerState ==='' ? answers.length : answers.length -1;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = useCallback(
    ( function handleSelectAnswer  (answer) {
      setAnswerState('answered');
      setAnswers((prevState) => {
        return [...prevState, answer];
      });
      setTimeout(() => {
        if(answer===QUESTIONS[activeQuestionIndex].answers[0]){
          setAnswerState('correct');    
        }else{
          setAnswerState('wrong');
        }
        setTimeout(() => {
          setAnswerState('');
        },2000)
      }, 1000);
    }),
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

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
    );
  }
  const shuffeldAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffeldAnswers.map((answer) => {
          let cssClass = ''; 
          if(answerState === 'answered' && answers[answers.length-1] === answer) {
            cssClass ='selected';
          }
          if((answerState==='correct'|| answerState==='wrong')&&answers[answers.length-1] === answer ){
            cssClass =answerState;
          }
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}className={cssClass}>
                  {answer}
                </button>
              </li>
            )

          } 

            
          )}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;

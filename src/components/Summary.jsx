import React from "react";
import QUESTION from '../question';
const Summary = ({userAnswers}) => {
const correctAnswer = userAnswers.filter((answer,index) => answer === QUESTION[index].answers[0]); 
const skipped = userAnswers.filter((answer) => answer === null);

const SkippedAnswers = Math.round(skipped.length / userAnswers.length) * 100;
const Correct = Math.round(correctAnswer.length / userAnswers.length) * 100;
const wrong = 100 - Correct - SkippedAnswers;
  return (
    <div id="summary">
      <img src="/src/assets/quiz-complete.png" alt="" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          {" "}
          <span className="number"> {SkippedAnswers}% </span>
          <span className="text"> skipped</span>
        </p>
        <p>
          {" "}
          <span className="number"> {Correct}% </span>
          <span className="text"> Answerd Correctly</span>
        </p>
        <p>
          {" "}
          <span className="number"> {wrong}% </span>
          <span className="text"> answered incorrectly</span>
        </p>
       
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
             let cssClass="user-answer"
             if(answer===null){
              cssClass += ' skipped'
            }else if(answer===QUESTION[index].answers[0])
            {
              cssClass += ' correct'
            }else if (answer !== QUESTION[index].answers[0]){
              cssClass += ' wrong'
            }

          return(<li key={index}>
            <h3>{index + 1}</h3>
            <p className="question">{QUESTION[index].text}</p>
            <p className={cssClass}>{answer ?? 'skipped'}</p>
          </li>)
})}
     
      </ol>
    </div>
  );
};

export default Summary;

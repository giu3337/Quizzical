import React from 'react';

export const QuizzicalEntry = ({ onStartClick }) => {
  return (
    <div className='QuizContainer'>
      <img src="cornerYellow.png" alt="Yellow circle" className='top-right-image' />
      <div className='QuizBox'>
        <h1>Quizzical</h1>
        <p>Let's Learn and have fun!</p>
        <button onClick={onStartClick}>Start quiz</button>
      </div>
      <img src="cornerBlue.png" alt="Blue circle" className='bottom-left-image' />
    </div>
  );
};
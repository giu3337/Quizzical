import React, { useState, useEffect } from 'react';
import { decode } from 'html-entities';

const QuizzMain = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null)); // Initialize an array to store selected answers for each question
  const [score, setScore] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple')
      .then(response => response.json())
      .then(data => {
        const results = data.results;
        const formattedQuestions = results.map((question, index) => ({
          id: index + 1,
          question: decode(question.question),
          options: question.incorrect_answers.concat(question.correct_answer).sort(() => Math.random() - 0.5),
          answer: decode(question.correct_answer),
          isCorrect: null
        }));
        setQuestions(formattedQuestions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex; // Store the selected option index for the corresponding question
    setSelectedAnswers(newSelectedAnswers);
  };

  const checkAnswers = () => {
    const updatedQuestions = questions.map((question, index) => {
      const selectedOptionIndex = selectedAnswers[index];
      const isCorrect = question.options[selectedOptionIndex] === question.answer;
      return { ...question, isCorrect };
    });
    setQuestions(updatedQuestions);
    // Calculate score
    const correctAnswers = updatedQuestions.filter(question => question.isCorrect).length;
    setScore(correctAnswers);
    setQuizCompleted(true); // Set quizCompleted to true when answers are checked
  };

  const resetQuiz = () => {
    setSelectedAnswers(Array(5).fill(null)); 
    setScore(null); 
    setQuizCompleted(false); 
  
    const resetQuestions = questions.map(question => ({
      ...question,
      isCorrect: null
    }));
    setQuestions(resetQuestions);
  };

  return (
    <div className='QuizMainContainer'>
      <img src="blobup.png" alt="Yellow circle" className='top-right-image' />
      {questions.map((question, questionIndex) => (
        <div key={question.id} className='questionBox'>
          <p className={`questionTitle ${question.isCorrect !== null ? (question.isCorrect ? 'correct' : 'incorrect') : ''}`}>
            {question.question}
          </p>
          <form>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} htmlFor={`question-${questionIndex}-option-${optionIndex}`} className={selectedAnswers[questionIndex] === optionIndex ? 'selected' : ''}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  id={`question-${questionIndex}-option-${optionIndex}`}
                  onChange={() => handleAnswerSelection(questionIndex, optionIndex)}
                />
                {option}
              </label>
            ))}
            {/* Highlight the correct answer in red if it's incorrect */}
            {question.isCorrect === false && (
              <span className="correctAnswer">{question.answer}</span>
            )}
          </form>
        </div>
      ))}
     {!quizCompleted ? (
        <button className="checkButton" onClick={checkAnswers}>Check Answers</button>
      ) : (
        <button className="checkButton" onClick={resetQuiz}>Play Again</button>
      )}

      <div className="scoreAndButtonContainer">
        {score !== null && (
          <p className="scoreParagraph">You scored {score}/{questions.length} correct answers.</p>
        )}````
        <img src="blobsDown.png" alt="Blue circle" className='bottom-left-image' />
      </div>
    </div>
  );
};

export default QuizzMain;

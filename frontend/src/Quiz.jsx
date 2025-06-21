import React, { useState } from 'react';
import Question from './Question';

export default function Quiz({ questions }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, { question_id: questions[current].id, answer }];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Submit
      try {
        const res = await fetch('http://localhost:8000/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnswers),
        });
        const data = await res.json();
        setScore(data.score);
      } catch (err) {
        console.error('Failed to submit quiz', err);
      }
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>
          Your score: {score}/{questions.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        Question {current + 1} of {questions.length}
      </p>
      <Question data={questions[current]} onAnswer={handleAnswer} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';

export default function App() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/questions');
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error('Failed to load questions', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Quizly</h1>
      {!questions && (
        <button onClick={fetchQuestions}>Start Quiz</button>
      )}
      {loading && <p>Loading...</p>}
      {questions && <Quiz questions={questions} />}
    </div>
  );
}

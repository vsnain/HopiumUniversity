import React, { useState, useEffect } from 'react';

const QuestionList = ({ difficulty }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsModule = await import(`./${difficulty}Questions`);
        setQuestions(questionsModule.default);
      } catch (error) {
        console.error(`Error fetching ${difficulty} questions:`, error);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  const handleCardClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div
          key={index}
          style={{ 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '16px', 
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
          onClick={() => handleCardClick(question.link)}
        >
          <p>Title: {question.title}</p>
          <p>Rating: {question.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;

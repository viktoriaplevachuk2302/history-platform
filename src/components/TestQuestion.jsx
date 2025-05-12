import './TestQuestion.css';

function TestQuestion({ question, onAnswer, userAnswer }) {
  const handleChange = (e) => {
    onAnswer(question.id, e.target.value);
  };

  const handleCheck = (value) => {
    onAnswer(question.id, value);
  };

  return (
    <div className="test-question">
      <h3>{question.question}</h3>
      
      {question.type === 'multiple' && (
        <div className="options">
          {question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={userAnswer === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={userAnswer || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder="Введіть відповідь..."
        />
      )}

      {question.type === 'truefalse' && (
        <div className="true-false">
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="true"
              checked={userAnswer === true}
              onChange={() => handleCheck(true)}
            />
            Правда
          </label>
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="false"
              checked={userAnswer === false}
              onChange={() => handleCheck(false)}
            />
            Неправда
          </label>
        </div>
      )}
    </div>
  );
}


export default TestQuestion;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { questionsData } from '../data/questions';
import './Tests.css';

function Tests() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login', { state: { from: '/tests' } });
      } else {
        setUserName(user.displayName || user.email.split('@')[0]);
        loadQuestions();
      }
    });

    return unsubscribe;
  }, [navigate]);

  const loadQuestions = () => {
    try {
      setLoading(true);
      setError(null);

      if (!questionsData || questionsData.length === 0) {
        throw new Error("Не знайдено жодного питання в базі даних");
      }

      const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
      setSelectedQuestions(shuffled.slice(0, 10));
    } catch (err) {
      console.error("Помилка завантаження:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    let correct = 0;

    selectedQuestions.forEach(question => {
      const answer = answers[question.id];

      if (question.type === 'truefalse') {
        if (question.correctAnswer === (answer === 'true' || answer === true)) {
          correct++;
        }
      } else if (question.correctAnswer === answer) {
        correct++;
      }
    });

    const percent = Math.round((correct / selectedQuestions.length) * 100);
    setScore(correct);
    setQuizCompleted(true);

    const user = auth.currentUser;
    if (!user) {
      console.warn("❌ Користувач не авторизований, результат не буде збережено");
      return;
    }

    console.log("📤 Надсилаємо результат:", percent, "від користувача:", user.uid);

    try {
      const res = await fetch('http://localhost:5000/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          score: percent,
          date: new Date().toISOString()
        })
      });

      if (res.ok) {
        console.log("✅ Результат збережено на сервері");
      } else {
        console.error("❌ Сервер повернув помилку:", res.status);
      }
    } catch (err) {
      console.error("❌ Помилка при збереженні:", err);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(null);
    setQuizCompleted(false);
    loadQuestions();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Завантаження тестів...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Сталася помилка</h3>
        <p>{error}</p>
        <button className="retry-btn" onClick={loadQuestions}>Спробувати знову</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="results-container">
        <div className="results-card">
          <h2>Результати тестування</h2>
          <p className="user-greeting">Привіт, {userName}!</p>
          <div className="score-circle">
            <span>{score}/{selectedQuestions.length}</span>
          </div>
          <p className="score-message">
            {score === selectedQuestions.length ? 'Вітаємо з ідеальним результатом! 🎉' :
              score > selectedQuestions.length / 2 ? 'Гарний результат! 👍' : 'Спробуйте ще раз! 💪'}
          </p>
          <div className="result-buttons">
            <button className="retry-btn" onClick={restartQuiz}>Пройти ще раз</button>
            <button className="home-btn" onClick={() => navigate('/')}>На головну</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="error-container">
        <p>Не вдалося завантажити поточне питання</p>
        <button className="retry-btn" onClick={restartQuiz}>Спробувати знову</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="user-greeting">Привіт, {userName}! Готова(ий) до тестування?</div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
        ></div>
        <span className="progress-text">
          Питання {currentQuestionIndex + 1} з {selectedQuestions.length}
        </span>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentQuestion.question}</h3>

        <div className="options-container">
          {currentQuestion.type === 'multiple' && currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
              onClick={() => handleAnswer(currentQuestion.id, option)}
            >
              {option}
            </button>
          ))}

          {currentQuestion.type === 'text' && (
            <input
              type="text"
              className="text-answer"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder="Введіть вашу відповідь..."
            />
          )}

          {currentQuestion.type === 'truefalse' && (
            <div className="true-false-btns">
              <button
                className={`tf-btn ${answers[currentQuestion.id] === true ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, true)}
              >
                Правда
              </button>
              <button
                className={`tf-btn ${answers[currentQuestion.id] === false ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, false)}
              >
                Неправда
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="navigation-btns">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          ← Назад
        </button>

        {currentQuestionIndex < selectedQuestions.length - 1 ? (
          <button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
          >
            Далі →
          </button>
        ) : (
          <button
            className="nav-btn submit-btn"
            onClick={handleSubmit}
            disabled={!answers[currentQuestion.id]}
          >
            Завершити тест
          </button>
        )}
      </div>
    </div>
  );
}

export default Tests;

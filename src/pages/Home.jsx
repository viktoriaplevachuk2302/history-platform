import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Вітаємо на платформі "Історичні Події України"</h1>
        <p className="hero-description">
          Тут ви знайдете найважливіші моменти нашої історії, від давніх часів до сьогодення. 
          Досліджуйте, навчайтеся та перевіряйте свої знання разом з нами!
        </p>
        
        <button 
          className="learn-more-btn"
          onClick={() => setShowAbout(!showAbout)}
        >
          {showAbout ? 'Сховати' : 'Дізнатися про платформу'}
        </button>

        {showAbout && (
          <div className="about-platform">
            <h3>Про нашу платформу</h3>
            <p>
              Наш сайт створений для всіх, хто цікавиться історією України. Ми зібрали найважливіші події,
              які сформували нашу державу та націю. Тут ви знайдете:
            </p>
            <ul>
              <li>Хронологічний огляд ключових подій</li>
              <li>Детальні описи історичних моментів</li>
              <li>Цікаві тести для перевірки знань</li>
              <li>Можливість ділитися думками</li>
            </ul>
            <p>
              Приєднуйтесь до нашої спільноти любителів історії!
            </p>
          </div>
        )}
      </div>

      <section className="features">
        <h2 className="section-title">Що ви знайдете на нашому сайті?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.32c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
              </svg>
            </div>
            <h3>Хронологія</h3>
            <p>Всі історичні події у хронологічному порядку з можливістю прокрутки</p>
            <Link to="/timeline" className="feature-link">
              Перейти до хронології
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
              </svg>
            </div>
            <h3>Історичні події</h3>
            <p>Детальні описи ключових подій в історії України з можливістю розгорнути</p>
            <Link to="/events" className="feature-link">
              Перейти до подій
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <h3>Тестування</h3>
            <p>Перевірте свої знання з історії України у різних форматах тестів</p>
            <Link to="/tests" className="feature-link">
              Пройти тести
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
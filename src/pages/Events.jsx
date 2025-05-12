import { useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import eventsData from '../data/events';
import './Events.css';

function Events() {
  const [activePeriod, setActivePeriod] = useState('all');

  // Фільтрація подій за обраним періодом
  const filteredEvents = activePeriod === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.period === activePeriod);

  return (
    <div className="events-page">
      <h1>Історичні події України</h1>
      
      {/* Фільтр за періодами */}
      <div className="period-filter">
        <button 
          className={activePeriod === 'all' ? 'active' : ''}
          onClick={() => setActivePeriod('all')}
        >
          Всі періоди
        </button>
        <button 
          className={activePeriod === 'ancient' ? 'active' : ''}
          onClick={() => setActivePeriod('ancient')}
        >
          Давні часи
        </button>
        <button 
          className={activePeriod === 'middle' ? 'active' : ''}
          onClick={() => setActivePeriod('middle')}
        >
          Середньовіччя
        </button>
        <button 
          className={activePeriod === 'new' ? 'active' : ''}
          onClick={() => setActivePeriod('new')}
        >
          Нова історія
        </button>
        <button 
          className={activePeriod === 'modern' ? 'active' : ''}
          onClick={() => setActivePeriod('modern')}
        >
          Сучасність
        </button>
      </div>

      {/* Список подій */}
      <div className="events-grid">
        {filteredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
          />
        ))}
      </div>

      {/* Кнопка повернення (якщо потрібно) */}
      <div className="back-to-home">
        <Link to="/" className="back-button">
          На головну
        </Link>
      </div>
    </div>
  );
}

export default Events;
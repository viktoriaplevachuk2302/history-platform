import { useParams, useNavigate } from 'react-router-dom';
import eventsData from '../data/events'; // Без фігурних дужок!
import './EventDetail.css';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Додаємо хук для навігації
  const event = eventsData.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="event-detail">
        <h1>Подію не знайдено</h1>
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Повернутися назад
        </button>
      </div>
    );
  }

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <div className="event-image-container">
        <img 
          src={event.image} 
          alt={event.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/default-event.jpg';
          }}
        />
      </div>
      <div className="event-meta">
        <span className="event-years">{event.years}</span>
        <span className="event-period">{event.periodLabel}</span>
      </div>
      <div className="event-content">
        <p>{event.fullDescription}</p>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Повернутися назад
      </button>
    </div>
  );
}

export default EventDetail;
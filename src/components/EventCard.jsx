import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

function EventCard({ event }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`event-card ${event.period}`}>
      <div className="event-image-wrapper">
        {!imageLoaded && (
          <div className="image-placeholder"></div>
        )}
        <img 
          src={event.image} 
          alt={event.title}
          className={`event-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/images/default-event.jpg';
          }}
          loading="lazy"
        />
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-years">{event.years}</p>
        <p className="event-short-description">
          {event.shortDescription}
        </p>
        <Link 
          to={`/event/${event.id}`} 
          className="event-details-btn"
        >
          Дізнатися більше
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
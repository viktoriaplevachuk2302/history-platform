import { useState } from 'react';
import './TimelineItem.css';

function TimelineItem({ event }) {
  const [expanded, setExpanded] = useState(false);
  const isModern = event.period === "modern";

  return (
    <div className={`timeline-item ${isModern ? 'modern' : ''}`}>
      <div className="timeline-item-content">
        <div className="timeline-item-image">
          <img src={event.image} alt={event.title} />
        </div>
        <h3>{event.title}</h3>
        <p className="timeline-years">{event.years}</p>
        <button 
          className="timeline-toggle-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Згорнути' : 'Детальніше'}
        </button>
        {expanded && (
          <div className="timeline-description">
            <p>{event.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimelineItem;
import { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
import TimelineFilter from '../components/TimelineFilter';
import { timelineData } from "../data/Timeline";
import './Timeline.css';

function Timeline() {
  const [filter, setFilter] = useState('all');

  const filteredEvents = timelineData.filter(event => {
    if (filter === 'all') return true;
    return event.period === filter;
  });

  return (
    <div className="timeline-page">
      <h1>Хронологія історичних подій</h1>
      <TimelineFilter currentFilter={filter} onFilterChange={setFilter} />
      
      <div className="timeline-container">
        <div className="timeline-scroll">
          {filteredEvents.map(event => (
            <TimelineItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
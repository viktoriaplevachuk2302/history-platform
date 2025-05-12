import './TimelineFilter.css';

function TimelineFilter({ currentFilter, onFilterChange }) {
  const periods = [
    { value: 'all', label: 'Всі періоди' },
    { value: 'ancient', label: 'Стародавній світ' },
    { value: 'middle', label: 'Середньовіччя' },
    { value: 'new', label: 'Новий час' },
    { value: 'modern', label: 'Сучасність' }
  ];

  return (
    <div className="timeline-filter">
      {periods.map(period => (
        <button
          key={period.value}
          className={currentFilter === period.value ? 'active' : ''}
          onClick={() => onFilterChange(period.value)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

export default TimelineFilter;
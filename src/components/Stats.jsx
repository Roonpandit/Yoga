import React from 'react';
import './Stats.css';

function Stats() {
  const stats = [
    { value: '28', label: 'Your Asanas This Week' },
    { value: '3.8', label: 'Average Difficulty' },
    { value: '4', label: 'Active Groups' },
    { value: '85%', label: 'Weekly Goal' }
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
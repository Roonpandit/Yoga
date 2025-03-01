import React from 'react';

function LeaderboardItem({ position, initials, name, score }) {
  return (
    <li className="leaderboard-item">
      <div className="leaderboard-position">{position}</div>
      <div className="leaderboard-user">
        <div className="leaderboard-avatar">{initials}</div>
        <span>{name}</span>
      </div>
      <div className="leaderboard-score">{score}</div>
    </li>
  );
}

function LeaderboardCard({ title, items }) {
  return (
    <div className="leaderboard-card">
      <h3>{title}</h3>
      <ul className="leaderboard-list">
        {items.map((item, index) => (
          <LeaderboardItem 
            key={index}
            position={item.position}
            initials={item.initials}
            name={item.name}
            score={item.score}
          />
        ))}
      </ul>
    </div>
  );
}

function Leaderboard() {
  const asanasLeaderboard = [
    { position: 1, initials: 'RK', name: 'Raj Kumar', score: 47 },
    { position: 2, initials: 'MJ', name: 'Maya Jones', score: 42 },
    { position: 3, initials: 'SL', name: 'Sarah Lee', score: 39 },
    { position: 4, initials: 'AS', name: 'Alex Smith', score: 28 }
  ];

  const difficultyLeaderboard = [
    { position: 1, initials: 'ER', name: 'Elena Rodriguez', score: 4.8 },
    { position: 2, initials: 'JP', name: 'John Parker', score: 4.5 },
    { position: 3, initials: 'RK', name: 'Raj Kumar', score: 4.2 },
    { position: 8, initials: 'AS', name: 'Alex Smith', score: 3.8 }
  ];

  return (
    <div className="leaderboard-container">
      <LeaderboardCard title="Most Asanas Completed" items={asanasLeaderboard} />
      <LeaderboardCard title="Highest Difficulty Average" items={difficultyLeaderboard} />
    </div>
  );
}

export default Leaderboard;
import React from 'react';

function GroupCard({ group, isJoinable = false }) {
  return (
    <div className="group-card">
      <div className="group-header">
        <div className="group-name">{group.name}</div>
        <div className="group-members">{group.members} members</div>
      </div>
      <div className="group-activity">
        {group.activities.map((activity, index) => (
          <div className="asana-item" key={index}>
            <span className={`asana-difficulty difficulty-${activity.difficulty}`}>
              {activity.difficulty}
            </span>
            <span className="asana-name">{activity.name}</span>
            <span className="asana-user">by {activity.user}</span>
          </div>
        ))}
      </div>
      {isJoinable ? (
        <a href="#" className="join-button">Join Group</a>
      ) : (
        <a href="#" className="view-more">View All Activity</a>
      )}
    </div>
  );
}

export default GroupCard;
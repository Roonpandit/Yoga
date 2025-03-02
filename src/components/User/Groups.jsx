import React, { useState, useEffect } from 'react';
import './Groups.css'; // Importing the CSS file

const Groups = () => {
  const [categories, setCategories] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://yoga-api-nzy4.onrender.com/v1/categories'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch yoga categories');
        }
        const data = await response.json();
        setCategories(data);
        setGroupMembers(
          data.reduce((acc, category) => ({ ...acc, [category.id]: 0 }), {})
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const joinGroup = (category) => {
    setJoinedGroup(category);
    setGroupMembers((prev) => ({
      ...prev,
      [category.id]: prev[category.id] + 1,
    }));
  };

  const leaveGroup = () => {
    setGroupMembers((prev) => ({
      ...prev,
      [joinedGroup.id]: Math.max(prev[joinedGroup.id] - 1, 0),
    }));
    setJoinedGroup(null);
  };

  if (loading) return <div className="loading">Loading yoga groups...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="container">
      <h1 className="title">Yoga Groups</h1>

      {!joinedGroup ? (
        <div className="grid-container">
          {categories.map((category) => (
            <div key={category.id} className="group-card">
              <h2>{category.category_name}</h2>
              <p>Members Joined: {groupMembers[category.id]}</p>
              <button className="join-btn" onClick={() => joinGroup(category)}>
                Join Group
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="group-details">
          <h2>Welcome to the {joinedGroup.category_name} Group</h2>
          <p>{joinedGroup.category_description}</p>
          <p>Members in this group: {groupMembers[joinedGroup.id]}</p>
          <button className="leave-btn" onClick={leaveGroup}>
            Leave Group
          </button>
        </div>
      )}
    </div>
  );
};

export default Groups;

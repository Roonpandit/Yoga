import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPage.css";

function UserPage() {
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user profile data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUserData) {
      setUserData(storedUserData);
    }

    // Fetch all yoga categories
    axios
      .get("https://yoga-api-nzy4.onrender.com/v1/categories")
      .then((response) => {
        if (storedUserData) {
          // Filter data based on the user's selected interest
          const filtered = response.data.filter(
            (category) => category.category_name === storedUserData.selectedInterest
          );
          setFilteredData(filtered);
        }
      })
      .catch((error) => {
        console.error("Error fetching yoga data:", error);
      });
  }, []);

  return (
    <div className="user-container">
      <h2>Welcome, {userData?.phone}!</h2>
      <p>Age: {userData?.age}</p>
      <h3>Your Interest: {userData?.selectedInterest}</h3>

      <h2>Recommended Yoga Poses</h2>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div key={item.id} className="yoga-card">
            <h3>{item.category_name}</h3>
            <p>{item.category_description}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
}

export default UserPage;

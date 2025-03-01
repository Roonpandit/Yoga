import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState("");
  const navigate = useNavigate();

  // Fetch yoga categories from API
  useEffect(() => {
    axios
      .get("https://yoga-api-nzy4.onrender.com/v1/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !age || !selectedInterest) {
      alert("Please fill in all fields!");
      return;
    }

    // Redirect to /user route with selected interest as a query param
    navigate(`/user?interest=${selectedInterest}`);
  };

  return (
    <div className="profile-container">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Phone Number:</label>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label>Choose Yoga Interest:</label>
        <select value={selectedInterest} onChange={(e) => setSelectedInterest(e.target.value)} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-btn">Save & View Recommendations</button>
      </form>
    </div>
  );
}

export default UserProfile;

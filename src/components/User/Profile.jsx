import React, { useState, useEffect } from "react";
import { auth, db } from "../Login/firebase/firebase-config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NavUser from "./Nav-User";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
    height: "",
    weight: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          const newUserData = {
            name: user.displayName || "",
            email: user.email || "",
            dob: "",
            height: "",
            weight: "",
            gender: "",
          };

          await setDoc(userRef, newUserData);
          setUserData(newUserData);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "Not provided";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, userData);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <NavUser />
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-details">
          <div className="profile-row">
            <label>Name:</label>
            {editMode ? (
              <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
            ) : (
              <span>{userData.name || "Not provided"}</span>
            )}
          </div>

          <div className="profile-row">
            <label>Email:</label>
            <span>{userData.email || "Not provided"}</span>
          </div>

          <div className="profile-row">
            <label>Age:</label>
            <span>{calculateAge(userData.dob)}</span>
          </div>

          {editMode && (
            <div className="profile-row">
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={userData.dob} onChange={handleInputChange} />
            </div>
          )}

          <div className="profile-row">
            <label>Gender:</label>
            {editMode ? (
              <select name="gender" value={userData.gender} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span>{userData.gender || "Not provided"}</span>
            )}
          </div>

          <div className="profile-row">
            <label>Height (cm):</label>
            {editMode ? (
              <input type="number" name="height" value={userData.height} onChange={handleInputChange} />
            ) : (
              <span>{userData.height || "Not provided"}</span>
            )}
          </div>

          <div className="profile-row">
            <label>Weight (kg):</label>
            {editMode ? (
              <input type="number" name="weight" value={userData.weight} onChange={handleInputChange} />
            ) : (
              <span>{userData.weight || "Not provided"}</span>
            )}
          </div>
        </div>

        {editMode ? (
          <button className="save-btn" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </>
  );
};

export default Profile;

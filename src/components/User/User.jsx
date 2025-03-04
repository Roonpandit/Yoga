import React, { useEffect, useState } from "react";
import { auth, db } from "../Login/firebase/firebase-config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import "./User.css";
import NavUser from "./Nav-User";

function User() {
  const [user, setUser] = useState(null);
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPose, setSelectedPose] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritePoses, setFavoritePoses] = useState(new Set());

  const posesPerPage = 10;

  useEffect(() => {
    fetch(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/Yoga/aasan.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Log the raw data for debugging
  
        // Check if the data has numeric or random object keys
        if (data && typeof data === "object") {
          // Extract only the values from the object (i.e., pose data)
          const posesArray = Object.values(data); 
          setPoses(posesArray); // Update poses state
          setFilteredPoses(posesArray); // Set filtered poses initially
          setCurrentPage(1); // Reset page to 1
          console.log("Fetched poses:", posesArray); // Log poses after setting
        } else {
          console.error("Invalid data structure", data); // Log error if the structure doesn't match
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  useEffect(() => {
    const filtered = poses.filter(
      (pose) =>
        pose.sanskrit_name_adapted
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pose.english_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPoses(filtered);
    setCurrentPage(1); // Reset page when search query changes
  }, [searchQuery, poses]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadFavorites(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadFavorites = async (userId) => {
    try {
      const favoritesRef = collection(db, `users/${userId}/favorites`);
      const snapshot = await getDocs(favoritesRef);
      const favoritesSet = new Set();
      snapshot.forEach((doc) => favoritesSet.add(doc.id));
      setFavoritePoses(favoritesSet);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const toggleFavorite = async (pose) => {
    if (!user) {
      alert("Please log in to save favorites.");
      return;
    }

    const poseId = String(pose.id || pose.sanskrit_name_adapted);
    const favoritesRef = doc(db, `users/${user.uid}/favorites`, poseId);

    try {
      if (favoritePoses.has(poseId)) {
        await deleteDoc(favoritesRef);
        setFavoritePoses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(poseId);
          return newSet;
        });
      } else {
        await setDoc(favoritesRef, pose);
        setFavoritePoses((prev) => new Set(prev).add(poseId));
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const totalPages = Math.ceil(filteredPoses.length / posesPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredPoses, totalPages, currentPage]);

  const indexOfLastPose = currentPage * posesPerPage;
  const indexOfFirstPose = indexOfLastPose - posesPerPage;
  const currentPoses = filteredPoses.slice(indexOfFirstPose, indexOfLastPose);

  return (
    <div className="user-page">
      <NavUser />
      <section className="hero">
        <h1>Transform Your Yoga Journey Together</h1>
        <p>
          Track your progress, share your achievements, and challenge your
          friends. Join our vibrant community to gamify your wellness journey
          and discover new asanas.
        </p>
      </section>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Aasan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="poses-container">
        {currentPoses.length > 0 ? (
          currentPoses.map((pose, index) => {
            const poseId = String(pose.id || pose.sanskrit_name_adapted);
            const isFavorited = favoritePoses.has(poseId);

            return (
              <div key={index} className="pose-card">
                <img
                  src={pose.url_png}
                  alt={pose.english_name}
                  className="pose-image"
                />
                <h3>{pose.sanskrit_name_adapted}</h3>

                <div className="pose-actions">
                  <button
                    onClick={() => setSelectedPose(pose)}
                    className="see-more"
                  >
                    See More
                  </button>
                  <button
                    className={`heart-btn ${isFavorited ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(pose)}
                    data-tooltip={isFavorited ? "Remove from fav" : "Add to fav"}
                  >
                    {isFavorited ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No poses available</p>  // Fallback message if no poses are found
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for displaying pose details */}
      {selectedPose && (
        <div className="modal-overlay" onClick={() => setSelectedPose(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedPose(null)}>
              &times;
            </span>
            <h2>
              {selectedPose.sanskrit_name_adapted} ({selectedPose.english_name})
            </h2>
            <img
              src={selectedPose.url_png}
              alt={selectedPose.english_name}
              className="modal-image"
            />
            <p>
              <strong>Benefits:</strong> {selectedPose.pose_benefits}
            </p>
            <p>
              <strong>Description:</strong> {selectedPose.pose_description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;

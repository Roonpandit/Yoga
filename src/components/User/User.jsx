import React, { useEffect, useState } from "react";
import "./User.css";
import NavUser from "./Nav-User";

function User() {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPose, setSelectedPose] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const posesPerPage = 10; // Updated to 10 poses per page

  useEffect(() => {
    fetch(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/Yoga/aasan.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setPoses(data); // Assuming the API returns a flat array of poses
          setFilteredPoses(data);
          setCurrentPage(1); // Reset to first page when new data loads
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = poses.filter(
      (pose) =>
        pose.sanskrit_name_adapted.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pose.english_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPoses(filtered);
    setCurrentPage(1);
  }, [searchQuery, poses]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPoses.length / posesPerPage) || 1;

  // Ensure currentPage is within valid range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredPoses, totalPages, currentPage]);

  // Get poses for the current page
  const indexOfLastPose = currentPage * posesPerPage;
  const indexOfFirstPose = indexOfLastPose - posesPerPage;
  const currentPoses = filteredPoses.slice(indexOfFirstPose, indexOfLastPose);

  return (
    <>
      <NavUser />
      <section className="hero">
      <h1>Transform Your Yoga Journey Together</h1>
      <p>Track your progress, share your achievements, and challenge your friends. Join our vibrant community to gamify your wellness journey and discover new asanas.</p>
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
        {currentPoses.map((pose, index) => (
          <div key={pose.id || index} className="pose-card">
            <img src={pose.url_png} alt={pose.english_name} className="pose-image" />
            <h3>{pose.sanskrit_name_adapted}</h3>
            <button onClick={() => setSelectedPose(pose)}>See More</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
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
            <h2>{selectedPose.sanskrit_name_adapted} ({selectedPose.english_name})</h2>
            <img src={selectedPose.url_png} alt={selectedPose.english_name} className="modal-image" />
            <p><strong>Benefits:</strong> {selectedPose.pose_benefits}</p>
            <p><strong>Description:</strong> {selectedPose.pose_description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
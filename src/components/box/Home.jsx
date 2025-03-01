import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

function Home() {
  const [yogaAsanas, setYogaAsanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYogaAsanas = async () => {
      try {
        const response = await axios.get(
          'https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/Yoga/aasan.json'
        );
        
        if (response.data) {
          const asanasArray = Object.entries(response.data).map(([key, value], index) => ({
            id: `${key}-${index}`,
            ...value
          }));
          setYogaAsanas(asanasArray.slice(0, 10)); // Display only the first 6 cards
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch yoga asanas. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchYogaAsanas();
  }, []);

  return (

    <>
    <Navbar />
    <div className="home-login">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover the Power of Yoga</h1>
          <p>Transform your mind, body, and soul with our expert-guided yoga practices</p>
          <button className="hero-button"  onClick={() => navigate('/login')} >Start Your Journey</button>
        </div>
      </div>
      
      <div className="yoga-section">
        <h2 className="section-title">Popular Yoga Asanas</h2>
        
        {loading && <div className="loading">Loading yoga asanas...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <div className="yoga-grid">
            {yogaAsanas.length > 0 ? (
              yogaAsanas.map((yoga) => (
                <div key={yoga.id} className="yoga-card" id={`yoga-${yoga.id}`}>
                  <img src={yoga.url_png} alt={yoga.sanskrit_name_adapted} className="yoga-image" />
                  <h3 className="yoga-name">{yoga.sanskrit_name_adapted}</h3>
                  <button className="learn-more" onClick={() => navigate('/login')}>
                    Learn More
                  </button>
                </div>
              ))
            ) : (
              <div className="no-data">No yoga asanas available at the moment.</div>
            )}
          </div>
        )}
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 YogaLife. All rights reserved.</p>
        </div>
      </footer>
    </div>

    </>
    
  );
}

export default Home;

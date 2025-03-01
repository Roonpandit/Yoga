import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Groups from '../components/Groups';
import Leaderboard from '../components/Leaderboard';
import Challenges from '../components/Challenges';

function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <h2 className="section-title">Your Active Groups</h2>
      <Groups type="active" />
      <h2 className="section-title">Popular Groups to Join</h2>
      <Groups type="popular" />
      <h2 className="section-title">Weekly Leaderboard</h2>
      <Leaderboard />
      <h2 className="section-title">Active Challenges</h2>
      <Challenges />
    </main>
  );
}

export default HomePage;
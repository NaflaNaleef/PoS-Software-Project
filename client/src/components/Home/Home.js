

import React from 'react';
import './Home.css';
import storeHero from './pos-hero.jpg'; 
import posLogo from './pos-logo.png'; 

const Home = () => {
  const handleSignInClick = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div className="pos-container">
      {/* Header */}
      <header className="pos-header">
        <div className="logo-container">
          <img src={posLogo} alt="Store logo" className="store-logo" />
          <span className="store-name">MAM STORES</span>
        </div>

        <nav className="pos-nav">
          <a href="#" className="pos-nav-link active">Home</a>
          <button 
            className="pos-signin-btn"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pos-hero">
        <div className="pos-hero-content">
          <h2>MAM Grocery Store</h2>
          <p className="pos-hero-text">
            Discover fresh produce and household essentials. 
            Manage your inventory and sales with ease.
          </p>
        </div>
        <div className="pos-hero-image">
          <img src={storeHero} alt="POS system interface" />
        </div>
      </section>
    </div>
  );
};

export default Home;

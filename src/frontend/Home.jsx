import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Grid, Container, Stack } from '@mui/material';
import './Frontend.css';

const Home = () => {
  return (
    <div className="home-container" style={{ background: '#d2cbb9ff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
           “Discover the Past, Embrace the Culture, Celebrate India.”
          </h1>
          <p className="hero-subtitle">
            Explore the magnificent traditions, festivals, monuments, and heritage sites 
            that make India a land of incredible diversity and timeless beauty.
          </p>
          
        </div>
        <div className="hero-image">
              <img
                src="/in.png"
                alt="Incredible India Cover"
                className="cover-image"
                style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', borderRadius: '1.5rem', boxShadow: '0 4px 32px #0004' }}
              />
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Cultural Journey</h2>
            <p>Learn about India's incredible heritage and be part of preserving it for future generations.</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 2 }}>
              <Button component={Link} to="/about" variant="contained" color="primary" sx={{ minWidth: 220, fontWeight: 'bold', fontSize: '1.1rem' }}>
                About Our Mission
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 2 }}>
            </Box>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
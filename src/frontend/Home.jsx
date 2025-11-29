import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Grid, Container, Stack } from '@mui/material';
import './Frontend.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container" style={{ background: '#d2cbb9ff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('home.hero_title')}</h1>
          <p className="hero-subtitle">{t('home.hero_subtitle')}</p>
          
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
            <h2>{t('home.cta_title')}</h2>
            <p>{t('home.cta_sub')}</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 2 }}>
              <Button component={Link} to="/about" variant="contained" color="primary" sx={{ minWidth: 220, fontWeight: 'bold', fontSize: '1.1rem' }}>
                {t('home.about_cta')}
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
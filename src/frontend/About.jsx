import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Box, Grid, Stack, Avatar } from '@mui/material';
import './Frontend.css';

const About = () => {
  const { t } = useTranslation();
  // Add keyframes for About page gradient animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes aboutGradient {
        0% {background-position:0% 50%;}
        25% {background-position:50% 100%;}
        50% {background-position:100% 50%;}
        75% {background-position:50% 0%;}
        100% {background-position:0% 50%;}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return (
    <div
      className="about-container"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(270deg, #e5dbbc)',
        backgroundSize: '1600% 1600%',
        animation: 'aboutGradient 20s ease infinite'
      }}
    >
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>{t('aboutPage.aboutTitle')}</h1>
          <p className="lead">
            {t('aboutPage.aboutLead')}
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '32px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t('aboutPage.purposeTitle')}</h2>
            <p style={{ textAlign: 'center', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '16px' }}>{t('aboutPage.purposeDesc1')}</p>
            <p style={{ textAlign: 'center', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '24px' }}>{t('aboutPage.purposeDesc2')}</p>
            <img src="india2.png" alt="Our Purpose" style={{ display: 'block', margin: '0 auto', maxWidth: '320px', borderRadius: '1rem', boxShadow: '0 2px 16px #0001' }} />
          </div>
        </section>

        {/* Comprehensive Overview Section */}
        <section className="overview-section" style={{ padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '40px', fontSize: '2.5rem', color: '#333', textAlign: 'center' }}>{t('aboutPage.overviewTitle')}</h2>
            
            <div className="overview-content" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>🎯 {t('aboutPage.missionHeading')}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>{t('aboutPage.missionText')}</p>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>🌟 {t('aboutPage.offersHeading')}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>{t('aboutPage.offersText')}</p>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>👥 {t('aboutPage.audienceHeading')}</h3>
                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', margin: '0 auto', maxWidth: '800px', textAlign: 'justify' }}>{t('aboutPage.audienceText')}</div>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>✨ {t('aboutPage.featuresHeading')}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>{t('aboutPage.featuresText')}</p>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>🛡️ {t('aboutPage.commitmentHeading')}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>{t('aboutPage.commitmentText')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
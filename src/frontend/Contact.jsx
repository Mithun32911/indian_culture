import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, Alert, Grid, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Frontend.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section style={{ minHeight: '100vh', background: 'linear-gradient(to right, #e5dbbc)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
      <div style={{
  width: '100%',
  maxWidth: '500px',
  minHeight: '120px',
  margin: '0 auto',
  borderRadius: '1.5rem',
  border: '2px solid #efe5e5ff',
  background: '#f5f4f3ff',
  color: '#f1e9e9ff',
  boxShadow: '0 0 32px 0 rgba(240, 229, 229, 0.27)',
  padding: '3rem 2rem',
  textAlign: 'center',
  display: 'block',
      }}>
  <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c2929ff', letterSpacing: '2px', marginBottom: '2rem' }}>{t('contact.header')}</h2>
        {isSubmitted ? (
          <div style={{ color: '#0f0d0dff', marginTop: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ marginBottom: '1rem' }}>{t('contact.thank_title')}</h3>
            <p>{t('contact.success_msg')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: '#111111ff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '2rem' }}>{t('contact.lead')}</p>
            <label htmlFor="name" style={{ color: '#080808ff', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>{t('contact.name_label')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('contact.name_placeholder')}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1.2rem',
                borderRadius: '0.5rem',
                border: '1px solid #161515ff',
                background: '#ffffffff',
                color: '#070707ff',
                fontSize: '1rem',
                fontWeight: 'bold',
                outline: 'none',
              }}
            />
            <label htmlFor="email" style={{ color: '#000000ff', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>{t('contact.email_label')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('contact.email_placeholder')}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1.2rem',
                borderRadius: '0.5rem',
                border: '1px solid #0e0d0dff',
                background: '#fdfcfcff',
                color: '#dfd7d7ff',
                fontSize: '1rem',
                fontWeight: 'bold',
                outline: 'none',
              }}
            />
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1.2rem',
                borderRadius: '0.5rem',
                border: '1px solid #121111ff',
                background: '#ffffffff',
                color: '#050505ff',
                fontSize: '1rem',
                fontWeight: 'bold',
                outline: 'none',
              }}
            >
              <option value="">{t('contact.subject_placeholder')}</option>
              <option value="general">{t('contact.option_general')}</option>
              <option value="cultural-data">{t('contact.option_cultural_data')}</option>
              <option value="monument-info">{t('contact.option_monument_info')}</option>
              <option value="collaboration">{t('contact.option_collaboration')}</option>
              <option value="technical">{t('contact.option_technical')}</option>
              <option value="feedback">{t('contact.option_feedback')}</option>
            </select>
            <label htmlFor="message" style={{ color: '#070707ff', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.3rem', display: 'block', textAlign: 'left' }}>{t('contact.message_label')}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t('contact.message_placeholder')}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '0.8rem',
                marginBottom: '1.2rem',
                borderRadius: '0.5rem',
                border: '1px solid #0a0a0aff',
                background: '#ffffffff',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold',
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '2rem',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px #0006',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
              }}
            >
              {t('contact.send_button')}
            </button>
          </form>
        )}
  </div>
    </section>
  );
};

export default Contact;
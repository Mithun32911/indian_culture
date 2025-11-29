import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserProgress } from '../context/UserProgressContext';
import { heritageSites } from '../database/data.js';
import { Card, CardContent, Typography, Box, Grid, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import './Frontend.css';

const Heritage = () => {
  const { incrementHeritagesAttended, addFavorite, removeFavorite, isFavorite } = useUserProgress();
  const { t } = useTranslation();
  const [selectedSite, setSelectedSite] = useState(null);
  const [dialogImageSrc, setDialogImageSrc] = useState(null);
  const [dialogImageCandidates, setDialogImageCandidates] = useState([]);
  const navigate = useNavigate();

  const handleBackClick = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
      navigate('/admin/user-dashboard');
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const openSiteDetails = (site) => {
    incrementHeritagesAttended();
    // prepare image candidates
    const candidates = [];
    if (site.image) candidates.push(site.image);
    if (site.images && Array.isArray(site.images) && site.images.length) candidates.push(...site.images);
    candidates.push(`/heritage-${site.id}.jpg`);
    if (site.name) {
      const slug = site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      candidates.push(`/images/heritage/${slug}.jpg`);
      candidates.push(`/images/${slug}.jpg`);
    }
    const uniq = [...new Set(candidates.filter(Boolean))];
    setDialogImageCandidates(uniq);
    setDialogImageSrc(uniq.length ? uniq[0] : null);
    setSelectedSite(site);
  };

  const closeSiteDetails = () => {
    setSelectedSite(null);
  };

  return (
    <div className="heritage-container">
      <div className="container">
        {/* Header Section */}
  <section className="heritage-header" style={{ position: 'relative', marginTop: '-36px' }}>
          {/* Back Button */}
          <Button
            onClick={handleBackClick}
            variant="contained"
            size="small"
            sx={{
              position: 'absolute',
              right: 0,
              top: '-5px',
              minWidth: '72px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#3f3d3dff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#101010ff' },
              zIndex: 10,
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
            title={t('nav.back', 'Back')}
          >
            {t('nav.back')}
          </Button>
          <h1>{t('heritagePage.title')}</h1>
          <p className="page-subtitle">{t('heritagePage.subtitle')}</p>
        </section>

       

        {/* Heritage Sites Grid */}
    <section className="heritage-sites" style={{ marginTop: '-40px' }}>
      <h2 className="section-title">{t('heritagePage.featured')}</h2>
          <Grid container spacing={3} className="sites-grid" justifyContent="center" alignItems="stretch">
            {heritageSites.map(site => (
              <Grid item xs={12} md={6} lg={4} key={site.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    mx: 'auto',
                    height: 360,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 4,
                    boxShadow: '0 6px 24px rgba(25, 118, 210, 0.10)',
                    background: 'linear-gradient(135deg, #e5dbbc)',
                    border: '2px solid #FF9800',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-6px) scale(1.03)',
                      boxShadow: '0 12px 32px rgba(25, 118, 210, 0.18)'
                    }
                  }}
                >
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 270, overflow: 'visible', pb: '0 !important' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">{t(`content.heritage.${site.id}.name`, site.name)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t(`content.heritage.${site.id}.description`, site.description)}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}><strong>{t('heritagePage.location', 'Location')}:</strong> {t(`content.heritage.${site.id}.location`, site.location)} • <strong>{t('heritagePage.period', 'Period')}:</strong> {t(`content.heritage.${site.id}.period`, site.period)}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}><strong>{t('heritagePage.best_time', 'Best Time')}:</strong> {t(`content.heritage.${site.id}.bestTime`, site.bestTime)}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}><strong>{t('heritagePage.highlights', 'Highlights')}:</strong> {t(`content.heritage.${site.id}.highlights`, site.highlights)}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {site.notableFeatures && site.notableFeatures.map((f, i) => (
                          <Chip key={i} label={t(`content.heritage.${site.id}.notableFeatures.${i}`, f)} size="small" color="secondary" />
                        ))}
                      </Box>
                    </Box>
                    
                  </CardContent>
                    <Box px={2} pb={2} textAlign="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mt: 2, borderRadius: '20px', px: 2 }}
                      onClick={() => openSiteDetails(site)}
                    >
                      {t('heritagePage.explore')}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Heritage Categories section removed as requested */}

        {/* Conservation section removed as requested */}
      </div>

      {/* Site Details Modal */}
      {selectedSite && (
        <Dialog open={true} onClose={closeSiteDetails} maxWidth="sm" fullWidth>
          <DialogTitle>{t(`content.heritage.${selectedSite.id}.name`, selectedSite.name)}</DialogTitle>
          <Box sx={{ width: '100%', height: { xs: 160, sm: 220 }, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {dialogImageSrc ? (
              <img
                src={dialogImageSrc}
                alt={selectedSite.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
                onError={() => {
                  setDialogImageCandidates(prev => {
                    const next = prev.slice(1);
                    setDialogImageSrc(next.length ? next[0] : null);
                    return next;
                  });
                }}
              />
            ) : null}
          </Box>
          <DialogContent dividers>
            <Box mb={2}>
              <Typography variant="subtitle1">{t('heritagePage.location', 'Location')}</Typography>
              <Typography variant="body2">{t(`content.heritage.${selectedSite.id}.location`, selectedSite.location)}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">{t('heritagePage.period', 'Period')}</Typography>
              <Typography variant="body2">{t(`content.heritage.${selectedSite.id}.period`, selectedSite.period)}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">{t('heritagePage.description', 'Description')}</Typography>
              <Typography variant="body2">{t(`content.heritage.${selectedSite.id}.description`, selectedSite.description)}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">{t('heritagePage.significance', 'Significance')}</Typography>
              <Typography variant="body2">{t(`content.heritage.${selectedSite.id}.significance`, selectedSite.significance)}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            {selectedSite && (
               isFavorite({ id: selectedSite.id, type: 'heritage' }) ? (
                 <Button onClick={() => { removeFavorite({ id: selectedSite.id, type: 'heritage' }); }} color="secondary">{t('culturePage.unfavorite')}</Button>
               ) : (
                 <Button onClick={() => { addFavorite({ id: selectedSite.id, type: 'heritage', name: selectedSite.name }); }} color="primary">{t('culturePage.favorite')}</Button>
              )
            )}
            <Button onClick={closeSiteDetails} color="primary">{t('heritagePage.close')}</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Heritage;
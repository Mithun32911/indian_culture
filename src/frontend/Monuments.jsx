import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserProgress } from '../context/UserProgressContext';
import { TextField, Select, MenuItem, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Typography, Box, Chip, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { monumentData } from '../database/data.js';
import './Frontend.css';

const Monuments = () => {
  const { incrementMonumentsVisited, addFavorite, removeFavorite, isFavorite } = useUserProgress();
  const { t } = useTranslation();
  const [selectedMonument, setSelectedMonument] = useState(null);
  const [dialogImageSrc, setDialogImageSrc] = useState(null);
  const [dialogImageCandidates, setDialogImageCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const navigate = useNavigate();

  const handleBackClick = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
      navigate('/admin/user-dashboard');
    } else {
      navigate(-1);
    }
  };

  const states = [...new Set(monumentData.map(m => {
    const location = m.location.split(',');
    return location[location.length - 1].trim();
  }))].sort();

  const filteredMonuments = monumentData.filter(monument => {
    const matchesSearch = monument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          monument.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || monument.location.toLowerCase().includes(selectedState.toLowerCase());
    return matchesSearch && matchesState;
  });

  const openMonumentDetails = (monument) => {
    if (typeof incrementMonumentsVisited === 'function') incrementMonumentsVisited();
    // prepare image candidates for the modal (try explicit fields first, then derived filenames)
    const candidates = [];
    if (monument.image) candidates.push(monument.image);
    if (monument.images && Array.isArray(monument.images) && monument.images.length) candidates.push(...monument.images);
    // try a conventional public filename based on id
    candidates.push(`/monument-${monument.id}.jpg`);
    // try a slug-style filename derived from name
    if (monument.name) {
      const slug = monument.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      candidates.push(`/images/monuments/${slug}.jpg`);
      candidates.push(`/images/${slug}.jpg`);
    }

    // remove duplicates and empty entries
    const uniq = [...new Set(candidates.filter(Boolean))];
    setDialogImageCandidates(uniq);
    setDialogImageSrc(uniq.length ? uniq[0] : null);
    setSelectedMonument(monument);
  };

  const closeMonumentDetails = () => setSelectedMonument(null);

  return (
    <div className="monuments-container">
      <div className="container">
        <section className="monuments-header" style={{ position: 'relative', marginTop: '-12px' }}>
          <Button
            onClick={handleBackClick}
            variant="contained"
            size="small"
            sx={{
              position: 'absolute',
              right: 0,
              top: '-8px',
              minWidth: '72px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: '#0c0c0cff',
              color: '#fff',
              '&:hover': { backgroundColor: '#115293' },
              zIndex: 10,
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            {t('nav.back')}
          </Button>
          <h1>{t('monumentsPage.title')}</h1>
          <p className="page-subtitle">{t('monumentsPage.subtitle')}</p>
        </section>

        <section className="monuments-filters filter-section" style={{ marginTop: '-20px' }}>
          <div className="filter-row" style={{ alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div className="search-box" style={{ flex: '0 0 680px', maxWidth: 680 }}>
              <TextField
                label={t('monumentsPage.search_placeholder')}
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
                inputProps={{ 'aria-label': t('monumentsPage.search_placeholder') }}
              />
            </div>

            <div className="state-filter" style={{ width: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="state-select-label">{t('monumentsPage.state_label', 'State')}</InputLabel>
                <Select
                  labelId="state-select-label"
                  value={selectedState}
                  label={t('monumentsPage.state_label', 'State')}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <MenuItem value="all">{t('monumentsPage.all_states')}</MenuItem>
                  {states.map(state => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </section>

  <section className="monuments-grid-section" style={{ marginTop: -20 }}>
          <h2 className="section-title">{t('monumentsPage.featured')}</h2>
          {filteredMonuments.length === 0 ? (
            <div className="no-results">
              <p>{t('monumentsPage.no_results')}</p>
            </div>
          ) : (
            <Grid container spacing={3} className="sites-grid" justifyContent="center" alignItems="stretch">
              {filteredMonuments.map(monument => {

                return (
                  <Grid item xs={12} md={6} lg={4} key={monument.id} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 270, overflow: 'hidden', pb: '0 !important' }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6">{t(`content.monuments.${monument.id}.name`, monument.name)}</Typography>
                        </Box>

                        <Box>
                          <Typography variant="body2" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t(`content.monuments.${monument.id}.description`, monument.description)}</Typography>
                          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}><strong>{t('heritagePage.location', 'Location')}:</strong> {t(`content.monuments.${monument.id}.location`, monument.location)} • <strong>{t('monumentsPage.built', 'Built')}:</strong> {t(`content.monuments.${monument.id}.built`, monument.built)}</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}><strong>{t('monumentsPage.type', 'Type')}:</strong> {t(`monumentsPage.types.${(monument.type||'').toString().toLowerCase().replace(/[^a-z0-9]+/g, '_')}`, monument.type)}</Typography>
                          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {monument.fictional && (
                              <Chip label={t('monumentsPage.fictional')} size="small" />
                            )}
                          </Box>
                        </Box>

                        
                      </CardContent>

                      <Box px={2} pb={2} textAlign="right">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mt: 2, borderRadius: '20px', px: 2 }}
                          onClick={() => openMonumentDetails(monument)}
                        >
                          {t('monumentsPage.learn_more')}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </section>
      </div>

      {selectedMonument && (
        <Dialog open={true} onClose={closeMonumentDetails} maxWidth="sm" fullWidth>
            <DialogTitle>{t(`content.monuments.${selectedMonument.id}.name`, selectedMonument.name)}</DialogTitle>
          <DialogContent dividers>
              <Box mb={2} display="flex" justifyContent="center" sx={{ height: { xs: 160, sm: 220 }, alignItems: 'center' }}>
                {dialogImageSrc ? (
                  <img
                    src={dialogImageSrc}
                    alt={selectedMonument.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
                    onError={() => {
                      // try next candidate if available
                      setDialogImageCandidates(prev => {
                        const next = prev.slice(1);
                        setDialogImageSrc(next.length ? next[0] : null);
                        return next;
                      });
                    }}
                  />
                ) : null}
              </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">{t('monumentsPage.basic_info')}</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                <Typography variant="body2"><strong>{t('heritagePage.location', 'Location')}:</strong> {t(`content.monuments.${selectedMonument.id}.location`, selectedMonument.location)}</Typography>
                <Typography variant="body2"><strong>{t('monumentsPage.built', 'Built')}:</strong> {t(`content.monuments.${selectedMonument.id}.built`, selectedMonument.built)}</Typography>
                <Typography variant="body2"><strong>{t('monumentsPage.builder', 'Builder')}:</strong> {t(`content.monuments.${selectedMonument.id}.builder`, selectedMonument.builder)}</Typography>
                <Typography variant="body2"><strong>{t('monumentsPage.type', 'Type')}:</strong> {t(`monumentsPage.types.${(selectedMonument.type||'').toString().toLowerCase().replace(/[^a-z0-9]+/g, '_')}`, selectedMonument.type)}</Typography>
              </Box>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">{t('monumentsPage.description', 'Description')}</Typography>
              <Typography variant="body2">{t(`content.monuments.${selectedMonument.id}.description`, selectedMonument.description)}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">{t('monumentsPage.architecture')}</Typography>
              <Typography variant="body2">{t(`content.monuments.${selectedMonument.id}.architecture`, selectedMonument.architecture)}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">{t('monumentsPage.visitor_info')}</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                <Typography variant="body2"><strong>{t('monumentsPage.visiting_hours', 'Visiting Hours')}:</strong> {t(`content.monuments.${selectedMonument.id}.visitingHours`, selectedMonument.visitingHours)}</Typography>
                <Typography variant="body2"><strong>{t('monumentsPage.entry_fee', 'Entry Fee')}:</strong> {t(`content.monuments.${selectedMonument.id}.entryFee`, selectedMonument.entryFee)}</Typography>
                <Typography variant="body2"><strong>{t('monumentsPage.significance', 'Significance')}:</strong> {t(`content.monuments.${selectedMonument.id}.significance`, selectedMonument.significance)}</Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            {selectedMonument && (
              isFavorite({ id: selectedMonument.id, type: 'monument' }) ? (
                <Button onClick={() => removeFavorite({ id: selectedMonument.id, type: 'monument' })} color="secondary">{t('culturePage.unfavorite')}</Button>
              ) : (
                <Button onClick={() => addFavorite({ id: selectedMonument.id, type: 'monument', name: selectedMonument.name })} color="primary">{t('culturePage.favorite')}</Button>
              )
            )}
            <Button onClick={closeMonumentDetails} color="primary">{t('monumentsPage.close')}</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Monuments;
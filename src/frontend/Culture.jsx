import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserProgress } from '../context/UserProgressContext';
import { culturalData } from '../database/data.js';
import { TextField, Button, Card, CardContent, CardActions, Typography, Box, Chip, Grid, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import './Frontend.css';

const Culture = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { incrementCulturalEvents, incrementTraditionsExplored, addFavorite, removeFavorite, isFavorite } = useUserProgress();
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogImageSrc, setDialogImageSrc] = useState(null);
  const [dialogImageCandidates, setDialogImageCandidates] = useState([]);

  // Filter data based on selected type and search term
  const filteredData = culturalData.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const uniqueTypes = [...new Set(culturalData.map(item => item.type))];

  const handleBackClick = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
      navigate('/admin/user-dashboard');
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <div className="culture-container">
      <div className="container">
        {/* Header Section */}
        <section
          className="culture-header"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            marginTop: '-36px'
          }}
        >
          <div style={{ flex: '1 1 auto' }}>
            <h1>{t('culturePage.title')}</h1>
            <p className="page-subtitle">
              {t('culturePage.subtitle')}
            </p>
          </div>

          <Button
            onClick={handleBackClick}
            variant="contained"
            size="small"
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              minWidth: '72px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#2f3030ff',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#0b0c0cff' },
              zIndex: 10,
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
            title={t('nav.back')}
          >
            {t('nav.back')}
          </Button>
        </section>

        {/* Filter Section */}
  <section className="filter-section" style={{ marginTop: '-60px' }}>
          <div className="filter-controls">
            <div className="search-box">
              <TextField
                label={t('culturePage.search_placeholder')}
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
              />
            </div>
            
            <div className="type-filters">
              <Stack direction="row" spacing={1}>
                <Button
                  variant={selectedType === 'all' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => setSelectedType('all')}
                >
                  {t('culturePage.all')}
                </Button>
                {uniqueTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    onClick={() => setSelectedType(type)}
                  >
                    {t(`culturePage.types.${(type || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '_')}`, type)}
                  </Button>
                ))}
              </Stack>
            </div>
          </div>
        </section>

        {/* Cultural Data Display */}
        <section className="culture-content">
          {filteredData.length === 0 ? (
            <div className="no-results">
                      <p>{t('culturePage.no_results')}</p>
            </div>
          ) : (
            <div className="culture-grid">
                {([...filteredData].sort((a, b) => {
                  const order = { 'Festival': 0, 'Tradition': 1, 'Art Form': 2 };
                  return (order[a.type] ?? 99) - (order[b.type] ?? 99);
                })).map(item => (
                  <Card
                    key={item.id}
                    className="culture-card"
                    sx={{
                      minHeight: 360,
                      display: 'flex',
                      flexDirection: 'column',
                      background: item.type === 'Festival'
                        ? 'linear-gradient(135deg, #c4dfe3ff 100%)'
                        : item.type === 'Art Form'
                        ? 'linear-gradient(135deg, #88e26dff 0%, #e9edebff 100%)'
                        : item.type === 'Tradition'
                        ? 'linear-gradient(135deg, #e3e394ff 0%, #BBDEFB 100%)'
                        : 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
                      border: item.type === 'Festival'
                        ? '2px solid #0e0e0eff'
                        : item.type === 'Art Form'
                        ? '2px solid #1e1f1fff'
                        : item.type === 'Tradition'
                        ? '2px solid #080808ff'
                        : '2px solid #8553eaff',
                      transition: 'transform 0.2s',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-6px) scale(1.03)',
                        boxShadow: '0 12px 32px rgba(25, 118, 210, 0.18)',
                      },
                    }}
                  >
                    <CardContent 
                      sx={{ 
                        flex: '1 1 auto', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        overflow: 'visible',
                        pb: 0,
                      }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">{t(`content.culture.${item.id}.name`, item.name)}</Typography>
                        {(() => {
                          const typeKey = (item.type || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '_');
                          return <Chip label={t(`culturePage.types.${typeKey}`, item.type)} color="primary" size="small" />;
                        })()}
                      </Box>

                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {t(`content.culture.${item.id}.description`, item.description)}
                      </Typography>

                      <Box mt={1}>
                        <Typography variant="caption"><strong>{t('culturePage.region')}:</strong> {t(`content.culture.${item.id}.region`, item.region)}</Typography><br/>
                        <Typography variant="caption"><strong>{t('culturePage.season')}:</strong> {t(`content.culture.${item.id}.season`, item.season)}</Typography><br/>
                        <Typography variant="caption"><strong>{t('culturePage.significance')}:</strong> {t(`content.culture.${item.id}.significance`, item.significance)}</Typography>
                      </Box>

                      {/* symbol removed as requested */}
                    </CardContent>

                    {/* Footer actions reserved so Explore is always visible */}
                    <CardActions sx={{ justifyContent: 'flex-end', pt: 1, pb: 2, px: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          // prepare image candidates for the dialog
                          const slug = item.name.split(' ').join('').toLowerCase();
                          const candidates = [];
                          if (item.image) candidates.push(item.image);
                          if (item.images && item.images.length) candidates.push(...item.images);
                          candidates.push(`/${slug}.jpg`);
                          candidates.push(`/${slug}.png`);
                          candidates.push(`/${slug}1.jpg`);
                          candidates.push(`/${slug}2.jpg`);
                          candidates.push('/india.png');
                          candidates.push('/india2.png');
                          setDialogImageCandidates(candidates);
                          setDialogImageSrc(candidates.length ? candidates[0] : null);
                          setSelectedItem(item);
                          if (item.type === 'Tradition') incrementTraditionsExplored();
                          else incrementCulturalEvents();
                        }}
                      >
                        {t('culturePage.explore')}
                      </Button>
                    </CardActions>
                  </Card>
                ))}
            </div>
          )}
        </section>

        {/* Cultural Insights Section removed as requested */}
        {/* Culture details dialog */}
        {selectedItem && (
          <Dialog open={true} onClose={() => setSelectedItem(null)} maxWidth="sm" fullWidth>
              <DialogTitle>{t(`content.culture.${selectedItem.id}.name`, selectedItem.name)}</DialogTitle>
              <Box sx={{ width: '100%', height: 240, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                {dialogImageSrc ? (
                  <img
                    src={dialogImageSrc}
                    alt={selectedItem.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                    onError={(e) => {
                      // try next candidate
                      const nextIndex = dialogImageCandidates.indexOf(dialogImageSrc) + 1;
                      if (nextIndex < dialogImageCandidates.length) {
                        setDialogImageSrc(dialogImageCandidates[nextIndex]);
                      } else {
                        // hide image if none left
                        setDialogImageSrc(null);
                      }
                    }}
                  />
                ) : null}
              </Box>
            <DialogContent dividers>
              <Box mb={2}>
                <Typography variant="subtitle1">{t('culturePage.dialog_region')}</Typography>
                <Typography variant="body2">{t(`content.culture.${selectedItem.id}.region`, selectedItem.region)}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">{t('culturePage.dialog_season')}</Typography>
                <Typography variant="body2">{t(`content.culture.${selectedItem.id}.season`, selectedItem.season)}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">{t('culturePage.dialog_description')}</Typography>
                <Typography variant="body2">{t(`content.culture.${selectedItem.id}.description`, selectedItem.description)}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">{t('culturePage.dialog_significance')}</Typography>
                <Typography variant="body2">{t(`content.culture.${selectedItem.id}.significance`, selectedItem.significance)}</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              {isFavorite({ id: selectedItem.id, type: 'culture' }) ? (
                <Button onClick={() => { removeFavorite({ id: selectedItem.id, type: 'culture' }); }} color="secondary">{t('culturePage.unfavorite')}</Button>
              ) : (
                <Button onClick={() => { addFavorite({ id: selectedItem.id, type: 'culture', name: selectedItem.name }); }} color="primary">{t('culturePage.favorite')}</Button>
              )}
              <Button onClick={() => setSelectedItem(null)} color="primary">{t('culturePage.close')}</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Culture;
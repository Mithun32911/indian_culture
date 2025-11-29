import React, { useState } from 'react';
import { useUserProgress } from '../context/UserProgressContext';
import { TextField, Select, MenuItem, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl, Typography, Box, Chip, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { monumentData } from '../database/data.js';
import './Frontend.css';

const Monuments = () => {
  const { incrementMonumentsVisited, addFavorite, removeFavorite, isFavorite } = useUserProgress();
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
            Back
          </Button>
          <h1>Famous Indian Monuments</h1>
          <p className="page-subtitle">Explore architectural masterpieces and a few demo/fictitious landmarks included for layout and demo purposes.</p>
        </section>

        <section className="monuments-filters filter-section" style={{ marginTop: '-20px' }}>
          <div className="filter-row" style={{ alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div className="search-box" style={{ flex: '0 0 680px', maxWidth: 680 }}>
              <TextField
                label="Search monuments..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
                inputProps={{ 'aria-label': 'Search monuments' }}
              />
            </div>

            <div className="state-filter" style={{ width: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  value={selectedState}
                  label="State"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <MenuItem value="all">All States</MenuItem>
                  {states.map(state => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </section>

  <section className="monuments-grid-section" style={{ marginTop: -20 }}>
          <h2 className="section-title">Featured Monuments</h2>
          {filteredMonuments.length === 0 ? (
            <div className="no-results">
              <p>No monuments found matching your search criteria.</p>
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
                          <Typography variant="h6">{monument.name}</Typography>
                        </Box>

                        <Box>
                          <Typography variant="body2" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{monument.description}</Typography>
                          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}><strong>Location:</strong> {monument.location} • <strong>Built:</strong> {monument.built}</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}><strong>Type:</strong> {monument.type}</Typography>
                          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {monument.fictional && (
                              <Chip label="Fictional" size="small" />
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
                          Learn More
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
          <DialogTitle>{selectedMonument.name}</DialogTitle>
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
              <Typography variant="subtitle1">Basic Information</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                <Typography variant="body2"><strong>Location:</strong> {selectedMonument.location}</Typography>
                <Typography variant="body2"><strong>Built:</strong> {selectedMonument.built}</Typography>
                <Typography variant="body2"><strong>Builder:</strong> {selectedMonument.builder}</Typography>
                <Typography variant="body2"><strong>Type:</strong> {selectedMonument.type}</Typography>
              </Box>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">Description</Typography>
              <Typography variant="body2">{selectedMonument.description}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">Architecture</Typography>
              <Typography variant="body2">{selectedMonument.architecture}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">Visitor Information</Typography>
              <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                <Typography variant="body2"><strong>Visiting Hours:</strong> {selectedMonument.visitingHours}</Typography>
                <Typography variant="body2"><strong>Entry Fee:</strong> {selectedMonument.entryFee}</Typography>
                <Typography variant="body2"><strong>Significance:</strong> {selectedMonument.significance}</Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            {selectedMonument && (
              isFavorite({ id: selectedMonument.id, type: 'monument' }) ? (
                <Button onClick={() => removeFavorite({ id: selectedMonument.id, type: 'monument' })} color="secondary">Unfavorite</Button>
              ) : (
                <Button onClick={() => addFavorite({ id: selectedMonument.id, type: 'monument', name: selectedMonument.name })} color="primary">Fav</Button>
              )
            )}
            <Button onClick={closeMonumentDetails} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Monuments;
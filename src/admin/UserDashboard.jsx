import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { monumentData } from '../database/data.js';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button, Card, CardContent, Typography, Grid, Box, Tabs, Tab, Chip, Avatar, Stack, Badge, IconButton, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { quizzes } from '../database/quizzes';
import Culture from '../frontend/Culture';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Admin.css';


// userFavorites array replaced by dynamic favorites from UserProgressContext

// recommendations removed per request

// Learning quizzes are provided from src/database/quizzes.js

function UserDashboard() {
  const { culturalEventsAttended, traditionsExplored, heritagesAttended, monumentsVisited, incrementMonumentsVisited, favorites, removeFavorite, learningModulesCompleted, incrementLearningModulesCompleted } = useUserProgress();
  // Quiz state
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizCategory, setQuizCategory] = useState(null);

  // Shuffle function
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const [visitedSites, setVisitedSites] = useState([]);
  const [showSitesDialog, setShowSitesDialog] = useState(false);
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListSelected, setNewListSelected] = useState([]);
  const [newListCustomPlaces, setNewListCustomPlaces] = useState([]);
  const [newCustomPlace, setNewCustomPlace] = useState('');
  const [journeyLists, setJourneyLists] = useState(() => {
    try { return JSON.parse(localStorage.getItem('journeyLists') || '[]'); } catch { return []; }
  });
  const [tab, setTab] = useState(0);
  const [previousPage, setPreviousPage] = useState(null);
  const [showCultureInline, _setShowCultureInline] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [sharedContents, setSharedContents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sharedContents') || '[]');
    } catch {
      return [];
    }
  });
  
  // tabs are controlled via navbar buttons now

  useEffect(() => {
    // Check if user came from a specific page via URL params or sessionStorage
    const urlParams = new URLSearchParams(location.search);
    const redirectFrom = urlParams.get('from') || sessionStorage.getItem('previousPage');
    
    if (redirectFrom) {
      setPreviousPage(redirectFrom);
      // Clear from sessionStorage after using it
      sessionStorage.removeItem('previousPage');
    }
    const onSharedUpdate = (event) => {
      setSharedContents(event?.detail || JSON.parse(localStorage.getItem('sharedContents') || '[]'));
    };
    window.addEventListener('sharedContentsUpdated', onSharedUpdate);
    return () => window.removeEventListener('sharedContentsUpdated', onSharedUpdate);
  }, [location]);

  const handleBackClick = () => {
    if (previousPage) {
      navigate(previousPage);
    } else {
      navigate(-1); // Go back to previous page in history
    }
  };

  // Dynamic userProgress array
  // Culture Visited aggregates cultural events and traditions explored
  const cultureVisitedCount = (culturalEventsAttended || 0) + (traditionsExplored || 0);
  const userProgress = [
    { activity: t('userDashboard.progress.cultureVisited'), count: cultureVisitedCount },
    { activity: t('userDashboard.progress.heritageVisited'), count: heritagesAttended },
    { activity: t('userDashboard.progress.monumentVisited'), count: monumentsVisited || visitedSites.length || 0 },
    { activity: t('userDashboard.progress.learningCompleted'), count: learningModulesCompleted },
  ];

  return (
    <div
      className="user-dashboard"
      style={{
        minHeight: '100vh',
        background: '#e5dbbc',
      }}
    >
      {/* Heading at the very top with Back to Site button on left and Logout button on right */}
      <Box sx={{
        width: '100%',
        background: '#bccfe1ff',
        color: '#2e2e2eff',
        py: 2,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
        mb: 0,
      }}>
        {/* Back to Site button removed */}
        <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.2rem' }, letterSpacing: 1 }}>
          {t('userDashboard.welcome')}
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            px: 1,
            mr: 3,
            boxShadow: '0 2px 8px rgba(255,107,107,0.15)',
          }}
          onClick={() => navigate('/admin/user-login')}
        >
          {t('userDashboard.logout')}
        </Button>
      </Box>
      {/* Top navbar with mode buttons (moved above 'Explore and discover') */}
  <Box sx={{ width: '100%', background: '#fff', py: 1, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', mb: 0 }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Button variant={tab === 0 ? 'contained' : 'text'} color={tab === 0 ? 'secondary' : 'primary'} onClick={() => setTab(0)} sx={{ fontWeight: 600, px: 1.5 }}>{t('userDashboard.tab.dashboard')}</Button>
            <Button variant={tab === 1 ? 'contained' : 'text'} color={tab === 1 ? 'secondary' : 'primary'} onClick={() => setTab(1)} sx={{ fontWeight: 600, px: 1.5 }}>{t('userDashboard.tab.myJourney')}</Button>
            <Button variant={tab === 2 ? 'contained' : 'text'} color={tab === 2 ? 'secondary' : 'primary'} onClick={() => setTab(2)} sx={{ fontWeight: 600, px: 1.5 }}>{t('userDashboard.tab.favorites')}</Button>
            <Button variant={tab === 3 ? 'contained' : 'text'} color={tab === 3 ? 'secondary' : 'primary'} onClick={() => setTab(3)} sx={{ fontWeight: 600, px: 1.5 }}>{t('userDashboard.tab.learning')}</Button>
            <Button variant={tab === 4 ? 'contained' : 'text'} color={tab === 4 ? 'secondary' : 'primary'} onClick={() => setTab(4)} sx={{ fontWeight: 600, px: 1.5 }}>{t('userDashboard.tab.profile')}</Button>
          </Stack>
        </Box>
      </Box>

  <Box sx={{ mb: 0, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Back Button */}
        {previousPage && (
          <IconButton 
            onClick={handleBackClick}
            sx={{ 
              position: 'absolute', 
              left: 0, 
              top: 0,
              color: 'primary.main',
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.2)',
              }
            }}
            title="Go back to previous page"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
       
      </Box>

      {/* Quick Actions placed immediately under the intro line as requested */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Typography variant="body1" sx={{ fontSize: '1.5rem', textAlign: 'center', width: '100%', maxWidth: 900 }}>{t('userDashboard.tagline')}</Typography>
      </Box>
     
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
        <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/culture"
            variant="contained"
            sx={{
              background: '#51ae00ff',
              color: '#ffffffff',
              padding: '12px 24px',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: '#51ae00ff',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(255, 107, 107, 0.5)',
              }
            }}
           >
             {t('userDashboard.button.exploreCulture')}
           </Button>
          <Button
            component={Link}
            to="/heritage"
            variant="contained"
            sx={{
              background: '#51ae00ff',
              color: '#ffffffff',
              padding: '12px 24px',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: '#51ae00ff',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(255, 107, 107, 0.5)',
              }
            }}
           >
             {t('userDashboard.button.visitHeritage')}
           </Button>
          <Button
            component={Link}
            to="/monuments"
            variant="contained"
            sx={{
              background: '#51ae00ff',
              color: '#ffffffff',
              padding: '12px 24px',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(171,193,238,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: '#51ae00ff',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(171,193,238,0.5)',
              }
            }}
           >
             {t('userDashboard.button.discoverMonuments')}
           </Button>
        </Stack>
      </Box>
      {showCultureInline && (
        <Box sx={{ width: '100%', px: 2, py: 2 }}>
          <Culture />
        </Box>
      )}

      {tab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('userDashboard.heading.yourHeritageJourney')}</Typography>
          <Grid container spacing={2} sx={{ maxWidth: '800px', justifyContent: 'center' }}>
            {userProgress.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">{item.count}</Typography>
                  <Typography variant="body2">{item.activity}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          {sharedContents && sharedContents.length > 0 && (
            <Box sx={{ mt: 4, width: '100%', maxWidth: 900 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{t('userDashboard.latestContentCreators')}</Typography>
                <Grid container spacing={2} sx={{ maxWidth: '800px', justifyContent: 'center', mx: 'auto' }}>
                  {sharedContents.map((c, i) => (
                    <Grid item xs={12} md={4} key={c.id || i}>
                      <Card sx={{ textAlign: 'center', p: 2, minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1 }}>{c.title}</Typography>
                          <Typography variant="caption">{c.type} • {new Date(c.createdAt).toLocaleDateString()}</Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>{c.body && (c.body.length > 120 ? c.body.substring(0, 120) + '...' : c.body)}</Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
            </Box>
          )}
          
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('userDashboard.myHeritageJourney')}</Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px' }}>{t('userDashboard.trackVisits')}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>{t('userDashboard.sitesVisited')}</Typography>
          {visitedSites.length === 0 ? (
            <Typography variant="body2" sx={{ mb: 2 }}>{t('userDashboard.noSitesVisited')}</Typography>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
              {visitedSites.map(site => (
                <li key={site.id} style={{ marginBottom: 4 }}>
                  <span role="img" aria-label="location">📍</span> {site.name} <span style={{ color: '#888', fontSize: '0.9em' }}>({site.location})</span>
                </li>
              ))}
            </ul>
          )}
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowSitesDialog(true)}>{t('userDashboard.button.addNewVisit')}</Button>
          <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={() => setShowNewListDialog(true)}>{t('userDashboard.button.addNewList')}</Button>
          
          {/* New List Dialog */}
          <Dialog open={showNewListDialog} onClose={() => setShowNewListDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{t('userDashboard.dialog.createNewList.title')}</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder={t('userDashboard.dialog.createNewList.placeholderListName')} style={{ padding: '8px 10px', fontSize: '1rem', borderRadius: 6, border: '1px solid #ddd' }} />

                <Typography variant="subtitle2">{t('userDashboard.dialog.selectMonuments')}</Typography>
                <Box sx={{ maxHeight: 220, overflow: 'auto', border: '1px solid #eee', p: 1, borderRadius: 2 }}>
                  {monumentData.map(site => (
                    <Box key={site.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <input type="checkbox" checked={newListSelected.some(s => s.id === site.id)} onChange={(e) => {
                        if (e.target.checked) setNewListSelected(prev => [...prev, site]);
                        else setNewListSelected(prev => prev.filter(p => p.id !== site.id));
                      }} />
                      <span style={{ marginLeft: 6 }}>{site.name} <small style={{ color: '#666' }}>({site.location})</small></span>
                    </Box>
                  ))}
                </Box>

                <Typography variant="subtitle2">{t('userDashboard.dialog.addCustomPlaces')}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <input value={newCustomPlace} onChange={e => setNewCustomPlace(e.target.value)} placeholder="Place name" style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd' }} />
                  <Button variant="contained" onClick={() => {
                    if (newCustomPlace.trim()) {
                      setNewListCustomPlaces(prev => [...prev, { id: `c-${Date.now()}`, name: newCustomPlace.trim() }]);
                      setNewCustomPlace('');
                    }
                  }}>{t('userDashboard.dialog.addButton')}</Button>
                </Box>
                <Box>
                  {newListCustomPlaces.map(p => (
                    <Chip key={p.id} label={p.name} onDelete={() => setNewListCustomPlaces(prev => prev.filter(x => x.id !== p.id))} sx={{ m: 0.5 }} />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowNewListDialog(false)}>{t('userDashboard.close')}</Button>
              <Button onClick={() => {
                if (!newListName.trim()) return alert(t('userDashboard.alert.enterListName'));
                const newList = { id: `list-${Date.now()}`, name: newListName.trim(), monuments: newListSelected, customPlaces: newListCustomPlaces };
                const updated = [...journeyLists, newList];
                setJourneyLists(updated);
                localStorage.setItem('journeyLists', JSON.stringify(updated));
                setNewListName(''); setNewListSelected([]); setNewListCustomPlaces([]);
                setShowNewListDialog(false);
              }} variant="contained">{t('userDashboard.button.saveList')}</Button>
            </DialogActions>
          </Dialog>

          {/* Display saved lists */}
          {journeyLists.length > 0 && (
            <Box sx={{ mt: 3, width: '100%', maxWidth: 700 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>My Saved Lists</Typography>
              {journeyLists.map(list => (
                <Card key={list.id} sx={{ mb: 1, p: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1">{list.name}</Typography>
                    <Box>
                      <Button size="small" variant="text" onClick={() => {
                        // add all list monuments/custom places to visitedSites
                        setVisitedSites(prev => {
                          const combined = [...prev];
                          list.monuments.forEach(m => { if (!combined.some(c => c.id === m.id)) combined.push(m); });
                          list.customPlaces.forEach(cp => { if (!combined.some(c => c.id === cp.id)) combined.push(cp); });
                          return combined;
                        });
                      }}>Add to Journey</Button>
                      <Button size="small" variant="text" onClick={() => {
                        // remove list
                        const updated = journeyLists.filter(l => l.id !== list.id);
                        setJourneyLists(updated);
                        localStorage.setItem('journeyLists', JSON.stringify(updated));
                      }}>Delete</Button>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    {list.monuments.map(m => <Chip key={m.id} label={m.name} size="small" sx={{ mr: 0.5, mb: 0.5 }} />)}
                    {list.customPlaces.map(cp => <Chip key={cp.id} label={cp.name} size="small" sx={{ mr: 0.5, mb: 0.5 }} />)}
                  </Box>
                </Card>
              ))}
            </Box>
          )}
          <Dialog open={showSitesDialog} onClose={() => setShowSitesDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{t('userDashboard.dialog.selectSite.title')}</DialogTitle>
            <DialogContent>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {monumentData.filter(site => !visitedSites.some(v => v.id === site.id)).map(site => (
                  <li key={site.id} style={{ marginBottom: 8 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', mb: 1 }}
                      onClick={() => {
                        setVisitedSites(prev => [...prev, site]);
                        // increment the global monuments visited counter as well
                        if (typeof incrementMonumentsVisited === 'function') incrementMonumentsVisited();
                        setShowSitesDialog(false);
                      }}
                    >
                      <span role="img" aria-label="location">📍</span> {site.name} <span style={{ color: '#888', fontSize: '0.9em' }}>({site.location})</span>
                    </Button>
                  </li>
                ))}
                {monumentData.filter(site => !visitedSites.some(v => v.id === site.id)).length === 0 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>{t('userDashboard.allSitesAdded')}</Typography>
                )}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowSitesDialog(false)}>{t('userDashboard.close')}</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('userDashboard.favorites.title')}</Typography>
          <Grid container spacing={2} sx={{ maxWidth: '800px', justifyContent: 'center' }}>
            {favorites.length === 0 ? (
              <Typography variant="body2">{t('userDashboard.favorites.noFavorites')}</Typography>
            ) : favorites.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Chip 
                      label={item.type} 
                      color="primary" 
                      size="small" 
                      sx={{ mt: 1, mr: 1 }} 
                    />
                    <Button variant="text" size="small" onClick={() => removeFavorite(item)} sx={{ mt: 1 }}>{t('userDashboard.favorites.remove')}</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* Recommendations tab removed */}
      {tab === 3 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('userDashboard.learning.title')}</Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px' }}>{t('userDashboard.learning.description')}</Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2, flexWrap: 'wrap' }}>
            {Object.keys(quizzes).map(cat => (
              <Button
                key={cat}
                variant={quizCategory === cat ? 'contained' : 'outlined'}
                onClick={() => setQuizCategory(cat)}
                sx={{ textTransform: 'none' }}
              >{cat}</Button>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>{t('userDashboard.learning.quizAttempts', { attempts: quizAttempts, score: quizScore, total: quizQuestions.length || 10 })}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!quizCategory}
            onClick={() => {
              // prepare a 10-question quiz from the selected category
              const bank = quizzes[quizCategory] || [];
              const shuffled = shuffleArray(bank).slice(0, 10);
              setQuizQuestions(shuffled);
              setQuizOpen(true);
              setQuizStep(0);
              setQuizAnswers([]);
              setQuizFinished(false);
            }}
          >{t('userDashboard.learning.startQuiz')}</Button>
          <Dialog open={quizOpen} onClose={() => setQuizOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{t('userDashboard.quiz.title')}</DialogTitle>
            <DialogContent>
              {!quizFinished && quizQuestions.length > 0 ? (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>{quizQuestions[quizStep].question}</Typography>
                  <RadioGroup
                    value={quizAnswers[quizStep] || ''}
                    onChange={e => {
                      const newAnswers = [...quizAnswers];
                      newAnswers[quizStep] = e.target.value;
                      setQuizAnswers(newAnswers);
                    }}
                  >
                    {quizQuestions[quizStep].options.map(opt => (
                      <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                    ))}
                  </RadioGroup>
                </>
              ) : quizFinished ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h6">{t('userDashboard.quiz.complete')}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>{t('userDashboard.quiz.yourScore', { score: quizScore, total: quizQuestions.length })}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{t('userDashboard.quiz.attempts', { attempts: quizAttempts })}</Typography>
                </Box>
              ) : null}
            </DialogContent>
            <DialogActions>
              {!quizFinished && quizStep > 0 && (
                <Button onClick={() => setQuizStep(quizStep - 1)}>{t('userDashboard.quiz.back')}</Button>
              )}
              {!quizFinished && quizQuestions.length > 0 && quizStep < quizQuestions.length - 1 && (
                <Button
                  onClick={() => setQuizStep(quizStep + 1)}
                  disabled={!quizAnswers[quizStep]}
                >
                  {t('userDashboard.quiz.next')}
                </Button>
              )}
              {!quizFinished && quizQuestions.length > 0 && quizStep === quizQuestions.length - 1 && (
                <Button
                  onClick={() => {
                    // Calculate score
                    let score = 0;
                    quizQuestions.forEach((q, idx) => {
                      if (quizAnswers[idx] === q.answer) score++;
                    });
                    setQuizScore(score);
                    setQuizAttempts(a => a + 1);
                    incrementLearningModulesCompleted();
                    setQuizFinished(true);
                  }}
                  disabled={!quizAnswers[quizStep]}
                >
                  {t('userDashboard.quiz.finish')}
                </Button>
              )}
              <Button onClick={() => setQuizOpen(false)}>{t('userDashboard.close')}</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {tab === 4 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 700, mx: 'auto', mt: 2, p: 3 }}>
          <Card sx={{ width: '100%', background: '#fff', borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              {/* Profile state and editing for user */}
              <UserProfileSection />
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default UserDashboard;

// --- UserProfileSection component ---
function UserProfileSection() {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    userId: 'U12345',
    username: 'heritageFan99',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    profilePicture: '',
    location: 'Delhi, India',
    languagePreference: 'English',
    bio: 'I love exploring heritage sites.'
  });
  const avatarRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        // keep gmail-only emails if required; otherwise show empty
        if (parsed.email && !/^[^@\s]+@gmail\.com$/i.test(parsed.email)) parsed.email = '';
        setProfile(p => ({ ...p, ...parsed }));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleAvatar = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile(p => ({ ...p, profilePicture: reader.result }));
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    try {
      const toSave = { ...profile };
      if (toSave.email && !/^[^@\s]+@gmail\.com$/i.test(toSave.email)) toSave.email = '';
      localStorage.setItem('currentUser', JSON.stringify(toSave));
    } catch (e) { console.warn(e); }
    setEditMode(false);
  };

  return (
    <Box>
      {editMode ? (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 140 }}>
            <Avatar src={profile.profilePicture} sx={{ width: 120, height: 120, mb: 1, cursor: 'pointer' }} onClick={() => avatarRef.current && avatarRef.current.click()} />
            <input ref={avatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
            <Button variant="outlined" size="small" onClick={() => avatarRef.current && avatarRef.current.click()}>{t('userProfile.choosePicture')}</Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <input value={profile.fullName} onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} placeholder={t('userProfile.placeholder.fullName')} style={{ width: '100%', marginBottom: 8, padding: 6 }} />
            <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} placeholder={t('userProfile.placeholder.email')} style={{ width: '100%', marginBottom: 8, padding: 6 }} />
            <input value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} placeholder={t('userProfile.placeholder.location')} style={{ width: '100%', marginBottom: 8, padding: 6 }} />
            <input value={profile.languagePreference} onChange={e => setProfile(p => ({ ...p, languagePreference: e.target.value }))} placeholder={t('userProfile.placeholder.language')} style={{ width: '100%', marginBottom: 8, padding: 6 }} />
            <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder={t('userProfile.placeholder.bio')} rows={3} style={{ width: '100%', marginBottom: 8, padding: 6 }} />
            <Box>
              <Button variant="contained" size="small" onClick={saveProfile} sx={{ mr: 1 }}>{t('userProfile.button.save')}</Button>
              <Button variant="outlined" size="small" onClick={() => setEditMode(false)}>{t('userProfile.button.cancel')}</Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Avatar src={profile.profilePicture} sx={{ width: 120, height: 120, cursor: 'pointer' }} onClick={() => avatarRef.current && avatarRef.current.click()} />
          <input ref={avatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h6">{profile.fullName}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>@{profile.username}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{profile.email}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{profile.location}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{t('userProfile.languageLabel')}: {profile.languagePreference}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{profile.bio}</Typography>
            <Button variant="outlined" size="small" onClick={() => setEditMode(true)}>{t('userProfile.button.edit')}</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
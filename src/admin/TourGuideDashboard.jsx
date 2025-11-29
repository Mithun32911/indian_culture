// Context wrapper for tourist contacts
function TouristContactsContextWrapper({ children }) {
  const [contacts, setContacts] = React.useState([]);
  return (
    <TouristContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </TouristContactsContext.Provider>
  );
}


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, Grid, Tabs, Tab, Chip, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
// ...existing code...
import './Admin.css';

const tourSchedule = [
  { title: 'Red Fort Heritage Walk', date: '2025-10-10', time: '10:00 AM', participants: 15 },
  { title: 'Taj Mahal Sunrise Tour', date: '2025-10-11', time: '6:00 AM', participants: 20 },
  { title: 'Jaipur Royal Palaces Tour', date: '2025-10-12', time: '9:00 AM', participants: 18 },
  { title: 'Varanasi Ganga Aarti Experience', date: '2025-10-13', time: '7:00 PM', participants: 25 },
  { title: 'Khajuraho Temple Art Walk', date: '2025-10-14', time: '4:00 PM', participants: 10 },
];

const guideStats = [
  { metric: 'Tours Conducted', count: 156 },
  { metric: 'Tourists Guided', count: '2.3K' },
  { metric: 'Average Rating', count: '4.8⭐' },
];

const popularDestinations = [
  { name: 'Taj Mahal', location: 'Agra', bookings: 45 },
  { name: 'Red Fort', location: 'Delhi', bookings: 38 },
  { name: 'Hawa Mahal', location: 'Jaipur', bookings: 32 },
  { name: 'Golden Temple', location: 'Amritsar', bookings: 28 },
  { name: 'Meenakshi Temple', location: 'Madurai', bookings: 22 },
  { name: 'Konark Sun Temple', location: 'Odisha', bookings: 19 },
  { name: 'Gateway of India', location: 'Mumbai', bookings: 27 },
];
const culturalFacts = [
  'India is home to 40 UNESCO World Heritage Sites, including monuments, natural wonders, and cultural landscapes.',
  'The Ganga Aarti in Varanasi is a spiritual ceremony performed every evening on the banks of the Ganges River.',
  'Diwali, the Festival of Lights, is celebrated across India with lamps, fireworks, and sweets.',
  'The Taj Mahal was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
  'Kathakali is a classical dance form from Kerala, known for its elaborate costumes and expressive gestures.',
  'India has over 1,600 languages and dialects spoken across its regions.',
  'The Red Fort in Delhi was the main residence of Mughal emperors for nearly 200 years.',
  'Ajanta and Ellora Caves in Maharashtra are famous for ancient Buddhist, Hindu, and Jain rock-cut temples and art.',
];

const guideResources = [
  { title: 'Historical Facts Database', type: 'Reference' },
  { title: 'Multi-language Phrases', type: 'Language Guide' },
  { title: 'Emergency Contacts', type: 'Safety' },
];

function TourGuideDashboard() {
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState({ open: false, title: '', content: '', actions: null, custom: null });
  const [tours, setTours] = useState(tourSchedule);
  // For editing tours in 'My Tours'
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', date: '', time: '', participants: '' });
  const [feedbackIdx, setFeedbackIdx] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  // For Tourist contacts modal (kept for potential reuse)
  const [showContacts, setShowContacts] = useState(false);

  // Modal helpers
  const openModal = (title = '', content = '', actions = null, custom = null) => {
    setModal({ open: true, title, content, actions, custom });
  };
  const closeModal = () => setModal({ open: false, title: '', content: '', actions: null, custom: null });
  
  // For Schedule tab
  const [scheduleEditIdx, setScheduleEditIdx] = useState(null);
  const [scheduleEditForm, setScheduleEditForm] = useState({ title: '', date: '', time: '', participants: '' });
  // For Resources tab
  const [resourceIdx, setResourceIdx] = useState(null);
  // For Profile tab
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    phone: '+91-9876543210',
    location: 'Delhi, India',
    gender: 'Male',
    dob: '1985-06-15',
    avatar: null, // data URL
    bio: 'Experienced tour guide specializing in Indian heritage and culture.'
  });

  // Load saved profile from localStorage (currentUser) when component mounts
  useEffect(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const parsed = JSON.parse(stored);
        // keep only gmail addresses for privacy: if stored email is not @gmail.com, clear it
        if (parsed.email && !/^[^@\s]+@gmail\.com$/i.test(parsed.email)) {
          parsed.email = '';
        }
        // merge stored values into form
        setProfileForm(f => ({ ...f, ...parsed }));
      }
    } catch (e) {
      console.warn('Failed to load profile from storage', e);
    }
  }, []);

  const avatarInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileForm(f => ({ ...f, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const navigate = useNavigate();
  return (
       <div className="admin-dashboard tour-guide-dashboard" style={{ minHeight: '100vh', paddingBottom: 40 }}>
        <Box sx={{ width: '100%', background: '#bccfe1ff', color: '#2e2e2eff', py: 2, display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(25,118,210,0.08)', mb: 0 }}>
          <Box sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.2rem' }, letterSpacing: 1 }}>
        <Typography variant="h2" sx={{ margin: 0, fontWeight: 900, fontSize: { xs: '1.9rem', md: '3.2rem' }, color: '#2e2e2e', letterSpacing: 1 }}>Tour Guide Central</Typography>
        <Typography variant="body1" sx={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#2e2e2e' }}>Guide visitors through India's incredible heritage</Typography>
          </Box>
           <Button
             variant="contained"
             color="error"
             sx={{ fontWeight: 'bold', fontSize: '1rem', px: 1, mr: 3, boxShadow: '0 2px 8px rgba(255,107,107,0.15)' }}
             onClick={() => { localStorage.clear(); sessionStorage.clear(); navigate('/'); }}
           >
             Logout
           </Button>
         </Box>
         <Box sx={{ width: '100%', background: '#fff', py: 1, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', mb: 0 }}>
           <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
              <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
               {['Dashboard','My Tours','Schedule','Destinations','Resources','Profile'].map((label, i) => (
                 <Button
                   key={label}
                   onClick={() => setTab(i)}
                   variant={tab === i ? 'contained' : 'text'}
                   sx={{
                     minWidth: 100,
                     px: 2,
                     py: 1,
                     fontWeight: tab === i ? 800 : 600,
                     background: tab === i ? '#51ae00' : 'transparent',
                     color: tab === i ? '#fff' : '#333',
                     borderRadius: 2,
                     boxShadow: tab === i ? 2 : 'none',
                     transition: 'transform 0.12s ease, box-shadow 0.12s ease, background 0.12s',
                     '&:hover': {
                       transform: 'translateY(-4px)',
                       boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                       background: tab === i ? undefined : '#f3f3f3'
                     }
                   }}
                 >
                   {label}
                 </Button>
               ))}
             </Stack>
           </Box>
         </Box>
      {tab === 0 && (
        <Box sx={{ background: '#f6f8fa', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Guide Performance</Typography>
          <Grid container spacing={2}>
            {guideStats.map((stat, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 4' }}>
                <Card sx={{ textAlign: 'center', p: 2, boxShadow: 3, borderRadius: 3, background: '#fffde7' }}>
                  <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 700 }}>{stat.count}</Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>{stat.metric}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Upcoming Tours</Typography>
          <Grid container spacing={2}>
            {tourSchedule.slice(0, 4).map((tour, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 3' }}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, background: '#fffde7' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>{tour.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tour.date} at {tour.time}
                    </Typography>
                    <Chip 
                      label={`${tour.participants} participants`} 
                      color="primary" 
                      size="small" 
                      sx={{ mt: 1, background: '#1976d2', color: '#fff' }} 
                    />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block', borderColor: '#1976d2', color: '#1976d2' }}
                      onClick={() => openModal(
                        tour.title + ' Details',
                        `Date: ${tour.date}\nTime: ${tour.time}\nParticipants: ${tour.participants}\nDescription: This tour explores the rich history and culture of ${tour.title.split(' ')[0]}.`
                      )}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Cultural Facts for Guides</Typography>
          <Grid container spacing={2}>
            {culturalFacts.slice(0, 4).map((fact, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 6' }}>
                <Card sx={{ p: 2, borderRadius: 3, boxShadow: 1, background: '#fffde7' }}>
                  <Typography variant="body1" sx={{ color: '#333' }}>{fact}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>My Tour History</Typography>
          <Grid container spacing={2}>
            {tours.map((tour, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 6' }}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, background: '#fffde7', borderLeft: '6px solid #ffcc80' }}>
                  <CardContent>
                    {editIdx === idx ? (
                      <form onSubmit={e => {
                        e.preventDefault();
                        setTours(tours => tours.map((t, i) => i === idx ? { ...editForm, participants: Number(editForm.participants) } : t));
                        setEditIdx(null);
                        closeModal();
                      }}>
                        <Typography variant="h6">Edit Tour</Typography>
                        <input type="text" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" style={{ width: '100%', marginBottom: 8 }} />
                        <input type="date" value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} style={{ width: '100%', marginBottom: 8 }} />
                        <input type="text" value={editForm.time} onChange={e => setEditForm(f => ({ ...f, time: e.target.value }))} placeholder="Time" style={{ width: '100%', marginBottom: 8 }} />
                        <input type="number" value={editForm.participants} onChange={e => setEditForm(f => ({ ...f, participants: e.target.value }))} placeholder="Participants" style={{ width: '100%', marginBottom: 8 }} />
                        <Button type="submit" variant="contained" size="small" sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" size="small" onClick={() => setEditIdx(null)}>Cancel</Button>
                      </form>
                    ) : feedbackIdx === idx ? (
                      <form onSubmit={e => {
                        e.preventDefault();
                        // Here you could save feedback to backend or state
                        closeModal();
                      }}>
                        <Typography variant="h6">Feedback for {tour.title}</Typography>
                        <textarea value={feedbackText} onChange={e => setFeedbackText(e.target.value)} rows={3} style={{ width: '100%', marginBottom: 8 }} placeholder="Enter feedback..." />
                        <Button type="submit" variant="contained" size="small" sx={{ mr: 1 }}>Submit</Button>
                        <Button variant="outlined" size="small" onClick={() => setFeedbackIdx(null)}>Cancel</Button>
                      </form>
                    ) : (
                      <>
                        <Typography variant="h6">{tour.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tour.date} at {tour.time}
                        </Typography>
                        <Chip 
                          label={`${tour.participants} participants`} 
                          color="success" 
                          size="small" 
                          sx={{ mt: 1, background: '#388e3c', color: '#fff' }} 
                        />
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                          <Button variant="outlined" size="small" onClick={() => {
                            setEditIdx(idx);
                            setEditForm({
                              title: tour.title,
                              date: tour.date,
                              time: tour.time,
                              participants: tour.participants
                            });
                          }} sx={{ transition: 'background 0.12s, color 0.12s, transform 0.12s', '&:hover': { background: '#e3f2fd', color: '#0f4c81', transform: 'translateY(-2px)' } }}>Edit</Button>
                          <Button variant="outlined" size="small" onClick={() => {
                            setTours(tours => [...tours, { ...tour, title: tour.title + ' (Copy)' }]);
                            openModal('Duplicate Tour', 'Tour duplicated: ' + tour.title);
                          }} sx={{ transition: 'background 0.12s, color 0.12s, transform 0.12s', '&:hover': { background: '#fff3e0', color: '#ff9800', transform: 'translateY(-2px)' } }}>Duplicate</Button>
                          <Button variant="outlined" size="small" onClick={() => {
                            setFeedbackIdx(idx);
                            setFeedbackText('');
                          }} sx={{ transition: 'background 0.12s, color 0.12s, transform 0.12s', '&:hover': { background: '#e8f5e9', color: '#388e3c', transform: 'translateY(-2px)' } }}>Feedback</Button>
                        </Stack>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ background: '#f6f8fa', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Tour Schedule</Typography>
          <Button variant="contained" sx={{ mb: 2 }} onClick={() => openModal('Add New Tour', '', null, (
            <form onSubmit={e => {
              e.preventDefault();
              setTours(tours => [...tours, { ...scheduleEditForm, participants: Number(scheduleEditForm.participants) }]);
              setScheduleEditForm({ title: '', date: '', time: '', participants: '' });
              closeModal();
            }}>
              <Typography variant="h6">Add New Tour</Typography>
              <input type="text" value={scheduleEditForm.title} onChange={e => setScheduleEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" style={{ width: '100%', marginBottom: 8 }} />
              <input type="date" value={scheduleEditForm.date} onChange={e => setScheduleEditForm(f => ({ ...f, date: e.target.value }))} style={{ width: '100%', marginBottom: 8 }} />
              <input type="text" value={scheduleEditForm.time} onChange={e => setScheduleEditForm(f => ({ ...f, time: e.target.value }))} placeholder="Time" style={{ width: '100%', marginBottom: 8 }} />
              <input type="number" value={scheduleEditForm.participants} onChange={e => setScheduleEditForm(f => ({ ...f, participants: e.target.value }))} placeholder="Participants" style={{ width: '100%', marginBottom: 8 }} />
              <Button type="submit" variant="contained" size="small" sx={{ mr: 1 }}>Add</Button>
              <Button variant="outlined" size="small" onClick={closeModal}>Cancel</Button>
            </form>
          ))}>Add New Tour</Button>
          <Grid container spacing={2}>
            {tours.map((tour, idx) => (
              <Grid key={idx} columns={12}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, background: '#fffde7' }}>
                  <CardContent>
                    {scheduleEditIdx === idx ? (
                      <form onSubmit={e => {
                        e.preventDefault();
                        setTours(tours => tours.map((t, i) => i === idx ? { ...scheduleEditForm, participants: Number(scheduleEditForm.participants) } : t));
                        setScheduleEditIdx(null);
                        closeModal();
                      }}>
                        <Typography variant="h6">Edit Tour</Typography>
                        <input type="text" value={scheduleEditForm.title} onChange={e => setScheduleEditForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" style={{ width: '100%', marginBottom: 8 }} />
                        <input type="date" value={scheduleEditForm.date} onChange={e => setScheduleEditForm(f => ({ ...f, date: e.target.value }))} style={{ width: '100%', marginBottom: 8 }} />
                        <input type="text" value={scheduleEditForm.time} onChange={e => setScheduleEditForm(f => ({ ...f, time: e.target.value }))} placeholder="Time" style={{ width: '100%', marginBottom: 8 }} />
                        <input type="number" value={scheduleEditForm.participants} onChange={e => setScheduleEditForm(f => ({ ...f, participants: e.target.value }))} placeholder="Participants" style={{ width: '100%', marginBottom: 8 }} />
                        <Button type="submit" variant="contained" size="small" sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" size="small" onClick={() => setScheduleEditIdx(null)}>Cancel</Button>
                      </form>
                    ) : (
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6">{tour.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {tour.date} at {tour.time} • {tour.participants} participants
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" size="small" onClick={() => {
                            setScheduleEditIdx(idx);
                            setScheduleEditForm({
                              title: tour.title,
                              date: tour.date,
                              time: tour.time,
                              participants: tour.participants
                            });
                          }} sx={{ transition: 'transform 0.12s, box-shadow 0.12s, background 0.12s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 18px rgba(0,0,0,0.12)', background: '#e3f2fd', color: '#0f4c81' } }}>Edit</Button>
                          <Button variant="outlined" size="small" color="error" onClick={() => {
                            setTours(tours => tours.filter((_, i) => i !== idx));
                          }} sx={{ '&:hover': { background: '#ffebee', color: '#c62828' } }}>Cancel</Button>
                          <Button variant="outlined" size="small" color="warning" onClick={() => {
                            setTours(tours => tours.filter((_, i) => i !== idx));
                          }} sx={{ '&:hover': { background: '#fff3e0', color: '#e65100' } }}>Delete</Button>
                        </Stack>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 3 && (
        <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Popular Destinations</Typography>
          <Grid container spacing={2}>
            {popularDestinations.map((dest, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 4' }}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, background: '#fffde7' }}>
                  <CardContent>
                    <Typography variant="h6">{dest.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{dest.location}</Typography>
                    <Chip 
                      label={`${dest.bookings} bookings this month`} 
                      color="secondary" 
                      size="small" 
                      sx={{ mt: 1, background: '#0288d1', color: '#fff' }} 
                    />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block', transition: 'transform 0.12s, box-shadow 0.12s, background 0.12s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', background: '#f3f3f3' } }}
                      onClick={() => openModal('Create Tour', '', null, (
                        <form onSubmit={e => {
                          e.preventDefault();
                          setTours(tours => [...tours, {
                            title: `Tour to ${dest.name}`,
                            date: '',
                            time: '',
                            participants: 0
                          }]);
                          closeModal();
                        }}>
                          <Typography variant="h6">Create Tour for {dest.name}</Typography>
                          <input type="text" placeholder="Title" defaultValue={`Tour to ${dest.name}`} style={{ width: '100%', marginBottom: 8 }} disabled />
                          <input type="date" style={{ width: '100%', marginBottom: 8 }} />
                          <input type="text" placeholder="Time" style={{ width: '100%', marginBottom: 8 }} />
                          <input type="number" placeholder="Participants" style={{ width: '100%', marginBottom: 8 }} />
                          <Button type="submit" variant="contained" size="small" sx={{ mr: 1, transition: 'transform 0.12s, box-shadow 0.12s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.14)' } }}>Create</Button>
                          <Button variant="outlined" size="small" onClick={closeModal} sx={{ transition: 'background 0.12s', '&:hover': { background: '#f3f3f3' } }}>Cancel</Button>
                        </form>
                      ))}
                    >
                      Create Tour
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Cultural Facts</Typography>
          <Grid container spacing={2}>
            {culturalFacts.slice(4, 8).map((fact, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 6' }}>
                <Card sx={{ p: 2, borderRadius: 3, boxShadow: 1, background: '#fffde7' }}>
                  <Typography variant="body1" sx={{ color: '#333' }}>{fact}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 4 && (
        <Box sx={{ background: '#f6f8fa', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Guide Resources</Typography>
          <Grid container spacing={2}>
            {guideResources.map((resource, idx) => (
              <Grid key={idx} columns={12} style={{ gridColumn: 'span 4' }}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, background: '#fffde7' }}>
                  <CardContent>
                    <Typography variant="h6">{resource.title}</Typography>
                    <Chip label={resource.type} color="primary" size="small" sx={{ mt: 1 }} />
                    <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block', transition: 'transform 0.12s, box-shadow 0.12s, background 0.12s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', background: '#f3f3f3' } }}
                      onClick={() => openModal('Access Resource', '', null, (
                        <Box>
                          <Typography variant="body1">Resource: {resource.title}</Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>Type: {resource.type}</Typography>
                          <Button variant="contained" sx={{ mr: 1, transition: 'transform 0.12s, box-shadow 0.12s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.14)' } }} onClick={() => window.open('https://en.wikipedia.org/wiki/Indian_culture', '_blank')}>Open Reference</Button>
                          <Button variant="outlined" onClick={closeModal} sx={{ transition: 'background 0.12s', '&:hover': { background: '#f3f3f3' } }}>Close</Button>
                        </Box>
                      ))}
                    >
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Quick Tools</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained" onClick={() => openModal('Weather Check', '', null, (
              <Box>
                <Typography variant="body1">Check the latest weather updates for your tour locations.</Typography>
                <Button variant="contained" sx={{ mt: 1, transition: 'transform 0.12s, box-shadow 0.12s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.14)' } }} onClick={() => window.open('https://www.accuweather.com/en/in/india-weather', '_blank')}>Open Weather</Button>
                <Button variant="outlined" sx={{ mt: 1, ml: 1, transition: 'background 0.12s', '&:hover': { background: '#f3f3f3' } }} onClick={closeModal}>Close</Button>
              </Box>
            ))}>Weather Check</Button>
            <Button variant="contained" onClick={() => openModal('Emergency Contacts', '', null, (
              <Box>
                <Typography variant="body1">Emergency contacts:</Typography>
                <ul>
                  <li>Police: 100</li>
                  <li>Ambulance: 102</li>
                  <li>Fire: 101</li>
                  <li>Tourist Helpline: 1363</li>
                </ul>
                <Button variant="outlined" sx={{ mt: 1, transition: 'background 0.12s', '&:hover': { background: '#f3f3f3' } }} onClick={closeModal}>Close</Button>
              </Box>
            ))}>Emergency Contacts</Button>
            {/* Tourist Information quick-tool removed */}
          </Stack>
        </Box>
      )}
      {tab === 5 && (
        <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
          <Card sx={{ maxWidth: 700, mx: 'auto', mt: 2, boxShadow: 3, borderRadius: 3, background: '#fffde7' }}>
            <CardContent>
              {profileEdit ? (
                <form onSubmit={e => {
                  e.preventDefault();
                  // persist to localStorage currentUser
                  try {
                    // when saving, only persist gmail addresses; clear others
                    const toSave = { ...profileForm };
                    if (toSave.email && !/^[^@\s]+@gmail\.com$/i.test(toSave.email)) {
                      toSave.email = '';
                    }
                    localStorage.setItem('currentUser', JSON.stringify(toSave));
                    // also try to update registeredUsers array if exists
                    const reg = localStorage.getItem('registeredUsers');
                    if (reg) {
                      const users = JSON.parse(reg);
                      const idx = users.findIndex(u => u.email === toSave.email);
                      if (idx >= 0) {
                        users[idx] = { ...users[idx], ...toSave };
                        localStorage.setItem('registeredUsers', JSON.stringify(users));
                      }
                    }
                  } catch (err) {
                    console.warn('Failed to persist profile', err);
                  }
                  setProfileEdit(false);
                }}>
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 140 }}>
                      <Avatar src={profileForm.avatar} sx={{ width: 120, height: 120, mb: 1, cursor: 'pointer' }} onClick={() => avatarInputRef.current && avatarInputRef.current.click()} />
                      <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                      <Button variant="outlined" size="small" onClick={() => avatarInputRef.current && avatarInputRef.current.click()}>Choose picture</Button>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <input type="text" value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                      <input type="email" value={profileForm.email} onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                      <input type="tel" value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone" style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                      <input type="text" value={profileForm.location} onChange={e => setProfileForm(f => ({ ...f, location: e.target.value }))} placeholder="Location" style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                      <select value={profileForm.gender} onChange={e => setProfileForm(f => ({ ...f, gender: e.target.value }))} style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <input type="date" value={profileForm.dob} onChange={e => setProfileForm(f => ({ ...f, dob: e.target.value }))} style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                      <textarea value={profileForm.bio} onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))} placeholder="Bio" rows={3} style={{ width: '100%', marginBottom: 8, padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </Box>
                  </Box>
                  <Button type="submit" variant="contained" size="small" sx={{ mr: 1 }}>Save</Button>
                  <Button variant="outlined" size="small" onClick={() => setProfileEdit(false)}>Cancel</Button>
                </form>
              ) : (
                <>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Avatar src={profileForm.avatar} sx={{ width: 120, height: 120, cursor: 'pointer' }} onClick={() => avatarInputRef.current && avatarInputRef.current.click()} />
                    <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>{profileForm.name}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Email: {profileForm.email}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Phone: {profileForm.phone}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Location: {profileForm.location}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>Gender: {profileForm.gender}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>DOB: {profileForm.dob}</Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>Bio: {profileForm.bio}</Typography>
                      <Button variant="outlined" size="small" onClick={() => setProfileEdit(true)} sx={{ transition: 'background 0.12s, color 0.12s, transform 0.12s', '&:hover': { background: '#e3f2fd', color: '#0f4c81', transform: 'translateY(-2px)' } }}>Edit</Button>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
      {modal.open && (
        <Dialog open={modal.open} onClose={closeModal} maxWidth="sm" fullWidth>
          <DialogTitle>{modal.title}</DialogTitle>
          <DialogContent>
            {modal.custom ? modal.custom : <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>{modal.content}</Typography>}
          </DialogContent>
          {!modal.custom && (
            <DialogActions>
              <Button onClick={closeModal}>Close</Button>
              {modal.actions}
            </DialogActions>
          )}
        </Dialog>
      )}
    </div>
  );
}

export default TourGuideDashboard;

// Tourist contacts context
const TouristContactsContext = React.createContext();

function ContactInfoForm({ showContacts }) {
  const [form, setForm] = React.useState({ name: '', phone: '', email: '' });
  const { contacts, setContacts } = React.useContext(TouristContactsContext);
  return (
    <Box sx={{ mt: 2 }}>
      <form
        onSubmit={e => {
          e.preventDefault();
          setContacts(c => [...c, form]);
          setForm({ name: '', phone: '', email: '' });
        }}
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          required
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <Button type="submit" variant="contained" size="small">Add</Button>
      </form>
    </Box>
  );
}

function TouristContactsList() {
  const { contacts } = React.useContext(TouristContactsContext);
  if (!contacts.length) return null;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Saved Contacts:</Typography>
      <ul style={{ paddingLeft: 16 }}>
        {contacts.map((c, i) => (
          <li key={i}>{c.name} - {c.phone} - {c.email}</li>
        ))}
      </ul>
    </Box>
  );
}


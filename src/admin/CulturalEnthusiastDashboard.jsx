import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box, Tabs, Tab, Chip, Avatar, Stack, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import './Admin.css';

const trendingMonuments = [
  { name: 'Taj Mahal', type: 'Monument', image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg' },
  { name: 'Red Fort', type: 'Fort', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Red_Fort.jpg' },
];
const trendingFestivals = [
  { name: 'Diwali', type: 'Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Diwali_lights.jpg' },
  { name: 'Holi', type: 'Festival', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Holi_festival.jpg' },
];
const trendingTraditions = [
  { name: 'Yoga', type: 'Tradition', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Yoga_pose.jpg' },
];
const suggestedTours = [
  { name: 'Virtual Taj Mahal Tour', url: '#', image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg' },
  { name: 'Red Fort 360°', url: '#', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Red_Fort.jpg' },
];
const learningResources = [
  { title: 'History of Indian Temples', type: 'Article' },
  { title: 'Classical Dances of India', type: 'Video' },
  { title: 'On this day: Dandi March', type: 'Highlight' },
];
const badges = [
  { label: 'Tour Explorer', color: 'primary' },
  { label: 'Discussion Leader', color: 'success' },
  { label: 'Culture Guru', color: 'warning' },
];

function CulturalEnthusiastDashboard() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (e, newValue) => setTab(newValue);

  return (
    <div className="enthusiast-dashboard">
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5">Welcome, Cultural Enthusiast!</Typography>
      </Box>
      <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
        <Tab label="Dashboard" />
        <Tab label="Explore Heritage" />
        <Tab label="Virtual Tours" />
        <Tab label="Discussions" />
        <Tab label="Learning" />
        <Tab label="Profile" />
      </Tabs>
      {tab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Trending Now</Typography>
          <Grid container columns={12} spacing={2}>
            {[...trendingMonuments, ...trendingFestivals, ...trendingTraditions].map((item, idx) => (
              <Grid gridColumn="span 4" key={idx}>
                <Card>
                  <CardContent>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>{item.name}</Typography>
                    <Chip label={item.type} color="primary" size="small" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ mt: 3 }}>Suggested Virtual Tours</Typography>
          <Grid container columns={12} spacing={2}>
            {suggestedTours.map((tour, idx) => (
              <Grid gridColumn="span 4" key={idx}>
                <Card>
                  <CardContent>
                    <img src={tour.image} alt={tour.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>{tour.name}</Typography>
                    <Button variant="outlined" href={tour.url} sx={{ mt: 1 }}>Join Tour</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Explore Heritage</Typography>
          <Button component={Link} to="/monuments" variant="contained" sx={{ mr: 2 }}>Browse Monuments</Button>
          <Button component={Link} to="/culture" variant="contained">Browse Traditions</Button>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Search and filter options coming soon!</Typography>
          </Box>
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Virtual Tours</Typography>
          <Typography variant="body1">Join immersive 360° tours of famous monuments and places. (Feature coming soon!)</Typography>
        </Box>
      )}
      {tab === 3 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Cultural Discussions</Typography>
          <Typography variant="body1">Participate in community discussions, share stories, and comment on posts. (Feature coming soon!)</Typography>
        </Box>
      )}
      {tab === 4 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Learning Resources</Typography>
          <Grid container columns={12} spacing={2}>
            {learningResources.map((res, idx) => (
              <Grid gridColumn="span 4" key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{res.title}</Typography>
                    <Chip label={res.type} color="secondary" size="small" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {tab === 5 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Profile & Badges</Typography>
          <Typography variant="body1">See your tours, discussions, and achievements here. (Feature coming soon!)</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {badges.map(badge => (
              <Chip key={badge.label} label={badge.label} color={badge.color} />
            ))}
          </Stack>
        </Box>
      )}
    </div>
  );
}

export default CulturalEnthusiastDashboard;

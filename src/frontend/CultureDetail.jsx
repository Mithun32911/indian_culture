import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { culturalData } from '../database/data.js';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useUserProgress } from '../context/UserProgressContext';


// Use public folder paths for images
const imageGalleryMap = {
  Diwali: ['/diwali.jpg', '/diwali2.jpg'],
  Holi: ['/holi.jpg', '/holi2.png'],
  'Classical Dance Forms': ['/classical.png', '/classical2.png'],
  'Yoga and Meditation': ['/yoga.png', '/yoga2.png'],
  'Ganesh Chaturthi': ['/ganesh.png', '/ganesh2.png'],
  Ayurveda: ['/ayurveda.png', '/ayurveda2.png'],
};

export default function CultureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = culturalData.find((c) => c.id === Number(id));
  const { addFavorite, removeFavorite, isFavorite } = useUserProgress();

  if (!item) {
    return <Typography variant="h6">Item not found.</Typography>;
  }

  // Add extra info for each item

  const extraInfo = {
    Diwali: {
      funFact: "Diwali is celebrated by lighting millions of lamps and bursting fireworks across India.",
      history: "Diwali has roots in ancient Hindu mythology, marking Lord Rama's return to Ayodhya after defeating Ravana.",
      tips: "Try making rangoli designs and sharing sweets with friends and neighbors!",
      timeline: [
        {
          era: "Ancient Times",
          description: "Diwali was originally celebrated as a harvest festival and is mentioned in ancient scriptures like the Ramayana."
        },
        {
          era: "Medieval Period",
          description: "The festival became associated with Lakshmi, the goddess of wealth, and expanded to include elaborate rituals and prayers."
        },
        {
          era: "Modern Era",
          description: "Diwali is now a pan-Indian festival celebrated with lights, fireworks, gifts, and community events. Eco-friendly practices are increasingly promoted."
        }
      ]
    },
    Holi: {
      funFact: "Holi is known as the 'Festival of Colors' and is famous for its playful water and color fights.",
      history: "Holi celebrates the legend of Prahlad and Holika, symbolizing the victory of good over evil.",
      tips: "Wear old clothes and use natural colors to protect your skin. Join a local Holi party for the best experience!",
      timeline: [
        {
          era: "Ancient Times",
          description: "Holi's origins are found in Hindu mythology, with rituals described in Puranas and ancient texts."
        },
        {
          era: "Medieval Period",
          description: "Holi became a social festival, celebrated in royal courts and villages with music and dance."
        },
        {
          era: "Modern Era",
          description: "Holi is now a global celebration, with color runs and parties held worldwide. Awareness of safe and natural colors is growing."
        }
      ]
    },
    "Classical Dance Forms": {
      funFact: "Bharatanatyam is one of the oldest classical dances, originating in Tamil Nadu.",
      history: "Indian classical dances have evolved over centuries, often performed in temples as spiritual offerings.",
      tips: "Attend a live performance or try a beginner workshop to appreciate the art form.",
      timeline: [
        {
          era: "Ancient Times",
          description: "Dance forms like Bharatanatyam and Kathak were performed in temples as part of religious rituals."
        },
        {
          era: "Colonial Period",
          description: "Many dance traditions faced decline but were revived by cultural reformers and artists."
        },
        {
          era: "Modern Era",
          description: "Classical dances are now taught in schools and performed on global stages, preserving India's heritage."
        }
      ]
    },
    "Yoga and Meditation": {
      funFact: "Yoga is practiced by millions worldwide and has its origins in ancient India.",
      history: "Yoga and meditation are mentioned in ancient texts like the Vedas and Upanishads.",
      tips: "Start with simple breathing exercises and basic yoga poses for daily wellness.",
      timeline: [
        {
          era: "Ancient Times",
          description: "Yoga was developed as a spiritual discipline, with practices described in the Vedas and Upanishads."
        },
        {
          era: "20th Century",
          description: "Yoga spread globally, with gurus introducing it to the West and scientific studies validating its benefits."
        },
        {
          era: "Present Day",
          description: "Yoga and meditation are mainstream, with International Yoga Day celebrated worldwide."
        }
      ]
    },
    "Ganesh Chaturthi": {
      funFact: "Giant clay idols of Lord Ganesha are immersed in water at the end of the festival.",
      history: "Ganesh Chaturthi became a public festival in Maharashtra thanks to freedom fighter Lokmanya Tilak.",
      tips: "Visit a local pandal to see creative Ganesha idols and join the community celebrations.",
      timeline: [
        {
          era: "Ancient Times",
          description: "Ganesh Chaturthi was celebrated privately in homes and temples."
        },
        {
          era: "Colonial Period",
          description: "Lokmanya Tilak popularized public celebrations to unite people against colonial rule."
        },
        {
          era: "Modern Era",
          description: "The festival features large processions, creative idols, and environmental awareness campaigns."
        }
      ]
    },
    Ayurveda: {
      funFact: "Ayurveda uses over 600 medicinal herbs and natural ingredients for healing.",
      history: "Ayurveda is one of the world's oldest holistic healing systems, dating back over 3,000 years.",
      tips: "Try herbal teas and balanced diets for a taste of Ayurvedic wellness.",
      timeline: [
        {
          era: "Ancient Times",
          description: "Ayurveda was developed by sages and documented in texts like Charaka Samhita and Sushruta Samhita."
        },
        {
          era: "Medieval Period",
          description: "Ayurveda was practiced in royal courts and villages, with new formulations and treatments."
        },
        {
          era: "Modern Era",
          description: "Ayurveda is now integrated with modern medicine, with global interest in natural healing."
        }
      ]
    }
  };

  const details = extraInfo[item.name];

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: 'auto', bgcolor: 'transparent', p: { xs: 2, md: 4 }, m: 0 }}>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          position: 'absolute',
          right: 0,
          top: 0,
          minWidth: '72px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: '#1976d2',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#115293' }
        }}
      >
        Back
      </Button>
      <Card sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', boxShadow: 6, borderRadius: 4, bgcolor: '#ffffff', p: { xs: 2, md: 4 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h3" gutterBottom sx={{ color: '#1565c0', fontWeight: 700 }}>{item.name}</Typography>
            {isFavorite({ id: item.id, type: 'culture' }) ? (
              <Button variant="outlined" color="secondary" onClick={() => removeFavorite({ id: item.id, type: 'culture' })}>Unfav</Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => addFavorite({ id: item.id, type: 'culture', name: item.name })}>Fav</Button>
            )}
          </Box>
          {/* Image Gallery */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {(imageGalleryMap[item.name] || ['/india.png', '/india2.png']).map((imgSrc, idx) => (
              <Box key={idx} sx={{ width: '45%', maxWidth: 400, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', background: '#f5f5f5' }}>
                <img
                  src={imgSrc}
                  alt={item.name + ' image ' + (idx + 1)}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                />
              </Box>
            ))}
          </Box>
          <Typography variant="body1" sx={{ mb: 2, fontSize: 18 }}>{item.description}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Region:</strong> {item.region}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Season:</strong> {item.season}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}><strong>Significance:</strong> {item.significance}</Typography>
          {details && (
            <Box sx={{ mt: 3, p: 3, background: '#fffde7', borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#fbc02d', fontWeight: 600 }}>Fun Fact</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{details.funFact}</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#43a047', fontWeight: 600 }}>Historical Background</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{details.history}</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 600 }}>Tips for Experiencing</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>{details.tips}</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#6d4c41', fontWeight: 600 }}>Timeline: From History to Now</Typography>
              <Box sx={{ pl: 2 }}>
                {details.timeline.map((step, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#8d6e63', fontWeight: 500 }}><strong>{step.era}:</strong></Typography>
                    <Typography variant="body2">{step.description}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

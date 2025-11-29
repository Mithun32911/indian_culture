import React from 'react';
import './HeritageDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { monumentData } from '../database/data.js';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';

const imageMap = {
  'Taj Mahal': '/tajmahal.jpg',
  'Red Fort': '/redfort.jpg',
  'Qutub Minar': '/qutubminar.jpg',
  'Gateway of India': '/gateway.jpg',
  'Ajanta and Ellora Caves': '/ajantaellora.jpg',
  'Hawa Mahal': '/hawamahal.jpg'
};

export default function HeritageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = monumentData.find((m) => m.id === Number(id));

  if (!item) {
    return <Typography variant="h6">Heritage site not found.</Typography>;
  }

  // Example of more detailed info for each monument
  const monumentDetails = {
    'Taj Mahal': {
      history: 'Commissioned in 1632 by the Mughal emperor Shah Jahan, the Taj Mahal was built to house the tomb of his favorite wife, Mumtaz Mahal. It is regarded as the jewel of Muslim art in India and a universally admired masterpiece.',
      architecture: 'The Taj Mahal combines elements from Islamic, Persian, Ottoman Turkish, and Indian architectural styles. Its white marble dome is iconic, and the gardens are laid out in the charbagh style.',
      funFact: 'The color of the Taj Mahal appears to change depending on the time of day.'
    },
    'Red Fort': {
      history: 'Built by Shah Jahan in the mid-17th century, the Red Fort served as the main residence of the Mughal emperors. It is a symbol of India’s sovereignty, with the Prime Minister hoisting the national flag here every Independence Day.',
      architecture: 'The fort is known for its massive enclosing walls of red sandstone and its intricate marble decorations.',
      funFact: 'The fort was once adorned with precious stones and silver, which were looted during invasions.'
    },
    'Qutub Minar': {
      history: 'Construction of the Qutub Minar was started by Qutb-ud-din Aibak in 1192 and completed by his successor Iltutmish. It marks the beginning of Muslim rule in India.',
      architecture: 'The minaret is made of red sandstone and marble, with intricate carvings and verses from the Quran.',
      funFact: 'It is the tallest brick minaret in the world at 73 meters.'
    },
    'Gateway of India': {
      history: 'Built in 1924 to commemorate the visit of King George V and Queen Mary to Mumbai, the Gateway of India is a major tourist attraction and a symbol of the city.',
      architecture: 'The monument is built in the Indo-Saracenic style, combining elements of Hindu and Muslim architectural styles.',
      funFact: 'The last British troops left India through this gateway in 1948.'
    },
    'Ajanta and Ellora Caves': {
      history: 'The Ajanta and Ellora caves are rock-cut cave monuments dating from the 2nd century BCE to about 480 CE. They are famous for their ancient Buddhist, Hindu, and Jain temples and monasteries.',
      architecture: 'The caves feature exquisite sculptures, paintings, and carvings, representing the finest examples of ancient Indian art.',
      funFact: 'The Ajanta caves were rediscovered by a British officer in 1819 while hunting.'
    },
    'Hawa Mahal': {
      history: 'Built in 1799 by Maharaja Sawai Pratap Singh, the Hawa Mahal was designed to allow royal ladies to observe street festivals while remaining unseen from the outside.',
      architecture: 'The palace is constructed of red and pink sandstone, with 953 small windows called jharokhas.',
      funFact: 'The structure resembles a honeycomb and is known as the "Palace of Winds".'
    }
  };

  const details = monumentDetails[item.name];

  return (
    <Box className="heritage-bg" sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
  <Card sx={{ bgcolor: '#fff', boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>{item.name}</Typography>
          <img 
            src={imageMap[item.name] || '/india.png'} 
            alt={item.name} 
            style={{ width: '100%', maxHeight: 350, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>{item.description}</Typography>
          <Typography variant="subtitle1"><strong>Location:</strong> {item.location}</Typography>
          <Typography variant="subtitle1"><strong>Built:</strong> {item.built}</Typography>
          <Typography variant="subtitle1"><strong>Builder:</strong> {item.builder}</Typography>
          <Typography variant="subtitle1"><strong>Entry Fee:</strong> {item.entryFee}</Typography>
          {details && (
            <Box sx={{ mt: 3, p: 2, background: '#fffde7', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>History</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{details.history}</Typography>
              <Typography variant="h6" gutterBottom>Architecture</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{details.architecture}</Typography>
              <Typography variant="h6" gutterBottom>Fun Fact</Typography>
              <Typography variant="body2">{details.funFact}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

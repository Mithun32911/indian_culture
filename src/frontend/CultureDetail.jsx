import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { culturalData } from '../database/data.js';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useUserProgress } from '../context/UserProgressContext';
import { useTranslation } from 'react-i18next';


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
  const { t } = useTranslation();

  if (!item) {
    return <Typography variant="h6">{t('culturePage.no_results')}</Typography>;
  }

  // Localized extra info for each item using i18n keys
  const extraInfo = {
    Diwali: {
      funFact: t('cultureDetail.Diwali.funFact'),
      history: t('cultureDetail.Diwali.history'),
      tips: t('cultureDetail.Diwali.tips'),
      timeline: [
        { era: t('cultureDetail.Diwali.timeline.0.era'), description: t('cultureDetail.Diwali.timeline.0.description') },
        { era: t('cultureDetail.Diwali.timeline.1.era'), description: t('cultureDetail.Diwali.timeline.1.description') },
        { era: t('cultureDetail.Diwali.timeline.2.era'), description: t('cultureDetail.Diwali.timeline.2.description') }
      ]
    },
    Holi: {
      funFact: t('cultureDetail.Holi.funFact'),
      history: t('cultureDetail.Holi.history'),
      tips: t('cultureDetail.Holi.tips'),
      timeline: [
        { era: t('cultureDetail.Holi.timeline.0.era'), description: t('cultureDetail.Holi.timeline.0.description') },
        { era: t('cultureDetail.Holi.timeline.1.era'), description: t('cultureDetail.Holi.timeline.1.description') },
        { era: t('cultureDetail.Holi.timeline.2.era'), description: t('cultureDetail.Holi.timeline.2.description') }
      ]
    },
    'Classical Dance Forms': {
      funFact: t('cultureDetail.ClassicalDance.funFact'),
      history: t('cultureDetail.ClassicalDance.history'),
      tips: t('cultureDetail.ClassicalDance.tips'),
      timeline: [
        { era: t('cultureDetail.ClassicalDance.timeline.0.era'), description: t('cultureDetail.ClassicalDance.timeline.0.description') },
        { era: t('cultureDetail.ClassicalDance.timeline.1.era'), description: t('cultureDetail.ClassicalDance.timeline.1.description') },
        { era: t('cultureDetail.ClassicalDance.timeline.2.era'), description: t('cultureDetail.ClassicalDance.timeline.2.description') }
      ]
    },
    'Yoga and Meditation': {
      funFact: t('cultureDetail.Yoga.funFact'),
      history: t('cultureDetail.Yoga.history'),
      tips: t('cultureDetail.Yoga.tips'),
      timeline: [
        { era: t('cultureDetail.Yoga.timeline.0.era'), description: t('cultureDetail.Yoga.timeline.0.description') },
        { era: t('cultureDetail.Yoga.timeline.1.era'), description: t('cultureDetail.Yoga.timeline.1.description') },
        { era: t('cultureDetail.Yoga.timeline.2.era'), description: t('cultureDetail.Yoga.timeline.2.description') }
      ]
    },
    'Ganesh Chaturthi': {
      funFact: t('cultureDetail.Ganesh.funFact'),
      history: t('cultureDetail.Ganesh.history'),
      tips: t('cultureDetail.Ganesh.tips'),
      timeline: [
        { era: t('cultureDetail.Ganesh.timeline.0.era'), description: t('cultureDetail.Ganesh.timeline.0.description') },
        { era: t('cultureDetail.Ganesh.timeline.1.era'), description: t('cultureDetail.Ganesh.timeline.1.description') },
        { era: t('cultureDetail.Ganesh.timeline.2.era'), description: t('cultureDetail.Ganesh.timeline.2.description') }
      ]
    },
    Ayurveda: {
      funFact: t('cultureDetail.Ayurveda.funFact'),
      history: t('cultureDetail.Ayurveda.history'),
      tips: t('cultureDetail.Ayurveda.tips'),
      timeline: [
        { era: t('cultureDetail.Ayurveda.timeline.0.era'), description: t('cultureDetail.Ayurveda.timeline.0.description') },
        { era: t('cultureDetail.Ayurveda.timeline.1.era'), description: t('cultureDetail.Ayurveda.timeline.1.description') },
        { era: t('cultureDetail.Ayurveda.timeline.2.era'), description: t('cultureDetail.Ayurveda.timeline.2.description') }
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
        {t('nav.back')}
      </Button>
      <Card sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', boxShadow: 6, borderRadius: 4, bgcolor: '#ffffff', p: { xs: 2, md: 4 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h3" gutterBottom sx={{ color: '#1565c0', fontWeight: 700 }}>{item.name}</Typography>
            {isFavorite({ id: item.id, type: 'culture' }) ? (
              <Button variant="outlined" color="secondary" onClick={() => removeFavorite({ id: item.id, type: 'culture' })}>{t('culturePage.unfavorite')}</Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => addFavorite({ id: item.id, type: 'culture', name: item.name })}>{t('culturePage.favorite')}</Button>
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
            <Typography variant="body1" sx={{ mb: 2, fontSize: 18 }}>{t(`content.culture.${item.id}.description`, item.description)}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>{t('culturePage.region')}:</strong> {t(`content.culture.${item.id}.region`, item.region)}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>{t('culturePage.season')}:</strong> {t(`content.culture.${item.id}.season`, item.season)}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}><strong>{t('culturePage.dialog_significance')}:</strong> {t(`content.culture.${item.id}.significance`, item.significance)}</Typography>
          {details && (
            <Box sx={{ mt: 3, p: 3, background: '#fffde7', borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#fbc02d', fontWeight: 600 }}>{t('culturePage.fun_fact')}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{details.funFact}</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#43a047', fontWeight: 600 }}>{t('culturePage.historical_background')}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{details.history}</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 600 }}>{t('culturePage.tips_for_experiencing')}</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>{details.tips}</Typography>
              <Typography variant="h6" gutterBottom sx={{ color: '#6d4c41', fontWeight: 600 }}>{t('culturePage.timeline_title')}</Typography>
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

import React from 'react';
import { Typography, Box } from '@mui/material';

function ArticlePreview({ article }) {
  if (!article) return <Typography>No article to preview.</Typography>;
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{article.title}</Typography>
      <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>{article.body}</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {article.images && article.images.map((img, idx) => (
          <img
            key={idx}
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
            alt="article-img"
            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ArticlePreview;

import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

function ArticleEditor({ article, onSave, onCancel }) {
  const [title, setTitle] = useState(article?.title || '');
  const [body, setBody] = useState(article?.body || '');
  const [images, setImages] = useState(article?.images || []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleSave = () => {
    onSave({ ...article, title, body, images });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, background: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Edit Article</Typography>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Body"
        fullWidth
        multiline
        minRows={6}
        value={body}
        onChange={e => setBody(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Upload Images
        <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
      </Button>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
            alt="article-img"
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
}

export default ArticleEditor;

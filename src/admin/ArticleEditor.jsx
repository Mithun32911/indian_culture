import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ArticleEditor({ article, onSave, onCancel }) {
  const { t } = useTranslation();
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
      <Typography variant="h5" sx={{ mb: 2 }}>{t('articleEditor.edit_title')}</Typography>
      <TextField
        label={t('articleEditor.title_label')}
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label={t('articleEditor.body_label')}
        fullWidth
        multiline
        minRows={6}
        value={body}
        onChange={e => setBody(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        {t('articleEditor.upload_images')}
        <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
      </Button>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
            alt={t('articleEditor.image_alt')}
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>{t('articleEditor.save')}</Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>{t('articleEditor.cancel')}</Button>
      </Box>
    </Box>
  );
}

export default ArticleEditor;

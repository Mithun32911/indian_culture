import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box, Tabs, Tab, Chip, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArticleEditor from './ArticleEditor';
import ArticlePreview from './ArticlePreview';
import './Admin.css';
import './ContentCreatorDashboard.css';
import { monumentData } from '../database/data';


// Default projects used for initial stats and initial content
const defaultProjects = [
  { title: 'Taj Mahal', type: 'Article', status: 'Published', body: 'A famous monument in India.', images: [] },
  { title: 'Diwali Festival', type: 'Video', status: 'Draft', video: null, videoDesc: 'Festival of lights.' },
  { title: 'Holi Gallery', type: 'Photography', status: 'Published', images: [], galleryDesc: 'Colors of Holi.' }
];

function getInitialProjects() {
  try {
    const stored = localStorage.getItem('creatorProjects');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map((p, idx) => ({
          id: p.id || `saved-${idx}-${Date.now()}`,
          createdAt: p.createdAt || Date.now(),
          type: p.type || 'Article',
          title: p.title || 'Untitled',
          status: p.status || 'Draft',
          body: p.body || '',
          video: p.video || null,
          videoDesc: p.videoDesc || '',
          images: p.images || [],
          galleryDesc: p.galleryDesc || ''
        }));
      }
    }
  } catch {
    // ignore parse errors and fall back to defaults
  }
  // Ensure default projects have ids and createdAt
  return defaultProjects.map((p, idx) => ({ id: p.id || `def-${idx}`, createdAt: p.createdAt || Date.now(), ...p }));
}

function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}

function getInitialStats() {
  const data = localStorage.getItem('creatorStats');
  if (data) return JSON.parse(data);
  // Default stats based on defaultProjects
  return {
    articles: defaultProjects.filter(p => p.type === 'Article').length,
    videos: defaultProjects.filter(p => p.type === 'Video').length,
    galleries: defaultProjects.filter(p => p.type === 'Photography').length,
    views: 15200
  };
}

const contentIdeas = [
  {
    title: 'Rajasthani Folk Art',
    category: 'Traditional Arts',
    suggestedType: 'Article',
    description: 'Explore the colorful textile traditions, puppetry, and folk music of Rajasthan. This topic can cover historical origins, artisans, regional styles, and how these arts are kept alive today.'
  },
  {
    title: 'Goa\'s Portuguese Heritage',
    category: 'Colonial History',
    suggestedType: 'Article',
    description: 'Document the colonial-era architecture, cuisine, and syncretic traditions that make Goa unique. Include notable monuments, festivals, and cultural influences that persist in daily life.'
  },
  {
    title: 'Himalayan Monasteries',
    category: 'Spiritual Sites',
    suggestedType: 'Photography',
    description: 'Capture the serene monasteries, monastic life, and mountain landscapes. Suggested angles: architecture, ritual photography, interviews with caretakers, and seasonal insights.'
  },
];

function ContentCreatorDashboard() {
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tab, setTab] = useState(0);
  const [projects, setProjects] = useState(getInitialProjects());
  const [stats, setStats] = useState(getInitialStats());
  const [newContent, setNewContent] = useState({ type: '', title: '', status: 'Draft', video: null, videoDesc: '', images: [], galleryDesc: '' });
  const [_createError, _setCreateError] = useState('');
  const [videoUploadOpen, setVideoUploadOpen] = useState(false);
  const [galleryUploadOpen, setGalleryUploadOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [galleryPreviewImages, setGalleryPreviewImages] = useState([]);
  const [createdObjectUrls, setCreatedObjectUrls] = useState([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [ideaModalOpen, setIdeaModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [_editingProjectId, _setEditingProjectId] = useState(null);
  const [_editingDraft, _setEditingDraft] = useState(null);
  const navigate = useNavigate();
  const [modalVideoPreviewUrl, setModalVideoPreviewUrl] = useState(null);
  const [modalGalleryPreviewImages, setModalGalleryPreviewImages] = useState([]);
  const [modalCreatedObjectUrls, setModalCreatedObjectUrls] = useState([]);

  useEffect(() => {
    localStorage.setItem('creatorProjects', JSON.stringify(projects));
    // Update stats
    const articles = projects.filter(p => p.type === 'Article').length;
    const videos = projects.filter(p => p.type === 'Video').length;
    const galleries = projects.filter(p => p.type === 'Photography').length;
    setStats(s => {
      const updated = { ...s, articles, videos, galleries };
      localStorage.setItem('creatorStats', JSON.stringify(updated));
      return updated;
    });
    // Publish shared contents for users: take published projects and save to sharedContents
    try {
      const published = projects
        .filter(p => p.status === 'Published')
        .map((p, idx) => ({
          id: p.id || `${Date.now()}-${idx}`,
          title: p.title,
          type: p.type,
          status: p.status,
          body: p.body || p.videoDesc || p.galleryDesc || '',
          images: p.images || [],
          createdAt: p.createdAt || Date.now()
        }));
      localStorage.setItem('sharedContents', JSON.stringify(published));
      // dispatch event so other parts of the app update immediately
      window.dispatchEvent(new CustomEvent('sharedContentsUpdated', { detail: published }));
    } catch (e) {
      // ignore serialization errors
      console.error('Error saving sharedContents', e);
    }
  }, [projects]);

  const _handleTabChange = (_, newValue) => setTab(newValue);

  const _handleCreateContent = (type) => {
    setNewContent({ type, title: '', status: 'Draft' });
    setTab(2); // Go to Create New tab
  };

  const _handleContentInput = (e) => {
    setNewContent({ ...newContent, title: e.target.value });
    _setCreateError('');
  };

  const _handleSaveContent = () => {
    if (!newContent.title.trim()) {
      _setCreateError('Title is required.');
      return;
    }
    setProjects(prev => [
      { ...newContent, status: 'Draft', id: genId(), createdAt: Date.now() },
      ...prev
    ]);
    setNewContent({ type: '', title: '', status: 'Draft' });
    _setCreateError('');
    setTab(1); // Go to My Content
  };

  // Add keyframes for gradient animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradientMove {
        0% {background-position:0% 50%}
        50% {background-position:100% 50%}
        100% {background-position:0% 50%}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Add keyframes for logout button gradient animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes logoutGradient {
        0% {background-position:0% 50%;}
        50% {background-position:100% 50%;}
        100% {background-position:0% 50%;}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      className="content-creator-dashboard custom-dashboard-bg"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(270deg, #e5dbbc)',
        backgroundSize: '1200% 1200%',
        animation: 'gradientMove 18s ease infinite'
      }}
    >
      {/* Navbar (moved below header so it appears under the studio title) */}
  <Box className="dashboard-header" sx={{ mb: 0, textAlign: 'center' }}>
        <Typography variant="h4" className="dashboard-title">Content Creator Studio 🎨</Typography>
        <Typography variant="body1" className="dashboard-subtitle">Create and share amazing heritage content</Typography>
      </Box>
  <nav className="dashboard-navbar">
    <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Button 
            color={tab === 0 ? "secondary" : "primary"}
            variant={tab === 0 ? "contained" : "text"}
            onClick={() => { setTab(0); navigate('/admin/content-creator-dashboard'); }} 
            sx={{ fontWeight: 600 }}
          >Dashboard</Button>
          <Button 
            color={tab === 1 ? "secondary" : "primary"}
            variant={tab === 1 ? "contained" : "text"}
            onClick={() => setTab(1)} 
            sx={{ fontWeight: 600 }}
          >My Content</Button>
          <Button 
            color={tab === 2 ? "secondary" : "primary"}
            variant={tab === 2 ? "contained" : "text"}
            onClick={() => setTab(2)} 
            sx={{ fontWeight: 600 }}
          >Create New</Button>
          <Button 
            color={tab === 3 ? "secondary" : "primary"}
            variant={tab === 3 ? "contained" : "text"}
            onClick={() => setTab(3)} 
            sx={{ fontWeight: 600 }}
          >Analytics</Button>
          <Button 
            color={tab === 4 ? "secondary" : "primary"}
            variant={tab === 4 ? "contained" : "text"}
            onClick={() => setTab(4)} 
            sx={{ fontWeight: 600 }}
          >Resources</Button>
          <Button 
            color={tab === 5 ? "secondary" : "primary"}
            variant={tab === 5 ? "contained" : "text"}
            onClick={() => setTab(5)} 
            sx={{ fontWeight: 600 }}
          >Settings</Button>
        </div>
        <div className="nav-logout">
          <Button
            variant="contained"
            color="error"
            sx={{
              fontWeight: 600,
              color: '#fff',
              border: 'none',
            }}
            onClick={() => navigate('/')}
          >
            Logout
          </Button>
        </div>
      </nav>
    
  <Box className="dashboard-content">
        {tab === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Content Overview</Typography>
            <Grid container spacing={3} className="dashboard-stats">
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.articles}</Typography><Typography variant="body2">Articles Published</Typography></Card></Grid>
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.videos}</Typography><Typography variant="body2">Videos Created</Typography></Card></Grid>
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.galleries}</Typography><Typography variant="body2">Galleries Created</Typography></Card></Grid>
              <Grid item xs={12} md={3}><Card className="stat-card"><Typography variant="h4" color="primary">{stats.views}</Typography><Typography variant="body2">Total Views</Typography></Card></Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: 'center' }}>Recent Projects</Typography>
            <Grid container spacing={2}>
              {projects.slice(0, 3).map((project, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card className="project-card">
                    <CardContent>
                      <Typography variant="h6">{project.title}</Typography>
                      <Chip label={project.type} color="primary" size="small" sx={{ mt: 1, mr: 1 }} />
                      <Chip label={project.status} color={project.status === 'Published' ? 'success' : 'warning'} size="small" sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {tab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>My Content Library</Typography>
            <Grid container spacing={2}>
              {projects.map((project, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Card className="project-card">
                    <CardContent>
                      <Typography variant="h6">{project.title}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip label={project.type} color="primary" size="small" />
                        <Chip label={project.status} color={project.status === 'Published' ? 'success' : 'warning'} size="small" />
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        {(project.type === 'Article' || project.type === 'Photography' || project.type === 'Video') && (
                          <Button variant="outlined" size="small" onClick={() => {
                            setSelectedArticle(project);
                            // Photography: build image object URLs for preview
                            if (project.type === 'Photography') {
                              const imgs = project.images || [];
                              const srcs = [];
                              const created = [];
                              imgs.forEach(img => {
                                if (typeof img === 'string') srcs.push(img);
                                else if (img && typeof URL !== 'undefined') {
                                  const u = URL.createObjectURL(img);
                                  srcs.push(u);
                                  created.push(u);
                                }
                              });
                              setGalleryPreviewImages(srcs);
                              setCreatedObjectUrls(created);
                            }
                            // Video: create object URL for uploaded File
                            if (project.type === 'Video') {
                              if (project.video && typeof project.video !== 'string' && typeof URL !== 'undefined') {
                                const u = URL.createObjectURL(project.video);
                                setVideoPreviewUrl(u);
                                setCreatedObjectUrls(prev => [...prev, u]);
                              } else if (typeof project.video === 'string') {
                                setVideoPreviewUrl(project.video);
                              }
                            }
                            setPreviewOpen(true);
                          }}>Preview</Button>
                        )}
                        <Button variant="outlined" size="small" onClick={() => window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(project.title), '_blank')}>Share</Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => {
                          setDeleteIdx(idx);
                          setShowDeleteDialog(true);
                        }}>Delete</Button>
                      </Stack>
                      {/* Delete Confirmation Dialog */}
            {showDeleteDialog && deleteIdx === idx && (
              <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ background: '#fff', p: 4, borderRadius: 2, boxShadow: 4, minWidth: 320, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Are you sure you want to delete "{project.title}"?</Typography>
                  <Button variant="contained" color="error" sx={{ mr: 2 }} onClick={() => {
                    setProjects(projects.filter((_, i) => i !== deleteIdx));
                    setShowDeleteDialog(false);
                    setDeleteIdx(null);
                  }}>Delete</Button>
                  <Button variant="outlined" color="primary" onClick={() => {
                    setShowDeleteDialog(false);
                    setDeleteIdx(null);
                  }}>Cancel</Button>
                </Box>
              </Box>
            )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* Article Editor Modal/Page */}
            {editorOpen && (
              <ArticleEditor
                article={selectedArticle}
                onSave={updated => {
                  setProjects(prev => prev.map(p => p === selectedArticle ? { ...updated, id: p.id || genId(), createdAt: p.createdAt || Date.now() } : p));
                  setEditorOpen(false);
                  setSelectedArticle(null);
                }}
                onCancel={() => {
                  setEditorOpen(false);
                  setSelectedArticle(null);
                }}
              />
            )}
            {/* Preview Modal/Page */}
            {previewOpen && selectedArticle?.type === 'Article' && (
              <>
                <ArticlePreview article={selectedArticle} />
                <Button sx={{ mt: 2 }} variant="outlined" color="secondary" onClick={() => setPreviewOpen(false)}>Close Preview</Button>
              </>
            )}

            {previewOpen && selectedArticle?.type === 'Photography' && (
              <>
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                  <Box sx={{ width: '100%', maxWidth: 900, maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>{selectedArticle.title} — Preview</Typography>
                    <Grid container spacing={2}>
                      {galleryPreviewImages.length === 0 ? (
                        <Typography variant="body2">No images available for this gallery.</Typography>
                      ) : galleryPreviewImages.map((src, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                          <Box sx={{ borderRadius: 1, overflow: 'hidden', boxShadow: 2 }}>
                            <img src={src} alt={`${selectedArticle.title}-${i}`} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                        <Button variant="outlined" color="secondary" onClick={() => {
                            // revoke created object URLs
                            createdObjectUrls.forEach(u => {
                              try { URL.revokeObjectURL(u); } catch { /* ignore */ }
                            });
                            setCreatedObjectUrls([]);
                            setGalleryPreviewImages([]);
                            setPreviewOpen(false);
                            setSelectedArticle(null);
                          }}>Close Preview</Button>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
            {previewOpen && selectedArticle?.type === 'Video' && (
              <>
                <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                  <Box sx={{ width: '100%', maxWidth: 900, maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>{selectedArticle.title} — Video Preview</Typography>
                    {videoPreviewUrl ? (
                      <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <video src={videoPreviewUrl} controls style={{ maxWidth: '100%', maxHeight: '60vh' }} />
                      </Box>
                    ) : (
                      <Typography variant="body2">No video file available for preview.</Typography>
                    )}
                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                      <Button variant="outlined" color="secondary" onClick={() => {
                        // revoke created object URLs including video
                        createdObjectUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { console.debug(e); } });
                        if (videoPreviewUrl && createdObjectUrls.indexOf(videoPreviewUrl) === -1) {
                          try { URL.revokeObjectURL(videoPreviewUrl); } catch (e) { console.debug(e); }
                        }
                        setCreatedObjectUrls([]);
                        setVideoPreviewUrl(null);
                        setPreviewOpen(false);
                        setSelectedArticle(null);
                      }}>Close Preview</Button>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
        {tab === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Create New Content</Typography>
            {/* Only show the selection cards if no form is open */}
            {!editorOpen && !videoUploadOpen && !galleryUploadOpen && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card className="create-card" sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h5">📝</Typography>
                    <Typography variant="h6">Article</Typography>
                    <Typography variant="body2">Write about heritage sites, traditions, and culture</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                      setSelectedArticle({ type: 'Article', title: '', body: '', images: [], status: 'Draft' });
                      setEditorOpen(true);
                    }}>Create Article</Button>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="create-card" sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h5">🎥</Typography>
                    <Typography variant="h6">Video</Typography>
                    <Typography variant="body2">Create documentaries and visual stories</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                      setNewContent({ type: 'Video', title: '', status: 'Draft', video: null, videoDesc: '' });
                      setVideoUploadOpen(true);
                    }}>Create Video</Button>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card className="create-card" sx={{ textAlign: 'center', p: 3 }}>
                    <Typography variant="h5">📸</Typography>
                    <Typography variant="h6">Photo Gallery</Typography>
                    <Typography variant="body2">Showcase heritage through photography</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => {
                      setNewContent({ type: 'Photography', title: '', status: 'Draft', images: [], galleryDesc: '' });
                      setGalleryUploadOpen(true);
                    }}>Create Gallery</Button>
                  </Card>
                </Grid>
              </Grid>
            )}
            {/* Article Editor for New Article */}
            {editorOpen && selectedArticle?.type === 'Article' && (
              <ArticleEditor
                article={selectedArticle}
                onSave={updated => {
                  setProjects(prev => [{ ...updated, id: updated.id || genId(), createdAt: updated.createdAt || Date.now() }, ...prev]);
                  setEditorOpen(false);
                  setSelectedArticle(null);
                  setTab(1);
                }}
                onCancel={() => {
                  setEditorOpen(false);
                  setSelectedArticle(null);
                }}
              />
            )}
            {/* Video Upload Modal/Page */}
            {videoUploadOpen && (
              <Box className="create-form" sx={{ mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center', background: '#fff', p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1">Upload Video</Typography>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Video Title"
                  value={newContent.title}
                  onChange={e => setNewContent({ ...newContent, title: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    setNewContent({ ...newContent, video: file });
                    if (file && typeof URL !== 'undefined') {
                      const u = URL.createObjectURL(file);
                      setModalVideoPreviewUrl(u);
                      setModalCreatedObjectUrls(prev => [...prev, u]);
                    }
                  }}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {modalVideoPreviewUrl && (
                  <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <video src={modalVideoPreviewUrl} controls style={{ maxWidth: '100%', maxHeight: '45vh' }} />
                  </Box>
                )}
                <textarea
                  className="form-input"
                  placeholder="Enter Video Description"
                  value={newContent.videoDesc}
                  onChange={e => setNewContent({ ...newContent, videoDesc: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <Button variant="contained" onClick={() => {
                  if (editingId) {
                    // update existing project
                    setProjects(prev => prev.map(p => p.id === editingId ? { ...p, ...newContent } : p));
                    setEditingId(null);
                  } else {
                    setProjects(prev => [{ ...newContent, id: newContent.id || genId(), createdAt: newContent.createdAt || Date.now() }, ...prev]);
                  }
                  // cleanup modal preview URLs
                  modalCreatedObjectUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { console.debug(e); } });
                  setModalCreatedObjectUrls([]);
                  setModalVideoPreviewUrl(null);
                  setVideoUploadOpen(false);
                  setTab(1);
                }} sx={{ mt: 1 }}>Save Video</Button>
                <Button variant="outlined" color="secondary" onClick={() => {
                  // revoke modal preview urls
                  modalCreatedObjectUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { console.debug(e); } });
                  setModalCreatedObjectUrls([]);
                  setModalVideoPreviewUrl(null);
                  setVideoUploadOpen(false);
                }} sx={{ mt: 1, ml: 2 }}>Cancel</Button>
              </Box>
            )}
            {/* Photo Gallery Upload Modal/Page */}
            {galleryUploadOpen && (
              <Box className="create-form" sx={{ mt: 4, maxWidth: 400, mx: 'auto', textAlign: 'center', background: '#fff', p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1">Upload Photo Gallery</Typography>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter Gallery Title"
                  value={newContent.title}
                  onChange={e => setNewContent({ ...newContent, title: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={e => {
                    const files = Array.from(e.target.files || []);
                    setNewContent({ ...newContent, images: files });
                    // create previews
                    const srcs = [];
                    const created = [];
                    files.forEach(f => {
                      if (typeof f === 'string') srcs.push(f);
                      else if (f && typeof URL !== 'undefined') {
                        const u = URL.createObjectURL(f);
                        srcs.push(u);
                        created.push(u);
                      }
                    });
                    setModalGalleryPreviewImages(srcs);
                    setModalCreatedObjectUrls(prev => [...prev, ...created]);
                  }}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {modalGalleryPreviewImages.length > 0 && (
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {modalGalleryPreviewImages.map((src, i) => (
                      <Grid item xs={6} sm={4} key={i}>
                        <Box sx={{ borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
                          <img src={src} alt={`preview-${i}`} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
                <textarea
                  className="form-input"
                  placeholder="Enter Gallery Description"
                  value={newContent.galleryDesc}
                  onChange={e => setNewContent({ ...newContent, galleryDesc: e.target.value })}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                <Button variant="contained" onClick={() => {
                  if (editingId) {
                    setProjects(prev => prev.map(p => p.id === editingId ? { ...p, ...newContent } : p));
                    setEditingId(null);
                  } else {
                    setProjects(prev => [{ ...newContent, id: newContent.id || genId(), createdAt: newContent.createdAt || Date.now() }, ...prev]);
                  }
                  // cleanup modal preview URLs
                  modalCreatedObjectUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { console.debug(e); } });
                  setModalCreatedObjectUrls([]);
                  setModalGalleryPreviewImages([]);
                  setGalleryUploadOpen(false);
                  setTab(1);
                }} sx={{ mt: 1 }}>Save Gallery</Button>
                <Button variant="outlined" color="secondary" onClick={() => {
                  // revoke modal preview urls
                  modalCreatedObjectUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) { console.debug(e); } });
                  setModalCreatedObjectUrls([]);
                  setModalGalleryPreviewImages([]);
                  setGalleryUploadOpen(false);
                }} sx={{ mt: 1, ml: 2 }}>Cancel</Button>
              </Box>
            )}
          </Box>
        )}
        {tab === 3 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Content Analytics</Typography>
            {/* Derived metrics from projects and stats */}
            {(() => {
              const published = projects.filter(p => p.status === 'Published');
              const totalPublished = published.length;
              const totalContent = projects.length;
              const avgViewsPerPublished = totalPublished > 0 ? Math.round(stats.views / totalPublished) : 0;
              const publishedRate = totalContent > 0 ? Math.round((totalPublished / totalContent) * 100) : 0;
              const totalImages = projects.reduce((acc, p) => acc + (Array.isArray(p.images) ? p.images.length : 0), 0);
              const totalVideos = projects.filter(p => p.type === 'Video').length;
              const projectsLast30Days = projects.filter(p => Date.now() - (p.createdAt || 0) <= 30 * 24 * 3600 * 1000).length;
              const oldest = projects.reduce((min, p) => Math.min(min, p.createdAt || Date.now()), Date.now());
              const weeks = Math.max(1, Math.round((Date.now() - oldest) / (7 * 24 * 3600 * 1000)));
              const avgPerWeek = Math.round((projects.length / weeks) * 10) / 10;
              const galleries = projects.filter(p => p.type === 'Photography').length;
              const avgImagesPerGallery = galleries > 0 ? Math.round((totalImages / galleries) * 10) / 10 : 0;
              const monumentsMentioned = monumentData.filter(mon => projects.some(p => p.title && p.title.toLowerCase().includes(mon.name.toLowerCase()))).length;
              const monumentCoveragePercent = Math.round((monumentsMentioned / monumentData.length) * 100);
              const engagementEstimate = Math.round((stats.views + totalImages * 50 + totalVideos * 200) / Math.max(1, totalContent));
              const draftCount = projects.filter(p => p.status !== 'Published').length;

              return (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  {/* Content Performance */}
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Content Performance</Typography>
                        <Typography variant="h4" color="primary">{stats.views.toLocaleString()}</Typography>
                        <Typography variant="body2">Total Views</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2">Published Content: <strong>{totalPublished}</strong></Typography>
                          <Typography variant="body2">Avg views / published: <strong>{avgViewsPerPublished}</strong></Typography>
                          <Typography variant="body2">Published rate: <strong>{publishedRate}%</strong></Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* User Engagement */}
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">User Engagement</Typography>
                        <Typography variant="h4" color="secondary">{engagementEstimate}</Typography>
                        <Typography variant="body2">Estimated engagement score</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2">Shares / Social: <strong>—</strong></Typography>
                          <Typography variant="body2">Average time on content: <strong>—</strong></Typography>
                          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Note: engagement uses current views, media counts and content volume to provide a simple estimate. For accurate engagement, connect analytics events.</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Creator Productivity */}
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Creator Productivity</Typography>
                        <Typography variant="h4" color="primary">{projects.length}</Typography>
                        <Typography variant="body2">Total Projects</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2">Created in last 30 days: <strong>{projectsLast30Days}</strong></Typography>
                          <Typography variant="body2">Avg / week: <strong>{avgPerWeek}</strong></Typography>
                          <Typography variant="body2">Drafts: <strong>{draftCount}</strong></Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Cultural Impact */}
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Cultural Impact</Typography>
                        <Typography variant="h4" color="secondary">{monumentsMentioned}</Typography>
                        <Typography variant="body2">Monuments referenced</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2">Monuments coverage: <strong>{monumentCoveragePercent}%</strong></Typography>
                          <Typography variant="body2">Galleries (images): <strong>{totalImages}</strong> across <strong>{galleries}</strong> galleries</Typography>
                          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Tip: tag your content with monument names and regions to increase discoverability and cultural reach.</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Technical Analytics split into equal stat cards */}
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Videos</Typography>
                        <Typography variant="h4" color="primary">{totalVideos}</Typography>
                        <Typography variant="body2">Total videos uploaded</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Images</Typography>
                        <Typography variant="h4" color="primary">{totalImages}</Typography>
                        <Typography variant="body2">Total images across galleries</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Avg images / gallery</Typography>
                        <Typography variant="h4" color="primary">{avgImagesPerGallery}</Typography>
                        <Typography variant="body2">Average images per gallery</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card className="stat-card">
                      <CardContent>
                        <Typography variant="h6">Content Types</Typography>
                        <Typography variant="h4" color="primary">{new Set(projects.map(p=>p.type)).size}</Typography>
                        <Typography variant="body2">Unique content types used</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              );
            })()}
          </Box>
        )}
        {tab === 4 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Content Ideas & Resources</Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>Trending Topics</Typography>
            <Grid container spacing={2}>
              {contentIdeas.map((idea, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Card className="project-card">
                    <CardContent>
                      <Typography variant="h6">{idea.title}</Typography>
                      <Chip label={idea.category} color="secondary" size="small" sx={{ mt: 1 }} />
                      <Button variant="outlined" size="small" sx={{ mt: 2, display: 'block' }} onClick={() => {
                        setSelectedIdea(idea);
                        setIdeaModalOpen(true);
                      }}>
                        View & Use Idea
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* Idea details modal */}
            {ideaModalOpen && selectedIdea && (
              <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Box sx={{ width: '100%', maxWidth: 800, background: '#fff', borderRadius: 2, p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>{selectedIdea.title}</Typography>
                  <Chip label={selectedIdea.category} color="secondary" size="small" sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedIdea.description}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>Suggested content type: <strong>{selectedIdea.suggestedType}</strong></Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={() => { setIdeaModalOpen(false); setSelectedIdea(null); }}>Close</Button>
                    <Button variant="contained" onClick={() => {
                      // Prefill create form and switch to Create tab
                      setNewContent({ type: selectedIdea.suggestedType || 'Article', title: selectedIdea.title, status: 'Draft', images: [], video: null, videoDesc: '', galleryDesc: '' });
                      setIdeaModalOpen(false);
                      setTab(2);
                    }}>Use This Idea</Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
        {tab === 5 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Creator Settings</Typography>
            <Typography variant="body1">Manage your creator profile and content preferences.</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/admin/content-creator-dashboard/settings')}>Go to Settings</Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ContentCreatorDashboard;
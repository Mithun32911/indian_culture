import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { culturalData, monumentData, heritageSites } from '../database/data.js';
import './Admin.css';

const STORAGE_KEYS = {
  cultural: 'culturalData',
  monument: 'monumentData',
  heritage: 'heritageSites',
};

const ManageData = () => {
  // Utility functions for localStorage
  
  
  
  
  
  
  


  const getStoredData = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };
  const setStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  const navigate = useNavigate();
  const renderHeritageForm = () => (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{editingId ? 'Edit Heritage Site' : 'Add New Heritage Site'}</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Ajanta Caves"
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="e.g., Maharashtra, India"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Period:</label>
          <input
            type="text"
            name="period"
            value={formData.period}
            onChange={handleInputChange}
            placeholder="e.g., 2nd century BCE to 480 CE"
          />
        </div>
        <div className="form-group">
          <label>Architecture:</label>
          <input
            type="text"
            name="architecture"
            value={formData.architecture}
            onChange={handleInputChange}
            placeholder="e.g., Buddhist rock-cut architecture"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          placeholder="Detailed description..."
        />
      </div>
      <div className="form-group">
        <label>Significance:</label>
        <input
          type="text"
          name="significance"
          value={formData.significance}
          onChange={handleInputChange}
          placeholder="Historical/cultural significance..."
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingId ? 'Update' : 'Add'} Heritage Site
        </button>
        <button type="button" onClick={resetForm} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
  const [activeTab, setActiveTab] = useState('cultural');
  const [culturalList, setCulturalList] = useState(culturalData);
  const [monumentList, setMonumentList] = useState(monumentData);
  const [heritageList, setHeritageList] = useState(heritageSites);
  useEffect(() => {
    setCulturalList(getStoredData(STORAGE_KEYS.cultural, culturalData));
    setMonumentList(getStoredData(STORAGE_KEYS.monument, monumentData));
    setHeritageList(getStoredData(STORAGE_KEYS.heritage, heritageSites));
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    type: '',
    significance: '',
    region: '',
    season: '',
    built: '',
    builder: '',
    architecture: '',
    visitingHours: '',
    entryFee: '',
    period: ''
  });

  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      type: '',
      significance: '',
      region: '',
      season: '',
      built: '',
      builder: '',
      architecture: '',
      visitingHours: '',
      entryFee: '',
      period: ''
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'cultural') {
      if (editingId) {
        const updated = culturalList.map(item => item.id === editingId ? { ...formData, id: editingId } : item);
        setCulturalList(updated);
        setStoredData(STORAGE_KEYS.cultural, updated);
        alert(`Updated ${formData.name} successfully!`);
      } else {
        const newId = culturalList.length > 0 ? Math.max(...culturalList.map(item => item.id || 0)) + 1 : 1;
        const updated = [...culturalList, { ...formData, id: newId }];
        setCulturalList(updated);
        setStoredData(STORAGE_KEYS.cultural, updated);
        alert(`Added ${formData.name} successfully!`);
      }
    } else if (activeTab === 'monuments') {
      // Always use STORAGE_KEYS.monument for monuments
      if (editingId) {
        const updated = monumentList.map(item => item.id === editingId ? { ...formData, id: editingId } : item);
        setMonumentList(updated);
        setStoredData(STORAGE_KEYS.monument, updated);
        alert(`Updated ${formData.name} successfully!`);
      } else {
        const newId = monumentList.length > 0 ? Math.max(...monumentList.map(item => item.id || 0)) + 1 : 1;
        const updated = [...monumentList, { ...formData, id: newId }];
        setMonumentList(updated);
        setStoredData(STORAGE_KEYS.monument, updated);
        alert(`Added ${formData.name} successfully!`);
      }
    } else if (activeTab === 'heritage') {
      // Always use STORAGE_KEYS.heritage for heritage
      if (editingId) {
        const updated = heritageList.map(item => item.id === editingId ? { ...formData, id: editingId } : item);
        setHeritageList(updated);
        setStoredData(STORAGE_KEYS.heritage, updated);
        alert(`Updated ${formData.name} successfully!`);
      } else {
        const newId = heritageList.length > 0 ? Math.max(...heritageList.map(item => item.id || 0)) + 1 : 1;
        const updated = [...heritageList, { ...formData, id: newId }];
        setHeritageList(updated);
        setStoredData(STORAGE_KEYS.heritage, updated);
        alert(`Added ${formData.name} successfully!`);
      }
    }
    resetForm();
  };

  const handleEdit = (item, type) => {
    if (activeTab === 'heritage' && type === 'heritage') {
      setFormData(item);
      setEditingId(item.id);
    } else if (activeTab === 'monuments' && type === 'monument') {
      setFormData(item);
      setEditingId(item.id);
    } else if (activeTab === 'cultural' && type === 'cultural') {
      setFormData(item);
      setEditingId(item.id);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      if (activeTab === 'cultural') {
        const updated = culturalList.filter(item => item.id !== id);
        setCulturalList(updated);
        setStoredData(STORAGE_KEYS.cultural, updated);
      } else if (activeTab === 'monuments') {
        // Always use STORAGE_KEYS.monument for monuments
        const updated = monumentList.filter(item => item.id !== id);
        setMonumentList(updated);
        setStoredData(STORAGE_KEYS.monument, updated);
      } else if (activeTab === 'heritage') {
        // Always use STORAGE_KEYS.heritage for heritage
        const updated = heritageList.filter(item => item.id !== id);
        setHeritageList(updated);
        setStoredData(STORAGE_KEYS.heritage, updated);
      }
      alert(`Deleted "${name}" successfully!`);
    }
  };

  const renderCulturalForm = () => (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{editingId ? 'Edit Cultural Data' : 'Add New Cultural Data'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Diwali"
          />
        </div>
        
        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Festival">Festival</option>
            <option value="Tradition">Tradition</option>
            <option value="Art Form">Art Form</option>
            <option value="Cuisine">Cuisine</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          placeholder="Detailed description..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="e.g., Pan-India"
          />
        </div>
        
        <div className="form-group">
          <label>Season:</label>
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleInputChange}
            placeholder="e.g., October-November"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Significance:</label>
        <input
          type="text"
          name="significance"
          value={formData.significance}
          onChange={handleInputChange}
          placeholder="Cultural significance..."
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingId ? 'Update' : 'Add'} Cultural Data
        </button>
        <button type="button" onClick={resetForm} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );

  const renderMonumentForm = () => (
    <form onSubmit={handleSubmit} className="manage-form">
      <h3>{editingId ? 'Edit Monument Data' : 'Add New Monument Data'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., Taj Mahal"
          />
        </div>
        
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="e.g., Agra, Uttar Pradesh"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Built:</label>
          <input
            type="text"
            name="built"
            value={formData.built}
            onChange={handleInputChange}
            placeholder="e.g., 1632-1653"
          />
        </div>
        
        <div className="form-group">
          <label>Builder:</label>
          <input
            type="text"
            name="builder"
            value={formData.builder}
            onChange={handleInputChange}
            placeholder="e.g., Shah Jahan"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          placeholder="Detailed description..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="e.g., Mausoleum"
          />
        </div>
        
        <div className="form-group">
          <label>Architecture:</label>
          <input
            type="text"
            name="architecture"
            value={formData.architecture}
            onChange={handleInputChange}
            placeholder="e.g., Indo-Islamic architecture"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Visiting Hours:</label>
          <input
            type="text"
            name="visitingHours"
            value={formData.visitingHours}
            onChange={handleInputChange}
            placeholder="e.g., 6:00 AM to 7:00 PM"
          />
        </div>
        
        <div className="form-group">
          <label>Entry Fee:</label>
          <input
            type="text"
            name="entryFee"
            value={formData.entryFee}
            onChange={handleInputChange}
            placeholder="e.g., ₹50 for Indians"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Significance:</label>
        <input
          type="text"
          name="significance"
          value={formData.significance}
          onChange={handleInputChange}
          placeholder="Historical significance..."
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingId ? 'Update' : 'Add'} Monument Data
        </button>
        <button type="button" onClick={resetForm} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );

  const renderDataList = (data, type) => (
    <div className="data-list">
      <h3>Current {type} Data</h3>
      <div className="data-grid">
        {data.map(item => (
          <div key={item.id} className="data-item">
            <h4>{item.name}</h4>
            <p><strong>Type:</strong> {item.type}</p>
            {item.location && <p><strong>Location:</strong> {item.location}</p>}
            {item.region && <p><strong>Region:</strong> {item.region}</p>}
            <p className="description">{item.description.substring(0, 100)}...</p>
            <div className="item-actions">
              {type === 'Heritage Site' && activeTab === 'heritage' && (
                <button
                  onClick={() => handleEdit(item, 'heritage')}
                  className="edit-btn"
                >
                  Edit
                </button>
              )}
              {type === 'Monument' && activeTab === 'monuments' && (
                <button
                  onClick={() => handleEdit(item, 'monument')}
                  className="edit-btn"
                >
                  Edit
                </button>
              )}
              {type === 'Cultural' && activeTab === 'cultural' && (
                <button
                  onClick={() => handleEdit(item, 'cultural')}
                  className="edit-btn"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id, item.name)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="manage-data-container">
      <button
        className="back-btn"
        style={{ position: 'absolute', right: 24, top: 24, padding: '8px 20px', borderRadius: '6px', background: '#6e6f72ff', color: 'white', border: 'none', fontWeight: '500', cursor: 'pointer', zIndex: 10 }}
        onClick={() => navigate('/admin')}
      >
        Back
      </button>
     
      
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          Cultural Data
        </button>
        <button
          className={`tab-btn ${activeTab === 'monuments' ? 'active' : ''}`}
          onClick={() => setActiveTab('monuments')}
        >
          Monuments
        </button>
        <button
          className={`tab-btn ${activeTab === 'heritage' ? 'active' : ''}`}
          onClick={() => setActiveTab('heritage')}
        >
          Heritage Sites
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'cultural' && (
          <div>
            {renderCulturalForm()}
            {renderDataList(culturalList, 'Cultural')}
          </div>
        )}
        
        {activeTab === 'monuments' && (
          <div>
            {renderMonumentForm()}
            {renderDataList(monumentList, 'Monument')}
          </div>
        )}
        
        {activeTab === 'heritage' && (
          <div>
            {renderHeritageForm()}
            {renderDataList(heritageList, 'Heritage Site')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageData;
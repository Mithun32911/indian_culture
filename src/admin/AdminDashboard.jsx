import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Admin.css';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getStoredData = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };

  const STORAGE_KEYS = {
    cultural: 'culturalData',
    monument: 'monumentData',
    heritage: 'heritageSites',
  };

  const culturalCount = getStoredData(STORAGE_KEYS.cultural, []).length;
  const monumentCount = getStoredData(STORAGE_KEYS.monument, []).length;
  const heritageCount = getStoredData(STORAGE_KEYS.heritage, []).length;

  const navigateToManageData = () => {
    navigate('/admin/manage-data');
  };

  const handleViewReports = () => {
    navigate('/admin/view-reports');
  };

  const handleSystemSettings = () => {
    alert('System Settings: This would show system settings.');
  };

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>{t('adminDashboard.title', 'Admin Dashboard')}</h1>
          <button onClick={onLogout} className="logout-btn">{t('adminDashboard.logout', 'Logout')}</button>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>{t('adminDashboard.cultural_title', 'Cultural Entries')}</h3>
              <p className="stat-number">{culturalCount}</p>
              <p>{t('adminDashboard.cultural_desc', 'Festival & Tradition data')}</p>
            </div>
            <div className="stat-card">
              <h3>{t('adminDashboard.monuments_title', 'Monuments')}</h3>
              <p className="stat-number">{monumentCount}</p>
              <p>{t('adminDashboard.monuments_desc', 'Famous Indian monuments')}</p>
            </div>
            <div className="stat-card">
              <h3>{t('adminDashboard.heritage_title', 'Heritage Sites')}</h3>
              <p className="stat-number">{heritageCount}</p>
              <p>{t('adminDashboard.heritage_desc', 'World Heritage Sites')}</p>
            </div>
          </div>

          <div className="dashboard-actions">
            <button onClick={navigateToManageData} className="action-btn primary">{t('adminDashboard.actions.manage_cultural_data', 'Manage Cultural Data')}</button>
            <button className="action-btn" onClick={handleViewReports}>{t('adminDashboard.actions.view_reports', 'View Reports')}</button>
            <button className="action-btn" onClick={handleSystemSettings}>{t('adminDashboard.actions.system_settings', 'System Settings')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

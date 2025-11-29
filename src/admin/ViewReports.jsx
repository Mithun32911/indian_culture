import React from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ViewReports = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Example analytics data
  const analytics = {
    mostVisitedMonuments: [
      { name: 'Taj Mahal', visits: 120 },
      { name: 'Red Fort', visits: 95 },
      { name: 'Qutub Minar', visits: 80 }
    ],
    popularTours: [
      { name: 'Delhi Heritage Walk', bookings: 45 },
      { name: 'Agra Monuments Tour', bookings: 38 }
    ],
    activeDiscussions: [
      { topic: 'Preservation Techniques', posts: 12 },
      { topic: 'Cultural Festivals', posts: 9 }
    ],
    visitorStats: {
      totalVisitors: 350,
      userGrowth: '15% this month',
      contentInteractions: 210
    }
  };

  // Export analytics as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="view-reports-container styled-reports">
      <div className="reports-header-bar">
        <h1 className="reports-title">{t('viewReports.title', 'Reports & Analytics')}</h1>
        <button
          className="back-btn reports-back-btn"
          onClick={() => navigate('/admin')}
        >
          {t('viewReports.back', 'Back')}
        </button>
      </div>
      <p className="reports-subtitle">{t('viewReports.subtitle', 'View reports on user engagement, visitor stats, and export analytics.')}</p>

      <div className="reports-cards">
        <div className="report-card">
          <h2>{t('viewReports.most_visited', 'Most Visited Monuments')}</h2>
          <ul>
            {analytics.mostVisitedMonuments.map(m => (
              <li key={m.name}><span className="report-label">{m.name}</span> <span className="report-value">{m.visits} {t('viewReports.visits', 'visits')}</span></li>
            ))}
          </ul>
        </div>
        <div className="report-card">
          <h2>{t('viewReports.popular_tours', 'Popular Tours')}</h2>
          <ul>
            {analytics.popularTours.map(tour => (
              <li key={tour.name}><span className="report-label">{tour.name}</span> <span className="report-value">{tour.bookings} {t('viewReports.bookings', 'bookings')}</span></li>
            ))}
          </ul>
        </div>
        <div className="report-card">
          <h2>{t('viewReports.active_discussions', 'Active Discussions')}</h2>
          <ul>
            {analytics.activeDiscussions.map(d => (
              <li key={d.topic}><span className="report-label">{d.topic}</span> <span className="report-value">{d.posts} {t('viewReports.posts', 'posts')}</span></li>
            ))}
          </ul>
        </div>
        <div className="report-card">
          <h2>{t('viewReports.visitor_stats', 'Visitor & Growth Stats')}</h2>
          <ul>
            <li><span className="report-label">{t('viewReports.total_visitors', 'Total Visitors')}</span> <span className="report-value">{analytics.visitorStats.totalVisitors}</span></li>
            <li><span className="report-label">{t('viewReports.user_growth', 'User Growth')}</span> <span className="report-value">{analytics.visitorStats.userGrowth}</span></li>
            <li><span className="report-label">{t('viewReports.content_interactions', 'Content Interactions')}</span> <span className="report-value">{analytics.visitorStats.contentInteractions}</span></li>
          </ul>
        </div>
      </div>

      <button className="action-btn primary" onClick={handleExport} style={{marginTop:32}}>
        {t('viewReports.export_analytics', 'Export Analytics')}
      </button>
    </div>
  );
};

export default ViewReports;

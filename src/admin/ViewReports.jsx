import React from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const ViewReports = () => {
  const navigate = useNavigate();
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
        <h1 className="reports-title">Reports & Analytics</h1>
        <button
          className="back-btn reports-back-btn"
          onClick={() => navigate('/admin')}
        >
          Back
        </button>
      </div>
      <p className="reports-subtitle">View reports on user engagement, visitor stats, and export analytics.</p>

      <div className="reports-cards">
        <div className="report-card">
          <h2>Most Visited Monuments</h2>
          <ul>
            {analytics.mostVisitedMonuments.map(m => (
              <li key={m.name}><span className="report-label">{m.name}</span> <span className="report-value">{m.visits} visits</span></li>
            ))}
          </ul>
        </div>
        <div className="report-card">
          <h2>Popular Tours</h2>
          <ul>
            {analytics.popularTours.map(t => (
              <li key={t.name}><span className="report-label">{t.name}</span> <span className="report-value">{t.bookings} bookings</span></li>
            ))}
          </ul>
        </div>
        <div className="report-card">
          <h2>Active Discussions</h2>
          <ul>
            {analytics.activeDiscussions.map(d => (
              <li key={d.topic}><span className="report-label">{d.topic}</span> <span className="report-value">{d.posts} posts</span></li>
            ))}
          </ul>
        </div>
        <div className="report-card">
          <h2>Visitor & Growth Stats</h2>
          <ul>
            <li><span className="report-label">Total Visitors</span> <span className="report-value">{analytics.visitorStats.totalVisitors}</span></li>
            <li><span className="report-label">User Growth</span> <span className="report-value">{analytics.visitorStats.userGrowth}</span></li>
            <li><span className="report-label">Content Interactions</span> <span className="report-value">{analytics.visitorStats.contentInteractions}</span></li>
          </ul>
        </div>
      </div>

      <button className="action-btn primary" onClick={handleExport} style={{marginTop:32}}>
        Export Analytics
      </button>
    </div>
  );
};

export default ViewReports;

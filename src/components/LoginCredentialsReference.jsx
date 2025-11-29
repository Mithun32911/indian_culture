import React from 'react';

const LoginCredentialsReference = () => {
  const credentials = [
    {
      role: 'Admin',
      email: 'admin@heritage.com',
      password: 'admin123',
      dashboard: 'Cultural Enthusiast Dashboard',
      loginPage: '/admin/enthusiast-login',
      dashboardPath: '/admin/enthusiast-dashboard',
      color: '#6a11cb'
    },
    {
      role: 'User',
      email: 'user@heritage.com',
      password: 'user123',
      dashboard: 'User Dashboard',
      loginPage: '/admin/user-login',
      dashboardPath: '/admin/user-dashboard',
      color: '#2E8B57'
    },
    {
      role: 'Content Creator',
      email: 'creator@heritage.com',
      password: 'creator123',
      dashboard: 'Content Creator Dashboard',
      loginPage: '/admin/content-creator-login',
      dashboardPath: '/admin/content-creator-dashboard',
      color: '#8B4513'
    },
    {
      role: 'Tour Guide',
      email: 'guide@heritage.com',
      password: 'guide123',
      dashboard: 'Tour Guide Dashboard',
      loginPage: '/admin/tour-guide-login',
      dashboardPath: '/admin/tour-guide-dashboard',
      color: '#8B008B'
    }
  ];

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '2rem auto',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '1rem',
      color: '#fff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
        🔐 Login Credentials Reference
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {credentials.map((cred, index) => (
          <div key={index} style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1.5rem', 
            borderRadius: '0.8rem',
            border: `2px solid ${cred.color}`,
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ 
              color: cred.color, 
              marginBottom: '1rem', 
              fontSize: '1.4rem',
              textAlign: 'center'
            }}>
              {cred.role}
            </h3>
            
            <div style={{ marginBottom: '0.8rem' }}>
              <strong>📧 Email:</strong>
              <div style={{ 
                background: 'rgba(0,0,0,0.2)', 
                padding: '0.5rem', 
                borderRadius: '0.3rem',
                marginTop: '0.3rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                {cred.email}
              </div>
            </div>
            
            <div style={{ marginBottom: '0.8rem' }}>
              <strong>🔑 Password:</strong>
              <div style={{ 
                background: 'rgba(0,0,0,0.2)', 
                padding: '0.5rem', 
                borderRadius: '0.3rem',
                marginTop: '0.3rem',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                {cred.password}
              </div>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#ddd',
                textAlign: 'center',
                marginBottom: '0.8rem'
              }}>
                → {cred.dashboard}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <a 
                  href={cred.loginPage} 
                  style={{ 
                    background: cred.color,
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  🔐 Login as {cred.role}
                </a>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#bbb',
                  textAlign: 'center',
                  fontFamily: 'monospace'
                }}>
                  {cred.dashboardPath}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          💡 <strong>Note:</strong> Use these credentials to test different user roles. 
          Each role has access to different dashboard features and permissions.
        </p>
      </div>
    </div>
  );
};

export default LoginCredentialsReference;
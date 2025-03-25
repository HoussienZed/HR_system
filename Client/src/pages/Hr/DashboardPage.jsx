import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    openPositions: 0,
    totalCandidates: 0,
    newHires: 0,
    completedOnboarding: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const statsData = await response.json();
        setStats(statsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };
    
    getStats();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon positions-icon"></div>
          <div className="stat-details">
            <h3 className="stat-title">Open Positions</h3>
            <p className="stat-value">{stats.openPositions}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon candidates-icon"></div>
          <div className="stat-details">
            <h3 className="stat-title">Total Candidates</h3>
            <p className="stat-value">{stats.totalCandidates}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon hires-icon"></div>
          <div className="stat-details">
            <h3 className="stat-title">New Hires</h3>
            <p className="stat-value">{stats.newHires}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed-icon"></div>
          <div className="stat-details">
            <h3 className="stat-title">Completed Onboarding</h3>
            <p className="stat-value">{stats.completedOnboarding}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="recent-activity">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon application-icon"></div>
              <div className="activity-details">
                <p className="activity-text">New application received for Senior Developer</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon interview-icon"></div>
              <div className="activity-details">
                <p className="activity-text">Interview scheduled with John Doe</p>
                <p className="activity-time">Yesterday</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon hired-icon"></div>
              <div className="activity-details">
                <p className="activity-text">Sarah Smith accepted job offer</p>
                <p className="activity-time">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="upcoming-events">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-list">
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">15</span>
                <span className="event-month">Mar</span>
              </div>
              <div className="event-details">
                <h4 className="event-title">Interview: Marketing Manager</h4>
                <p className="event-time">10:00 AM - 11:30 AM</p>
              </div>
            </div>
            
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">17</span>
                <span className="event-month">Mar</span>
              </div>
              <div className="event-details">
                <h4 className="event-title">New Hire Orientation</h4>
                <p className="event-time">09:00 AM - 12:00 PM</p>
              </div>
            </div>
            
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">20</span>
                <span className="event-month">Mar</span>
              </div>
              <div className="event-details">
                <h4 className="event-title">Job Posting Deadline: UX Designer</h4>
                <p className="event-time">11:59 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
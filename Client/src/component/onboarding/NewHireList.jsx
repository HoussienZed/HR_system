import React, { useState, useEffect } from 'react';

const NewHireList = ({ onSelect }) => {
  const [newHires, setNewHires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHire, setSelectedHire] = useState(null);
  
  useEffect(() => {
    const getNewHires = async () => {
      try {
        const response = await fetch('/api/onboarding/new-hires');
        const hiresData = await response.json();
        setNewHires(hiresData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new hires:', error);
        setLoading(false);
      }
    };
    
    getNewHires();
  }, []);
  
  const handleHireClick = (hire) => {
    setSelectedHire(hire);
    onSelect(hire);
  };

  const getStatusClass = (status) => {
    return status === 'Completed' ? 'status-completed' : 'status-pending';
  };
  
  if (loading) {
    return <div className="loading">Loading new hires...</div>;
  }
  
  return (
    <div className="new-hire-list">
      <h3 className="section-title">New Hires</h3>
      
      <div className="hire-table-container">
        <table className="hire-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>Onboarding Status</th>
            </tr>
          </thead>
          <tbody>
            {newHires.length > 0 ? (
              newHires.map((hire) => (
                <tr 
                  key={hire.id} 
                  className={`hire-row ${selectedHire && selectedHire.id === hire.id ? 'selected' : ''}`}
                  onClick={() => handleHireClick(hire)}
                >
                  <td>{hire.name}</td>
                  <td>{hire.position}</td>
                  <td>{hire.department}</td>
                  <td>{new Date(hire.startDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(hire.onboardingProgress === 100 ? 'Completed' : 'Pending')}`}>
                      {hire.onboardingProgress === 100 ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data-cell">
                  No new hires found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewHireList;
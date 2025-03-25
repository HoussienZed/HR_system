import React, { useState, useEffect } from 'react';

const CandidateList = ({ jobId, onViewCandidate }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCandidates = async () => {
      if (!jobId) return;
      
      try {
        const response = await fetch(`/api/jobs/${jobId}/candidates`);
        const candidatesData = await response.json();
        setCandidates(candidatesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setLoading(false);
      }
    };

    getCandidates();
  }, [jobId]);

  if (loading) {
    return <div className="loading">Loading candidates...</div>;
  }

  if (!jobId) {
    return <div className="no-selection">Please select a job to view candidates</div>;
  }

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'status-applied';
      case 'screening':
        return 'status-screening';
      case 'interview':
        return 'status-interview';
      case 'offer':
        return 'status-offer';
      case 'hired':
        return 'status-hired';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="candidate-list">
      <h3 className="section-title">Candidates</h3>
      
      {candidates.length > 0 ? (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="candidate-row">
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                <td>{new Date(candidate.appliedDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => onViewCandidate(candidate.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No candidates found for this position.</p>
      )}
    </div>
  );
};

export default CandidateList;
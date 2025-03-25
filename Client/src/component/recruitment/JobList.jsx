import React, { useState, useEffect } from 'react';

const JobList = ({ onEditJob, onViewCandidates }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const jobsData = await response.json();
        setJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <div className="job-list">
      <h3 className="section-title">Open Positions</h3>
      <div className="job-cards">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <h4 className="job-title">{job.title}</h4>
                <span className="job-department">{job.department}</span>
              </div>
              <div className="job-card-body">
                <p className="job-location">{job.location}</p>
                <p className="job-type">{job.type}</p>
                <p className="job-applicants">{job.applicants} Applicants</p>
              </div>
              <div className="job-card-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => onViewCandidates(job.id)}
                >
                  View Candidates
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => onEditJob(job)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No open positions found.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
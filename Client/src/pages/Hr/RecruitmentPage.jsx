import React, { useState } from 'react';
import JobList from '../../component/recruitment/JobList';
import JobForm from '../../component/recruitment/JobForm';
import CandidateList from '../../component/recruitment/CandidateList';
import CandidateForm from '../../component/recruitment/CandidateForm';

const RecruitmentPage = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isCandidateFormOpen, setIsCandidateFormOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  
  const handleViewCandidates = (jobId) => {
    setSelectedJobId(jobId);
    setSelectedCandidateId(null);
  };
  
  const handleCreateJob = () => {
    setCurrentJob(null);
    setIsJobFormOpen(true);
  };
  
  const handleEditJob = (job) => {
    setCurrentJob(job);
    setIsJobFormOpen(true);
  };
  
  const handleJobFormSubmit = async (jobData) => {
    try {
      if (currentJob) {
        const response = await fetch(`/api/jobs/${currentJob.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update job');
        }
      } else {
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create job');
        }
        
        const newJob = await response.json();
        setSelectedJobId(newJob.id);
      }
      
      setIsJobFormOpen(false);
      
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };
  
  const handleJobFormCancel = () => {
    setIsJobFormOpen(false);
  };
  
  const handleViewCandidate = async (candidateId) => {
    try {
      const response = await fetch(`/api/candidates/${candidateId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch candidate details');
      }
      
      const candidateData = await response.json();
      setSelectedCandidateId(candidateId);
      setCurrentCandidate(candidateData);
      setIsCandidateFormOpen(true);
    } catch (error) {
      console.error('Error fetching candidate:', error);
    }
  };
  
  const handleAddCandidate = () => {
    setSelectedCandidateId(null);
    setCurrentCandidate(null);
    setIsCandidateFormOpen(true);
  };
  
  const handleCandidateFormSubmit = async (candidateData) => {
    try {
      if (currentCandidate) {
        const response = await fetch(`/api/candidates/${currentCandidate.id}`, {
          method: 'PUT',
          body: candidateData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to update candidate');
        }
      } else {
        const response = await fetch('/api/candidates', {
          method: 'POST',
          body: candidateData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to create candidate');
        }
      }
      
      setIsCandidateFormOpen(false);
      
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };
  
  const handleCandidateFormCancel = () => {
    setIsCandidateFormOpen(false);
  };
  
  return (
    <div className="recruitment-page">
      <div className="page-header">
        <h1 className="page-title">Recruitment</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleCreateJob}
        >
          Post New Job
        </button>
      </div>
      
      <div className="recruitment-content">
        {isJobFormOpen ? (
          <JobForm 
            job={currentJob}
            onSave={handleJobFormSubmit}
            onCancel={handleJobFormCancel}
          />
        ) : isCandidateFormOpen ? (
          <CandidateForm
            candidate={currentCandidate}
            jobId={selectedJobId}
            onSave={handleCandidateFormSubmit}
            onCancel={handleCandidateFormCancel}
          />
        ) : (
          <>
            <div className="jobs-section">
              <JobList 
                onEditJob={handleEditJob}
                onViewCandidates={handleViewCandidates}
              />
            </div>
            
            <div className="candidates-section">
              <div className="candidates-header">
                <h2 className="section-title">Candidates</h2>
                {selectedJobId && (
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleAddCandidate}
                  >
                    Add Candidate
                  </button>
                )}
              </div>
              
              <CandidateList 
                jobId={selectedJobId}
                onViewCandidate={handleViewCandidate}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecruitmentPage;
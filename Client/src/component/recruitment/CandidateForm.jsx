import React, { useState, useEffect } from 'react';

const CandidateForm = ({ candidate, jobId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Applied',
    resume: null,
    coverLetter: null,
    notes: ''
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        ...candidate,
        resume: null,
        coverLetter: null
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a FormData object to handle file uploads
    const data = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && key !== 'resume' && key !== 'coverLetter') {
        data.append(key, formData[key]);
      }
    });
    
    // Append files if they exist
    if (formData.resume) {
      data.append('resume', formData.resume);
    }
    
    if (formData.coverLetter) {
      data.append('coverLetter', formData.coverLetter);
    }
    
    // Add job ID
    data.append('jobId', jobId);
    
    onSave(data);
  };

  return (
    <div className="candidate-form-container">
      <h3 className="form-title">
        {candidate ? 'Edit Candidate' : 'Add New Candidate'}
      </h3>
      
      <form className="candidate-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            className="form-control-file"
            accept=".pdf,.doc,.docx"
          />
          {candidate && candidate.resumePath && (
            <div className="existing-file">
              <p>Current Resume: {candidate.resumeName}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter</label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            onChange={handleFileChange}
            className="form-control-file"
            accept=".pdf,.doc,.docx"
          />
          {candidate && candidate.coverLetterPath && (
            <div className="existing-file">
              <p>Current Cover Letter: {candidate.coverLetterName}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            rows="4"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {candidate ? 'Update Candidate' : 'Add Candidate'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
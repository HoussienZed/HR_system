import React, { useState } from 'react';
import ChecklistTemplate from '../../components/onboarding/ChecklistTemplate';
import NewHireList from '../../components/onboarding/NewHireList';
import OnboardingProgress from '../../components/onboarding/OnboardingProgress';

const OnboardingPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedNewHire, setSelectedNewHire] = useState(null);
  const [isAddingNewHire, setIsAddingNewHire] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    startDate: '',
    templateId: ''
  });
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };
  
  const handleNewHireSelect = (hire) => {
    setSelectedNewHire(hire);
  };
  
  const handleAddNewHire = () => {
    setIsAddingNewHire(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hireResponse = await fetch('/api/onboarding/new-hires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!hireResponse.ok) {
        throw new Error('Failed to create new hire');
      }
      
      const newHire = await hireResponse.json();
      
      if (formData.templateId) {
        const templateResponse = await fetch(`/api/onboarding/assign-template`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hireId: newHire.id,
            templateId: formData.templateId
          }),
        });
        
        if (!templateResponse.ok) {
          throw new Error('Failed to assign template');
        }
      }
      
      setFormData({
        name: '',
        email: '',
        position: '',
        department: '',
        startDate: '',
        templateId: ''
      });
      setIsAddingNewHire(false);
      setSelectedNewHire(newHire);
      
      
    } catch (error) {
      console.error('Error creating new hire:', error);
    }
  };
  
  return (
    <div className="onboarding-page">
      <div className="page-header">
        <h1 className="page-title">Onboarding</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleAddNewHire}
        >
          Add New Hire
        </button>
      </div>
      
      {isAddingNewHire ? (
        <div className="new-hire-form-container">
          <h2 className="form-title">Add New Hire</h2>
          
          <form className="new-hire-form" onSubmit={handleSubmit}>
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
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="templateId">Onboarding Template</label>
              <select
                id="templateId"
                name="templateId"
                value={formData.templateId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select a template...</option>
                <option value="1">Standard Employee Onboarding</option>
                <option value="2">Developer Onboarding</option>
                <option value="3">Sales Team Onboarding</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setIsAddingNewHire(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add New Hire
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="onboarding-content">
          <div className="templates-section">
            <ChecklistTemplate onSelect={handleTemplateSelect} />
          </div>
          
          <div className="newhires-section">
            <NewHireList onSelect={handleNewHireSelect} />
          </div>
          
          <div className="progress-section">
            <OnboardingProgress newHire={selectedNewHire} />
          </div>
        </div>
      )}
    </div>
  );
 };
 
 export default OnboardingPage;
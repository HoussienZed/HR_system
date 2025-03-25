import React, { useState, useEffect } from 'react';

const ChecklistTemplate = ({ onSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    items: []
  });

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const response = await fetch('/api/onboarding/templates');
        const templatesData = await response.json();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    getTemplates();
  }, []);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    onSelect(template);
  };

  const handleEditClick = () => {
    setFormData(selectedTemplate);
    setIsEditing(true);
  };

  const handleNewTemplate = () => {
    setFormData({
      name: '',
      description: '',
      items: [{ title: '', assignedTo: 'HR', description: '' }]
    });
    setIsEditing(true);
    setSelectedTemplate(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({
      ...formData,
      items: newItems
    });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { title: '', assignedTo: 'HR', description: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedTemplate;
      
      if (formData.id) {
        const response = await fetch(`/api/onboarding/templates/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update template');
        }
        
        savedTemplate = await response.json();
        
        setTemplates(templates.map(template => 
          template.id === savedTemplate.id ? savedTemplate : template
        ));
      } else {
        const response = await fetch('/api/onboarding/templates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create template');
        }
        
        savedTemplate = await response.json();
        
        setTemplates([...templates, savedTemplate]);
      }
      
      setSelectedTemplate(savedTemplate);
      setIsEditing(false);
      onSelect(savedTemplate);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="template-form-container">
        <h3 className="form-title">
          {selectedTemplate ? 'Edit Checklist Template' : 'Create New Checklist Template'}
        </h3>
        
        <form className="template-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Template Name</label>
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
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          
          <h4 className="section-subtitle">Checklist Items</h4>
          
          {formData.items.map((item, index) => (
            <div key={index} className="checklist-item-form">
              <div className="form-row">
                <div className="form-group item-title">
                  <label htmlFor={`item-title-${index}`}>Task Title</label>
                  <input
                    type="text"
                    id={`item-title-${index}`}
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group item-assigned">
                  <label htmlFor={`item-assigned-${index}`}>Assigned To</label>
                  <select
                    id={`item-assigned-${index}`}
                    value={item.assignedTo}
                    onChange={(e) => handleItemChange(index, 'assignedTo', e.target.value)}
                    className="form-control"
                  >
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                
                <div className="form-action">
                  <button 
                    type="button" 
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor={`item-description-${index}`}>Description</label>
                <textarea
                  id={`item-description-${index}`}
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="form-control"
                  rows="2"
                ></textarea>
              </div>
            </div>
          ))}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={addNewItem}
            >
              Add Item
            </button>
          </div>
          
          <div className="form-actions mt-4">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Template
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="checklist-templates">
      <div className="templates-header">
        <h3 className="section-title">Onboarding Templates</h3>
        <button 
          className="btn btn-primary" 
          onClick={handleNewTemplate}
        >
          Create Template
        </button>
      </div>
      
      <div className="templates-list">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div 
              key={template.id} 
              className={`template-card ${selectedTemplate && selectedTemplate.id === template.id ? 'selected' : ''}`}
              onClick={() => handleTemplateClick(template)}
            >
              <h4 className="template-name">{template.name}</h4>
              <p className="template-description">{template.description}</p>
              <div className="template-stats">
                <span>{template.items.length} tasks</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No templates found. Create your first template.</p>
        )}
      </div>
      
      {selectedTemplate && (
        <div className="template-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleEditClick}
          >
            Edit Template
          </button>
        </div>
      )}
    </div>
  );
};

export default ChecklistTemplate;
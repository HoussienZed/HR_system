import React, { useState, useEffect } from 'react';

const OnboardingProgress = ({ newHire }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completion, setCompletion] = useState(0);
  
  useEffect(() => {
    const getOnboardingProgress = async () => {
      if (!newHire) return;
      
      try {
        const response = await fetch(`/api/onboarding/progress/${newHire.id}`);
        const progressData = await response.json();
        setTasks(progressData.tasks);
        setCompletion(progressData.completion);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching onboarding progress:', error);
        setLoading(false);
      }
    };
    
    getOnboardingProgress();
  }, [newHire]);
  
  const handleTaskStatusChange = async (taskId, completed) => {
    try {
      const response = await fetch(`/api/onboarding/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
      
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      );
      
      setTasks(updatedTasks);
      
      const completedCount = updatedTasks.filter(task => task.completed).length;
      const newCompletion = Math.round((completedCount / updatedTasks.length) * 100);
      setCompletion(newCompletion);
      
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  
  if (!newHire) {
    return <div className="no-selection">Select a new hire to view onboarding progress</div>;
  }
  
  if (loading) {
    return <div className="loading">Loading onboarding progress...</div>;
  }
  
  return (
    <div className="onboarding-progress">
      <div className="progress-header">
        <h3 className="employee-name">{newHire.name}</h3>
        <div className="position-info">
          <span className="position-title">{newHire.position}</span>
          <span className="department-name">{newHire.department}</span>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completion}%` }}
          ></div>
        </div>
        <div className="progress-percentage">{completion}% Complete</div>
      </div>
      
      <div className="tasks-container">
        <h4 className="tasks-title">Onboarding Tasks</h4>
        
        {tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={(e) => handleTaskStatusChange(task.id, e.target.checked)}
                  />
                  <label htmlFor={`task-${task.id}`}></label>
                </div>
                
                <div className="task-details">
                  <h5 className="task-title">{task.title}</h5>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <span className="task-assignee">Assigned to: {task.assignedTo}</span>
                    <span className="task-due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="task-status">
                  <span className={`status-indicator ${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No onboarding tasks found for this employee.</p>
        )}
      </div>
    </div>
  );
 };
 
 export default OnboardingProgress;
import React, { useState } from 'react';
import './PostProject.css';

const PostProject = ({ onClose, onPost }) => {
  const [projectData, setProjectData] = useState({
    sub: '',
    desc: '',
    privacy: 'private',  
  });

  const [error,setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };
  const handleFileUpload = (e) => {
        const files = e.target.files;
        console.log('Selected files:', files);
      };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No JWT token found. Please log in.');
        return;
      }

      const response = await fetch('/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sub: projectData.sub,
          desc: projectData.desc,
        }),
      });
      

      if (response.ok) {
        setSuccess('Project successfully created.');
        setProjectData({
          sub: '',
          desc: '',
          privacy: 'private',
        });
        onPost(); 
      } else {
        setError('Error creating project: ' + response.statusText);
      }
    } catch (error) {
      setError('An error occurred while creating the project: ' + error.message);
    }
  };

  return (
    <div className="post-project-container">
      <div className="post-project-form">
        <h2>Create a New Project</h2>
        
        {success && <p className="success">{success}</p>}
        <div className="form-group">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            name="sub"
            value={projectData.sub}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            name="desc"
            value={projectData.desc}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Attachments</label>
          <input type="file" multiple onChange={handleFileUpload} />
        </div>
        <div className="form-group">
          <label>Privacy</label>
          <div className="privacy-options">
            <label>
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={projectData.privacy === 'private'}
                onChange={handleInputChange}
              />
              Private
            </label>
            <label>
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={projectData.privacy === 'public'}
                onChange={handleInputChange}
              />
              Public
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="post-button" onClick={handleSubmit}>
            Post Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProject;


